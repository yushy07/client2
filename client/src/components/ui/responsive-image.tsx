import React from "react";

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  mobileSrc?: string;
  alt: string;
  className?: string;
  breakpoint?: number;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * ResponsiveImage renders a semantic <picture> element delivering a lightweight
 * -mobile.webp source for mobile viewports (<= 640px) and full WebP for desktop screens.
 */
// Cache buster version string to ensure mobile browsers immediately fetch updated upright image buffers
const ASSET_VERSION = "v=20260929v2";

export function ResponsiveImage({
  src,
  mobileSrc,
  alt,
  className = "",
  breakpoint = 640,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
  style,
  ...rest
}: ResponsiveImageProps) {
  // If src is a /storage/*.webp asset and no explicit mobileSrc is given,
  // derive the -mobile.webp sibling path.
  const resolvedMobileSrc =
    mobileSrc ||
    (typeof src === "string" && src.startsWith("/storage/") && src.endsWith(".webp") && !src.endsWith("-mobile.webp")
      ? src.replace(/\.webp$/i, "-mobile.webp")
      : undefined);

  const withVersion = (url?: string) => {
    if (!url) return undefined;
    if (url.includes("?")) return url;
    return `${url}?${ASSET_VERSION}`;
  };

  const versionedMobileSrc = withVersion(resolvedMobileSrc);
  const versionedSrc = withVersion(src);

  return (
    <picture className="contents">
      {versionedMobileSrc && (
        <source media={`(max-width: ${breakpoint}px)`} srcSet={versionedMobileSrc} type="image/webp" />
      )}
      {versionedSrc && src.endsWith(".webp") && <source srcSet={versionedSrc} type="image/webp" />}
      <img
        src={versionedSrc || src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        style={style}
        {...rest}
      />
    </picture>
  );
}
