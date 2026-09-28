import { describe, expect, it } from "vitest";
import express from "express";
import http from "http";
import type { AddressInfo } from "net";
import { registerStorageProxy, clearStorageProxyCache } from "./_core/storageProxy";

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

describe("Storage Proxy Performance & Functionality", () => {
  it("serves files and handles requests efficiently", async () => {
    const app = express();
    registerStorageProxy(app);

    const { url, close } = await listenApp(app);
    try {
      // 1. Uncached iteration benchmark
      clearStorageProxyCache();
      const uncachedStart = performance.now();
      for (let i = 0; i < 20; i++) {
        clearStorageProxyCache(); // force uncached traversal each request
        const res = await fetch(`${url}/manus-storage/birlaopus_ideas/sample_${i}.jpg`);
        expect([200, 404]).toContain(res.status);
      }
      const uncachedDuration = performance.now() - uncachedStart;

      // 2. Cached iteration benchmark
      clearStorageProxyCache(); // warm up first request
      await fetch(`${url}/manus-storage/birlaopus_ideas/sample_0.jpg`);

      const cachedStart = performance.now();
      for (let i = 0; i < 20; i++) {
        const res = await fetch(`${url}/manus-storage/birlaopus_ideas/sample_${i}.jpg`);
        expect([200, 404]).toContain(res.status);
      }
      const cachedDuration = performance.now() - cachedStart;

      console.log(`[Benchmark] 20 Uncached requests took ${uncachedDuration.toFixed(2)} ms (${(uncachedDuration / 20).toFixed(2)} ms/req)`);
      console.log(`[Benchmark] 20 Cached requests took ${cachedDuration.toFixed(2)} ms (${(cachedDuration / 20).toFixed(2)} ms/req)`);
      console.log(`[Benchmark] Speedup factor: ${(uncachedDuration / cachedDuration).toFixed(2)}x faster`);

      expect(cachedDuration).toBeLessThan(uncachedDuration);
    } finally {
      await close();
    }
  });
});
