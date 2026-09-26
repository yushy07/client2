import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
const robots = readFileSync(resolve(projectRoot, "client/public/robots.txt"), "utf8");
const sitemap = readFileSync(resolve(projectRoot, "client/public/sitemap.xml"), "utf8");
const manifest = readFileSync(resolve(projectRoot, "client/public/site.webmanifest"), "utf8");

describe("SEO foundation", () => {
  it("declares a crawlable canonical homepage and social metadata", () => {
    expect(html).toContain("<title>Jaymurti Traders | Birla Opus Paints in Baskhari</title>");
    expect(html).toContain('name="description"');
    expect(html).toContain('name="robots" content="index, follow');
    expect(html).toContain('rel="canonical" href="https://kumarhardware.vercel.app/"');
    expect(html).toContain('property="og:image"');
  });

  it("publishes local business structured data with consistent contact details", () => {
    expect(html).toContain('"@type": ["LocalBusiness", "Store", "PaintStore"]');
    expect(html).toContain('"name": "Jaymurti Traders"');
    expect(html).toContain('"telephone": "+918756659035"');
    expect(html).toContain('"postalCode": "224129"');
  });

  it("publishes valid crawl entry points", () => {
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Sitemap: https://kumarhardware.vercel.app/sitemap.xml");
    expect(sitemap).toContain("<urlset");
    expect(sitemap).toContain("<loc>https://kumarhardware.vercel.app/</loc>");
    expect(sitemap).toContain("<loc>https://kumarhardware.vercel.app/privacy</loc>");
    expect(manifest).toContain('"start_url": "/"');
  });
});
