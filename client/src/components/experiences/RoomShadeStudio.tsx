import React, { useState } from "react";
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
  SplitSquareVertical,
  Check,
  Grid,
  Columns
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RoomShadeStudioProps {
  onEnquire?: (title: string, details: string) => void;
  onExploreShades?: () => void;
}

export const RoomShadeStudio: React.FC<RoomShadeStudioProps> = ({ onEnquire, onExploreShades }) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState<number>(0);
  const currentScene: RoomScene = ROOM_SHADE_STUDIO_SCENES[selectedSceneIndex] || ROOM_SHADE_STUDIO_SCENES[0];

  // Tone family filter
  const [selectedFamily, setSelectedFamily] = useState<string>("All");

  // View Layout Modes: 'grid' (Pinterest/Lookbook Multi-Card) vs 'duo' (Direct 2-up Side-by-Side)
  const [layoutMode, setLayoutMode] = useState<"grid" | "duo">("grid");

  // Dual side-by-side comparison indices
  const [leftVariantIndex, setLeftVariantIndex] = useState<number>(0);
  const [rightVariantIndex, setRightVariantIndex] = useState<number>(1 % currentScene.variants.length);

  // Active Lightbox Modal for quick-tap magnification
  const [activeLightboxVariant, setActiveLightboxVariant] = useState<RoomVariant | null>(null);

  // Comparison drawer pinned items
  const [pinnedShades, setPinnedShades] = useState<RoomVariant[]>([]);

  const handleSceneSelect = (index: number) => {
    setSelectedSceneIndex(index);
    setSelectedFamily("All");
    setLeftVariantIndex(0);
    setRightVariantIndex(1 % (ROOM_SHADE_STUDIO_SCENES[index]?.variants.length || 1));
  };

  const totalVariantsCount = ROOM_SHADE_STUDIO_SCENES.reduce((acc, s) => acc + s.variants.length, 0);

  // Available color families in current scene
  const availableFamilies = ["All", ...Array.from(new Set(currentScene.variants.map((v) => v.family || "Neutral")))];

  // Filtered variants
  const displayedVariants = selectedFamily === "All"
    ? currentScene.variants
    : currentScene.variants.filter((v) => v.family === selectedFamily);

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

  const leftVariant: RoomVariant = currentScene.variants[leftVariantIndex] || currentScene.variants[0];
  const rightVariant: RoomVariant = currentScene.variants[rightVariantIndex] || currentScene.variants[Math.min(1, currentScene.variants.length - 1)];

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
              Lookbook Comparison Showcase · {totalVariantsCount} Variations Across {ROOM_SHADE_STUDIO_SCENES.length} Architectural Spaces
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              Same Room, Different Shades
            </h2>
            <p className="mt-3 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
              Explore how altering wall hues shifts mood, light reflectance, and spatial depth. Browse shades in a visual lookbook, tap any card to magnify, or switch to dual side-by-side comparison.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-dark-surface/80 p-1.5 rounded-2xl border border-border-teal/60 backdrop-blur-md self-start lg:self-end">
            <button
              onClick={() => setLayoutMode("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                layoutMode === "grid"
                  ? "bg-accent text-dark font-bold shadow-md"
                  : "text-on-dark-muted hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" /> Lookbook Grid
            </button>
            <button
              onClick={() => setLayoutMode("duo")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                layoutMode === "duo"
                  ? "bg-accent text-dark font-bold shadow-md"
                  : "text-on-dark-muted hover:text-white"
              }`}
            >
              <Columns className="w-4 h-4" /> Dual Comparison
            </button>
          </div>
        </div>

        {/* Room Study Selector Pills */}
        <div className="mb-10">
          <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
            {ROOM_SHADE_STUDIO_SCENES.map((scene, i) => {
              const isSelected = selectedSceneIndex === i;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleSceneSelect(i)}
                  className={`flex-shrink-0 group px-4 py-3 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? "bg-dark-surface border-accent text-white shadow-xl shadow-accent/10 ring-1 ring-accent/30"
                      : "bg-dark-surface/50 border-border-teal/50 text-on-dark-muted hover:bg-dark-surface hover:text-white hover:border-border-teal"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-accent text-dark font-bold shadow-sm" : "bg-dark/80 text-on-dark-muted group-hover:text-white"
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
          </div>
        </div>

        {/* Filter Bar & Sub-Context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-dark-surface/60 p-4 rounded-2xl border border-border-teal/40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Filter By Tone Family:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {availableFamilies.map((family) => (
              <button
                key={family}
                onClick={() => {
                  setSelectedFamily(family);
                  if (layoutMode === "duo" && family !== "All") {
                    const matches = currentScene.variants.filter((v) => v.family === family);
                    if (matches.length > 0) {
                      const firstIdx = currentScene.variants.findIndex((v) => v.id === matches[0].id);
                      const secondIdx = matches.length > 1
                        ? currentScene.variants.findIndex((v) => v.id === matches[1].id)
                        : firstIdx;
                      if (firstIdx !== -1) setLeftVariantIndex(firstIdx);
                      if (secondIdx !== -1) setRightVariantIndex(secondIdx);
                    }
                  }
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all flex-shrink-0 ${
                  selectedFamily === family
                    ? "bg-accent text-dark border-accent font-bold shadow-sm"
                    : "bg-dark/60 text-on-dark-muted border-border-teal/60 hover:text-white hover:border-border-teal"
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Compare Quick Bar (If items are pinned) */}
        {pinnedShades.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-dark-surface border border-accent/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Selected For Comparison ({pinnedShades.length}/4):
              </span>
              <div className="flex items-center gap-2">
                {pinnedShades.map((ps) => (
                  <div key={ps.id} className="flex items-center gap-1.5 bg-dark px-2.5 py-1 rounded-lg border border-border-teal">
                    <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: ps.hex }} />
                    <span className="text-xs text-white font-medium">{ps.label}</span>
                    <button onClick={() => togglePinShade(ps)} className="text-on-dark-muted hover:text-white ml-1">
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
                  if (pinnedShades.length >= 2) {
                    const lIdx = currentScene.variants.findIndex((v) => v.id === pinnedShades[0].id);
                    const rIdx = currentScene.variants.findIndex((v) => v.id === pinnedShades[1].id);
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
                className="border-white/20 text-xs text-on-dark-muted hover:text-white"
              >
                Clear
              </Button>
            </div>
          </motion.div>
        )}

        {/* VIEW MODE 1: PINTEREST / LOOKBOOK GRID SHOWCASE */}
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
                      <img
                        src={variant.url}
                        alt={`${currentScene.name} - ${variant.label}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinShade(variant);
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 ${
                          isPinned
                            ? "bg-accent text-dark font-bold shadow-lg"
                            : "bg-black/60 text-white/80 hover:bg-black/90 hover:text-white border border-white/20"
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
                  <img src={leftVariant.url} alt={leftVariant.label} className="w-full h-full object-cover" />
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
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {displayedVariants.map((v) => {
                      const origIdx = currentScene.variants.findIndex((x) => x.id === v.id);
                      return (
                        <button
                          key={v.id}
                          onClick={() => setLeftVariantIndex(origIdx)}
                          className={`flex-shrink-0 relative rounded-lg overflow-hidden border-2 w-16 h-12 transition-all ${
                            leftVariantIndex === origIdx ? "border-accent scale-105" : "border-border-teal/60 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={v.url} alt={v.label} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white truncate text-center px-0.5">
                            {v.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
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
                  <img src={rightVariant.url} alt={rightVariant.label} className="w-full h-full object-cover" />
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
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {displayedVariants.map((v) => {
                      const origIdx = currentScene.variants.findIndex((x) => x.id === v.id);
                      return (
                        <button
                          key={v.id}
                          onClick={() => setRightVariantIndex(origIdx)}
                          className={`flex-shrink-0 relative rounded-lg overflow-hidden border-2 w-16 h-12 transition-all ${
                            rightVariantIndex === origIdx ? "border-teal-400 scale-105" : "border-border-teal/60 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={v.url} alt={v.label} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white truncate text-center px-0.5">
                            {v.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Actions */}
        <div className="mt-12 p-6 rounded-2xl bg-dark-surface border border-border-teal/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-serif text-white">Need customized shade guidance for your exact home layout?</h4>
            <p className="text-xs text-on-dark-muted mt-1">Our certified Birla Opus colour consultants provide on-site digital sampling and daylight testing.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
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

      {/* QUICK-TAP MAGNIFY LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxVariant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full border border-white/40 shadow-md"
                  style={{ backgroundColor: activeLightboxVariant.hex }}
                />
                <div>
                  <h3 className="text-lg font-serif text-white">{currentScene.name}</h3>
                  <p className="text-xs text-on-dark-muted">
                    {activeLightboxVariant.label} · {activeLightboxVariant.shadeCode} ({activeLightboxVariant.family})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    onEnquire?.(
                      `Shade Order: ${activeLightboxVariant.label} (${activeLightboxVariant.shadeCode})`,
                      `I am enquiring about ${activeLightboxVariant.label} (${activeLightboxVariant.shadeCode}) from ${currentScene.name}.`
                    );
                  }}
                  className="bg-accent text-dark font-bold text-xs hover:bg-accent/90 h-8 px-3 rounded-lg"
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Order Sample
                </Button>
                <button
                  onClick={() => setActiveLightboxVariant(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High-Resolution Full Display with Prev/Next Navigation */}
            <div className="flex-1 relative flex items-center justify-center rounded-2xl overflow-hidden bg-dark border border-white/10">
              <img
                src={activeLightboxVariant.url}
                alt={activeLightboxVariant.label}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={() => {
                  const currIdx = currentScene.variants.findIndex((v) => v.id === activeLightboxVariant.id);
                  const prevIdx = (currIdx - 1 + currentScene.variants.length) % currentScene.variants.length;
                  setActiveLightboxVariant(currentScene.variants[prevIdx]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark/80 hover:bg-dark text-white border border-white/20 flex items-center justify-center transition-all shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={() => {
                  const currIdx = currentScene.variants.findIndex((v) => v.id === activeLightboxVariant.id);
                  const nextIdx = (currIdx + 1) % currentScene.variants.length;
                  setActiveLightboxVariant(currentScene.variants[nextIdx]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark/80 hover:bg-dark text-white border border-white/20 flex items-center justify-center transition-all shadow-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom thumbnail scrubber in lightbox */}
            <div className="mt-4 flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
              {currentScene.variants.map((v) => {
                const isActive = activeLightboxVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setActiveLightboxVariant(v)}
                    className={`flex-shrink-0 relative rounded-lg overflow-hidden border-2 w-20 h-14 transition-all ${
                      isActive ? "border-accent scale-105 shadow-md" : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={v.url} alt={v.label} className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 text-[8px] text-white px-1 py-0.5 truncate text-center">
                      {v.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
