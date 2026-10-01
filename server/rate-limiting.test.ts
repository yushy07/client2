import { describe, expect, it } from "vitest";
import express from "express";
import http from "http";
import type { AddressInfo } from "net";
import {
  apiLimiter,
  mutationLimiter,
  oauthLimiter,
  staticSpaLimiter,
  storageProxyLimiter,
  viteLimiter,
} from "./_core/rateLimiter";

async function listenApp(app: express.Express): Promise<{ url: string; close: () => Promise<void> }> {
  const server = http.createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const addr = server.address() as AddressInfo;
  const url = `http://127.0.0.1:${addr.port}`;
  const close = () =>
    new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
  return { url, close };
}

describe("Rate Limiting Middleware", () => {
  it("exports valid rate limiter middleware functions", () => {
    expect(typeof oauthLimiter).toBe("function");
    expect(typeof storageProxyLimiter).toBe("function");
    expect(typeof viteLimiter).toBe("function");
    expect(typeof staticSpaLimiter).toBe("function");
    expect(typeof apiLimiter).toBe("function");
    expect(typeof mutationLimiter).toBe("function");
  });

  it("applies oauthLimiter and sets rate limit headers on /api/oauth/callback", async () => {
    const app = express();
    app.get("/api/oauth/callback", oauthLimiter, (_req, res) => {
      res.json({ ok: true });
    });

    const { url, close } = await listenApp(app);
    try {
      const res = await fetch(`${url}/api/oauth/callback`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toEqual({ ok: true });
      expect(res.headers.get("ratelimit-limit") || res.headers.get("ratelimit")).toBeTruthy();
    } finally {
      await close();
    }
  });

  it("applies storageProxyLimiter and sets rate limit headers", async () => {
    const app = express();
    app.get("/manus-storage/*", storageProxyLimiter, (_req, res) => {
      res.json({ ok: true });
    });

    const { url, close } = await listenApp(app);
    try {
      const res = await fetch(`${url}/manus-storage/test-image.png`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toEqual({ ok: true });
      expect(res.headers.get("ratelimit-limit") || res.headers.get("ratelimit")).toBeTruthy();
    } finally {
      await close();
    }
  });

  it("applies viteLimiter and sets rate limit headers", async () => {
    const app = express();
    app.use("*", viteLimiter, (_req, res) => {
      res.send("<html><body>Vite</body></html>");
    });

    const { url, close } = await listenApp(app);
    try {
      const res = await fetch(`${url}/test-page`);
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain("Vite");
      expect(res.headers.get("ratelimit-limit") || res.headers.get("ratelimit")).toBeTruthy();
    } finally {
      await close();
    }
  });

  it("applies staticSpaLimiter and sets rate limit headers", async () => {
    const app = express();
    app.use("*", staticSpaLimiter, (_req, res) => {
      res.send("<html><body>SPA Index</body></html>");
    });

    const { url, close } = await listenApp(app);
    try {
      const res = await fetch(`${url}/any-spa-path`);
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain("SPA Index");
      expect(res.headers.get("ratelimit-limit") || res.headers.get("ratelimit")).toBeTruthy();
    } finally {
      await close();
    }
  });

  it("applies apiLimiter and sets rate limit headers", async () => {
    const app = express();
    app.use("/api", apiLimiter, (_req, res) => {
      res.json({ status: "ok" });
    });

    const { url, close } = await listenApp(app);
    try {
      const res = await fetch(`${url}/api/test`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toEqual({ status: "ok" });
      expect(res.headers.get("ratelimit-limit") || res.headers.get("ratelimit")).toBeTruthy();
    } finally {
      await close();
    }
  });
});
