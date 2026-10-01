import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Shared Motion System Configurations
 * Respects approved editorial aesthetic with curated spring & bezier curves.
 */
export const MOTION_TIMING = {
  instant: 0.1,
  fast: 0.22,
  base: 0.45,
  slow: 0.7,
  cinematic: 0.95,
} as const;

export const MOTION_EASE = {
  out: [0.16, 1, 0.3, 1] as const, // editorial smooth curve
  inOut: [0.77, 0, 0.175, 1] as const,
  spring: { type: "spring", stiffness: 280, damping: 24 } as const,
  gentleSpring: { type: "spring", stiffness: 180, damping: 20 } as const,
} as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_TIMING.slow, ease: MOTION_EASE.out },
  },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: MOTION_TIMING.base, ease: "easeOut" },
  },
};

export const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: MOTION_TIMING.slow, ease: MOTION_EASE.out } },
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0, transition: { duration: MOTION_TIMING.slow, ease: MOTION_EASE.out } },
  },
  right: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0, transition: { duration: MOTION_TIMING.slow, ease: MOTION_EASE.out } },
  },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: MOTION_TIMING.slow, ease: MOTION_EASE.out },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * MotionReveal Primitive
 * Smooth scroll-triggered reveal component.
 */
interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  threshold?: number;
  once?: boolean;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  className = "",
  delay = 0,
  yOffset = 24,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: MOTION_TIMING.slow, delay, ease: MOTION_EASE.out }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * MotionFade Primitive
 */
export const MotionFade: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: MOTION_TIMING.base, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * MotionStagger Primitive
 */
export const MotionStagger: React.FC<{
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}> = ({ children, className = "", stagger = 0.08, delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * MotionStaggerItem Primitive
 */
export const MotionStaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={revealVariants} className={className}>
      {children}
    </motion.div>
  );
};

/**
 * MotionTilt 3D Card Primitive
 * Mouse-responsive tilt for cards & surface textures without heavy GPU rendering.
 */
interface MotionTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleHover?: number;
}

export const MotionTilt: React.FC<MotionTiltProps> = ({
  children,
  className = "",
  maxTilt = 5,
  scaleHover = 1.02,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, isHovered: false });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setCoords({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0, isHovered: false });
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: coords.isHovered ? coords.x * maxTilt : 0,
        rotateX: coords.isHovered ? -coords.y * maxTilt : 0,
        scale: coords.isHovered ? scaleHover : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * MotionMagnetic Primitive
 * Subtle cursor-attracted magnetic CTA button.
 */
export const MotionMagnetic: React.FC<{ children: React.ReactNode; className?: string; strength?: number }> = ({
  children,
  className = "",
  strength = 14,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    setPosition({
      x: (distanceX / width) * strength,
      y: (distanceY / height) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Smooth Animated Number Counter
 */
export const AnimatedCounter: React.FC<{ value: number; duration?: number; prefix?: string; suffix?: string }> = ({
  value,
  duration = 0.8,
  prefix = "",
  suffix = "",
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    let start = displayValue;
    const end = value;
    if (start === end) return;

    const startTime = performance.now();
    const totalMs = duration * 1000;

    let frameId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / totalMs);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (end - start) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      }
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration, shouldReduceMotion]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
};

/**
 * 1. Global Scroll / Chapter Progress Bar
 * Uses transform: scaleX() for 60fps GPU performance without layout recalculation.
 */
export const ScrollProgressBar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!ref.current) return;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
          ref.current.style.transform = `scaleX(${progress})`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none origin-left ${className}`}
      style={{
        background: "rgba(18, 63, 70, 0.4)", // Deep Teal base track
      }}
    >
      <div
        ref={ref}
        className="w-full h-full origin-left will-change-transform"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, #176B73 0%, #F3D36B 100%)", // Petrol Blue to Butter Yellow
          boxShadow: "0 0 8px rgba(243, 211, 107, 0.5)",
        }}
      />
    </div>
  );
};

/**
 * 2. Premium Image Reveal System (MotionImageReveal)
 * Editorial architectural mask reveal:
 * - Container begins clipped
 * - Image scales down smoothly from 1.05 to 1.0
 * - Mask reveals the photograph
 */
interface MotionImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  duration?: number;
}

export const MotionImageReveal: React.FC<MotionImageRevealProps> = ({
  children,
  className = "",
  delay = 0.04,
  duration = 0.65,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={`w-full h-full ${className}`}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden w-full h-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "100px 0px" }}
        transition={{
          duration,
          delay,
          ease: MOTION_EASE.out,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * 3. Subtle Major-Image Parallax (MotionParallaxImage)
 * Restrained scroll progress parallax: 6px–18px translate3d clamp.
 * Respects reduced-motion and pauses when offscreen.
 */
interface MotionParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // range: 6 - 20 (px)
}

export const MotionParallaxImage: React.FC<MotionParallaxImageProps> = ({
  children,
  className = "",
  intensity = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    let isVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { rootMargin: "50px 0px 50px 0px" }
    );
    observer.observe(container);

    let frameId: number = 0;

    const onScroll = () => {
      if (!isVisible) return;
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!container || !target) return;
        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Calculate progress through viewport from -1 to 1
        const progress = ((rect.top + rect.height / 2) - viewportHeight / 2) / (viewportHeight / 2);
        const clamped = Math.min(1, Math.max(-1, progress));
        const translateY = clamped * -intensity;
        target.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameId);
    };
  }, [intensity, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={targetRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
};

/**
 * 5. Contextual Cursor Light (MotionCursorLight)
 * Subtle pointer-following radial sheen across interactive visual surfaces.
 * Uses requestAnimationFrame and direct CSS variable updates without React per-frame rerenders.
 * Disabled completely for touch/coarse pointers and under reduced motion.
 */
interface MotionCursorLightProps {
  children: React.ReactNode;
  className?: string;
  tint?: "petrol" | "butter" | "coral";
  radius?: number;
}

export const MotionCursorLight: React.FC<MotionCursorLightProps> = ({
  children,
  className = "",
  tint = "butter",
  radius = 240,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Disable on touch / coarse pointer
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (shouldReduceMotion || isTouch) return;

    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${x - radius / 2}px, ${y - radius / 2}px, 0)`;
        glow.style.opacity = "1";
      });
    };

    const onPointerLeave = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        glow.style.opacity = "0";
      });
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, [radius, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const tintColors = {
    petrol: "rgba(23, 107, 115, 0.18)",
    butter: "rgba(243, 211, 107, 0.16)",
    coral: "rgba(233, 139, 120, 0.16)",
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Soft Radial Ambient Sheen */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 rounded-full blur-2xl transition-opacity duration-300 will-change-transform z-10"
        style={{
          width: `${radius}px`,
          height: `${radius}px`,
          background: `radial-gradient(circle, ${tintColors[tint]} 0%, rgba(255,255,255,0) 70%)`,
          opacity: 0,
        }}
      />
      {children}
    </div>
  );
};

