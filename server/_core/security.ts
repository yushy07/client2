import type { ErrorRequestHandler, RequestHandler } from "express";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com",
  "form-action 'self' https://wa.me https://api.whatsapp.com",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "connect-src 'self' https:",
  "upgrade-insecure-requests",
].join("; ");

export const securityHeaders: RequestHandler = (_req, res, next) => {
  res.setHeader("Content-Security-Policy", CONTENT_SECURITY_POLICY);
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
};

export const genericErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error("[Server] Request failed", error);
  if (!res.headersSent) {
    const status = typeof error === "object" && error !== null && ("status" in error || "statusCode" in error)
      ? Number((error as any).status || (error as any).statusCode || 500)
      : 500;
    const validStatus = status >= 400 && status < 600 ? status : 500;
    const rawMessage = typeof error === "object" && error !== null && "message" in error && typeof (error as any).message === "string"
      ? (error as any).message
      : typeof error === "string"
      ? error
      : "Internal server error";
    const message = validStatus >= 500 ? "Internal server error" : rawMessage;
    res.status(validStatus).json({ error: { message } });
  }
};
