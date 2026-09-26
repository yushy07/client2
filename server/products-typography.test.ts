import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(resolve(import.meta.dirname, "../client/src/index.css"), "utf8");

describe("Products typography refinement", () => {
  it("increases supporting catalogue copy and controls without changing the display headline", () => {
    expect(stylesheet).toContain(".visual-catalogue-header .section-lead { font-size: 16px;");
    expect(stylesheet).toContain(".visual-catalogue-header .filter-pills button { font-size: 12px;");
    expect(stylesheet).toContain(".catalogue-summary { font-size: 12px;");
    expect(stylesheet).toContain(".catalogue-tools select { font-size: 13px;");
  });
});
