import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
const businessProfileCode = readFileSync(resolve(projectRoot, "shared/businessProfile.ts"), "utf8");

describe("automatic shop reviews UI and Google profile integration", () => {
  it("places the automatic star-rated review section with the official Google Business Profile link", () => {
    expect(homePage).toContain('id="reviews"');
    expect(homePage).toContain("https://share.google/");
    expect(businessProfileCode).toContain("https://share.google/");
    expect(homePage).toContain('target="_blank"');
    expect(homePage).toContain('rel="noopener noreferrer"');
    expect(homePage).toContain("Review us on Google");
    expect(homePage).toContain("Google Business Profile");
    expect(homePage).not.toContain("Submit for approval");
    expect(homePage).not.toContain("Pending review approval");
    expect(homePage).not.toContain('user?.role === "admin"');
  });

  it("keeps website reviews independent with clear source attribution", () => {
    expect(homePage).toContain("review-source-tag");
    expect(stylesheet).toContain(".shop-reviews { background:");
    expect(stylesheet).toContain(".review-source-tag");
  });
});

