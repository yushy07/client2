import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

/**
 * Local Storage Resolver Plugin: Serves /manus-storage/* and /storage/* seamlessly in Vite
 */
function vitePluginLocalStorageResolver(): Plugin {
  return {
    name: "local-storage-resolver",
    configureServer(server: ViteDevServer) {
      const publicBase = path.resolve(PROJECT_ROOT, "client", "public", "storage", "extracted");
      const rootBase = path.resolve(PROJECT_ROOT, "storage", "extracted");

      function getAllFiles() {
        const searchDirs: string[] = [];
        if (fs.existsSync(publicBase)) {
          const subdirs = fs.readdirSync(publicBase).map((d) => path.join(publicBase, d));
          searchDirs.push(...subdirs.filter((d) => fs.statSync(d).isDirectory()));
        }
        if (fs.existsSync(rootBase)) {
          const subdirs = fs.readdirSync(rootBase).map((d) => path.join(rootBase, d));
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
        return results;
      }

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] || "";

        if (url.startsWith("/storage/")) {
          const relPath = decodeURIComponent(url.replace(/^\/storage\//, ""));
          const directPublic = path.resolve(PROJECT_ROOT, "client", "public", "storage", relPath);
          const directRoot = path.resolve(PROJECT_ROOT, "storage", relPath);
          const target = fs.existsSync(directPublic) ? directPublic : fs.existsSync(directRoot) ? directRoot : null;
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
          const rawKey = decodeURIComponent(url.replace(/^\/manus-storage\//, ""));
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

          // 4. Default fallback to first image in index
          if (!targetFile && allIndexedFiles.length > 0) {
            targetFile = allIndexedFiles[0].filePath;
          }

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

export default defineConfig(({ command, mode }) => {
  const isProd = mode === "production" || command === "build" || process.env.NODE_ENV === "production";
  const plugins = [
    react(),
    tailwindcss(),
    ...(!isProd
      ? [
          jsxLocPlugin(),
          vitePluginManusRuntime(),
          vitePluginManusDebugCollector(),
        ]
      : []),
    vitePluginLocalStorageResolver(),
  ];

  return {
    plugins,
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
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("wouter")) {
                return "vendor";
              }
              if (id.includes("@radix-ui")) {
                return "radix";
              }
              if (id.includes("lucide-react")) {
                return "icons";
              }
              if (id.includes("@tanstack")) {
                return "query";
              }
            }
          },
        },
      },
    },
    server: {
      host: true,
      allowedHosts: [
        ".manuspre.computer",
        ".manus.computer",
        ".manus-asia.computer",
        ".manuscomputer.ai",
        ".manusvm.computer",
        "localhost",
        "127.0.0.1",
      ],
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
