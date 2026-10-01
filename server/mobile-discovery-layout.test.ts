import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("mobile discovery paths", () => {
  it("provides accessible category filtering controls", () => {
    const productsPreview = readFileSync(resolve(projectRoot, "client/src/components/home/HomeProductsPreview.tsx"), "utf8");
    expect(productsPreview).toContain('aria-label="Filter featured products"');
    expect(productsPreview).toContain('className="filter-pills"');
  });

  it("uses touch scrolling, snap points, and full-width cards before the phone breakpoint", () => {
    expect(stylesheet).toContain('.supplementary-grid { -webkit-overflow-scrolling: touch; display: flex;');
    expect(stylesheet).toContain('overflow-x: auto;');
    expect(stylesheet).toContain('scroll-snap-type: x mandatory;');
    expect(stylesheet).toContain('touch-action: pan-x;');
    expect(stylesheet).toContain('@media (max-width: 1100px)');
    expect(stylesheet).toContain('.supplementary-card { flex: 0 0 100%;');
  });
});
