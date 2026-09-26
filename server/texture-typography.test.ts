import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(resolve(import.meta.dirname, "../client/src/index.css"), "utf8");

describe("Texture Studio typography refinement", () => {
  it("increases supporting Texture Studio copy and controls without changing the display headline selector", () => {
    expect(stylesheet).toContain(".visual-texture-refinement .section-lead { font-size: 16px;");
    expect(stylesheet).toContain(".visual-texture-refinement .texture-studio-note strong { font-size: 40px;");
    expect(stylesheet).toContain(".visual-texture-refinement .texture-tabs button { font-size: 12px;");
    expect(stylesheet).toContain(".visual-texture-refinement .texture-selection-heading > p { font-size: 11px;");
  });
});
