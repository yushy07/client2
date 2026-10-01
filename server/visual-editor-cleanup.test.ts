import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const clientFiles = [
  resolve(projectRoot, "client/src/pages/Home.tsx"),
  resolve(projectRoot, "client/src/components/home/HomeProductsPreview.tsx"),
  resolve(projectRoot, "client/src/components/home/HomeColoursPreview.tsx"),
  resolve(projectRoot, "client/src/pages/SurfaceStudioPage.tsx"),
  resolve(projectRoot, "client/src/pages/CategoryPage.tsx"),
];
const clientCode = clientFiles.map((f) => readFileSync(f, "utf8")).join("\n");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("visual editor refinement cleanup", () => {
  it("uses stable refinement classes instead of malformed literal inline editor styles", () => {
    expect(clientCode).toContain("visual-colours-refinement");
    expect(clientCode).toContain("visual-catalogue-refinement");
    expect(clientCode).toContain("visual-texture-refinement");
    expect(clientCode).toContain("visual-finder-refinement");
    expect(clientCode).not.toContain("style={{marginTop:");
    expect(stylesheet).toContain(".visual-archive-hero");
    expect(stylesheet).toContain(".visual-catalogue-header");
  });
});
