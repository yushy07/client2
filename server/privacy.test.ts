import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const appFile = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const privacyPage = readFileSync(resolve(projectRoot, "client/src/pages/Privacy.tsx"), "utf8");
const homePage = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const sitemap = readFileSync(resolve(projectRoot, "client/public/sitemap.xml"), "utf8");
const stylesheet = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");
// The Node server is the deployment target; it serves the prerendered route map.
const serverEntry = readFileSync(resolve(projectRoot, "server/_core/index.ts"), "utf8");
const staticServer = readFileSync(resolve(projectRoot, "server/_core/vite.ts"), "utf8");
const seoRoutes = readFileSync(resolve(projectRoot, "shared/seoKeywordMap.ts"), "utf8");

describe("Moving archive ticker loop & motion", () => {
  it("uses smooth ticker transform and pause controls", () => {
    expect(stylesheet).toContain(".colour-archive-ticker");
    expect(stylesheet).toContain(".colour-archive-ticker-track");
    expect(stylesheet).toContain("will-change: transform");
  });
});

describe("Privacy policy page and routing", () => {
  it("registers the /privacy route in App.tsx", () => {
    expect(appFile).toContain('import("./pages/Privacy")');
    expect(appFile).toContain('path="/privacy"');
  });

  it("contains all required legal and informational sections with Jaymurti Traders details", () => {
    expect(privacyPage).toContain("Privacy Policy");
    expect(privacyPage).toContain("Jaymurti Traders");
    expect(privacyPage).toContain("Information We Collect");
    expect(privacyPage).toContain("WhatsApp");
    expect(privacyPage).toContain("Google Maps");
    expect(privacyPage).toContain("Instagram");
    expect(privacyPage).toContain("Data Retention");
    expect(privacyPage).toContain("Data Security");
    expect(privacyPage).toContain("Back to showroom");
  });

  it("includes dynamic SEO title, description, and canonical link", () => {
    expect(privacyPage).toContain("Privacy Policy | Jaymurti Traders");
    expect(privacyPage).toContain("usePageSEO");
    expect(privacyPage).toContain('canonicalPath: "/privacy"');
  });

  it("provides visible privacy links in the website footer", () => {
    expect(homePage).toContain('href="/privacy"');
    expect(homePage).toContain("Privacy Policy");
  });

  it("declares the privacy canonical URL in sitemap.xml without UI anchors", () => {
    expect(sitemap).toContain("<loc>https://jaymurtitraders.vercel.app/</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.vercel.app/privacy</loc>");
    expect(sitemap).not.toContain("#products");
    expect(sitemap).not.toContain("#reviews");
  });

  it("serves the privacy route from the Node server's prerendered route map", () => {
    expect(serverEntry).toContain('app.get("/api/health", handler)');
    expect(serverEntry).not.toContain("createExpressMiddleware");
    expect(serverEntry).toContain("registerStorageProxy");
    expect(privacyPage).toContain("does not store the details you enter in a database or browser storage");
    expect(appFile).not.toContain("AdminReviewsPage");
    // Prerendered HTML is resolved through the frozen route map rather than by
    // joining request paths onto the filesystem.
    expect(staticServer).toContain("STATIC_ROUTE_FILES");
    expect(staticServer).toContain("404.html");
    expect(seoRoutes).toContain('path: "/privacy"');
  });
});
