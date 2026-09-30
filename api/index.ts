import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { registerStorageProxy } from "../server/_core/storageProxy";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { apiLimiter } from "../server/_core/rateLimiter";
import { genericErrorHandler, securityHeaders } from "../server/_core/security";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(securityHeaders);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "256kb", extended: true, parameterLimit: 100 }));

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
app.use(genericErrorHandler);

export default app;

