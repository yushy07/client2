import React, { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { getRouteSEO } from "@shared/seoKeywordMap";
import {
  VERIFIED_BIRLA_OPUS_SHADES,
  COLOUR_FAMILIES,
  filterVerifiedShades,
  type BirlaOpusShade,
  type ColourFamily
} from "@shared/verifiedBirlaOpusShades";
import { Button } from "@/components/ui/button";
import {
  Search,
  Palette,
  Copy,
  Check,
  Sparkles,
  MessageCircle,
  X,
  Layers,
  ShoppingBag,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

export const ColourFinderPage: React.FC = () => {
  const seo = getRouteSEO("/colour-finder");
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<ColourFamily | "All">("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedModalShade, setSelectedModalShade] = useState<BirlaOpusShade | null>(null);
  const [page, setPage] = useState(1);

  const filteredShades = useMemo(() => {
    return filterVerifiedShades(VERIFIED_BIRLA_OPUS_SHADES, {
      searchQuery,
      family: selectedFamily,
    });
  }, [searchQuery, selectedFamily]);

  const currentModalIndex = useMemo(() => {
    if (!selectedModalShade) return -1;
    return filteredShades.findIndex((s) => s.code === selectedModalShade.code);
  }, [selectedModalShade, filteredShades]);

  const handlePrevShade = () => {
    if (filteredShades.length === 0) return;
    const prev = currentModalIndex > 0
      ? filteredShades[currentModalIndex - 1]
      : filteredShades[filteredShades.length - 1];
    if (prev) setSelectedModalShade(prev);
  };

  const handleNextShade = () => {
    if (filteredShades.length === 0) return;
    const next = (currentModalIndex >= 0 && currentModalIndex < filteredShades.length - 1)
      ? filteredShades[currentModalIndex + 1]
      : filteredShades[0];
    if (next) setSelectedModalShade(next);
  };

  useEffect(() => {
    if (!selectedModalShade) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevShade();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextShade();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedModalShade, currentModalIndex, filteredShades]);

  const SHADES_PER_PAGE = 30;
  const totalPages = Math.max(1, Math.ceil(filteredShades.length / SHADES_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pagedShades = useMemo(() => {
    const start = (currentPage - 1) * SHADES_PER_PAGE;
    return filteredShades.slice(start, start + SHADES_PER_PAGE);
  }, [filteredShades, currentPage]);

  const isLightColor = (hexStr: string): boolean => {
    const cleanHex = hexStr.replace("#", "");
    if (cleanHex.length !== 6) return true;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const handleCopyHex = (shade: BirlaOpusShade) => {
    navigator.clipboard.writeText(shade.digitalColor);
    setCopiedCode(shade.code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <SEOPageLayout seo={seo}>
      {/* Search & Filter Header Bar */}
      <div className="bg-dark-surface/90 p-5 rounded-3xl border border-border-teal/60 mb-10 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-on-dark-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by shade name (e.g. Alabaster, Sage) or code (BO-1000)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 bg-dark/90 border border-border-teal/60 rounded-xl text-xs text-white placeholder:text-on-dark-muted focus:outline-none focus:border-accent"
            />
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-2 text-xs text-on-dark-muted self-start md:self-auto">
            <Palette className="w-4 h-4 text-accent" />
            <span>
              Showing <strong className="text-white">{filteredShades.length}</strong> of {VERIFIED_BIRLA_OPUS_SHADES.length} verified shades
            </span>
          </div>
        </div>

        {/* Tone Family Switcher */}
        <div className="pt-2 border-t border-white/5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => {
                setSelectedFamily("All");
                setPage(1);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap font-medium flex-shrink-0 ${
                selectedFamily === "All"
                  ? "bg-accent text-dark border-accent font-bold shadow-md"
                  : "bg-dark/70 text-on-dark-muted border-border-teal/50 hover:text-accent hover:border-accent/50"
              }`}
            >
              All Tone Families ({VERIFIED_BIRLA_OPUS_SHADES.length})
            </button>
            {COLOUR_FAMILIES.map((family) => {
              const count = VERIFIED_BIRLA_OPUS_SHADES.filter((s) => s.family === family).length;
              return (
                <button
                  key={family}
                  onClick={() => {
                    setSelectedFamily(family);
                    setPage(1);
                  }}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap font-medium flex-shrink-0 flex items-center gap-1.5 ${
                    selectedFamily === family
                      ? "bg-accent text-dark border-accent font-bold shadow-md"
                      : "bg-dark/70 text-on-dark-muted border-border-teal/50 hover:text-accent hover:border-accent/50"
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
          </div>
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {pagedShades.map((shade) => {
            const isCopied = copiedCode === shade.code;
            const isLightShade = isLightColor(shade.digitalColor);

            return (
              <div
                key={shade.code}
                onClick={() => setSelectedModalShade(shade)}
                className="group rounded-2xl overflow-hidden bg-dark-surface border border-border-teal/60 hover:border-accent transition-all duration-200 hover:shadow-xl hover:shadow-accent/10 cursor-pointer flex flex-col justify-between"
              >
                {/* Color Swatch Surface */}
                <div
                  className="aspect-[4/3] w-full relative p-3 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ backgroundColor: shade.digitalColor }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold shadow-sm backdrop-blur-md"
                      style={{
                        backgroundColor: isLightShade ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.9)",
                        color: isLightShade ? "#ffffff" : "#0c1214"
                      }}
                    >
                      {shade.code}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyHex(shade);
                      }}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-sm"
                      style={{
                        backgroundColor: isLightShade ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.85)",
                        color: isLightShade ? "#ffffff" : "#0c1214"
                      }}
                      title="Copy Hex Code"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400 stroke-[3]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Swatch Info Footer */}
                <div className="p-3 bg-dark-surface/95 border-t border-white/5 space-y-1">
                  <h3 className="text-xs font-semibold text-white truncate group-hover:text-accent transition-colors">
                    {shade.name}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-on-dark-muted font-mono">
                    <span>{shade.digitalColor.toUpperCase()}</span>
                    <span className="truncate max-w-[80px] text-[9px]">{shade.family}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="pt-8 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="border-border-teal text-xs text-white disabled:opacity-30"
            >
              Previous Page
            </Button>
            <span className="text-xs text-on-dark-muted px-4 font-mono">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="border-border-teal text-xs text-white disabled:opacity-30"
            >
              Next Page
            </Button>
          </div>
        )}
      </div>

      {/* Cross-linking navigation cards to prevent dead end */}
      <div className="mt-14 pt-8 border-t border-border-teal/40">
        <h3 className="text-lg font-serif text-white mb-4">Explore More Inspiration &amp; Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/room-inspiration"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <Layers className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Room Shade Studio</h4>
            <p className="text-xs text-on-dark-muted mt-1">12 architectural spaces with real wall shade variations.</p>
          </Link>

          <Link
            href="/surface-studio"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <Sparkles className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Surface Studio</h4>
            <p className="text-xs text-on-dark-muted mt-1">Metallic finishes, stucco textures, and tactile swatches.</p>
          </Link>

          <Link
            href="/paint-products"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <ShoppingBag className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Paint Products Catalog</h4>
            <p className="text-xs text-on-dark-muted mt-1">Interior, exterior, waterproofing, enamels &amp; wood finishes.</p>
          </Link>
        </div>
      </div>

      {/* Shade Modal Quick View */}
      <AnimatePresence>
        {selectedModalShade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedModalShade(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-surface border border-accent/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-semibold">
                      Birla Opus Verified Shade
                    </span>
                    {currentModalIndex >= 0 && (
                      <span className="text-[10px] font-mono text-teal-300/80 bg-teal-950/60 px-2 py-0.2 rounded-full border border-teal-700/40">
                        {currentModalIndex + 1} of {filteredShades.length}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif text-white">{selectedModalShade.name}</h3>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Prev / Next Header Arrows */}
                  <button
                    type="button"
                    onClick={handlePrevShade}
                    className="w-8 h-8 rounded-full bg-dark/80 hover:bg-teal-900/80 text-white/80 hover:text-accent border border-border-teal/60 flex items-center justify-center transition-all"
                    aria-label="Previous Shade"
                    title="Previous Shade (Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextShade}
                    className="w-8 h-8 rounded-full bg-dark/80 hover:bg-teal-900/80 text-white/80 hover:text-accent border border-border-teal/60 flex items-center justify-center transition-all"
                    aria-label="Next Shade"
                    title="Next Shade (Right Arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedModalShade(null)}
                    className="w-8 h-8 rounded-full bg-teal-900/70 hover:bg-teal-800 text-teal-200 hover:text-accent border border-teal-700/40 hover:border-accent/40 flex items-center justify-center transition-all ml-1"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Big Swatch Surface */}
              <div
                className="aspect-[16/9] w-full rounded-2xl shadow-inner border border-white/10 flex items-center justify-center p-6 text-center relative group"
                style={{ backgroundColor: selectedModalShade.digitalColor }}
              >
                <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl text-white space-y-1 shadow-lg">
                  <div className="text-sm font-bold font-mono">{selectedModalShade.code}</div>
                  <div className="text-xs text-accent font-mono">{selectedModalShade.digitalColor.toUpperCase()}</div>
                  <div className="text-[10px] text-white/70">Tone Family: {selectedModalShade.family}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: `shade-${selectedModalShade.code.replace(/\s+/g, "-")}`,
                      type: "shade",
                      title: selectedModalShade.name,
                      meta: `Code: ${selectedModalShade.code} · Family: ${selectedModalShade.family}`,
                      colourHex: selectedModalShade.digitalColor,
                    }, true);
                    setSelectedModalShade(null);
                  }}
                  className="bg-accent text-dark font-bold text-xs py-2.5 px-4 rounded-xl w-full sm:flex-1 shadow-lg hover:bg-accent/90 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>+ Add to Enquiry</span>
                </Button>

                <Button
                  asChild
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl w-full sm:flex-1 shadow-lg"
                >
                  <a
                    href={`https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders,%20I%20am%20enquiring%20about%20Birla%20Opus%20shade%20${encodeURIComponent(selectedModalShade.name)}%20(${encodeURIComponent(selectedModalShade.code)}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Shade</span>
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleCopyHex(selectedModalShade)}
                  className="border-border-teal text-xs text-white hover:bg-teal-900/60 hover:text-accent hover:border-accent/40 w-full sm:w-auto transition-all"
                >
                  {copiedCode === selectedModalShade.code ? (
                    <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Copied Hex</span>
                  ) : (
                    <span className="flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy Hex</span>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SEOPageLayout>
  );
};
