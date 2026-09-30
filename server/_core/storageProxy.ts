import type { Express } from "express";
import fs from "fs";
import path from "path";
import express from "express";
import { ENV } from "./env";
import { storageProxyLimiter } from "./rateLimiter";
import { safeDecodeUriComponent } from "./safePath";

type IndexedFile = { filePath: string; fileName: string; alpha: string; tokens: string[] };

let fileIndexCache: IndexedFile[] | null = null;

export function clearStorageProxyCache() {
  fileIndexCache = null;
}

export function registerStorageProxy(app: Express) {
  const currentDir = typeof import.meta.dirname === "string" ? import.meta.dirname : process.cwd();
  const possiblePublicStorage = [
    path.resolve(process.cwd(), "client", "public", "storage"),
    path.resolve(process.cwd(), "dist", "public", "storage"),
    path.resolve(process.cwd(), "storage"),
    path.resolve(currentDir, "../../client/public/storage"),
    path.resolve(currentDir, "../public/storage"),
  ];
  
  const publicStoragePath = possiblePublicStorage.find((p) => fs.existsSync(p)) || possiblePublicStorage[0];
  const extractedPath = path.join(publicStoragePath, "extracted");
  const rootExtractedPath = path.resolve(process.cwd(), "storage", "extracted");

  const storageStaticOptions = {
    maxAge: "7d",
    setHeaders: (res: express.Response, filePath: string) => {
      if (/\.(webp|avif|jpg|jpeg|png|svg|mp4|webm)$/i.test(filePath)) {
        res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
      }
    },
  };

  // Serve /storage directly from public storage or root storage with caching
  app.use("/storage", express.static(publicStoragePath, storageStaticOptions));
  if (fs.existsSync(rootExtractedPath)) {
    app.use("/storage/extracted", express.static(rootExtractedPath, storageStaticOptions));
  }

  // Pre-index all files across all directories for O(1) matching
  function getAllFiles(): IndexedFile[] {
    if (fileIndexCache) return fileIndexCache;

    const searchDirs: string[] = [];
    if (fs.existsSync(extractedPath)) {
      const subdirs = fs.readdirSync(extractedPath).map((d) => path.join(extractedPath, d));
      searchDirs.push(...subdirs.filter((d) => fs.statSync(d).isDirectory()));
    }
    if (fs.existsSync(rootExtractedPath)) {
      const subdirs = fs.readdirSync(rootExtractedPath).map((d) => path.join(rootExtractedPath, d));
      searchDirs.push(...subdirs.filter((d) => fs.statSync(d).isDirectory()));
    }

    const results: { filePath: string; fileName: string; alpha: string; tokens: string[] }[] = [];
    const seenPaths = new Set<string>();

    for (const dir of searchDirs) {
      if (!fs.existsSync(dir)) continue;
      const files = fs.readdirSync(dir);
      for (const f of files) {
        if (f.endsWith(".csv")) continue;
        const fullPath = path.join(dir, f);
        if (seenPaths.has(fullPath) || !fs.statSync(fullPath).isFile()) continue;
        seenPaths.add(fullPath);
        const nameNoExt = f.replace(/\.[^/.]+$/, "");
        const alpha = nameNoExt.toLowerCase().replace(/[^a-z0-9]/g, "");
        const tokens = nameNoExt.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
        results.push({ filePath: fullPath, fileName: f, alpha, tokens });
      }
    }
    fileIndexCache = results;
    return results;
  }

  // Serve /manus-storage by matching local files or falling back to Forge
  app.get("/manus-storage/*", storageProxyLimiter, async (req, res) => {
    const rawParam = (req.params as Record<string, string>)[0];
    if (!rawParam) {
      res.status(400).send("Missing storage key");
      return;
    }

    const decoded = safeDecodeUriComponent(rawParam);
    if (decoded === null || decoded.includes("\0")) {
      res.status(400).send("Invalid storage key");
      return;
    }
    const key = decoded.replace(/\\/g, "/");
    const rawFileName = path.basename(key);
    const cleanFileName = rawFileName.replace(/_[a-f0-9]{8}(\.[a-zA-Z0-9]+)$/i, "$1");
    const baseName = cleanFileName.replace(/\.[^/.]+$/, "");
    const alphaKey = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const queryTokens = baseName.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1 && !/^[0-9a-f]{8}$/i.test(t));

    const allIndexedFiles = getAllFiles();

    // 1. Exact file name match
    const exact = allIndexedFiles.find(
      (f) => f.fileName.toLowerCase() === rawFileName.toLowerCase() || f.fileName.toLowerCase() === cleanFileName.toLowerCase()
    );
    if (exact) return res.sendFile(exact.filePath);

    // 2. Alpha string match (exact or substring)
    const alphaExact = allIndexedFiles.find((f) => f.alpha === alphaKey);
    if (alphaExact) return res.sendFile(alphaExact.filePath);

    const alphaSub = allIndexedFiles.find((f) => f.alpha.includes(alphaKey) || alphaKey.includes(f.alpha));
    if (alphaSub) return res.sendFile(alphaSub.filePath);

    // 3. Token / word overlap scoring
    if (queryTokens.length > 0) {
      let bestMatch: (typeof allIndexedFiles)[0] | null = null;
      let highestScore = 0;

      for (const item of allIndexedFiles) {
        let score = 0;
        for (const token of queryTokens) {
          if (item.tokens.includes(token)) score += 2;
          else if (item.tokens.some((it) => it.includes(token) || token.includes(it))) score += 1;
        }
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }

      if (bestMatch && highestScore >= Math.min(2, queryTokens.length)) {
        return res.sendFile(bestMatch.filePath);
      }
    }

    // 4. Default fallback to first available image in the category or collection
    if (allIndexedFiles.length > 0) {
      return res.sendFile(allIndexedFiles[0].filePath);
    }

    // If not found locally, try Forge if configured
    if (ENV.forgeApiUrl && ENV.forgeApiKey) {
      try {
        const forgeUrl = new URL(
          "v1/storage/presign/get",
          ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
        );
        forgeUrl.searchParams.set("path", key);

        const forgeResp = await fetch(forgeUrl, {
          headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
        });

        if (forgeResp.ok) {
          const { url } = (await forgeResp.json()) as { url: string };
          if (url) {
            res.set("Cache-Control", "no-store");
            return res.redirect(307, url);
          }
        }
      } catch (err) {
        console.error("[StorageProxy] forge error:", err);
      }
    }

    res.status(404).send("File not found in local storage");
  });
}
