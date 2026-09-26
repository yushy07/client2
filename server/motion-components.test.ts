import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const glareComponent = readFileSync(resolve(projectRoot, "client/src/components/GlareHover.tsx"), "utf8");
const stackComponent = readFileSync(resolve(projectRoot, "client/src/components/ServiceScrollStack.tsx"), "utf8");

describe("scoped storefront motion components", () => {
  it("limits glare to Texture Studio rather than the product catalogue", () => {
    expect(homePage).toContain('import GlareHover from "@/components/GlareHover"');
    expect(homePage).toContain('<GlareHover className="texture-glare"');
    expect(homePage).not.toContain('className="product-glare"');
    expect(homePage).toContain("onPointerMove={handleProductTilt}");
  });

  it("keeps the complete three-step service journey inside an accessible stack", () => {
    expect(homePage).toContain('<ServiceScrollStack className="service-steps">');
    expect(homePage).toContain("01. The colour visit");
    expect(homePage).toContain("02. Product guidance");
    expect(homePage).toContain("03. Project finish");
    expect(stackComponent).toContain('role="list"');
    expect(stackComponent).toContain('role="listitem"');
    expect(stackComponent).not.toContain("Lenis");
  });

  it("provides coarse-pointer, mobile, and reduced-motion fallbacks", () => {
    expect(glareComponent).toContain("glare-hover");
    expect(stylesheet).toContain("pointer-events: none");
    expect(stylesheet).toContain("@media (hover: none), (pointer: coarse)");
    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)");
    expect(stylesheet).toContain(".service-scroll-stack-card { box-shadow: none; position: relative; top: auto; transform: none; }");
  });
});
