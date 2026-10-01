import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("sectioned storefront scrolling", () => {
  it("defines major scroll chapters and uses semantic navigation links", () => {
    expect(homePage).toContain("scroll-chapter");
    expect(homePage).toContain('href: "/paint-products"');
    expect(homePage).toContain('href: "/colour-finder"');
    expect(homePage).toContain('href: "/room-inspiration"');
    expect(homePage).toContain('href: "/surface-studio"');
    expect(homePage).toContain('href: "/about"');
    expect(homePage).toContain('href: "/contact"');
    expect(homePage).not.toContain('className="scroll-chapter-nav"');
  });

  it("uses accessible proximity snapping and respects reduced-motion preferences", () => {
    expect(stylesheet).toContain("scroll-snap-type: y proximity;");
    expect(stylesheet).toContain(".scroll-chapter { scroll-margin-top: 0; scroll-snap-align: start;");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesheet).toContain("scroll-snap-type: none;");
    expect(stylesheet).not.toContain(".scroll-chapter-nav {");
  });
});
