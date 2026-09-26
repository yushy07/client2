import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { textureLibrary } from "../shared/discoveryContent";

const projectRoot = resolve(import.meta.dirname, "..");
const homeComponent = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("Texture Studio & Media Performance (Phase C)", () => {
  it("verifies all 21 texture library assets exist on disk with optimized payloads (<150KB each)", () => {
    expect(textureLibrary.length).toBe(21);
    let totalBytes = 0;

    for (const item of textureLibrary) {
      const relPath = item.imageUrl.replace(/^\//, "");
      const fullPath = resolve(projectRoot, "client/public", relPath);

      expect(existsSync(fullPath), `Missing texture file: ${item.imageUrl}`).toBe(true);

      const stat = statSync(fullPath);
      expect(stat.size).toBeGreaterThan(5 * 1024);
      // Each optimized texture should be under 150 KB
      expect(stat.size).toBeLessThan(150 * 1024);

      totalBytes += stat.size;
    }

    // Entire 21-texture library must be under 1.5 MB (down from 2.13 MB)
    expect(totalBytes / (1024 * 1024)).toBeLessThan(1.5);
  });

  it("verifies storefront hero images and logo exist and are optimized", () => {
    const storefrontPaths = [
      "client/public/storage/storefront/kumar-hardware-storefront-wide.png",
      "client/public/storage/storefront/kumar-hardware-storefront-straight.png",
      "client/public/storage/storefront/kumar-hardware-storefront-angled.png",
      "client/public/storage/kumar-hardware-logo.png",
    ];

    for (const p of storefrontPaths) {
      const fullPath = resolve(projectRoot, p);
      expect(existsSync(fullPath), `Missing storefront file: ${p}`).toBe(true);

      const stat = statSync(fullPath);
      // Storefront images must be under 900 KB (down from 2.58 MB each)
      if (p.includes("storefront")) {
        expect(stat.size).toBeLessThan(900 * 1024);
      } else {
        // Logo must be under 100 KB (down from 1.2 MB)
        expect(stat.size).toBeLessThan(100 * 1024);
      }
    }
  });

  it("verifies Texture Studio container background uses neutral dark tone instead of stark purple #2e2536", () => {
    expect(stylesheet).toContain("background: #1d1e1c;");
    // Ensure the old harsh purple background on texture-card-image is completely removed
    expect(stylesheet).not.toContain(".texture-card-image {\n  aspect-ratio: 1.05;\n  background: #2e2536;");
  });

  it("verifies texture gallery image tags specify explicit dimensions and async decoding to prevent CLS", () => {
    expect(homeComponent).toContain('width={600}');
    expect(homeComponent).toContain('decoding="async"');
    expect(stylesheet).toContain(".texture-card-image");
    expect(stylesheet).toContain("aspect-ratio: 1.25;");
  });
});
