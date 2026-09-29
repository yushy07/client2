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

  return (
    <picture className="contents">
      {resolvedMobileSrc && (
        <source media={`(max-width: ${breakpoint}px)`} srcSet={resolvedMobileSrc} type="image/webp" />
      )}
      {src && src.endsWith(".webp") && <source srcSet={src} type="image/webp" />}
      <img
        src={src}
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
