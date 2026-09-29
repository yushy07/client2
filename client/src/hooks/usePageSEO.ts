import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export interface PageSEOMetadata {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
}

export const CANONICAL_BASE_URL = "https://jaymurtitraders.com";

export function usePageSEO({
  title,
  description,
  canonicalPath = "/",
  ogType = "website",
  ogImage = `${CANONICAL_BASE_URL}/storage/storefront/shopwide.jpeg`,
}: PageSEOMetadata) {
  useEffect(() => {
    // 0. Privacy-safe analytics pageview tracking
    trackPageView(canonicalPath, title);

    // 1. Title
    const previousTitle = document.title;
    document.title = title;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? "";
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      metaDesc.setAttribute("content", description);
      document.head.appendChild(metaDesc);
    }

    // 3. Canonical link
    const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${CANONICAL_BASE_URL}${cleanPath === "/" ? "/" : cleanPath}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalTag?.getAttribute("href") ?? "";
    if (canonicalTag) {
      canonicalTag.setAttribute("href", canonicalUrl);
    } else {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      canonicalTag.setAttribute("href", canonicalUrl);
      document.head.appendChild(canonicalTag);
    }

    // 4. Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);

    const ogTypeTag = document.querySelector('meta[property="og:type"]');
    if (ogTypeTag) ogTypeTag.setAttribute("content", ogType);

    const ogImgTag = document.querySelector('meta[property="og:image"]');
    if (ogImgTag && ogImage) ogImgTag.setAttribute("content", ogImage);

    // 5. Twitter Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (metaDesc && prevDesc) metaDesc.setAttribute("content", prevDesc);
      if (canonicalTag && prevCanonical) canonicalTag.setAttribute("href", prevCanonical);
    };
  }, [title, description, canonicalPath, ogType, ogImage]);
}
