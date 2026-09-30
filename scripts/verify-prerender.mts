import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { CANONICAL_HOST, SITE_ROUTES_SEO } from "../shared/seoKeywordMap";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

for (const route of Object.values(SITE_ROUTES_SEO)) {
  const file = route.path === "/404" ? "404.html" : route.path === "/" ? "index.html" : `${route.path.slice(1)}/index.html`;
  await stat(path.resolve("dist/public", file));
  const html = await readFile(path.resolve("dist/public", file), "utf8");
  const canonical = `${CANONICAL_HOST}${route.path === "/" ? "/" : route.path}`;
  if (!html.includes(`<title>${escapeHtml(route.title)}</title>`) || !html.includes(`href="${canonical}"`) || !html.includes(`<h1>${escapeHtml(route.h1)}</h1>`)) {
    throw new Error(`Invalid prerender output for ${route.path}`);
  }
}
console.log("Verified route-specific metadata and crawlable content for all public outputs.");
