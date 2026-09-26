import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const appFile = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const privacyPage = readFileSync(resolve(projectRoot, "client/src/pages/Privacy.tsx"), "utf8");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const sitemap = readFileSync(resolve(projectRoot, "client/public/sitemap.xml"), "utf8");
const vercelConfig = JSON.parse(readFileSync(resolve(projectRoot, "vercel.json"), "utf8"));
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

describe("Moving archive ticker loop & motion", () => {
  it("uses a relaxed 200-second drift loop with pause on hover/focus and reduced motion support", () => {
    expect(stylesheet).toContain("animation: archive-ticker-drift 200s linear infinite;");
    expect(stylesheet).toContain(".colour-archive-ticker:hover .colour-archive-ticker-track");
    expect(stylesheet).toContain(".colour-archive-ticker:focus-within .colour-archive-ticker-track");
    expect(stylesheet).toContain("animation-play-state: paused;");
    expect(stylesheet).toContain(".colour-archive-ticker-track { animation: none; }");
  });
});

describe("Privacy policy page and routing", () => {
  it("registers the /privacy route in App.tsx", () => {
    expect(appFile).toContain('import Privacy from "./pages/Privacy"');
    expect(appFile).toMatch(/<Route\s+path=\{"\/privacy"\}\s+component=\{Privacy\}\s*\/>/);
  });

  it("contains all required legal and informational sections with Jaymurti Traders details", () => {
    expect(privacyPage).toContain("Privacy Policy");
    expect(privacyPage).toContain("Last updated: 19 August 2026");
    expect(privacyPage).toContain("Information We Collect");
    expect(privacyPage).toContain("Consultation Forms");
    expect(privacyPage).toContain("Contact Forms");
    expect(privacyPage).toContain("Review Submissions");
    expect(privacyPage).toContain("Newsletter");
    expect(privacyPage).toContain("How We Use Your Information");
    expect(privacyPage).toContain("Cookies and Local Analytics");
    expect(privacyPage).toContain("Google Analytics");
    expect(privacyPage).toContain("Google Maps");
    expect(privacyPage).toContain("Instagram");
    expect(privacyPage).toContain("WhatsApp");
    expect(privacyPage).toContain("Birla Opus");
    expect(privacyPage).toContain("Data Retention and Security");
    expect(privacyPage).toContain("Your Rights and Choices");
    expect(privacyPage).toContain("Contact Us");
    expect(privacyPage).toContain("Back to showroom");
  });

  it("includes dynamic SEO title, description, and canonical link", () => {
    expect(privacyPage).toContain("Privacy Policy | Jaymurti Traders");
    expect(privacyPage).toContain("https://kumarhardware.vercel.app/privacy");
    expect(privacyPage).toContain('document.querySelector(\'meta[name="description"]\')');
    expect(privacyPage).toContain('document.querySelector(\'link[rel="canonical"]\')');
  });

  it("provides visible privacy links in the website footer", () => {
    expect(homePage).toContain('href="/privacy"');
    expect(homePage).toContain("Privacy Policy");
  });

  it("declares the privacy canonical URL in sitemap.xml without UI anchors", () => {
    expect(sitemap).toContain("<loc>https://kumarhardware.vercel.app/</loc>");
    expect(sitemap).toContain("<loc>https://kumarhardware.vercel.app/privacy</loc>");
    expect(sitemap).not.toContain("#products");
    expect(sitemap).not.toContain("#reviews");
  });

  it("preserves Vercel SPA routing fallback and API rewrites", () => {
    const rewrites = vercelConfig.rewrites as Array<{ source: string; destination: string }>;
    expect(rewrites).toBeDefined();
    expect(rewrites.some((r) => r.source === "/api/trpc/(.*)" && r.destination === "/api")).toBe(true);
    expect(rewrites.some((r) => r.source === "/(.*)" && r.destination === "/index.html")).toBe(true);
  });
});
