import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { birlaOpusProductCount, birlaOpusProducts } from "../shared/birlaOpusCatalogue";

describe("Product Image Loading & Performance Optimization", () => {
  it("has all 124 product assets present in storage with valid non-zero byte size", () => {
    expect(birlaOpusProducts).toHaveLength(birlaOpusProductCount);
    let totalBytes = 0;

    for (const product of birlaOpusProducts) {
      expect(product.imageUrl).toBeDefined();
      const cleanPath = product.imageUrl!.replace(/^\//, "");
      const fullPath = path.resolve(process.cwd(), "client", "public", cleanPath);
      expect(fs.existsSync(fullPath), `Asset must exist at ${fullPath}`).toBe(true);

      const stat = fs.statSync(fullPath);
      expect(stat.size).toBeGreaterThan(0);
      totalBytes += stat.size;
    }

    // Assert total optimized catalogue payload is under 4MB (previously 6.87MB)
    const totalMB = totalBytes / (1024 * 1024);
    expect(totalMB).toBeLessThan(4.0);
  });

  it("ensures Home.tsx configures eager/lazy loading strategy and explicit dimensions for catalogue cards", () => {
    const homeContent = fs.readFileSync(path.resolve(process.cwd(), "client", "src", "pages", "Home.tsx"), "utf8");

    // Check eager/lazy loading on ProductCard
    expect(homeContent).toContain('loading={index < 2 ? "eager" : "lazy"}');
    expect(homeContent).toContain('fetchPriority={index < 2 ? "high" : "auto"}');
    expect(homeContent).toContain('width={248}');
    expect(homeContent).toContain('height={226}');
  });

  it("ensures index.css specifies aspect-ratio for product can and comparison images to eliminate CLS", () => {
    const cssContent = fs.readFileSync(path.resolve(process.cwd(), "client", "src", "index.css"), "utf8");

    expect(cssContent).toContain("aspect-ratio: 248 / 226;");
    expect(cssContent).toContain("aspect-ratio: 120 / 96;");
  });
});
