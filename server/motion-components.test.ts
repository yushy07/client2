import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const glareComponent = readFileSync(resolve(projectRoot, "client/src/components/GlareHover.tsx"), "utf8");
const stackComponent = readFileSync(resolve(projectRoot, "client/src/components/ServiceScrollStack.tsx"), "utf8");

describe("scoped storefront motion components", () => {
  it("provides GlareHover for tactile texture elements", () => {
    expect(glareComponent).toContain("glare-hover");
    expect(glareComponent).not.toContain('className="product-glare"');
  });

  it("keeps the complete three-step service journey inside an accessible stack", () => {
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
