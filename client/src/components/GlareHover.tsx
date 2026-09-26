import type { CSSProperties, ReactNode } from "react";

type GlareHoverProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
};

function toRgba(color: string, opacity: number) {
  const hex = color.replace("#", "").trim();
  const safeOpacity = Math.min(1, Math.max(0, opacity));

  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const red = Number.parseInt(hex.slice(0, 2), 16);
    const green = Number.parseInt(hex.slice(2, 4), 16);
    const blue = Number.parseInt(hex.slice(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${safeOpacity})`;
  }

  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const red = Number.parseInt(hex[0] + hex[0], 16);
    const green = Number.parseInt(hex[1] + hex[1], 16);
    const blue = Number.parseInt(hex[2] + hex[2], 16);
    return `rgba(${red}, ${green}, ${blue}, ${safeOpacity})`;
  }

  return color;
}

export default function GlareHover({
  children,
  className = "",
  style,
  glareColor = "#fff6de",
  glareOpacity = 0.22,
  glareAngle = -32,
  glareSize = 260,
  transitionDuration = 520,
  playOnce = false,
}: GlareHoverProps) {
  const glareStyle = {
    "--glare-color": toRgba(glareColor, glareOpacity),
    "--glare-angle": `${glareAngle}deg`,
    "--glare-size": `${glareSize}%`,
    "--glare-duration": `${transitionDuration}ms`,
    ...style,
  } as CSSProperties;

  return (
    <div className={`glare-hover${playOnce ? " glare-hover--play-once" : ""}${className ? ` ${className}` : ""}`} style={glareStyle}>
      {children}
    </div>
  );
}
