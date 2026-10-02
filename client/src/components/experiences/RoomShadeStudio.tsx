import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ROOM_SHADE_STUDIO_SCENES, type RoomScene, type RoomVariant } from "@shared/roomShadeStudioData";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ShoppingBag,
  Maximize2,
  X,
  Palette,
  Home,
  Layers,
  ChevronLeft,
  ChevronRight,
  Check,
  Grid,
  Columns,
  Sun,
  Moon,
  Eye,
  MessageCircle,
  Cloud,
  Lamp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { JellyRadio, ElasticSlider, ShinyText, TrueFocus } from "@/components/reactbits";
import { BIRLA_OPUS_ACCENT_TEXTURES, type PairedTexture } from "@/data/shadeVisualMappings";
import { ScrollableRow } from "@/components/ui/ScrollableRow";

interface RoomShadeStudioProps {
  onEnquire?: (title: string, details: string) => void;
  onExploreShades?: () => void;
  initialSceneIndex?: number;
  initialShadeCode?: string;
}

interface ThumbnailStripProps {
  variants: RoomVariant[];
  allSceneVariants: RoomVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  activeColorClass: "border-accent" | "border-teal-400";
  accentHex?: string;
}

const ThumbnailStrip: React.FC<ThumbnailStripProps> = ({
  variants,
  allSceneVariants,
  selectedIndex,
  onSelect,
  activeColorClass,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [variants]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -220 : 220;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="relative group/strip">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0c1214]/95 text-white border border-border-teal/80 shadow-xl flex items-center justify-center hover:bg-accent hover:text-dark transition-all hover:scale-110"
          aria-label="Scroll shades left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scroll-smooth no-scrollbar select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {variants.map((v) => {
          const globalIdx = allSceneVariants.findIndex((x) => x.id === v.id);
          const isSelected = selectedIndex === globalIdx;

          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(globalIdx)}
              className={`flex-shrink-0 group/item relative rounded-xl overflow-hidden border-2 transition-all duration-200 text-left ${
                isSelected
                  ? `${activeColorClass} ring-2 ring-accent/30 scale-105 shadow-lg shadow-accent/20 z-10`
                  : "border-border-teal/50 opacity-70 hover:opacity-100 hover:border-border-teal hover:scale-[1.02]"
              } w-20 sm:w-24`}
            >
              {/* Thumbnail Image */}
              <div className="aspect-[4/3] w-full bg-dark overflow-hidden relative">
                <ResponsiveImage
                  src={v.url}
                  alt={v.label}
                  loading="lazy"
                  decoding="async"
                  width={96}
                  height={72}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-110"
                />
                <div className="absolute top-1 left-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/40 block shadow-sm"
                    style={{ backgroundColor: v.hex }}
                  />
                </div>
              </div>

              {/* Shade Label Footer */}
              <div className="bg-[#0e1619] p-1.5 border-t border-white/5">
                <p className="text-[10px] font-semibold text-white truncate leading-tight">
                  {v.label}
                </p>
                <p className="text-[8px] text-on-dark-muted truncate font-mono mt-0.5">
                  {v.shadeCode}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-[#0c1214]/95 text-white border border-border-teal/80 shadow-xl flex items-center justify-center hover:bg-accent hover:text-dark transition-all hover:scale-110"
          aria-label="Scroll shades right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export type LightingConditionId = "morning-sun" | "bright-daylight" | "overcast" | "warm-indoor" | "evening";

export interface LightingEnvironment {
  id: LightingConditionId;
  name: string;
  shortDesc: string;
  icon: "sun" | "sun-bright" | "cloud" | "lamp" | "moon";
  contextLabel: string;
  colorTemp: string;
  // Layer 1: Base photo contrast & tone adjustment (not uniform brightness)
  baseFilter: string;
  // Layer 2: Directional or primary spatial light beam
  primaryLightGradient: string;
  primaryBlendMode: React.CSSProperties["mixBlendMode"];
  primaryOpacity: number;
  // Layer 3: Localized light pool or localized warm/cool wash
  accentLightGradient?: string;
  accentBlendMode?: React.CSSProperties["mixBlendMode"];
  accentOpacity?: number;
  // Layer 4: Shadow/depth/ambient falloff treatment
  shadowGradient: string;
  shadowBlendMode: React.CSSProperties["mixBlendMode"];
  shadowOpacity: number;
}

export const LIGHTING_ENVIRONMENTS: LightingEnvironment[] = [
  {
    id: "morning-sun",
    name: "Morning Sun",
    shortDesc: "3200K low golden-hour rays · window wall graze",
    icon: "sun",
    contextLabel: "Morning golden hour sunlight",
    colorTemp: "3200K Golden Warmth",
    // Base photo retains natural tones with warm golden grazing
    baseFilter: "contrast(104%) saturate(106%) brightness(101%)",
    // Smooth natural morning sunlight entering from window side without blowing out wall paint
    primaryLightGradient: "linear-gradient(116deg, rgba(255, 225, 165, 0.42) 0%, rgba(255, 200, 130, 0.2) 35%, rgba(255, 180, 100, 0.05) 65%, transparent 85%)",
    primaryBlendMode: "soft-light",
    primaryOpacity: 0.85,
    // Soft grazing highlight on the upper wall
    accentLightGradient: "radial-gradient(ellipse 75% 55% at 25% 20%, rgba(255, 235, 185, 0.3) 0%, rgba(255, 210, 140, 0.1) 55%, transparent 80%)",
    accentBlendMode: "soft-light",
    accentOpacity: 0.75,
    // Gentle cool morning ambient shadow in opposite corner
    shadowGradient: "linear-gradient(296deg, rgba(20, 30, 50, 0.25) 0%, rgba(30, 42, 65, 0.08) 40%, transparent 70%)",
    shadowBlendMode: "multiply",
    shadowOpacity: 0.45
  },
  {
    id: "bright-daylight",
    name: "Bright Daylight",
    shortDesc: "5500K crisp natural daylight · true paint color",
    icon: "sun-bright",
    contextLabel: "Neutral midday illumination",
    colorTemp: "5500K True Daylight",
    // Pure neutral high-clarity curve without fake yellowing or dark shifting
    baseFilter: "contrast(105%) brightness(103%) saturate(102%)",
    // Broad, diffuse natural daylight entering from skylights and windows
    primaryLightGradient: "radial-gradient(ellipse 80% 50% at 50% 18%, rgba(255, 255, 255, 0.28) 0%, rgba(240, 248, 255, 0.14) 50%, transparent 85%)",
    primaryBlendMode: "soft-light",
    primaryOpacity: 0.85,
    // Crisp highlight clarity across wall surfaces
    accentLightGradient: "linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, transparent 45%)",
    accentBlendMode: "screen",
    accentOpacity: 0.55,
    // Minimal neutral shadow definition preserving furniture contours
    shadowGradient: "radial-gradient(ellipse at center, transparent 65%, rgba(0, 0, 0, 0.18) 100%)",
    shadowBlendMode: "multiply",
    shadowOpacity: 0.35
  },
  {
    id: "overcast",
    name: "Overcast",
    shortDesc: "6500K cool diffused skylight · soft shadowless",
    icon: "cloud",
    contextLabel: "Soft diffused daylight",
    colorTemp: "6500K Cool Sky",
    // Softens harsh contrast rather than simply making the image dark; shadows become soft & cool
    baseFilter: "contrast(91%) brightness(96%) saturate(88%)",
    // Uniform, cloud-filtered cool sky diffuse wash
    primaryLightGradient: "linear-gradient(180deg, rgba(195, 215, 240, 0.32) 0%, rgba(185, 205, 230, 0.18) 45%, rgba(175, 195, 220, 0.24) 100%)",
    primaryBlendMode: "soft-light",
    primaryOpacity: 0.9,
    // Cool diffuse reflection softening harsh specular spots on walls
    accentLightGradient: "radial-gradient(circle at 50% 30%, rgba(215, 230, 250, 0.22) 0%, transparent 70%)",
    accentBlendMode: "screen",
    accentOpacity: 0.65,
    // Muted, non-directional ambient shadow falloff
    shadowGradient: "radial-gradient(ellipse at center, transparent 45%, rgba(30, 42, 60, 0.25) 100%)",
    shadowBlendMode: "multiply",
    shadowOpacity: 0.55
  },
  {
    id: "warm-indoor",
    name: "Warm Indoor",
    shortDesc: "2700K cozy interior lamplight · warm pools",
    icon: "lamp",
    contextLabel: "Cozy 2700K lamplight",
    colorTemp: "2700K Warm Halogen",
    // Authentic 2700K incandescent warmth: gentle sepia tint shifts color-temperature naturally without hot spots
    baseFilter: "sepia(18%) contrast(104%) saturate(110%) brightness(100%)",
    // Broad, seamless ambient warm illumination across the room (no harsh circular spotlights or burnt pixels)
    primaryLightGradient: "linear-gradient(180deg, rgba(255, 218, 155, 0.38) 0%, rgba(255, 198, 130, 0.24) 48%, rgba(255, 180, 105, 0.15) 100%)",
    primaryBlendMode: "soft-light",
    primaryOpacity: 0.8,
    // Gentle diffuse ceiling warm ambiance
    accentLightGradient: "radial-gradient(ellipse 95% 75% at 50% 20%, rgba(255, 225, 175, 0.25) 0%, rgba(255, 195, 130, 0.08) 60%, transparent 85%)",
    accentBlendMode: "soft-light",
    accentOpacity: 0.6,
    // Subtle cozy room vignette preserving wall integrity and furniture details
    shadowGradient: "radial-gradient(ellipse at center, transparent 65%, rgba(35, 22, 12, 0.28) 100%)",
    shadowBlendMode: "multiply",
    shadowOpacity: 0.4
  },
  {
    id: "evening",
    name: "Evening",
    shortDesc: "Blue hour twilight exterior · warm interior glow",
    icon: "moon",
    contextLabel: "Twilight blue hour & warm glow",
    colorTemp: "Blue Hour Dual Ambiance",
    // Low-lux evening tone curve with deep contrast and soft twilight mood
    baseFilter: "contrast(108%) brightness(91%) saturate(103%)",
    // Seamless warm interior ambient glow (no harsh burned circles on colored paint)
    primaryLightGradient: "radial-gradient(ellipse 85% 65% at 48% 38%, rgba(255, 210, 145, 0.35) 0%, rgba(240, 170, 95, 0.14) 55%, transparent 85%)",
    primaryBlendMode: "soft-light",
    primaryOpacity: 0.8,
    // Cool twilight blue ambient from window side
    accentLightGradient: "linear-gradient(135deg, rgba(30, 50, 100, 0.28) 0%, rgba(20, 35, 75, 0.12) 42%, transparent 72%)",
    accentBlendMode: "soft-light",
    accentOpacity: 0.65,
    // Rich evening peripheral depth
    shadowGradient: "radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(8, 14, 28, 0.45) 80%, rgba(3, 6, 15, 0.75) 100%)",
    shadowBlendMode: "multiply",
    shadowOpacity: 0.7
  }
];

export const RoomShadeStudio: React.FC<RoomShadeStudioProps> = ({ onEnquire, onExploreShades, initialSceneIndex, initialShadeCode }) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState<number>(initialSceneIndex ?? 0);
  const currentScene: RoomScene = ROOM_SHADE_STUDIO_SCENES[selectedSceneIndex] ?? ROOM_SHADE_STUDIO_SCENES[0]!;

  // Tone family filter
  const [selectedFamily, setSelectedFamily] = useState<string>("All");

  // View Layout Modes: 'grid' (Lookbook Multi-Card) vs 'duo' (Direct 2-up Side-by-Side)
  const [layoutMode, setLayoutMode] = useState<"grid" | "duo">("grid");
  const [lightingLevel, setLightingLevel] = useState<number>(100);

  // Dual side-by-side comparison indices
  const [leftVariantIndex, setLeftVariantIndex] = useState<number>(0);
  const [rightVariantIndex, setRightVariantIndex] = useState<number>(1 % currentScene.variants.length);

  // Deep-link: select the matching shade variant on first mount
  useEffect(() => {
    if (!initialShadeCode) return;
    const scene = ROOM_SHADE_STUDIO_SCENES[initialSceneIndex ?? 0];
    if (!scene) return;
    const idx = scene.variants.findIndex((v) => v.shadeCode === initialShadeCode);
    if (idx !== -1) {
      setLeftVariantIndex(idx);
      setRightVariantIndex(idx === 0 ? Math.min(1, scene.variants.length - 1) : 0);
    }
  }, []); // run once on mount

  // Active Lightbox Modal for quick-tap magnification & detail studio
  const [activeLightboxVariant, setActiveLightboxVariant] = useState<RoomVariant | null>(null);
  const [lightboxTab, setLightboxTab] = useState<"room" | "lighting" | "motifs">("room");
  const [lightingCondition, setLightingCondition] = useState<LightingConditionId>("bright-daylight");
  const [lightingIntensity, setLightingIntensity] = useState<number>(100);
  const [isComparingOriginal, setIsComparingOriginal] = useState<boolean>(false);
  const [selectedLightboxTexture, setSelectedLightboxTexture] = useState<PairedTexture>(
    BIRLA_OPUS_ACCENT_TEXTURES[0] ?? {
      id: "default",
      name: "Default Texture",
      category: "Interior",
      url: "",
      description: "",
    }
  );

  // Comparison drawer pinned items
  const [pinnedShades, setPinnedShades] = useState<RoomVariant[]>([]);

  const handleSceneSelect = (index: number) => {
    setSelectedSceneIndex(index);
    setSelectedFamily("All");
    setLeftVariantIndex(0);
    const sceneVariants = ROOM_SHADE_STUDIO_SCENES[index]?.variants || [];
    setRightVariantIndex(sceneVariants.length > 1 ? 1 : 0);
  };

  const totalVariantsCount = ROOM_SHADE_STUDIO_SCENES.reduce((acc, s) => acc + s.variants.length, 0);

  // Available color families in current scene with count
  const familyCounts = currentScene.variants.reduce((acc, v) => {
    const f = v.family || "Warm Neutrals";
    acc[f] = (acc[f] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const availableFamilies = ["All", ...Object.keys(familyCounts)];

  // Filtered variants
  const displayedVariants = selectedFamily === "All"
    ? currentScene.variants
    : currentScene.variants.filter((v) => (v.family || "Warm Neutrals") === selectedFamily);

  // Handle family filter change
  const handleFamilySelect = (family: string) => {
    setSelectedFamily(family);
    if (family !== "All") {
      const matches = currentScene.variants.filter((v) => (v.family || "Warm Neutrals") === family);
      const firstMatch = matches[0];
      const secondMatch = matches[1];
      if (firstMatch) {
        const firstGlobalIdx = currentScene.variants.findIndex((v) => v.id === firstMatch.id);
        const secondGlobalIdx = secondMatch
          ? currentScene.variants.findIndex((v) => v.id === secondMatch.id)
          : firstGlobalIdx;

        if (firstGlobalIdx !== -1) setLeftVariantIndex(firstGlobalIdx);
        if (secondGlobalIdx !== -1) setRightVariantIndex(secondGlobalIdx);
      }
    }
  };

  const togglePinShade = (v: RoomVariant) => {
    if (pinnedShades.some((p) => p.id === v.id)) {
      setPinnedShades(pinnedShades.filter((p) => p.id !== v.id));
    } else {
      if (pinnedShades.length >= 4) {
        setPinnedShades([...pinnedShades.slice(1), v]);
      } else {
        setPinnedShades([...pinnedShades, v]);
      }
    }
  };


  // Lock background body scroll when modal is open
  useEffect(() => {
    if (!activeLightboxVariant) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [activeLightboxVariant]);

  useEffect(() => {
    if (!activeLightboxVariant) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActiveLightboxVariant(null);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const currIdx = currentScene.variants.findIndex((v) => v.id === activeLightboxVariant.id);
        const prevIdx = (currIdx - 1 + currentScene.variants.length) % currentScene.variants.length;
        const prev = currentScene.variants[prevIdx];
        if (prev) setActiveLightboxVariant(prev);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const currIdx = currentScene.variants.findIndex((v) => v.id === activeLightboxVariant.id);
        const nextIdx = (currIdx + 1) % currentScene.variants.length;
        const next = currentScene.variants[nextIdx];
        if (next) setActiveLightboxVariant(next);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxVariant, currentScene.variants]);

  const leftVariant: RoomVariant = currentScene.variants[leftVariantIndex] ?? currentScene.variants[0]!;
  const rightVariant: RoomVariant = currentScene.variants[rightVariantIndex] ?? currentScene.variants[Math.min(1, currentScene.variants.length - 1)] ?? leftVariant;

  return (
    <section id="room-shade-studio" className="py-12 sm:py-16 lg:py-24 bg-[#0c1214] text-white border-t border-border-teal/40 relative overflow-hidden">
      {/* Decorative architectural ambient glow */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface/90 text-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-border-teal/60 backdrop-blur-md">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <ShinyText text={`Same Room Studio · ${totalVariantsCount} Variations Across ${ROOM_SHADE_STUDIO_SCENES.length} Architectural Spaces`} color="#2dd4bf" shineColor="#fbbf24" speed={3} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              <TrueFocus sentence="Same Room, Different Shades" borderColor="#2dd4bf" glowColor="rgba(45, 212, 191, 0.45)" animationDuration={0.4} />
            </h2>
            <p className="mt-3 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
              Explore how altering wall hues shifts mood, light reflectance, and spatial depth in the exact same room. Browse variations in the lookbook grid, or compare two shades side-by-side.
            </p>
          </div>

          {/* View Mode & Daylight Simulation Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-dark-surface/80 p-2.5 rounded-2xl border border-border-teal/60 backdrop-blur-md self-start lg:self-end">
            <JellyRadio
              name="room-studio-layout-mode"
              value={layoutMode}
              onChange={(val) => setLayoutMode(val as "grid" | "duo")}
              items={[
                { value: "grid", label: "Lookbook Grid", icon: <Grid className="w-3.5 h-3.5" /> },
                { value: "duo", label: "Dual Comparison", icon: <Columns className="w-3.5 h-3.5" /> },
              ]}
              skinColor="#10181b"
              activeColor="#2dd4bf"
              textColor="#94a3b8"
              activeTextColor="#090d0e"
            />

            {/* Daylight / Light Reflectance Elastic Slider */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-black/30 border border-white/5">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Light:
              </span>
              <div className="w-32">
                <ElasticSlider
                  defaultValue={lightingLevel}
                  startingValue={75}
                  maxValue={125}
                  isStepped={false}
                  leftIcon={<Moon className="w-3 h-3 text-zinc-500" />}
                  rightIcon={<Sun className="w-3 h-3 text-amber-400" />}
                  onChange={(val) => setLightingLevel(Math.round(val))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Room Study Selector Carousel */}
        <div className="mb-8">
          <ScrollableRow innerClassName="gap-3 pb-3 pt-1" showArrows={true} scrollStep={320}>
            {ROOM_SHADE_STUDIO_SCENES.map((scene, i) => {
              const isSelected = selectedSceneIndex === i;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => handleSceneSelect(i)}
                  className={`flex-shrink-0 group px-4 py-3 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? "bg-dark-surface border-accent text-white shadow-xl shadow-accent/10 ring-1 ring-accent/30"
                      : "bg-dark-surface/50 border-border-teal/50 text-on-dark-muted hover:bg-dark-surface hover:text-accent hover:border-accent/40"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-accent text-dark font-bold shadow-sm" : "bg-dark/80 text-on-dark-muted group-hover:text-accent"
                  }`}>
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-accent">
                        {scene.roomType}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-on-dark-muted font-mono">
                        {scene.variants.length} Shades
                      </span>
                    </div>
                    <h4 className="text-sm font-medium leading-snug mt-0.5">
                      {scene.name}
                    </h4>
                  </div>
                </button>
              );
            })}
          </ScrollableRow>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-dark-surface/60 p-4 rounded-2xl border border-border-teal/40 backdrop-blur-md">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Palette className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Filter By Tone Family:
            </span>
          </div>

          <div className="w-full sm:w-auto flex-1 min-w-0">
            <ScrollableRow innerClassName="gap-2 pb-1 sm:pb-0" showArrows={true} scrollStep={220}>
              {availableFamilies.map((family) => {
                const count = family === "All" ? currentScene.variants.length : familyCounts[family];
                return (
                  <button
                    key={family}
                    type="button"
                    onClick={() => handleFamilySelect(family)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 flex-shrink-0 ${
                      selectedFamily === family
                        ? "bg-accent text-dark border-accent font-bold shadow-sm"
                        : "bg-dark/60 text-on-dark-muted border-border-teal/60 hover:text-accent hover:border-accent/40"
                    }`}
                  >
                    <span>{family}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      selectedFamily === family ? "bg-dark/20 text-dark" : "bg-white/10 text-on-dark-muted"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </ScrollableRow>
          </div>
        </div>

        {/* Pinned Compare Quick Bar */}
        {pinnedShades.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-dark-surface border border-accent/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Selected For Comparison ({pinnedShades.length}/4):
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {pinnedShades.map((ps) => (
                  <div key={ps.id} className="flex items-center gap-1.5 bg-dark px-2.5 py-1 rounded-lg border border-border-teal">
                    <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: ps.hex }} />
                    <span className="text-xs text-white font-medium">{ps.label}</span>
                    <button type="button" onClick={() => togglePinShade(ps)} className="text-on-dark-muted hover:text-accent ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => {
                  const pin0 = pinnedShades[0];
                  const pin1 = pinnedShades[1];
                  if (pin0 && pin1) {
                    const lIdx = currentScene.variants.findIndex((v) => v.id === pin0.id);
                    const rIdx = currentScene.variants.findIndex((v) => v.id === pin1.id);
                    if (lIdx !== -1) setLeftVariantIndex(lIdx);
                    if (rIdx !== -1) setRightVariantIndex(rIdx);
                    setLayoutMode("duo");
                  }
                }}
                disabled={pinnedShades.length < 2}
                className="bg-accent text-dark font-bold text-xs hover:bg-accent/90 disabled:opacity-50"
              >
                Compare Pinned In Dual View
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPinnedShades([])}
                className="border-white/20 text-xs text-on-dark-muted hover:text-accent hover:border-accent/40"
              >
                Clear
              </Button>
            </div>
          </motion.div>
        )}

        {/* VIEW MODE 1: LOOKBOOK GRID SHOWCASE */}
        {layoutMode === "grid" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedVariants.map((variant, index) => {
                const isPinned = pinnedShades.some((p) => p.id === variant.id);

                return (
                  <motion.div
                    key={variant.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.4) }}
                    className="group relative rounded-2xl overflow-hidden bg-dark-surface border border-border-teal/60 hover:border-accent/80 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 flex flex-col justify-between"
                  >
                    {/* Visual Card Image */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-dark cursor-pointer" onClick={() => setActiveLightboxVariant(variant)}>
                      <ResponsiveImage
                        src={variant.url}
                        alt={`${currentScene.name} - ${variant.label}`}
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={275}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        style={{ filter: `brightness(${lightingLevel}%)` }}
                      />

                      {/* Ambient gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Quick Magnify Tap Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="px-3 py-1.5 rounded-full bg-dark/90 text-white text-xs font-semibold border border-white/20 shadow-lg flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-accent" /> Tap to Magnify
                        </span>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                        <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] text-white font-mono border border-white/10">
                          {variant.shadeCode}
                        </span>
                      </div>

                      {/* Pin button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinShade(variant);
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 ${
                          isPinned
                            ? "bg-accent text-dark font-bold shadow-lg"
                            : "bg-black/60 text-white/80 hover:bg-black/90 hover:text-accent hover:border-accent border border-white/20"
                        }`}
                        title={isPinned ? "Remove from comparison" : "Add to comparison"}
                      >
                        <Check className={`w-4 h-4 ${isPinned ? "stroke-[3]" : "opacity-70"}`} />
                      </button>

                      {/* Bottom Tone Swatch Badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                        <div className="flex items-center gap-2 bg-dark/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm flex-shrink-0"
                            style={{ backgroundColor: variant.hex }}
                          />
                          <span className="text-xs font-medium text-white truncate max-w-[140px]">
                            {variant.label}
                          </span>
                        </div>
                        <span className="text-[10px] text-on-dark-muted px-2 py-0.5 rounded bg-black/70 backdrop-blur-md">
                          {variant.family}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="p-4 bg-dark-surface/90 flex items-center justify-between gap-2 border-t border-border-teal/40">
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate">{variant.label}</h4>
                        <p className="text-[10px] text-on-dark-muted truncate mt-0.5">{variant.family} · {variant.shadeCode}</p>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Button
                          size="sm"
                          onClick={() => {
                            onEnquire?.(
                              `Shade Sample: ${variant.label} (${variant.shadeCode})`,
                              `I am requesting a shade swatch sample for ${variant.label} (${variant.shadeCode}) from ${currentScene.name}.`
                            );
                          }}
                          className="bg-accent/15 hover:bg-accent hover:text-dark text-accent border border-accent/30 text-xs px-2.5 py-1 h-7 rounded-lg transition-all"
                        >
                          <ShoppingBag className="w-3 h-3 mr-1" /> Sample
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW MODE 2: DUAL SIDE-BY-SIDE COMPARISON */}
        {layoutMode === "duo" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Room View */}
              <div className="bg-dark-surface rounded-2xl overflow-hidden border border-border-teal shadow-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: leftVariant.hex }} />
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">Left View: {leftVariant.label}</span>
                  </div>
                  <span className="text-[11px] text-on-dark-muted font-mono">{leftVariant.shadeCode}</span>
                </div>

                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-dark border border-white/10 group cursor-pointer" onClick={() => setActiveLightboxVariant(leftVariant)}>
                  <ResponsiveImage src={leftVariant.url} alt={leftVariant.label} loading="lazy" decoding="async" width={600} height={375} className="w-full h-full object-cover transition-all duration-300" style={{ filter: `brightness(${lightingLevel}%)` }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <span className="px-3 py-1.5 rounded-full bg-dark/90 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-accent" /> Magnify
                    </span>
                  </div>
                </div>

                {/* Left Shade Selector Thumbnails */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-on-dark-muted uppercase tracking-wider">
                      Switch Left Shade ({displayedVariants.length} available):
                    </span>
                    {selectedFamily !== "All" && (
                      <span className="text-[10px] text-accent font-semibold">{selectedFamily}</span>
                    )}
                  </div>
                  
                  <ThumbnailStrip
                    variants={displayedVariants}
                    allSceneVariants={currentScene.variants}
                    selectedIndex={leftVariantIndex}
                    onSelect={(idx) => setLeftVariantIndex(idx)}
                    activeColorClass="border-accent"
                  />
                </div>
              </div>

              {/* Right Room View */}
              <div className="bg-dark-surface rounded-2xl overflow-hidden border border-border-teal shadow-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: rightVariant.hex }} />
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Right View: {rightVariant.label}</span>
                  </div>
                  <span className="text-[11px] text-on-dark-muted font-mono">{rightVariant.shadeCode}</span>
                </div>

                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-dark border border-white/10 group cursor-pointer" onClick={() => setActiveLightboxVariant(rightVariant)}>
                  <ResponsiveImage src={rightVariant.url} alt={rightVariant.label} loading="lazy" decoding="async" width={600} height={375} className="w-full h-full object-cover transition-all duration-300" style={{ filter: `brightness(${lightingLevel}%)` }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <span className="px-3 py-1.5 rounded-full bg-dark/90 text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-accent" /> Magnify
                    </span>
                  </div>
                </div>

                {/* Right Shade Selector Thumbnails */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-on-dark-muted uppercase tracking-wider">
                      Switch Right Shade ({displayedVariants.length} available):
                    </span>
                    {selectedFamily !== "All" && (
                      <span className="text-[10px] text-teal-400 font-semibold">{selectedFamily}</span>
                    )}
                  </div>

                  <ThumbnailStrip
                    variants={displayedVariants}
                    allSceneVariants={currentScene.variants}
                    selectedIndex={rightVariantIndex}
                    onSelect={(idx) => setRightVariantIndex(idx)}
                    activeColorClass="border-teal-400"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Actions */}
        <div className="mt-12 p-6 rounded-2xl bg-dark-surface border border-border-teal/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-serif text-white">Need customized shade guidance for your exact home layout?</h4>
            <p className="text-xs text-on-dark-muted mt-1">Our certified Birla Opus colour consultants provide on-site digital sampling and daylight testing.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <Button
              onClick={() => {
                onEnquire?.(
                  `Room Shade Consultation: ${currentScene.name}`,
                  `I would like to book an in-person colour consultation for my space based on the ${currentScene.name} study.`
                );
              }}
              className="bg-accent text-dark font-bold hover:bg-accent/90 text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-accent/20 w-full sm:w-auto"
            >
              Book Colour Consultation
            </Button>
            {onExploreShades && (
              <Button
                variant="outline"
                onClick={onExploreShades}
                className="border-border-teal text-white hover:bg-dark text-xs px-4 py-2.5 rounded-xl w-full sm:w-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent mr-1.5" /> Full Colour Finder
              </Button>
            )}
          </div>
        </div>

      </div>

      {/* QUICK-TAP MAGNIFY LIGHTBOX / DETAIL MODAL WITH LIGHTING & MOTIF CONTROLS */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activeLightboxVariant && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="lightbox-shade-title"
                className="fixed inset-0 z-[1000000] h-[100dvh] w-full bg-black/95 backdrop-blur-xl flex flex-col p-0 sm:p-3 md:p-6 overflow-hidden"
                onClick={() => setActiveLightboxVariant(null)}
              >
                <div
                  className="bg-[#0b1114] border-0 sm:border border-border-teal/60 rounded-none sm:rounded-3xl w-full max-w-6xl mx-auto flex-1 flex flex-col shadow-2xl overflow-hidden relative min-h-0 h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Top Header */}
                  <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-4 border-b border-border-teal/40 bg-[#0e1619] flex-shrink-0 z-20">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/40 shadow-md flex-shrink-0"
                        style={{ backgroundColor: activeLightboxVariant.hex }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="text-[10px] sm:text-xs font-mono font-bold text-accent tracking-wider uppercase">
                            {activeLightboxVariant.shadeCode}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-sans truncate">
                            · {activeLightboxVariant.family}
                          </span>
                        </div>
                        <h3 id="lightbox-shade-title" className="text-sm sm:text-lg font-serif text-white truncate font-medium">
                          {activeLightboxVariant.label} · <span className="text-zinc-400 text-xs font-sans">{currentScene.name}</span>
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        onClick={() => {
                          onEnquire?.(
                            `Shade Order: ${activeLightboxVariant.label} (${activeLightboxVariant.shadeCode})`,
                            `I am enquiring about ${activeLightboxVariant.label} (${activeLightboxVariant.shadeCode}) from ${currentScene.name}.`
                          );
                        }}
                        className="bg-accent text-dark font-bold text-xs hover:bg-accent/90 h-8 px-3 rounded-lg hidden sm:flex items-center"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Order Sample
                      </Button>
                      <button
                        type="button"
                        onClick={() => setActiveLightboxVariant(null)}
                        className="w-8 h-8 rounded-full bg-teal-900/70 hover:bg-teal-800 text-teal-200 hover:text-accent border border-teal-700/40 hover:border-accent/40 flex items-center justify-center transition-all"
                        aria-label="Close lightbox"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Main Visual Display Stage (Visible Prominently at the top on mobile, centered flex-1 on desktop) */}
                  <div className="w-full relative flex items-center justify-center overflow-hidden bg-black/90 flex-shrink-0 h-[28vh] min-h-[190px] max-h-[300px] sm:h-auto sm:min-h-0 sm:max-h-none sm:flex-1 sm:order-2 border-b sm:border-b-0 border-border-teal/40">
                    {lightboxTab !== "motifs" ? (
                      <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 min-h-0">
                        {/* The Room Image Container with Layered Spatial Compositing Stack */}
                        <div className="relative h-full w-full max-h-full max-w-full rounded-lg sm:rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                          {/* Base Room Photograph */}
                          <ResponsiveImage
                            src={activeLightboxVariant.url}
                            alt={`${activeLightboxVariant.label} in ${currentScene.name}`}
                            className="max-h-full max-w-full object-contain transition-all duration-300 ease-out"
                            style={{
                              filter: lightboxTab === "lighting"
                                ? (isComparingOriginal ? "none" : (LIGHTING_ENVIRONMENTS.find((e) => e.id === lightingCondition)?.baseFilter || "none"))
                                : `brightness(${lightingLevel}%)`,
                              transition: "filter 350ms cubic-bezier(0.16, 1, 0.3, 1)"
                            }}
                          />

                          {/* Spatial Optical Compositing Stack (Active in Lighting Mode) */}
                          {lightboxTab === "lighting" && !isComparingOriginal && (() => {
                            const currentEnv = LIGHTING_ENVIRONMENTS.find((e) => e.id === lightingCondition) ?? LIGHTING_ENVIRONMENTS[1] ?? LIGHTING_ENVIRONMENTS[0]!;
                            const intensityFactor = lightingIntensity / 100;
                            return (
                              <>
                                {/* Layer 2: Directional Primary Light Field */}
                                <div
                                  className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
                                  style={{
                                    background: currentEnv.primaryLightGradient,
                                    mixBlendMode: currentEnv.primaryBlendMode,
                                    opacity: Math.min(1, currentEnv.primaryOpacity * intensityFactor),
                                    transition: "all 350ms cubic-bezier(0.16, 1, 0.3, 1)"
                                  }}
                                />

                                {/* Layer 3: Localized Accent Pool / Warm-Cool Light Pool */}
                                {currentEnv.accentLightGradient && (
                                  <div
                                    className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
                                    style={{
                                      background: currentEnv.accentLightGradient,
                                      mixBlendMode: currentEnv.accentBlendMode || "soft-light",
                                      opacity: Math.min(1, (currentEnv.accentOpacity || 0.5) * intensityFactor),
                                      transition: "all 350ms cubic-bezier(0.16, 1, 0.3, 1)"
                                    }}
                                  />
                                )}

                                {/* Layer 4: Spatial Shadow & Ambient Depth Falloff */}
                                <div
                                  className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
                                  style={{
                                    background: currentEnv.shadowGradient,
                                    mixBlendMode: currentEnv.shadowBlendMode,
                                    opacity: Math.min(1, currentEnv.shadowOpacity * intensityFactor),
                                    transition: "all 350ms cubic-bezier(0.16, 1, 0.3, 1)"
                                  }}
                                />
                              </>
                            );
                          })()}
                        </div>

                        {/* Prev Navigation Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const currIdx = currentScene.variants.findIndex((v) => v.id === activeLightboxVariant.id);
                            const prevIdx = (currIdx - 1 + currentScene.variants.length) % currentScene.variants.length;
                            const prev = currentScene.variants[prevIdx];
                            if (prev) setActiveLightboxVariant(prev);
                          }}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-dark text-white border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 z-20"
                          aria-label="Previous shade variation"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        {/* Next Navigation Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const currIdx = currentScene.variants.findIndex((v) => v.id === activeLightboxVariant.id);
                            const nextIdx = (currIdx + 1) % currentScene.variants.length;
                            const next = currentScene.variants[nextIdx];
                            if (next) setActiveLightboxVariant(next);
                          }}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-dark text-white border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 z-20"
                          aria-label="Next shade variation"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        {/* Lighting Environment Context Badge */}
                        {lightboxTab === "lighting" && (
                          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-accent/40 text-accent text-[10px] sm:text-xs font-sans font-medium flex items-center gap-1.5 sm:gap-2 shadow-xl z-20 whitespace-nowrap">
                            {isComparingOriginal ? (
                              <>
                                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-300" />
                                <span className="text-zinc-200">Original Daylight (Unfiltered)</span>
                              </>
                            ) : (
                              <>
                                {lightingCondition === "morning-sun" && <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />}
                                {lightingCondition === "bright-daylight" && <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-300" />}
                                {lightingCondition === "overcast" && <Cloud className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300" />}
                                {lightingCondition === "warm-indoor" && <Lamp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />}
                                {lightingCondition === "evening" && <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-300" />}
                                <span>
                                  {LIGHTING_ENVIRONMENTS.find((e) => e.id === lightingCondition)?.name} ·{" "}
                                  <span className="text-zinc-300 font-mono text-[9px] sm:text-[11px]">
                                    {LIGHTING_ENVIRONMENTS.find((e) => e.id === lightingCondition)?.colorTemp}
                                  </span>
                                  {lightingIntensity !== 100 && (
                                    <span className="text-amber-300 font-mono text-[9px] sm:text-[10px] ml-1">
                                      ({lightingIntensity}%)
                                    </span>
                                  )}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* MOTIFS & TEXTURES PREVIEW STAGE */
                      <div className="w-full h-full p-2 sm:p-4 flex items-center justify-center relative">
                        <div className="relative max-h-full max-w-full h-full w-full rounded-lg sm:rounded-xl overflow-hidden border border-border-teal/40 bg-black flex items-center justify-center">
                          <img
                            src={selectedLightboxTexture.url}
                            alt={selectedLightboxTexture.name}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 sm:p-4">
                            <span className="text-[9px] sm:text-[10px] font-mono text-accent uppercase tracking-wider">
                              {selectedLightboxTexture.category}
                            </span>
                            <h4 className="text-xs sm:text-base font-serif text-white font-medium">
                              {selectedLightboxTexture.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Controls & Options Body (Scrollable on Mobile, Sits above/below on desktop) */}
                  <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-2.5 sm:p-4 md:p-6 space-y-3 sm:order-1 bg-[#0b1114]">
                    {/* View Mode Tabs: [ Applied Room ] [ Lighting Conditions ] [ Motifs & Finishes ] */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-dark-surface/90 border border-border-teal/40 w-full sm:w-auto overflow-x-auto no-scrollbar">
                        <button
                          type="button"
                          onClick={() => setLightboxTab("room")}
                          className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all duration-200 flex-1 sm:flex-none justify-center whitespace-nowrap ${
                            lightboxTab === "room"
                              ? "bg-accent text-dark shadow-sm"
                              : "text-zinc-300 hover:text-accent hover:bg-teal-900/40"
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Applied Room</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLightboxTab("lighting")}
                          className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all duration-200 flex-1 sm:flex-none justify-center whitespace-nowrap ${
                            lightboxTab === "lighting"
                              ? "bg-accent text-dark shadow-sm"
                              : "text-zinc-300 hover:text-accent hover:bg-teal-900/40"
                          }`}
                        >
                          <Sun className="w-3.5 h-3.5" />
                          <span>Lighting Conditions</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLightboxTab("motifs")}
                          className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all duration-200 flex-1 sm:flex-none justify-center whitespace-nowrap ${
                            lightboxTab === "motifs"
                              ? "bg-accent text-dark shadow-sm"
                              : "text-zinc-300 hover:text-accent hover:bg-teal-900/40"
                          }`}
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Motifs & Finishes</span>
                        </button>
                      </div>

                      {/* Active Context Label (When in Lighting Mode) */}
                      {lightboxTab === "lighting" && (
                        <div className="hidden sm:flex items-center gap-3 text-xs font-sans">
                          <div className="flex items-center gap-1.5 text-accent font-medium">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span>{LIGHTING_ENVIRONMENTS.find((e) => e.id === lightingCondition)?.contextLabel}</span>
                          </div>
                          <span className="text-zinc-500 hidden md:inline">·</span>
                          <span className="text-[11px] font-mono text-zinc-300 bg-white/5 px-2 py-0.5 rounded-full border border-white/10 hidden md:inline">
                            {LIGHTING_ENVIRONMENTS.find((e) => e.id === lightingCondition)?.colorTemp}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Tab 1: LIGHTING CONTROLS */}
                    {lightboxTab === "lighting" && (
                      <div className="p-2.5 sm:p-3.5 rounded-2xl bg-[#090f11] border border-border-teal/40 space-y-2.5">
                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2 w-full">
                          {LIGHTING_ENVIRONMENTS.map((env, index) => {
                            const isSelected = lightingCondition === env.id;
                            return (
                              <button
                                key={env.id}
                                type="button"
                                onClick={() => setLightingCondition(env.id)}
                                className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all flex items-center sm:items-start gap-2 sm:gap-2.5 w-full ${
                                  index === 4 ? "col-span-2 xs:col-span-1 sm:col-span-1" : ""
                                } ${
                                  isSelected
                                    ? "bg-accent/15 border-accent text-white shadow-md shadow-accent/10 ring-1 ring-accent/40"
                                    : "bg-dark/80 border-border-teal/40 text-zinc-400 hover:text-white hover:border-accent/40 hover:bg-dark"
                                }`}
                              >
                                <div
                                  className={`p-1.5 rounded-lg flex-shrink-0 transition-colors ${
                                    isSelected ? "bg-accent text-dark" : "bg-white/5 text-zinc-300"
                                  }`}
                                >
                                  {env.icon === "sun" && <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                  {env.icon === "sun-bright" && <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                  {env.icon === "cloud" && <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                  {env.icon === "lamp" && <Lamp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                  {env.icon === "moon" && <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span
                                      className={`text-xs font-semibold leading-tight truncate ${
                                        isSelected ? "text-accent" : "text-white"
                                      }`}
                                    >
                                      {env.name}
                                    </span>
                                    {isSelected && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 animate-pulse" />
                                    )}
                                  </div>
                                  <span className="text-[9px] sm:text-[10px] text-zinc-400 line-clamp-1 sm:line-clamp-2 leading-snug mt-0.5">
                                    {env.shortDesc}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Secondary Micro-Tuning Bar: Intensity Slider & Hold to Compare */}
                        <div className="flex items-center justify-between gap-2 sm:gap-3 pt-2 border-t border-white/5 flex-wrap">
                          <div className="flex items-center gap-2 text-xs flex-wrap">
                            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                              <Sun className="w-3 h-3 text-accent" />
                              <span className="font-medium hidden xs:inline">Intensity:</span>
                            </span>
                            <div className="flex items-center gap-1">
                              {[
                                { label: "Subtle", val: 70 },
                                { label: "Balanced", val: 100 },
                                { label: "Vivid", val: 130 }
                              ].map((preset) => (
                                <button
                                  key={preset.val}
                                  type="button"
                                  onClick={() => setLightingIntensity(preset.val)}
                                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all duration-200 ${
                                    lightingIntensity === preset.val
                                      ? "bg-accent text-dark font-bold shadow-sm"
                                      : "bg-teal-950/60 border border-border-teal/30 text-zinc-400 hover:text-accent hover:bg-teal-900/50 hover:border-accent/40"
                                  }`}
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="150"
                              step="5"
                              value={lightingIntensity}
                              onChange={(e) => setLightingIntensity(Number(e.target.value))}
                              className="w-16 sm:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
                              aria-label="Lighting Intensity Slider"
                            />
                            <span className="text-[10px] font-mono text-zinc-400">{lightingIntensity}%</span>
                          </div>

                          {/* Hold to Compare Natural Daylight Reference */}
                          <button
                            type="button"
                            onMouseDown={() => setIsComparingOriginal(true)}
                            onMouseUp={() => setIsComparingOriginal(false)}
                            onMouseLeave={() => setIsComparingOriginal(false)}
                            onTouchStart={() => setIsComparingOriginal(true)}
                            onTouchEnd={() => setIsComparingOriginal(false)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 select-none ${
                              isComparingOriginal
                                ? "bg-accent text-dark scale-95 shadow-md shadow-accent/20"
                                : "bg-teal-950/70 text-zinc-300 hover:text-accent hover:bg-teal-900/60 border border-border-teal/50 hover:border-accent/50"
                            }`}
                            title="Press and hold to view the natural unedited room photo"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isComparingOriginal ? "Viewing Daylight" : "Hold to Compare (Daylight)"}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: APPLIED ROOM SPECIFICATIONS */}
                    {lightboxTab === "room" && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3 rounded-2xl bg-dark-surface/60 border border-border-teal/40 text-xs">
                        <div>
                          <span className="text-zinc-500 text-[10px] uppercase font-mono block">Shade Code</span>
                          <span className="font-mono font-bold text-white text-xs sm:text-sm">{activeLightboxVariant.shadeCode}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[10px] uppercase font-mono block">Tone Family</span>
                          <span className="font-semibold text-white truncate block text-xs sm:text-sm">{activeLightboxVariant.family}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[10px] uppercase font-mono block">Calibrated Hex</span>
                          <span className="font-mono text-accent text-xs sm:text-sm font-semibold">{activeLightboxVariant.hex.toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[10px] uppercase font-mono block">Dealer Status</span>
                          <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                            <Check className="w-3 h-3" /> In-Store Tinting
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tab 3: MOTIFS & TEXTURES RAIL */}
                    {lightboxTab === "motifs" && (
                      <div className="p-3 rounded-2xl bg-dark-surface/60 border border-border-teal/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-accent" /> Paired Birla Opus Textures
                          </span>
                          <span className="text-[10px] text-zinc-400">
                            Tap to preview
                          </span>
                        </div>

                        <ScrollableRow innerClassName="gap-2 pb-1" showArrows={true} scrollStep={220}>
                          {BIRLA_OPUS_ACCENT_TEXTURES.map((tex) => {
                            const isSelected = selectedLightboxTexture.id === tex.id;
                            return (
                              <button
                                key={tex.id}
                                type="button"
                                onClick={() => setSelectedLightboxTexture(tex)}
                                className={`flex-shrink-0 w-24 rounded-xl overflow-hidden border p-1 text-left transition-all ${
                                  isSelected
                                    ? "border-accent bg-accent/10 shadow-lg scale-105"
                                    : "border-border-teal/50 bg-dark/60 hover:border-accent/40"
                                }`}
                              >
                                <div className="aspect-square w-full rounded-lg overflow-hidden bg-black mb-1">
                                  <img src={tex.url} alt={tex.name} className="w-full h-full object-cover" loading="lazy" />
                                </div>
                                <div className="text-[10px] font-semibold text-white truncate">{tex.name}</div>
                                <div className="text-[8px] text-zinc-400 truncate">{tex.category}</div>
                              </button>
                            );
                          })}
                        </ScrollableRow>
                      </div>
                    )}

                    {/* Switch Room Shades Thumbnail Strip */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                          Same Room Variations ({currentScene.variants.length} Shades):
                        </span>
                        <span className="text-[10px] text-accent font-mono">
                          {activeLightboxVariant.shadeCode} Selected
                        </span>
                      </div>

                      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar scroll-smooth">
                        {currentScene.variants.map((v) => {
                          const isActive = activeLightboxVariant.id === v.id;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => setActiveLightboxVariant(v)}
                              className={`flex-shrink-0 relative rounded-lg overflow-hidden border-2 w-16 h-11 transition-all ${
                                isActive ? "border-accent ring-1 ring-accent/40 scale-105 shadow-md" : "border-white/20 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <ResponsiveImage src={v.url} alt={v.label} loading="lazy" decoding="async" width={64} height={44} className="w-full h-full object-cover" />
                              <div className="absolute inset-x-0 bottom-0 bg-black/80 text-[7px] text-white px-1 py-0.5 truncate text-center font-mono">
                                {v.shadeCode}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 4. Bottom Sticky Action Bar */}
                  <div className="p-3 sm:p-4 bg-[#0e1619] border-t border-border-teal/40 flex items-center justify-between gap-2.5 flex-shrink-0 z-20 sm:order-3">
                    <div className="flex items-center gap-2 w-full justify-between">
                      <Button
                        size="sm"
                        onClick={() => {
                          onEnquire?.(
                            `Shade Order: ${activeLightboxVariant.label} (${activeLightboxVariant.shadeCode})`,
                            `I am enquiring about ${activeLightboxVariant.label} (${activeLightboxVariant.shadeCode}) from ${currentScene.name}.`
                          );
                        }}
                        className="bg-accent text-dark font-bold text-xs hover:bg-accent/90 h-10 px-4 rounded-xl flex-1 flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Sample Kit</span>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs h-10 px-4 rounded-xl flex-1"
                      >
                        <a
                          href={`https://wa.me/918756659035?text=${encodeURIComponent(
                            `Hello Jaymurti Traders, I am enquiring about Birla Opus shade ${activeLightboxVariant.label} (${activeLightboxVariant.shadeCode}) in ${currentScene.name}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Showroom</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

