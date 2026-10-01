import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollableRowProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  showArrows?: boolean;
  arrowOffsetClass?: string;
  fadeEdges?: boolean;
  scrollStep?: number;
}

export const ScrollableRow: React.FC<ScrollableRowProps> = ({
  children,
  className = "",
  innerClassName = "",
  showArrows = true,
  arrowOffsetClass = "",
  fadeEdges = false,
  scrollStep,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const overflowing = el.scrollWidth > el.clientWidth + 2;
    setIsOverflowing(overflowing);
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  // 1. Mouse Wheel Translation (Vertical deltaY -> Horizontal scrollLeft)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // If native horizontal scroll is occurring (e.g. trackpad 2-finger horizontal swipe), let it handle naturally
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      if (e.deltaY !== 0) {
        const canScroll =
          (e.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth - 2) ||
          (e.deltaY < 0 && el.scrollLeft > 2);

        if (canScroll) {
          e.preventDefault();
          // Use instant scroll behavior during continuous wheel turns to avoid animation stutter
          el.style.scrollBehavior = "auto";
          el.scrollLeft += e.deltaY * 1.1;
          checkScroll();

          if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
          wheelTimeoutRef.current = setTimeout(() => {
            if (el) el.style.scrollBehavior = "";
          }, 150);
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [checkScroll]);

  // 2. Mouse Click & Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary mouse button
    const el = scrollRef.current;
    if (!el) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    hasDraggedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 4) {
      if (!hasDraggedRef.current) {
        hasDraggedRef.current = true;
        setIsDragging(true);
      }
      e.preventDefault();
      el.style.scrollBehavior = "auto";
      el.scrollLeft = scrollLeftRef.current - walk;
      checkScroll();
    }
  };

  const handleMouseUpOrLeave = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    const el = scrollRef.current;
    if (el) el.style.scrollBehavior = "";
    setTimeout(() => {
      hasDraggedRef.current = false;
      setIsDragging(false);
    }, 60);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleScrollBy = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.style.scrollBehavior = "smooth";
    const distance = scrollStep || Math.max(200, Math.floor(el.clientWidth * 0.75));
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
    setTimeout(checkScroll, 320);
  };

  // 3. Scroll & Resize Observers
  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => checkScroll());
      ro.observe(el);
      Array.from(el.children).forEach((child) => ro?.observe(child));
    }

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      if (ro) ro.disconnect();
    };
  }, [checkScroll]);

  return (
    <div className={`relative group/scrollrow ${className}`}>
      {/* Left Chevron Button */}
      {showArrows && canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScrollBy(-1)}
          className={`absolute -left-2.5 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#081e22]/95 text-white border border-[#176B73]/80 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center justify-center hover:bg-accent hover:text-dark hover:border-accent transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md ${arrowOffsetClass}`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Edge Fade Gradients */}
      {fadeEdges && isOverflowing && canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
      )}
      {fadeEdges && isOverflowing && canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
      )}

      {/* Main Scrollable Viewport */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClickCapture={handleClickCapture}
        className={`flex items-center overflow-x-auto no-scrollbar scroll-smooth ${
          isOverflowing ? "cursor-grab" : ""
        } ${isDragging ? "cursor-grabbing select-none" : ""} ${innerClassName}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>

      {/* Right Chevron Button */}
      {showArrows && canScrollRight && (
        <button
          type="button"
          onClick={() => handleScrollBy(1)}
          className={`absolute -right-2.5 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#081e22]/95 text-white border border-[#176B73]/80 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center justify-center hover:bg-accent hover:text-dark hover:border-accent transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-md ${arrowOffsetClass}`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
