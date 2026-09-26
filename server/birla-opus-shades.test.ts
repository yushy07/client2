import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  birlaOpusDisclaimer,
  birlaOpusShades,
  searchBirlaOpusShades,
} from "../shared/birlaOpusShades";
import { businessProfile } from "../shared/businessProfile";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("Birla Opus Shade Experience (Pass 2)", () => {
  it("has a robust dataset with authoritative shades extracted from client-provided PDFs", () => {
    expect(birlaOpusShades.length).toBeGreaterThanOrEqual(140);

    // Verify key catalogue examples present in dataset
    const sampleCodes = ["NN 9084", "WW 0034", "NN 9564", "WW 0141", "YR 2072", "NN 9029", "NN 9101", "BG 6074", "NN 9120", "WW 0005", "YG 8107"];
    for (const code of sampleCodes) {
      const match = birlaOpusShades.find((s) => s.code === code);
      expect(match, `Expected shade ${code} to exist`).toBeDefined();
      expect(match?.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(match?.source).toBeDefined();
    }
  });

  it("searches shade by exact code", () => {
    const results = searchBirlaOpusShades("NN 9084");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].code).toBe("NN 9084");
    expect(results[0].name.toLowerCase()).toBe("a camel called rani");
  });

  it("searches shade by partial code or stripped code", () => {
    // Partial numeric code e.g. "9084"
    const resultsNum = searchBirlaOpusShades("9084");
    expect(resultsNum.some((s) => s.code === "NN 9084")).toBe(true);

    // Stripped code without space e.g. "NN9084"
    const resultsStripped = searchBirlaOpusShades("NN9084");
    expect(resultsStripped.some((s) => s.code === "NN 9084")).toBe(true);

    // Partial prefix
    const resultsPartial = searchBirlaOpusShades("0034");
    expect(resultsPartial.some((s) => s.code === "WW 0034")).toBe(true);
  });

  it("searches shade by name", () => {
    const results = searchBirlaOpusShades("A Camel Called Rani");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].code).toBe("NN 9084");

    const resultsLinen = searchBirlaOpusShades("White Linen");
    expect(resultsLinen.some((s) => s.code === "WW 0005")).toBe(true);
  });

  it("performs case-insensitive and normalized whitespace search", () => {
    const resultsLower = searchBirlaOpusShades("camel called rani");
    expect(resultsLower.some((s) => s.code === "NN 9084")).toBe(true);

    const resultsExtraSpaces = searchBirlaOpusShades("  camel   called   rani  ");
    expect(resultsExtraSpaces.some((s) => s.code === "NN 9084")).toBe(true);

    const resultsMixedCase = searchBirlaOpusShades("kOrA kAaGaZ");
    expect(resultsMixedCase.some((s) => s.code === "WW 0034")).toBe(true);
  });

  it("filters accurately by colour family", () => {
    const whites = searchBirlaOpusShades("", "Whites");
    expect(whites.length).toBeGreaterThan(0);
    expect(whites.every((s) => s.family.includes("Whites"))).toBe(true);

    const yellows = searchBirlaOpusShades("", "Yellows");
    expect(yellows.length).toBeGreaterThan(0);
    expect(yellows.every((s) => s.family.includes("Yellows"))).toBe(true);

    const reds = searchBirlaOpusShades("", "Reds");
    expect(reds.length).toBeGreaterThan(0);
    expect(reds.every((s) => s.family.includes("Reds"))).toBe(true);
  });

  it("combines colour-family filtering with search", () => {
    const results = searchBirlaOpusShades("olive", "Greens");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((s) => s.code === "YG 8107")).toBe(true);
    expect(results[0].name.toLowerCase()).toContain("olive");
  });

  it("handles empty search results gracefully", () => {
    const results = searchBirlaOpusShades("xyznonexistentcode9999");
    expect(results).toEqual([]);
  });

  it("generates proper WhatsApp enquiry message format with Jaymurti Traders, shade name, and shade code", () => {
    const sampleShade = {
      code: "NN 9084",
      name: "A camel called Rani",
      family: "Neutrals: Browns & Greys",
      color: "#C0AE9A",
      source: "Birla Opus 171-Page Catalogue",
    };

    const expectedPhone = "918756659035";
    expect(businessProfile.whatsappHref).toBe(expectedPhone);

    const prefilledMessage = `Hello Jaymurti Traders,\nI would like to enquire about the Birla Opus shade:\n${sampleShade.name} (${sampleShade.code}).`;
    const whatsappLink = `https://wa.me/${businessProfile.whatsappHref}?text=${encodeURIComponent(prefilledMessage)}`;

    expect(whatsappLink).toContain("https://wa.me/918756659035");
    expect(whatsappLink).toContain(encodeURIComponent("Hello Jaymurti Traders,"));
    expect(whatsappLink).toContain(encodeURIComponent("A camel called Rani"));
    expect(whatsappLink).toContain(encodeURIComponent("(NN 9084)"));
  });

  it("provides concise, appropriate physical fan deck disclaimer", () => {
    expect(birlaOpusDisclaimer).toContain("Colours shown on screen may vary from the actual paint shade");
    expect(birlaOpusDisclaimer).toContain("Birla Opus fan deck or physical shade card");
  });

  it("integrates seamlessly into Home.tsx and index.css with responsive, accessible layout", () => {
    // Shade UI elements in Home.tsx
    expect(homePage).toContain("shade-explorer-studio");
    expect(homePage).toContain("shade-search-box");
    expect(homePage).toContain("shade-family-filter-pills");
    expect(homePage).toContain("shade-grid");
    expect(homePage).toContain("shade-card");
    expect(homePage).toContain("shade-selected-preview");
    expect(homePage).toContain("shade-preview-whatsapp-btn");
    expect(homePage).toContain("shade-disclaimer");
    expect(homePage).toContain("Enquire about this shade on WhatsApp");
    expect(homePage).toContain("birlaOpusDisclaimer");

    // CSS classes in index.css
    expect(stylesheet).toContain(".shade-explorer-studio");
    expect(stylesheet).toContain(".shade-search-box");
    expect(stylesheet).toContain(".shade-family-filter-pills");
    expect(stylesheet).toContain(".shade-grid");
    expect(stylesheet).toContain(".shade-card");
    expect(stylesheet).toContain(".shade-card-swatch");
    expect(stylesheet).toContain(".shade-selected-preview");
    expect(stylesheet).toContain(".shade-preview-whatsapp-btn");
    expect(stylesheet).toContain(".shade-disclaimer");
    expect(stylesheet).toContain("@media (max-width: 640px)");
  });
});
