import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(resolve(import.meta.dirname, "../client/src/index.css"), "utf8");

describe("section surface treatments", () => {
  it("gives every primary discovery chapter a distinct colour or gradient surface", () => {
    expect(stylesheet).toContain(".business-profile { background: linear-gradient");
    expect(stylesheet).toContain(".colours { background: linear-gradient");
    expect(stylesheet).toContain(".catalogue { background: linear-gradient");
    expect(stylesheet).toContain(".texture-studio { background: linear-gradient");
    expect(stylesheet).toContain(".calculator { background: linear-gradient");
    expect(stylesheet).toContain(".services { background: linear-gradient");
    expect(stylesheet).toContain(".finder { background: linear-gradient");
    expect(stylesheet).toContain(".ideas { background: linear-gradient");
    expect(stylesheet).toContain(".faq { background: linear-gradient");
  });
});
