import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type BirlaOpusShade } from "@shared/verifiedBirlaOpusShades";
import {
  getShadeVisualInfo,
  BIRLA_OPUS_ACCENT_TEXTURES,
  type ShadeVisualInfo,
  type PairedTexture
} from "@/data/shadeVisualMappings";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { Button } from "@/components/ui/button";
import {
  X,
  Sun,
  Moon,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Copy,
  Check,
  Eye,
  Layers,
  Palette,
  Info,
  Sliders
} from "lucide-react";

export interface ShadeDetailModalProps {
  shade: BirlaOpusShade | null;
  onClose: () => void;
  onAddToCart: (item: {
    id: string;
    type: "shade";
    title: string;
    meta: string;
    colourHex: string;
  }) => void;
}

type VisualTab = "room" | "lighting" | "motifs";
type LightingPreset = "daylight" | "normal" | "evening";

export const ShadeDetailModal: React.FC<ShadeDetailModalProps> = ({
  shade,
  onClose,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<VisualTab>("room");
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>("normal");
  const [lightingBrightness, setLightingBrightness] = useState<number>(100);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<PairedTexture | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  // Retrieve visual info mapped from room-inspiration / same-room-shades
  const visualInfo: ShadeVisualInfo | undefined = shade
    ? getShadeVisualInfo(shade.code)
    : undefined;

  // Lock body scroll on mount
  useEffect(() => {
    if (!shade) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Keyboard ESC to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shade, onClose]);

  // Reset tab and lighting when shade changes
  useEffect(() => {
    if (shade) {
      setActiveTab("room");
      setLightingPreset("normal");
      setLightingBrightness(100);
      setSelectedTexture(null);
      setIsImageLoaded(false);
    }
  }, [shade?.code]);

  if (!shade) return null;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedCode(shade.code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handlePresetSelect = (preset: LightingPreset) => {
    setLightingPreset(preset);
    if (preset === "daylight") setLightingBrightness(115);
    else if (preset === "normal") setLightingBrightness(100);
    else if (preset === "evening") setLightingBrightness(82);
  };

  // Compute CSS filter for lighting simulation
  const getFilterStyle = (): React.CSSProperties => {
    if (activeTab === "motifs") return {};
    
    // Smooth transition
    let filterString = `brightness(${lightingBrightness}%)`;
    if (lightingPreset === "evening") {
      filterString += ` sepia(10%) contrast(102%)`;
    } else if (lightingPreset === "daylight") {
      filterString += ` contrast(103%)`;
    }

    return {
      filter: filterString,
      transition: "filter 300ms ease-out"
    };
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Jaymurti Traders, I am enquiring about Birla Opus shade ${shade.name} (Code: ${shade.code}, Hex: ${shade.digitalColor}). Can you check tinting availability at your Baskhari showroom?`
  );

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shade-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#0b1114] border border-border-teal/60 sm:rounded-3xl rounded-t-3xl w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
        >
          {/* Top Sticky Header */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-border-teal/40 bg-[#0e1619]/90 backdrop-blur-md z-20 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {/* Authentic color swatch pill */}
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white/30 shadow-md flex-shrink-0"
                style={{ backgroundColor: shade.digitalColor }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-accent tracking-wider uppercase">
                    {shade.code}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-sans hidden xs:inline">
                    · {shade.family}
                  </span>
                </div>
                <h2
                  id="shade-modal-title"
                  className="text-lg sm:text-xl font-serif text-white truncate font-medium"
                >
                  {shade.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-teal-950/80 hover:bg-teal-900 text-teal-200 hover:text-accent border border-teal-700/50 hover:border-accent/50 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Close shade details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Modal Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-7 space-y-6 custom-scrollbar">
            {/* Primary Visual Stage Container */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/60 border border-border-teal/50 shadow-inner">
                {/* 1. ROOM / LIGHTING MODE (When room match exists) */}
                {activeTab !== "motifs" && visualInfo?.hasRoomMatch && visualInfo.roomImageUrl ? (
                  <div className="w-full h-full relative">
                    {!isImageLoaded && (
                      <div className="absolute inset-0 bg-[#121c20] animate-pulse flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2 text-zinc-500">
                          <Eye className="w-6 h-6 animate-bounce text-accent/60" />
                          <span className="text-xs font-mono">Loading Room Inspiration...</span>
                        </div>
                      </div>
                    )}
                    <ResponsiveImage
                      src={visualInfo.roomImageUrl}
                      mobileSrc={visualInfo.roomMobileImageUrl}
                      alt={`Birla Opus ${shade.name} in Room Inspiration Scene`}
                      width={800}
                      height={450}
                      loading="eager"
                      decoding="async"
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      style={getFilterStyle()}
                      onLoad={() => setIsImageLoaded(true)}
                    />

                    {/* Gradient overlay for text contrast at base */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                    {/* Room Metadata Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium shadow-md">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/40 flex-shrink-0"
                          style={{ backgroundColor: shade.digitalColor }}
                        />
                        <span className="truncate">
                          Living Room Inspiration · {visualInfo.confidenceBand <= 2 ? "High-Fidelity Match" : "Tonal Mood Match"}
                        </span>
                      </div>

                      {activeTab === "lighting" && (
                        <div className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-accent/40 text-accent text-[11px] font-mono font-semibold flex items-center gap-1 shadow-md">
                          {lightingPreset === "daylight" && <Sun className="w-3 h-3 text-amber-400" />}
                          {lightingPreset === "normal" && <Sparkles className="w-3 h-3 text-teal-400" />}
                          {lightingPreset === "evening" && <Moon className="w-3 h-3 text-indigo-400" />}
                          <span className="capitalize">{lightingPreset} ({lightingBrightness}%)</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : activeTab === "motifs" ? (
                  /* 2. MOTIF / TEXTURE STAGE */
                  <div className="w-full h-full relative bg-[#0e1619] p-4 flex flex-col justify-between">
                    <div className="relative w-full h-[80%] rounded-xl overflow-hidden border border-border-teal/40 bg-black">
                      <img
                        src={selectedTexture?.url ?? BIRLA_OPUS_ACCENT_TEXTURES[0]?.url ?? ""}
                        alt={selectedTexture?.name ?? BIRLA_OPUS_ACCENT_TEXTURES[0]?.name ?? "Birla Opus Interior Texture"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
                        <span className="text-[10px] font-mono text-accent uppercase tracking-wider">
                          {selectedTexture?.category ?? BIRLA_OPUS_ACCENT_TEXTURES[0]?.category ?? ""}
                        </span>
                        <h4 className="text-sm font-serif text-white font-medium">
                          {selectedTexture?.name ?? BIRLA_OPUS_ACCENT_TEXTURES[0]?.name ?? ""}
                        </h4>
                        <p className="text-[11px] text-zinc-300 mt-0.5 line-clamp-1">
                          {selectedTexture?.description ?? BIRLA_OPUS_ACCENT_TEXTURES[0]?.description ?? ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                      <span className="flex items-center gap-1.5 text-accent">
                        <Layers className="w-3.5 h-3.5" /> Paired with {shade.name}
                      </span>
                      <span>Authentic Birla Opus Interior Finishes</span>
                    </div>
                  </div>
                ) : (
                  /* 3. CLEAN FALLBACK (When no room match is available for deep tones like Purples/Greens) */
                  <div
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative"
                    style={{ backgroundColor: shade.digitalColor }}
                  >
                    <div className="bg-black/85 backdrop-blur-md border border-white/15 p-5 rounded-2xl max-w-md shadow-2xl text-white space-y-2">
                      <div className="w-10 h-10 rounded-full mx-auto border-2 border-white/40 shadow-inner flex items-center justify-center" style={{ backgroundColor: shade.digitalColor }}>
                        <Palette className="w-5 h-5 text-white drop-shadow" />
                      </div>
                      <div className="text-base font-bold font-serif">{shade.name}</div>
                      <div className="text-xs font-mono text-accent">{shade.code} · {shade.digitalColor.toUpperCase()}</div>
                      <p className="text-xs text-zinc-300 leading-relaxed pt-1 border-t border-white/10">
                        Room inspiration preview for this deep tone is physically prepared at our Baskhari showroom fan-deck.
                      </p>
                      <div className="text-[10px] text-zinc-400">
                        Authentic Birla Opus {shade.family} Collection
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* View Mode Tabs: [ Applied Room ] [ Lighting Simulation ] [ Motifs & Textures ] */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-dark-surface/80 border border-border-teal/50 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab("room")}
                  disabled={!visualInfo?.hasRoomMatch}
                  className={`text-xs px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all duration-200 flex-1 justify-center whitespace-nowrap min-h-[42px] ${
                    activeTab === "room"
                      ? "bg-accent text-dark shadow-md"
                      : !visualInfo?.hasRoomMatch
                      ? "opacity-40 cursor-not-allowed text-zinc-500"
                      : "text-zinc-300 hover:text-accent hover:bg-teal-900/40"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Applied Room</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("lighting")}
                  disabled={!visualInfo?.hasRoomMatch}
                  className={`text-xs px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all duration-200 flex-1 justify-center whitespace-nowrap min-h-[42px] ${
                    activeTab === "lighting"
                      ? "bg-accent text-dark shadow-md"
                      : !visualInfo?.hasRoomMatch
                      ? "opacity-40 cursor-not-allowed text-zinc-500"
                      : "text-zinc-300 hover:text-accent hover:bg-teal-900/40"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Lighting Conditions</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("motifs")}
                  className={`text-xs px-3.5 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all duration-200 flex-1 justify-center whitespace-nowrap min-h-[42px] ${
                    activeTab === "motifs"
                      ? "bg-accent text-dark shadow-md"
                      : "text-zinc-300 hover:text-accent hover:bg-teal-900/40"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Motifs & Finishes</span>
                </button>
              </div>
            </div>

            {/* TAB-SPECIFIC CONTROLS & PANELS */}
            {/* 1. Lighting Controls Panel */}
            {activeTab === "lighting" && visualInfo?.hasRoomMatch && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-dark-surface/60 border border-border-teal/40 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      Daylight & Evening Reflectance
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-accent">
                    {lightingBrightness}% Output
                  </span>
                </div>

                {/* Segmented Preset Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePresetSelect("daylight")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all min-h-[44px] justify-center ${
                      lightingPreset === "daylight"
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md"
                        : "bg-dark/60 border-border-teal/50 text-zinc-400 hover:text-white hover:border-amber-400/50"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bright Daylight</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePresetSelect("normal")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all min-h-[44px] justify-center ${
                      lightingPreset === "normal"
                        ? "bg-teal-500/20 border-teal-400 text-teal-300 shadow-md"
                        : "bg-dark/60 border-border-teal/50 text-zinc-400 hover:text-white hover:border-teal-400/50"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Standard Light</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePresetSelect("evening")}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all min-h-[44px] justify-center ${
                      lightingPreset === "evening"
                        ? "bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-md"
                        : "bg-dark/60 border-border-teal/50 text-zinc-400 hover:text-white hover:border-indigo-400/50"
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dark / Evening</span>
                  </button>
                </div>

                {/* Fine-Tuning Slider */}
                <div className="flex items-center gap-3 pt-1">
                  <Moon className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                  <input
                    type="range"
                    min="75"
                    max="125"
                    step="1"
                    value={lightingBrightness}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setLightingBrightness(val);
                      if (val > 108) setLightingPreset("daylight");
                      else if (val < 92) setLightingPreset("evening");
                      else setLightingPreset("normal");
                    }}
                    aria-label="Lighting level slider"
                    className="w-full accent-accent h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <Sun className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 pt-2 border-t border-white/5 text-[10px] text-zinc-400 leading-relaxed">
                  <Info className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Digital Reflectance Simulation:</strong> Preview of how wall reflectance shifts between bright natural daylight and warm evening artificial light. For exact metamerism under your home lighting, order physical swatches.
                  </span>
                </div>
              </motion.div>
            )}

            {/* 2. Motifs & Textures Selector Rail */}
            {activeTab === "motifs" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-dark-surface/60 border border-border-teal/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    Complementary Birla Opus Textures & Motifs
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    Tap to preview
                  </span>
                </div>

                <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
                  {BIRLA_OPUS_ACCENT_TEXTURES.map((tex) => {
                    const isSelected = selectedTexture?.id === tex.id || (!selectedTexture && tex.id === BIRLA_OPUS_ACCENT_TEXTURES[0]?.id);
                    return (
                      <button
                        key={tex.id}
                        type="button"
                        onClick={() => setSelectedTexture(tex)}
                        className={`flex-shrink-0 w-24 rounded-xl overflow-hidden border p-1 text-left transition-all ${
                          isSelected
                            ? "border-accent bg-accent/10 shadow-lg scale-105"
                            : "border-border-teal/50 bg-dark/60 hover:border-accent/40"
                        }`}
                      >
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-black mb-1.5">
                          <img src={tex.url} alt={tex.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="text-[10px] font-semibold text-white truncate">{tex.name}</div>
                        <div className="text-[8px] text-zinc-400 truncate">{tex.category}</div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 3. Authentic Shade Specification Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-dark-surface/60 border border-border-teal/40 text-xs">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase font-mono block">Shade Code</span>
                <span className="font-mono font-bold text-white text-sm">{shade.code}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase font-mono block">Tone Family</span>
                <span className="font-semibold text-white truncate block">{shade.family}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase font-mono block">Calibrated Hex</span>
                <span className="font-mono text-accent text-xs font-semibold">{shade.digitalColor.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase font-mono block">Dealer Status</span>
                <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <Check className="w-3 h-3" /> In-Store Tinting
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Sticky Action Bar */}
          <div className="p-4 sm:p-5 border-t border-border-teal/50 bg-[#0e1619] flex-shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                onAddToCart({
                  id: `shade-${shade.code.replace(/\s+/g, "-")}`,
                  type: "shade",
                  title: shade.name,
                  meta: `Code: ${shade.code} · Family: ${shade.family}`,
                  colourHex: shade.digitalColor,
                });
                onClose();
              }}
              className="bg-accent text-dark font-bold text-xs sm:text-sm py-3 px-5 rounded-xl w-full sm:flex-1 shadow-lg hover:bg-accent/90 flex items-center justify-center gap-2 min-h-[46px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>+ Add to Free Sample Kit</span>
            </Button>

            <Button
              asChild
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl w-full sm:flex-1 shadow-lg min-h-[46px]"
            >
              <a
                href={`https://wa.me/918756659035?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Showroom</span>
              </a>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleCopyHex(shade.digitalColor)}
              className="border-border-teal text-xs text-white hover:bg-teal-900/60 hover:text-accent hover:border-accent/40 w-full sm:w-auto min-h-[46px] transition-all"
            >
              {copiedCode === shade.code ? (
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5" /> Copied Hex
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Copy className="w-3.5 h-3.5" /> Copy Hex
                </span>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
