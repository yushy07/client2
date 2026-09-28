import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, Play, Pause, Sparkles } from "lucide-react";

export interface ProductVideoStory {
  id: string;
  title: string;
  category: string;
  family: string;
  descriptor: string;
  src: string;
  poster: string;
  accentTone: string;
  tag: "Interiors" | "Exteriors" | "Luxury" | "Washable" | "Primers";
}

export const productVideoStories: ProductVideoStory[] = [
  {
    id: "calista-ever-clear",
    title: "Calista Ever Clear",
    category: "Interior Luxury Emulsion",
    family: "Calista Series",
    descriptor: "Luminous stain-resistant washable interior finish with radiant depth.",
    src: "/storage/product-videos/calista-ever-clear.mp4",
    poster: "/storage/product-videos/posters/calista-ever-clear.jpg",
    accentTone: "#a32a39",
    tag: "Luxury",
  },
  {
    id: "one-pure-elegance-shine",
    title: "One Pure Elegance Shine",
    category: "Ultra-Luxury Interiors",
    family: "Opus One Signature",
    descriptor: "Mastercrafted richness with subtle silk reflection and pure pigment saturation.",
    src: "/storage/product-videos/one-pure-elegance-shine.mp4",
    poster: "/storage/product-videos/posters/one-pure-elegance-shine.jpg",
    accentTone: "#8b263e",
    tag: "Luxury",
  },
  {
    id: "calista-neo-star-shine",
    title: "Calista Neo Star Shine",
    category: "Exterior All-Weather Shield",
    family: "Calista Exterior",
    descriptor: "High-durability facade protection with brilliant weather resistance and radiant sheen.",
    src: "/storage/product-videos/calista-neo-star-shine.mp4",
    poster: "/storage/product-videos/posters/calista-neo-star-shine.jpg",
    accentTone: "#1f6048",
    tag: "Exteriors",
  },
  {
    id: "style-color-smart",
    title: "Style Color Smart",
    category: "Interior Emulsion",
    family: "Style Series",
    descriptor: "Vibrant everyday color depth with smooth uniform architectural finish.",
    src: "/storage/product-videos/style-color-smart.mp4",
    poster: "/storage/product-videos/posters/style-color-smart.jpg",
    accentTone: "#2b5c8f",
    tag: "Interiors",
  },
  {
    id: "one-pure-elegance",
    title: "One Pure Elegance",
    category: "Luxury Interior Emulsion",
    family: "Opus One Signature",
    descriptor: "Velvety aesthetic depth and timeless architectural presence.",
    src: "/storage/product-videos/one-pure-elegance.mp4",
    poster: "/storage/product-videos/posters/one-pure-elegance.jpg",
    accentTone: "#5c3272",
    tag: "Luxury",
  },
  {
    id: "calista-ever-wash-matt",
    title: "Calista Ever Wash Matt",
    category: "Washable Interior Finish",
    family: "Calista Series",
    descriptor: "Sophisticated non-reflective matte finish with heavy scrub resistance.",
    src: "/storage/product-videos/calista-ever-wash-matt.mp4",
    poster: "/storage/product-videos/posters/calista-ever-wash-matt.jpg",
    accentTone: "#1a535c",
    tag: "Washable",
  },
  {
    id: "calista-ever-clear-studio",
    title: "Calista Ever Clear (Studio Edition)",
    category: "Premium Interior Emulsion",
    family: "Calista Series",
    descriptor: "Curated architectural illumination, effortless cleanability, and long-term clarity.",
    src: "/storage/product-videos/calista-ever-clear-studio.mp4",
    poster: "/storage/product-videos/posters/calista-ever-clear-studio.jpg",
    accentTone: "#462255",
    tag: "Interiors",
  },
  {
    id: "style-color-fresh",
    title: "Style Color Fresh",
    category: "Interior Emulsion",
    family: "Style Series",
    descriptor: "Long-lasting fresh brightness with breathable anti-fungal wall protection.",
    src: "/storage/product-videos/style-color-fresh.mp4",
    poster: "/storage/product-videos/posters/style-color-fresh.jpg",
    accentTone: "#d0532b",
    tag: "Interiors",
  },
  {
    id: "calista-ever-wash-shine",
    title: "Calista Ever Wash Shine",
    category: "Premium Washable Emulsion",
    family: "Calista Series",
    descriptor: "Pristine washable surface with refined soft gloss and enduring lustre.",
    src: "/storage/product-videos/calista-ever-wash-shine.mp4",
    poster: "/storage/product-videos/posters/calista-ever-wash-shine.jpg",
    accentTone: "#9a4c80",
    tag: "Washable",
  },
  {
    id: "style-pro-fresh-primer",
    title: "Style Pro Fresh Primer",
    category: "Interior Water-Thinnable Primer",
    family: "Style Series",
    descriptor: "Superior substrate adhesion and uniform opacity for immaculate topcoat finishes.",
    src: "/storage/product-videos/style-pro-fresh-primer.mp4",
    poster: "/storage/product-videos/posters/style-pro-fresh-primer.jpg",
    accentTone: "#d35400",
    tag: "Primers",
  },
  {
    id: "calista-neo-star-facade",
    title: "Calista Neo Star (Facade Focus)",
    category: "Exterior High-Sheen Emulsion",
    family: "Calista Exterior",
    descriptor: "Architectural facade resilience with extreme anti-dust and weather-guard protection.",
    src: "/storage/product-videos/calista-neo-star-facade.mp4",
    poster: "/storage/product-videos/posters/calista-neo-star-facade.jpg",
    accentTone: "#27ae60",
    tag: "Exteriors",
  },
  {
    id: "one-pure-elegance-lounge",
    title: "One Pure Elegance (Lounge Collection)",
    category: "Ultra-Luxury Interior Emulsion",
    family: "Opus One Signature",
    descriptor: "Refined silk matte sheen crafted for bespoke high-end living spaces.",
    src: "/storage/product-videos/one-pure-elegance-lounge.mp4",
    poster: "/storage/product-videos/posters/one-pure-elegance-lounge.jpg",
    accentTone: "#8e44ad",
    tag: "Luxury",
  },
  {
    id: "one-true-life-exterior",
    title: "One True Life",
    category: "Luxury Exterior Emulsion",
    family: "Opus One Signature",
    descriptor: "Ultra-durable exterior shield formulated with advanced weather-defense polymers.",
    src: "/storage/product-videos/one-true-life-exterior.mp4",
    poster: "/storage/product-videos/posters/one-true-life-exterior.jpg",
    accentTone: "#16a085",
    tag: "Exteriors",
  },
  {
    id: "one-pure-elegance-showroom",
    title: "One Pure Elegance (Jaymurti Traders Edition)",
    category: "Luxury Interior Emulsion",
    family: "Opus One Signature",
    descriptor: "Flagship formulation available for in-person demonstration at Jaymurti Traders Baskhari.",
    src: "/storage/product-videos/one-pure-elegance-showroom.mp4",
    poster: "/storage/product-videos/posters/one-pure-elegance-showroom.jpg",
    accentTone: "#2c3e50",
    tag: "Luxury",
  },
];

