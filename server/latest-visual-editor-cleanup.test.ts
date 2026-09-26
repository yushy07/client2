import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("latest visual editor cleanup", () => {
  it("keeps compact layouts in classes and preserves live colour state styling", () => {
    expect(homePage).toContain('"--active-banner-shade": activeBannerShade.hex');
    expect(homePage).toContain("visual-coral-discovery");
    expect(homePage).toContain("visual-services-compact");
    expect(homePage).toContain("visual-footer-compact");
    expect(homePage).toContain("visual-ideas-compact");
    expect(homePage).toContain("visual-reviews-compact");
    expect(homePage).toContain("visual-review-summary-card");
    expect(homePage).not.toContain("style={{paddingTop:");
    expect(homePage).not.toContain("marginTop: '-76px'");
    expect(stylesheet).toContain(".visual-coral-discovery { background: #ea8b94;");
    expect(stylesheet).toContain(".visual-ideas-visit-compact { border-radius: 16px;");
    expect(stylesheet).toContain(".visual-ideas-compact { padding-bottom: 39px;");
    expect(stylesheet).toContain(".visual-review-summary-card { box-shadow:");
  });
});
