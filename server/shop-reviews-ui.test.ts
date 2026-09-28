import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const businessProfileCode = readFileSync(resolve(projectRoot, "shared/businessProfile.ts"), "utf8");

describe("automatic shop reviews UI and Google profile integration", () => {
  it("places the automatic star-rated review section above FAQ with the exact official Google Business Profile link", () => {
    expect(homePage).toContain('id="reviews"');
    expect(homePage.indexOf('id="reviews"')).toBeLessThan(homePage.indexOf('id="faq"'));
    expect(homePage).toContain("https://share.google/gRc5IXyeEJe85BzRg");
    expect(businessProfileCode).toContain("https://share.google/gRc5IXyeEJe85BzRg");
    expect(homePage).toContain('target="_blank"');
    expect(homePage).toContain('rel="noopener noreferrer"');
    expect(homePage).toContain("Review us on Google");
    expect(homePage).toContain("Google Business Profile");
    expect(homePage).toContain("Reviews rated 3 stars or higher appear here automatically.");
    expect(homePage).toContain("Your feedback has been submitted successfully.");
    expect(homePage).toContain("Your review is now visible in the shop reviews.");
    expect(homePage).toContain("Submit review");
    expect(homePage).not.toContain("Submit for approval");
    expect(homePage).not.toContain("Pending review approval");
    expect(homePage).not.toContain('user?.role === "admin"');
  });

  it("keeps website reviews independent with clear source attribution and post-submission optional Google CTA", () => {
    expect(homePage).toContain("Website review");
    expect(homePage).toContain("Would you like to share it on Google too?");
    expect(homePage).toContain("button-google-share");
    expect(stylesheet).toContain(".shop-reviews { background:");
    expect(stylesheet).toContain(".review-rating button");
    expect(stylesheet).toContain(".review-google-prompt");
    expect(stylesheet).toContain(".review-source-tag");
    expect(stylesheet).toContain(".button-google-share");
  });
});