const AUTO_ADVANCE_INTERVAL = 10000; // 10 seconds per product

interface ProductVideoCardProps {
  story: ProductVideoStory;
  virtualIndex: number;
  originalIndex: number;
  isActive: boolean;
  isCentered: boolean;
  isNext: boolean;
  isSectionInView: boolean;
  onFocusCard: () => void;
}

function ProductVideoCard({
  story,
  virtualIndex,
  originalIndex,
  isActive,
  isCentered,
  isNext,
  isSectionInView,
  onFocusCard,
}: ProductVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Active centered video gets full stream; immediately upcoming video gets lightweight metadata prep
  const shouldAttachSrc = isSectionInView && (isCentered || isNext);
  const preloadStrategy = isSectionInView
    ? isCentered
      ? "auto"
      : isNext
      ? "metadata"
      : "none"
    : "none";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly enforce silent playback at DOM level
    video.muted = true;
    video.volume = 0;

    if (!isSectionInView || !isCentered) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          video.muted = true;
          video.volume = 0;
          video.play().then(() => setIsPlaying(true)).catch(() => {
            setIsPlaying(false);
          });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.25, 0.6] }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isSectionInView, isCentered]);

  const togglePlayback = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    // If card is not centered, click centers it
    if (!isCentered) {
      onFocusCard();
      return;
    }

    // Always maintain strictly silent playback
    video.muted = true;
    video.volume = 0;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isCentered, onFocusCard]);

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked outside the interactive links, focus/center this card
    if (!isCentered) {
      onFocusCard();
    }
  };

  return (
    <article
      className={`product-story-card ${isPlaying ? "is-playing" : "is-paused"} ${isCentered ? "is-centered" : ""}`}
      style={{
        "--card-accent": story.accentTone,
        transform: `translateX(calc(${virtualIndex} * var(--story-step-width)))`,
      } as React.CSSProperties}
      onClick={handleCardClick}
    >
      <div
        className="product-story-media"
        onClick={togglePlayback}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            togglePlayback(e);
          }
        }}
        aria-label={`${isPlaying ? "Pause" : "Play"} video demonstration of ${story.title}`}
      >
        <video
          ref={videoRef}
          src={shouldAttachSrc ? story.src : undefined}
          poster={story.poster}
          muted
          loop
          playsInline
          preload={preloadStrategy}
          className="product-story-video"
          aria-label={`Silent video demonstration of ${story.title}`}
        />
        <div className="product-story-media-overlay" aria-hidden="true" />
        <div className="product-story-index-badge">
          <span>{String(originalIndex + 1).padStart(2, "0")}</span>
          <em>{story.family}</em>
        </div>
        <div className="product-story-play-badge" aria-hidden="true">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </div>
        <div className="product-story-motion-tag">
          <Sparkles size={12} />
          <span>Motion Showcase</span>
        </div>
      </div>

      <div className="product-story-info">
        <span className="product-story-category">{story.category}</span>
        <h3 className="product-story-title">{story.title}</h3>
        <p className="product-story-descriptor">{story.descriptor}</p>
        <a
          href="#products"
          className="product-story-link"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Explore in catalogue</span>
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function ProductStories() {
  // Virtual continuous floating-point offset on the infinite belt
  const [offset, setOffset] = useState<number>(0);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [autoTimerKey, setAutoTimerKey] = useState<number>(0);
  const [centerShiftSteps, setCenterShiftSteps] = useState<number>(0);
  const [isSectionInView, setIsSectionInView] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ clientX: number; startOffset: number; isScrollbar: boolean } | null>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  const totalOriginal = productVideoStories.length;

  // Viewport visibility gating: load media only when section approaches viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { rootMargin: "350px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const resetAutoplayTimer = useCallback(() => {
    setAutoTimerKey((k) => k + 1);
  }, []);

  // Compute the fractional steps needed so that a card is perfectly centered in viewport
  const calculateCenterShiftSteps = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const viewportWidth = viewport.clientWidth;
    if (!viewportWidth) return 0;

    const cardEl = viewport.querySelector<HTMLElement>(".product-story-card");
    const cardWidth = cardEl ? cardEl.offsetWidth : 300;
    const cardMarginLeft = cardEl ? parseFloat(window.getComputedStyle(cardEl).marginLeft) || 0 : 0;

    const style = window.getComputedStyle(viewport);
    const stepWidthVal = parseFloat(style.getPropertyValue("--story-step-width")) || (cardWidth + 20);

    const viewportCenter = viewportWidth / 2;
    const cardCenter = cardMarginLeft + cardWidth / 2;

    return (viewportCenter - cardCenter) / stepWidthVal;
  }, []);

  // Initialize and handle responsive viewport resizing
  useEffect(() => {
    const updateCenterShift = () => {
      const shift = calculateCenterShiftSteps();
      setCenterShiftSteps(shift);

      if (!isInitializedRef.current) {
        setOffset(0 - shift);
        isInitializedRef.current = true;
      }
    };

    updateCenterShift();
    window.addEventListener("resize", updateCenterShift);
    return () => window.removeEventListener("resize", updateCenterShift);
  }, [calculateCenterShiftSteps]);

  // Center a specific virtual card in the viewport
  const centerCard = useCallback((virtualIndex: number) => {
    const shift = calculateCenterShiftSteps();
    setCenterShiftSteps(shift);
    setIsTransitioning(true);
    setOffset(virtualIndex - shift);
    resetAutoplayTimer();
  }, [calculateCenterShiftSteps, resetAutoplayTimer]);

  // Smooth step transition forward / backward
  const advanceOffset = useCallback((deltaSteps: number) => {
    setIsTransitioning(true);
    setOffset((prev) => prev + deltaSteps);
    resetAutoplayTimer();
  }, [resetAutoplayTimer]);

  // 10-Second Continuous Autoplay Loop
  useEffect(() => {
    if (isHovered || isInteracting) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const timer = setInterval(() => {
      advanceOffset(1);
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(timer);
  }, [isHovered, isInteracting, advanceOffset, autoTimerKey]);

  // Touch Swipe for mobile infinite carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    setIsTransitioning(false);
    dragStartRef.current = {
      clientX: e.touches[0].clientX,
      startOffset: offset,
      isScrollbar: false,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragStartRef.current) return;
    const diff = dragStartRef.current.clientX - e.touches[0].clientX;
    const stepWidth = 280;
    setOffset(dragStartRef.current.startOffset + diff / stepWidth);
  };

  const handleTouchEnd = () => {
    if (dragStartRef.current) {
      const shift = calculateCenterShiftSteps();
      setIsTransitioning(true);
      setOffset((prev) => Math.round(prev + shift) - shift);
      dragStartRef.current = null;
    }
    setIsInteracting(false);
    resetAutoplayTimer();
  };

  // Horizontal Wheel / Trackpad listener
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) < 20) return;

    if (wheelTimeoutRef.current) return;

    if (delta > 0) {
      advanceOffset(1);
    } else {
      advanceOffset(-1);
    }

    wheelTimeoutRef.current = setTimeout(() => {
      wheelTimeoutRef.current = null;
    }, 450);
  };

  // True Infinite Interactive Bottom Scrollbar Pointer / Drag Logic
  const handleScrollbarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = scrollbarTrackRef.current;
    if (!track) return;

    setIsInteracting(true);
    setIsTransitioning(false);
    track.setPointerCapture(e.pointerId);

    const trackRect = track.getBoundingClientRect();
    const trackWidth = trackRect.width || 800;
    const pxPerStep = Math.max(30, trackWidth / totalOriginal);

    dragStartRef.current = {
      clientX: e.clientX,
      startOffset: offset,
      isScrollbar: true,
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!dragStartRef.current) return;
      const diffX = moveEvent.clientX - dragStartRef.current.clientX;
      const stepsMoved = diffX / pxPerStep;
      setOffset(dragStartRef.current.startOffset + stepsMoved);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      try {
        track.releasePointerCapture(upEvent.pointerId);
      } catch {
        // Safe fallback
      }
      track.removeEventListener("pointermove", handlePointerMove);
      track.removeEventListener("pointerup", handlePointerUp);
      const shift = calculateCenterShiftSteps();
      setIsTransitioning(true);
      setOffset((prev) => Math.round(prev + shift) - shift);
      dragStartRef.current = null;
      setIsInteracting(false);
      resetAutoplayTimer();
    };

    track.addEventListener("pointermove", handlePointerMove);
    track.addEventListener("pointerup", handlePointerUp);
  };

  // Dynamic sliding window of virtual cards centered around the active centered card
  const virtualCenterPos = offset + centerShiftSteps;
  const centerIdx = Math.floor(virtualCenterPos);

  const visibleCards = useMemo(() => {
    const cards = [];
    for (let i = centerIdx - 4; i <= centerIdx + 5; i++) {
      const prodIdx = ((i % totalOriginal) + totalOriginal) % totalOriginal;
      const story = productVideoStories[prodIdx];
      const diff = i - virtualCenterPos;
      const isCentered = Math.abs(diff) < 0.5;
      const isNext = diff >= 0.5 && diff < 1.5;
      const isActive = isCentered;
      cards.push({
        virtualIndex: i,
        originalIndex: prodIdx,
        story,
        isActive,
        isCentered,
        isNext,
      });
    }
    return cards;
  }, [centerIdx, virtualCenterPos, totalOriginal]);

  // Modulo-normalized index for accessibility attributes (0 to totalOriginal - 1)
  const normalizedActiveIndex = ((Math.round(virtualCenterPos) % totalOriginal) + totalOriginal) % totalOriginal;

  // True Infinite Cyclic Thumb Position: sweeps smoothly across the wide track
  const cyclicRatio = ((virtualCenterPos % totalOriginal) + totalOriginal) % totalOriginal / totalOriginal;
  const thumbWidthPercent = Math.max(8, (1 / totalOriginal) * 100);
  const thumbTravelPercent = (100 - thumbWidthPercent);
  const thumbLeftPercent = cyclicRatio * thumbTravelPercent;

  return (
    <section
      ref={sectionRef}
      className="product-stories reveal scroll-chapter"
      id="product-stories"
      data-scroll-section
      data-section-label="Stories"
      data-reveal
      aria-label="Birla Opus Product Video Stories"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-stories-header">
        <div className="product-stories-intro">
          <div className="eyebrow">Product Stories</div>
          <h2 className="section-title">See the products<br />in motion.</h2>
          <p className="section-lead">
            Explore authentic Birla Opus master formulations through vertical cinematic showcases. Discover the sheen, packaging architecture, and tactile radiance before your consultation at Jaymurti Traders.
          </p>
        </div>

        <div className="product-stories-side">
          <a href="#products" className="arrow-link">
            View master catalogue <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <div
        className="product-stories-viewport"
        ref={viewportRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        role="region"
        aria-label="Infinite product video showcase carousel"
      >
        <div
          className={`product-stories-track ${isTransitioning ? "is-transitioning" : ""}`}
          style={{
            transform: `translateX(calc(-1 * ${offset} * var(--story-step-width)))`,
          }}
          onTransitionEnd={() => setIsTransitioning(false)}
        >
          {visibleCards.map((card) => (
            <ProductVideoCard
              key={`${card.virtualIndex}-${card.story.id}`}
              story={card.story}
              virtualIndex={card.virtualIndex}
              originalIndex={card.originalIndex}
              isActive={card.isActive}
              isCentered={card.isCentered}
              isNext={card.isNext}
              isSectionInView={isSectionInView}
              onFocusCard={() => centerCard(card.virtualIndex)}
            />
          ))}
        </div>
      </div>

      {/* Wide Premium Horizontal Carousel Navigation Track */}
      <div className="product-stories-scrollbar-wrapper" aria-label="Product carousel horizontal navigation track">
        <div
          className={`product-stories-scrollbar-track ${isInteracting ? "is-dragging" : ""}`}
          ref={scrollbarTrackRef}
          onPointerDown={handleScrollbarPointerDown}
          role="slider"
          aria-valuemin={1}
          aria-valuemax={totalOriginal}
          aria-valuenow={normalizedActiveIndex + 1}
          aria-label={`Horizontal Carousel Navigation: Story ${normalizedActiveIndex + 1} of ${totalOriginal}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              advanceOffset(1);
            } else if (e.key === "ArrowLeft") {
              advanceOffset(-1);
            }
          }}
        >
          <div
            className={`product-stories-scrollbar-thumb ${isTransitioning ? "is-transitioning" : ""}`}
            style={{
              width: `${thumbWidthPercent}%`,
              left: `${thumbLeftPercent}%`,
            }}
          />
        </div>
      </div>

      {/* Clean Bottom CTA Footer without helper clutter */}
      <div className="product-stories-footer-note">
        <a href="#enquiry" className="button-primary">
          Consult on master finishes <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}

