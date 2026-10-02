import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { resolveContainedPath, safeDecodeUriComponent } from "./server/_core/safePath.ts";

const PROJECT_ROOT = import.meta.dirname;

/**
 * Local Storage Resolver Plugin: Serves /manus-storage/* and /storage/* seamlessly in Vite
 */
function vitePluginLocalStorageResolver(): Plugin {
  return {
    name: "local-storage-resolver",
    configureServer(server: ViteDevServer) {
      const publicBase = path.resolve(PROJECT_ROOT, "client", "public", "storage", "extracted");
      const rootBase = path.resolve(PROJECT_ROOT, "storage", "extracted");

      let cachedIndexedFiles: { filePath: string; fileName: string; alpha: string; tokens: string[] }[] | null = null;

      function getAllFiles() {
        if (cachedIndexedFiles) {
          return cachedIndexedFiles;
        }

        const searchDirs: string[] = [];
        if (fs.existsSync(publicBase)) {
          const subdirs = fs.readdirSync(publicBase).map(d => path.join(publicBase, d));
          searchDirs.push(...subdirs.filter((d) => fs.statSync(d).isDirectory()));
        }
        if (fs.existsSync(rootBase)) {
          const subdirs = fs.readdirSync(rootBase).map(d => path.join(rootBase, d));
          searchDirs.push(...subdirs.filter((d) => fs.statSync(d).isDirectory()));
        }

        const results: { filePath: string; fileName: string; alpha: string; tokens: string[] }[] = [];
        const seen = new Set<string>();

        for (const dir of searchDirs) {
          if (!fs.existsSync(dir)) continue;
          for (const f of fs.readdirSync(dir)) {
            if (f.endsWith(".csv")) continue;
            const fullPath = path.join(dir, f);
            if (seen.has(fullPath) || !fs.statSync(fullPath).isFile()) continue;
            seen.add(fullPath);
            const nameNoExt = f.replace(/\.[^/.]+$/, "");
            const alpha = nameNoExt.toLowerCase().replace(/[^a-z0-9]/g, "");
            const tokens = nameNoExt.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
            results.push({ filePath: fullPath, fileName: f, alpha, tokens });
          }
        }
        cachedIndexedFiles = results;
        return results;
      }

      const invalidateCache = () => {
        cachedIndexedFiles = null;
      };

      server.watcher.on("add", invalidateCache);
      server.watcher.on("change", invalidateCache);
      server.watcher.on("unlink", invalidateCache);

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] || "";

        if (url.startsWith("/storage/")) {
          const relPath = safeDecodeUriComponent(url.replace(/^\/storage\//, ""));
          if (relPath === null) {
            res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end("Invalid storage path");
          }
          const publicStorage = path.resolve(PROJECT_ROOT, "client", "public", "storage");
          const rootStorage = path.resolve(PROJECT_ROOT, "storage");
          const directPublic = resolveContainedPath(publicStorage, relPath);
          const directRoot = resolveContainedPath(rootStorage, relPath);
          const target = directPublic && fs.existsSync(directPublic)
            ? directPublic
            : directRoot && fs.existsSync(directRoot) ? directRoot : null;
          if (target && fs.existsSync(target) && fs.statSync(target).isFile()) {
            const ext = path.extname(target).toLowerCase();
            const mimeTypes: Record<string, string> = {
              ".jpg": "image/jpeg",
              ".jpeg": "image/jpeg",
              ".png": "image/png",
              ".webp": "image/webp",
              ".avif": "image/avif",
              ".svg": "image/svg+xml",
              ".csv": "text/csv",
            };
            res.writeHead(200, {
              "Content-Type": mimeTypes[ext] || "application/octet-stream",
              "Cache-Control": "public, max-age=86400",
            });
            return fs.createReadStream(target).pipe(res);
          }
        }

        if (url.startsWith("/manus-storage/")) {
          const decodedKey = safeDecodeUriComponent(url.replace(/^\/manus-storage\//, ""));
          if (decodedKey === null) {
            res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end("Invalid storage key");
          }
          const rawKey = decodedKey.replace(/\\/g, "/");
          const rawFileName = path.basename(rawKey);
          const cleanFileName = rawFileName.replace(/_[a-f0-9]{8}(\.[a-zA-Z0-9]+)$/i, "$1");
          const baseName = cleanFileName.replace(/\.[^/.]+$/, "");
          const alphaKey = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");
          const queryTokens = baseName.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 1 && !/^[0-9a-f]{8}$/i.test(t));

          const allIndexedFiles = getAllFiles();
          let targetFile: string | null = null;

          // 1. Exact match
          const exact = allIndexedFiles.find(
            (f) => f.fileName.toLowerCase() === rawFileName.toLowerCase() || f.fileName.toLowerCase() === cleanFileName.toLowerCase()
          );
          if (exact) targetFile = exact.filePath;

          // 2. Alpha match
          if (!targetFile) {
            const alphaExact = allIndexedFiles.find((f) => f.alpha === alphaKey);
            if (alphaExact) targetFile = alphaExact.filePath;
          }
          if (!targetFile) {
            const alphaSub = allIndexedFiles.find((f) => f.alpha.includes(alphaKey) || alphaKey.includes(f.alpha));
            if (alphaSub) targetFile = alphaSub.filePath;
          }

          // 3. Token overlap match
          if (!targetFile && queryTokens.length > 0) {
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
              targetFile = bestMatch.filePath;
            }
          }

          // No catch-all fallback: an unmatched key must 404 rather than return
          // an unrelated image under HTTP 200.
          if (targetFile && fs.existsSync(targetFile)) {
            const ext = path.extname(targetFile).toLowerCase();
            const mimeTypes: Record<string, string> = {
              ".jpg": "image/jpeg",
              ".jpeg": "image/jpeg",
              ".png": "image/png",
              ".webp": "image/webp",
              ".avif": "image/avif",
              ".svg": "image/svg+xml",
            };
            res.writeHead(200, {
              "Content-Type": mimeTypes[ext] || "application/octet-stream",
              "Cache-Control": "public, max-age=86400",
            });
            return fs.createReadStream(targetFile).pipe(res);
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), vitePluginLocalStorageResolver()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    publicDir: path.resolve(import.meta.dirname, "client", "public"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      sourcemap: false,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              if (id.includes("framer-motion")) {
                return "motion";
              }
              if (id.includes("react") || id.includes("wouter")) {
                return "vendor";
              }
              if (id.includes("@radix-ui")) {
                return "radix";
              }
              if (id.includes("lucide-react")) {
                return "icons";
              }
              if (id.includes("@tanstack") || id.includes("@trpc")) {
                return "query";
              }
            }
          },
        },
      },
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
