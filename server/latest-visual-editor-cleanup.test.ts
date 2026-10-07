import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const coloursPreview = readFileSync(resolve(projectRoot, "client/src/components/home/HomeColoursPreview.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("latest visual editor cleanup", () => {
  it("keeps compact layouts in classes and preserves live colour state styling", () => {
    expect(coloursPreview).toContain('"--active-banner-shade": activeShade.hex');
    expect(homePage).toContain("visual-footer-compact");
    expect(homePage).toContain("visual-reviews-compact");
    expect(homePage).toContain("googleBusinessProfileUrl");
    expect(homePage).toContain("Share your feedback on our Google Business Profile");
    expect(homePage).toContain("View us on Google");
    expect(homePage).not.toContain("visual-review-summary-card");
    expect(homePage).not.toContain("style={{paddingTop:");
    expect(homePage).not.toContain("marginTop: '-76px'");
    expect(stylesheet).toContain(".visual-coral-discovery");
    expect(stylesheet).toContain(".visual-ideas-visit-compact");
    expect(stylesheet).toContain(".visual-ideas-compact");
    expect(stylesheet).toContain(".visual-reviews-compact");
  });
});
