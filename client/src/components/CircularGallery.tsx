import { memo, useEffect, useRef } from "react";

export type CircularGalleryItem = {
  color: string;
  textColor: string;
  label: string;
  code: string;
};

type CircularGalleryProps = {
  items: CircularGalleryItem[];
  activeCode: string;
  onSelect: (code: string) => void;
};

// ⚡ Bolt Optimization: Memoized with React.memo to prevent unnecessary re-renders
// when parent state updates on periodic timers (e.g. hero banner, room shade loops) in Home.tsx.
const CircularGallery = memo(function CircularGallery({ items, activeCode, onSelect }: CircularGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const stop = () => track.classList.add("is-paused");
    const start = () => track.classList.remove("is-paused");
    track.addEventListener("pointerenter", stop);
    track.addEventListener("pointerleave", start);
    return () => {
      track.removeEventListener("pointerenter", stop);
      track.removeEventListener("pointerleave", start);
    };
  }, []);

  const loopItems = [...items, ...items];

  return (
    <div className="circular-gallery" aria-label="Circular colour gallery">
      <div className="circular-gallery-track" ref={trackRef}>
        {loopItems.map((item, index) => (
          <button
            className={`circular-gallery-card${item.code === activeCode ? " active" : ""}`}
            key={`${item.code}-${index}`}
            type="button"
            onClick={() => onSelect(item.code)}
            aria-pressed={item.code === activeCode}
            style={{ "--gallery-colour": item.color, "--gallery-text": item.textColor } as React.CSSProperties}
          >
            <span>{item.label}</span>
            <strong>{item.code}</strong>
          </button>
        ))}
      </div>
    </div>
  );
});

export default CircularGallery;
