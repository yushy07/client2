import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { apiLimiter } from "./rateLimiter";
import { serveStatic, setupVite } from "./vite";
import { genericErrorHandler, securityHeaders } from "./security";
import { ENV } from "./env";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

/**
 * Production platforms bind the port they hand you and health-check it.
 * Silently moving to another port turns a failed deploy into one that looks
 * successful, so in production a taken port is a startup error instead.
 */
async function resolveListenPort(): Promise<number> {
  const preferredPort = ENV.port;

  // 0 is the port the operating system assigns; there is nothing to check.
  if (preferredPort === 0) return 0;

  if (ENV.isProduction) {
    if (!(await isPortAvailable(preferredPort))) {
      throw new Error(
        `Port ${preferredPort} is already in use. Refusing to start on a different port in production.`,
      );
    }
    return preferredPort;
  }

  const availablePort = await findAvailablePort(preferredPort);
  if (availablePort !== preferredPort) {
    console.warn(
      `[Server] Port ${preferredPort} is busy, using port ${availablePort} instead`,
    );
  }
  return availablePort;
}

function registerHealthRoute(app: express.Express) {
  const handler: express.RequestHandler = (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  };

  app.get("/health", handler);
  app.get("/api/health", handler);
}

/** Unknown API paths must answer with JSON, not the SPA's HTML shell. */
function registerApiNotFoundHandler(app: express.Express) {
  app.use(["/api", "/trpc"], (_req, res) => {
    res.status(404).json({ error: { message: "Unknown API route" } });
  });
}

async function startServer() {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  const server = createServer(app);
  app.use(securityHeaders);
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "256kb", extended: true, parameterLimit: 100 }));

  registerHealthRoute(app);
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    apiLimiter,
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  registerApiNotFoundHandler(app);

  // development mode uses Vite, production mode uses static files
  if (!ENV.isProduction) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  app.use(genericErrorHandler);

  const port = await resolveListenPort();
  // Port resolution lives in resolveListenPort().

  if (port === 0) {
    console.warn("[Server] Bound an operating-system assigned port");
  }

  server.listen(port, () => {
    const boundAddress = server.address();
    const boundPort =
      typeof boundAddress === "object" && boundAddress !== null
        ? boundAddress.port
        : port;
    console.log(`[Server] Server running on http://localhost:${boundPort}/`);
  });
}

startServer().catch(error => {
  console.error("[Server] Failed to start:", error);
  process.exit(1);
});
