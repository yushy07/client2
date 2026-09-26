import { rateLimit } from "express-rate-limit";

/**
 * Rate limiter for OAuth callback endpoints to prevent brute-force or abuse.
 */
export const oauthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 30, // Limit each IP to 30 requests per window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many authentication requests, please try again later.",
  },
});

/**
 * Rate limiter for storage proxy requests to mitigate file discovery and presign flooding.
 */
export const storageProxyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 600, // Limit each IP to 600 requests per window (approx 40 req/min)
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many storage requests, please try again later.",
  },
});

/**
 * Rate limiter for Vite development HTML transformation / SSR fallback.
 */
export const viteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 300, // Limit each IP to 300 requests per minute
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests to development server, please slow down.",
});

/**
 * Rate limiter for static SPA fallback file serving.
 */
export const staticSpaLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 1000 requests per 15 minutes
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

/**
 * General API rate limiter for tRPC / REST endpoints.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 500, // Limit each IP to 500 requests per 15 minutes
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests to API endpoints, please try again later.",
  },
});
