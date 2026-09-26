import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("sectioned storefront scrolling", () => {
  it("defines major scroll chapters and observes the visitor's active section", () => {
    expect(homePage).toContain("const scrollSections = [");
    expect(homePage).toContain('id: "colours", label: "Colours"');
    expect(homePage).toContain('id: "products", label: "Products"');
    expect(homePage).toContain('id: "textures", label: "Textures"');
    expect(homePage).toContain('id: "finder", label: "Visit"');
    expect(homePage).toContain('id: "reviews", label: "Reviews"');
    expect(homePage).toContain("setActiveScrollSection");
    expect(homePage).toContain("IntersectionObserver");
    expect(homePage).toContain("scrollToHashTarget");
    expect(homePage).toContain('window.addEventListener("hashchange", scrollToHashTarget)');
    expect(homePage).not.toContain('className="scroll-chapter-nav"');
    expect(homePage).not.toContain('className="nav-actions"');
  });

  it("uses accessible proximity snapping and respects reduced-motion preferences", () => {
    expect(stylesheet).toContain("scroll-snap-type: y proximity;");
    expect(stylesheet).toContain(".scroll-chapter { scroll-margin-top: 0; scroll-snap-align: start;");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesheet).toContain("scroll-snap-type: none;");
    expect(stylesheet).not.toContain(".scroll-chapter-nav {");
  });
});
