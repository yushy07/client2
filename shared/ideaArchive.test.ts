import { describe, expect, it } from "vitest";
import { ideaArchive } from "./ideaArchive";

describe("ideaArchive", () => {
  it("contains each validated, deduplicated Ideas record with a managed image URL", () => {
    expect(ideaArchive).toHaveLength(52);
    expect(new Set(ideaArchive.map((item) => item.name)).size).toBe(52);
    expect(ideaArchive.every((item) => item.imageUrl.startsWith("/storage/extracted/"))).toBe(true);
    expect(ideaArchive.every((item) => item.sourceUrl.startsWith("https://"))).toBe(true);
  });

  it("preserves exact CSV product names, including source whitespace and punctuation", () => {
    expect(ideaArchive[0]?.name).toBe("Personal Colour Testing: Colour Quiz | Birla Opus ");
    expect(ideaArchive.some((item) => item.name === "Beyond Blueprints With Gowri Adappa: On The Confluence Of South Indian Design And Contemporary Aesthetics")).toBe(true);
    expect(ideaArchive.some((item) => item.name === "Less is More\" in Mumbai: A home bathed in light and an interesting blend of textures\"")).toBe(true);
  });
});
