import { describe, it, expect } from "vitest";
import {
  VERIFIED_BIRLA_OPUS_SHADES,
  COLOUR_FAMILIES,
  validateShadeDataset,
  filterVerifiedShades,
  SHADE_VARIATION_DISCLAIMER
} from "./verifiedBirlaOpusShades";

describe("Verified Birla Opus Shades Canonical Dataset", () => {
  it("contains exactly 159 shades", () => {
    expect(VERIFIED_BIRLA_OPUS_SHADES).toHaveLength(159);
  });

  it("contains exactly 10 colour families with exact canonical names", () => {
    expect(COLOUR_FAMILIES).toHaveLength(10);
    expect(COLOUR_FAMILIES).toEqual([
      "Whites",
      "Neutrals",
      "Oranges",
      "Yellows",
      "Yellow-Greens",
      "Greens",
      "Blue-Greens",
      "Blues",
      "Purples",
      "Reds"
    ]);

    // Check every shade belongs to one of the 10 families
    for (const shade of VERIFIED_BIRLA_OPUS_SHADES) {
      expect(COLOUR_FAMILIES).toContain(shade.family);
    }
  });

  it("contains exactly 15 shades in the Purples family", () => {
    const purples = VERIFIED_BIRLA_OPUS_SHADES.filter((s) => s.family === "Purples");
    expect(purples).toHaveLength(15);
  });

  it("passes strict dataset validation without errors", () => {
    const report = validateShadeDataset(VERIFIED_BIRLA_OPUS_SHADES);
    expect(report.isValid).toBe(true);
    expect(report.errors).toHaveLength(0);
    expect(report.totalCount).toBe(159);
    expect(report.purpleCount).toBe(15);
  });

  it("ensures all shade codes and ids are unique", () => {
    const ids = new Set(VERIFIED_BIRLA_OPUS_SHADES.map((s) => s.id));
    const codes = new Set(VERIFIED_BIRLA_OPUS_SHADES.map((s) => s.code));
    expect(ids.size).toBe(159);
    expect(codes.size).toBe(159);
  });

  it("has the mandatory colour variation disclaimer text", () => {
    expect(SHADE_VARIATION_DISCLAIMER).toBe(
      "Colours shown digitally may vary slightly from the actual paint shade. Please confirm against the physical fan deck."
    );
  });
});

describe("Shade Filtering and Search", () => {
  it("searches case-insensitively by shade name", () => {
    const lower = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, { searchQuery: "holy basil" });
    const upper = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, { searchQuery: "HOLY BASIL" });
    const mixed = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, { searchQuery: "Holy Basil" });

    expect(lower.length).toBeGreaterThanOrEqual(1);
    expect(lower[0]?.code).toBe("PP 4150");
    expect(upper).toEqual(lower);
    expect(mixed).toEqual(lower);
  });

  it("searches case-insensitively by shade code", () => {
    const results = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, { searchQuery: "PP 4149" });
    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe("Wish In The Breeze");

    const partial = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, { searchQuery: "4149" });
    expect(partial.some((s) => s.code === "PP 4149")).toBe(true);
  });

  it("filters correctly by colour family", () => {
    const purples = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, { family: "Purples" });
    expect(purples).toHaveLength(15);
    purples.forEach((s) => expect(s.family).toBe("Purples"));

    const whites = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, { family: "Whites" });
    expect(whites.length).toBeGreaterThan(0);
    whites.forEach((s) => expect(s.family).toBe("Whites"));
  });

  it("combines search and family filtering correctly", () => {
    const results = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, {
      family: "Purples",
      searchQuery: "tuscany"
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.code).toBe("PP 4079");
    expect(results[0]?.name).toBe("Touring Tuscany");

    const nonMatching = filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, {
      family: "Whites",
      searchQuery: "Touring Tuscany"
    });
    expect(nonMatching).toHaveLength(0);
  });
});
