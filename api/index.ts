import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { registerStorageProxy } from "../server/_core/storageProxy";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { apiLimiter } from "../server/_core/rateLimiter";

const app = express();

// Configure body parser with larger size limit for file uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Register storage proxy and OAuth routes
registerStorageProxy(app);
registerOAuthRoutes(app);

// Health check endpoint
app.get(["/api", "/api/health", "/health"], (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// tRPC API - mounted for /api/trpc, /trpc, /api, and root tRPC paths
const trpcHandler = createExpressMiddleware({
  router: appRouter,
  createContext,
  onError({ error, path }) {
    console.error(`[tRPC error on ${path}]:`, error);
  },
});

app.use("/api/trpc", apiLimiter, trpcHandler);
app.use("/trpc", apiLimiter, trpcHandler);
app.use("/api", apiLimiter, trpcHandler);
app.use(apiLimiter, trpcHandler);

// Express error handler to guarantee JSON error output
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[API Error Handler]:", err);
  if (!res.headersSent) {
    res.status(500).json({ error: { message: err?.message || "Internal server error" } });
  }
});

export default app;

