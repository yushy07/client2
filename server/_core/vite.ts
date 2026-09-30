import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { staticSpaLimiter, viteLimiter } from "./rateLimiter";
import { SITE_ROUTES_SEO } from "../../shared/seoKeywordMap";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: ["localhost", "127.0.0.1", ".manuspre.computer", ".manus.computer", ".manus-asia.computer", ".manuscomputer.ai", ".manusvm.computer"],
  };

  const resolvedViteConfig =
    typeof viteConfig === "function"
      ? await viteConfig({ command: "serve", mode: "development" })
      : viteConfig;

  const vite = await createViteServer({
    ...resolvedViteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", viteLimiter, async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      const pathname = req.path.replace(/\/+$/, "") || "/";
      const knownRoute = pathname === "/admin/reviews" || (Boolean(SITE_ROUTES_SEO[pathname]) && pathname !== "/404");
      if (!knownRoute) {
        template = template
          .replace(/<title>[\s\S]*?<\/title>/, "<title>Page Not Found | Jaymurti Traders</title>")
          .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, nofollow" />')
          .replace('<div id="root"></div>', '<div id="root"><main><p>Error 404</p><h1>Page Not Found</h1><p>The requested page does not exist.</p><a href="/">Return to Jaymurti Traders</a></main></div>');
        res.status(404).setHeader("X-Robots-Tag", "noindex, nofollow");
      } else if (pathname === "/admin/reviews") {
        res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
      }
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const possiblePaths = [
    path.resolve(import.meta.dirname, "public"),
    path.resolve(import.meta.dirname, "../..", "dist", "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(import.meta.dirname, "..", "dist", "public"),
  ];
  const distPath = possiblePaths.find((p) => fs.existsSync(p)) || possiblePaths[0];

  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(
    express.static(distPath, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (/\/assets\//i.test(filePath) || /-[a-zA-Z0-9_-]{8,}\.(js|css|webp|png|jpg|woff2)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (/\.(webp|avif|jpg|jpeg|png|svg|ico|webmanifest|woff2)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
        }
      },
    })
  );

  app.use("*", staticSpaLimiter, (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    const pathname = req.path.replace(/\/+$/, "") || "/";
    if (pathname === "/admin/reviews") {
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
      return res.sendFile(path.resolve(distPath, "admin/reviews/index.html"));
    }
    const route = SITE_ROUTES_SEO[pathname];
    if (route && pathname !== "/404") {
      const file = pathname === "/" ? "index.html" : `${pathname.slice(1)}/index.html`;
      return res.sendFile(path.resolve(distPath, file));
    }
    res.status(404).setHeader("X-Robots-Tag", "noindex, nofollow");
    return res.sendFile(path.resolve(distPath, "404.html"));
  });
}

