import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { CANONICAL_HOST, SITE_ROUTES_SEO, type RouteSEOConfig } from "../shared/seoKeywordMap";

const output = path.resolve("dist/public");
const template = await readFile(path.join(output, "index.html"), "utf8");
const socialImage = `${CANONICAL_HOST}/storage/storefront/shopwide.jpeg`;

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]!);

function renderContent(route: RouteSEOConfig): string {
  const breadcrumbs = route.breadcrumb.map(item => `<a href="${escapeHtml(item.path)}">${escapeHtml(item.name)}</a>`).join(" › ");
  const topics = [...route.primaryKeywords, ...route.supportingKeywords].map(item => `<li>${escapeHtml(item)}</li>`).join("");
  const faq = route.faq.map(item => `<section><h2>${escapeHtml(item.question)}</h2><p>${escapeHtml(item.answer)}</p></section>`).join("");
  return `<main data-prerendered-content><nav aria-label="Breadcrumb">${breadcrumbs}</nav><p>${escapeHtml(route.eyebrow)}</p><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.description)}</p><h2>Explore this page</h2><ul>${topics}</ul>${faq}</main>`;
}

function withMetadata(base: string, route: RouteSEOConfig, robots = "index, follow, max-image-preview:large") {
  const canonical = `${CANONICAL_HOST}${route.path === "/" ? "/" : route.path}`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: route.title,
    description: route.description,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "Jaymurti Traders", url: `${CANONICAL_HOST}/` },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: route.breadcrumb.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${CANONICAL_HOST}${item.path}` })) },
  }).replace(/</g, "\\u003c");
  return base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${robots}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`)
    .replace("</head>", `<script type="application/ld+json">${jsonLd}</script></head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderContent(route)}</div>`);
}

for (const route of Object.values(SITE_ROUTES_SEO)) {
  if (route.path === "/404") continue;
  const destination = route.path === "/" ? path.join(output, "index.html") : path.join(output, route.path.slice(1), "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, withMetadata(template, route), "utf8");
}

const notFound = SITE_ROUTES_SEO["/404"];
await writeFile(path.join(output, "404.html"), withMetadata(template, notFound, "noindex, nofollow"), "utf8");
await mkdir(path.join(output, "admin/reviews"), { recursive: true });
await writeFile(path.join(output, "admin/reviews/index.html"), withMetadata(template, {
  ...notFound,
  path: "/admin/reviews",
  title: "Review Administration | Jaymurti Traders",
  description: "Private review administration area.",
  h1: "Review Administration",
  eyebrow: "Private area",
}, "noindex, nofollow, noarchive"), "utf8");

console.log(`Prerendered ${Object.keys(SITE_ROUTES_SEO).length - 1} public routes, private admin, and 404 HTML.`);
