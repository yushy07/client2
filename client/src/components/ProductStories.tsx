import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, Play, Pause, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

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

const AUTO_ADVANCE_INTERVAL = 10000; // 10 seconds per product in the center

interface ProductVideoCardProps {
  story: ProductVideoStory;
  index: number;
  originalIndex: number;
  isCentered: boolean;
  autoTimerKey: number;
  onFocusCard: () => void;
}

function ProductVideoCard({
  story,
  index,
  originalIndex,
  isCentered,
  autoTimerKey,
  onFocusCard,
}: ProductVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    if (isCentered) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If browser autoplay policies require interaction, fall back gracefully
            setIsPlaying(true);
          });
      } else {
        setIsPlaying(true);
      }
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isCentered]);

  const togglePlayback = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (!isCentered) {
      onFocusCard();
      return;
    }

    video.muted = true;
    video.volume = 0;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isCentered, onFocusCard]);

  const handleCardClick = () => {
    if (!isCentered) {
      onFocusCard();
    }
  };

  return (
    <article
      className={`product-story-card ${isCentered ? "is-centered is-playing ring-2 ring-amber-400/80 shadow-2xl" : "opacity-75 hover:opacity-100"}`}
      style={{
        "--card-accent": story.accentTone,
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
          src={story.src}
          poster={story.poster}
          muted
          autoPlay={isCentered}
          loop
          playsInline
          preload="auto"
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
          <span>{isCentered ? "Now Playing (10s)" : "Motion Showcase"}</span>
        </div>

        {/* 10-Second Continuous Progress Indicator on the active center card */}
        {isCentered && (
          <div className="absolute top-0 inset-x-0 h-1 bg-white/25 z-20 overflow-hidden">
            <div
              key={`progress-${index}-${autoTimerKey}`}
              className="h-full bg-amber-400"
              style={{
                width: "100%",
                animation: "storyProgress 10s linear forwards",
              }}
            />
          </div>
        )}
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
  const totalOriginal = productVideoStories.length;
  // 3x duplicated array for seamless infinite looping
  const duplicatedStories = useMemo(() => [
    ...productVideoStories,
    ...productVideoStories,
    ...productVideoStories,
  ], []);

  const [currentIndex, setCurrentIndex] = useState<number>(totalOriginal);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [autoTimerKey, setAutoTimerKey] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetAutoplayTimer = useCallback(() => {
    setAutoTimerKey((k) => k + 1);
  }, []);

  const nextCard = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    resetAutoplayTimer();
  }, [resetAutoplayTimer]);

  const prevCard = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    resetAutoplayTimer();
  }, [resetAutoplayTimer]);

  const focusCard = useCallback((idx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(idx);
    resetAutoplayTimer();
  }, [resetAutoplayTimer]);

  // Seamless infinite loop wrap on transition end
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= totalOriginal * 2) {
      setCurrentIndex(currentIndex - totalOriginal);
    } else if (currentIndex < totalOriginal) {
      setCurrentIndex(currentIndex + totalOriginal);
    }
  };

  // 10-Second Continuous Automatic Infinite Horizontal Progression
  useEffect(() => {
    if (isInteracting) return;

    const timer = setInterval(() => {
      nextCard();
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(timer);
  }, [isInteracting, nextCard, autoTimerKey]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current !== null) {
      const diff = touchStartRef.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          nextCard();
        } else {
          prevCard();
        }
      }
      touchStartRef.current = null;
    }
    setIsInteracting(false);
  };

  // Horizontal Wheel / Trackpad listener
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) < 25) return;

    if (wheelTimeoutRef.current) return;

    if (delta > 0) {
      nextCard();
    } else {
      prevCard();
    }

    wheelTimeoutRef.current = setTimeout(() => {
      wheelTimeoutRef.current = null;
    }, 450);
  };

  return (
    <section
      ref={sectionRef}
      className="product-stories reveal scroll-chapter"
      id="product-stories"
      data-scroll-section
      data-section-label="Stories"
      data-reveal
      aria-label="Birla Opus Product Video Stories"
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
          <div className="flex items-center gap-2">
            <button
              onClick={prevCard}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 active:scale-95"
              aria-label="Previous product video"
              title="Previous video"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextCard}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 active:scale-95"
              aria-label="Next product video"
              title="Next video"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <a href="#products" className="arrow-link">
            View master catalogue <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <div
        className="product-stories-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        role="region"
        aria-label="Infinite product video showcase carousel"
      >
        <div
          className={`product-stories-track ${isTransitioning ? "is-transitioning" : ""}`}
          style={{
            transform: `translateX(calc(-0.5 * var(--story-card-width) - (${currentIndex} * var(--story-step-width))))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {duplicatedStories.map((story, idx) => {
            const isCentered = idx === currentIndex;
            const originalIndex = idx % totalOriginal;

            return (
              <ProductVideoCard
                key={`${idx}-${story.id}`}
                story={story}
                index={idx}
                originalIndex={originalIndex}
                isCentered={isCentered}
                autoTimerKey={autoTimerKey}
                onFocusCard={() => focusCard(idx)}
              />
            );
          })}
        </div>
      </div>

      {/* Clean Bottom CTA Footer without scrollbar */}
      <div className="product-stories-footer-note">
        <a href="#enquiry" className="button-primary">
          Consult on master finishes <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
