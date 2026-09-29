import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { SITE_ROUTES_SEO } from "../shared/seoKeywordMap";

const projectRoot = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
const robots = readFileSync(resolve(projectRoot, "client/public/robots.txt"), "utf8");
const sitemap = readFileSync(resolve(projectRoot, "client/public/sitemap.xml"), "utf8");
const manifest = readFileSync(resolve(projectRoot, "client/public/site.webmanifest"), "utf8");
const llmsPath = resolve(projectRoot, "client/public/llms.txt");

describe("SEO foundation", () => {
  it("declares a crawlable canonical homepage and social metadata", () => {
    expect(html).toContain("<title>Jaymurti Traders | Birla Opus Paints in Baskhari, Ambedkar Nagar</title>");
    expect(html).toContain('name="description"');
    expect(html).toContain('name="robots" content="index, follow');
    expect(html).toContain('rel="canonical" href="https://jaymurtitraders.com/"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('property="og:url" content="https://jaymurtitraders.com/"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
  });

  it("publishes local business structured data with consistent contact details", () => {
    expect(html).toContain('"@type": ["LocalBusiness", "Store", "PaintStore"]');
    expect(html).toContain('"name": "Jaymurti Traders"');
    expect(html).toContain('"telephone": "+918756659035"');
    expect(html).toContain('"postalCode": "224129"');
    expect(html).toContain('"addressLocality": "Ambedkar Nagar"');
    expect(html).toContain('"streetAddress": "Shukul Bazar, Baskhari"');
  });

  it("publishes valid crawl entry points and all category sitemaps", () => {
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Disallow: /api/");
    expect(robots).toContain("Sitemap: https://jaymurtitraders.com/sitemap.xml");
    expect(sitemap).toContain("<urlset");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/paint-products</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/interior-paints</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/exterior-paints</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/waterproofing</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/colour-finder</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/room-inspiration</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/surface-studio</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/about</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/contact</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/privacy</loc>");
    expect(sitemap).toContain("<loc>https://jaymurtitraders.com/terms</loc>");
    expect(manifest).toContain('"start_url": "/"');
  });

  it("provides llms.txt for factual AI discoverability", () => {
    expect(existsSync(llmsPath)).toBe(true);
    const llms = readFileSync(llmsPath, "utf8");
    expect(llms).toContain("Jaymurti Traders");
    expect(llms).toContain("Shukul Bazar, Baskhari");
    expect(llms).toContain("87566 59035");
    expect(llms).toContain("/paint-products");
    expect(llms).toContain("/colour-finder");
  });

  it("defines unique, structured SEO metadata for all routes", () => {
    const routeKeys = Object.keys(SITE_ROUTES_SEO);
    expect(routeKeys.length).toBeGreaterThanOrEqual(15);
    routeKeys.forEach((key) => {
      const config = SITE_ROUTES_SEO[key];
      expect(config.title).toBeTruthy();
      expect(config.description).toBeTruthy();
      expect(config.h1).toBeTruthy();
      expect(config.breadcrumb.length).toBeGreaterThanOrEqual(1);
    });
  });
});
