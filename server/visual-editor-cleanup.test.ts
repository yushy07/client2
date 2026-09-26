import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("visual editor refinement cleanup", () => {
  it("uses stable refinement classes instead of malformed literal inline editor styles", () => {
    expect(homePage).toContain("visual-colours-refinement");
    expect(homePage).toContain("visual-catalogue-refinement");
    expect(homePage).toContain("visual-texture-refinement");
    expect(homePage).toContain("visual-finder-refinement");
    expect(homePage).toContain("visual-faq-refinement");
    expect(homePage).not.toContain("style={{marginTop:");
    expect(stylesheet).toContain(".visual-archive-hero { border: 8px solid #f3dddd;");
    expect(stylesheet).toContain(".visual-catalogue-header { background: rgba(255,250,250,.94);");
  });
});
