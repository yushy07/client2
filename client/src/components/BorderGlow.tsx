import { type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode, useCallback, useEffect, useRef } from "react";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  animated?: boolean;
};

export default function BorderGlow({ children, className = "", animated = false }: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType === "touch") return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const edge = Math.min(x, y, rect.width - x, rect.height - y);
    const proximity = Math.max(0, Math.min(100, 100 - (edge / Math.min(rect.width, rect.height)) * 260));
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI) + 90;
    card.style.setProperty("--edge-proximity", `${proximity}`);
    card.style.setProperty("--cursor-angle", `${angle}deg`);
  }, []);

  useEffect(() => {
    if (!animated || !cardRef.current) return;
    const card = cardRef.current;
    card.classList.add("border-glow-sweep");
    const timeout = window.setTimeout(() => card.classList.remove("border-glow-sweep"), 1800);
    return () => window.clearTimeout(timeout);
  }, [animated]);

  return (
    <div
      ref={cardRef}
      className={`border-glow-card${className ? ` ${className}` : ""}`}
      onPointerMove={handlePointerMove}
      style={{ "--edge-proximity": 0, "--cursor-angle": "45deg" } as CSSProperties}
    >
      <span className="border-glow-edge" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
