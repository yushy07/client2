import React, { useState, useMemo, useEffect, useCallback } from "react";
import { COLOUR_CAPSULE_PAGES, type ColourCapsulePage } from "@shared/colourCapsuleData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, ChevronLeft, ChevronRight, Maximize2, Sparkles, ShoppingBag, X, Copy, Check } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { Aurora, ShinyText } from "@/components/reactbits";

interface ColourCapsuleProps {
  onSelectShadeTone?: (tone: string) => void;
  onEnquire?: (title: string, details: string) => void;
}

const CHAPTERS: Array<ColourCapsulePage["chapter"] | "All Chapters"> = [
  "All Chapters",
  "Prelude & Warm Neutrals",
  "Vibrant Ochres & Terracotta",
  "Botanical Greens & Aquas",
  "Oceanic & Twilight Blues",
  "Pastel Reflections & Architectural Whites",
];

export const ColourCapsule: React.FC<ColourCapsuleProps> = ({ onSelectShadeTone, onEnquire }) => {
  const [activeChapter, setActiveChapter] = useState<string>("All Chapters");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeSpread, setActiveSpread] = useState<ColourCapsulePage | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const itemsPerPage = 6;

  const filteredPages = useMemo(() => {
    if (activeChapter === "All Chapters") return COLOUR_CAPSULE_PAGES;
    return COLOUR_CAPSULE_PAGES.filter((p) => p.chapter === activeChapter);
  }, [activeChapter]);

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const displayedPages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPages.slice(start, start + itemsPerPage);
  }, [filteredPages, currentPage]);

  const handleChapterChange = (chapter: string) => {
    setActiveChapter(chapter);
    setCurrentPage(1);
  };

  const handlePrevSpread = useCallback(() => {
    if (!activeSpread) return;
    const prevIdx = activeSpread.index <= 1 ? 50 : activeSpread.index - 1;
    const prev = COLOUR_CAPSULE_PAGES[prevIdx - 1];
    if (prev) setActiveSpread(prev);
  }, [activeSpread]);

  const handleNextSpread = useCallback(() => {
    if (!activeSpread) return;
    const nextIdx = activeSpread.index >= 50 ? 1 : activeSpread.index + 1;
    const next = COLOUR_CAPSULE_PAGES[nextIdx - 1];
    if (next) setActiveSpread(next);
  }, [activeSpread]);

  const handleCopyHex = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex);
    }
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Keyboard navigation for spread lightbox (left / right arrows)
  useEffect(() => {
    if (!activeSpread) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSpread();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextSpread();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSpread, handlePrevSpread, handleNextSpread]);

  return (
    <section id="colour-capsule" className="py-12 sm:py-16 lg:py-24 bg-dark text-on-dark border-t border-border-teal relative overflow-hidden">
      {/* React Bits Raw WebGL Aurora Background Animation */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <Aurora colorStops={["#d97706", "#0d9488", "#312e81"]} blend={0.6} amplitude={1.1} speed={0.4} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Masthead */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface/90 text-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-border-teal backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5" />
            <ShinyText text="Birla Opus Archive · 50 Editorial Spreads" color="#d97706" shineColor="#fef08a" speed={2.8} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
            The Colour Capsule
          </h2>
          <p className="mt-4 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
            A visual journey through shade harmonies, mood pairings, and spatial atmospheres.
            Designed for those who haven&apos;t chosen an exact code yet, but know the feeling they want to live within.
          </p>
        </div>

        {/* Chapter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 no-scrollbar scroll-smooth">
          {CHAPTERS.map((ch) => (
            <button
              key={ch}
              onClick={() => handleChapterChange(ch)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[40px] ${
                activeChapter === ch
                  ? "bg-dark-surface text-on-dark shadow-md shadow-dark-surface/40 font-semibold"
                  : "bg-dark-surface text-on-dark-muted hover:bg-dark-surface hover:text-surface border border-border-teal"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>

        {/* Editorial Spreads Grid - Generous layout sized to natural 16:15 scan proportions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedPages.map((page) => (
            <article
              key={page.index}
              onClick={() => setActiveSpread(page)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-dark-surface border border-border-teal hover:border-accent transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
            >
              <div className="relative aspect-[16/15] w-full overflow-hidden bg-black/40 flex items-center justify-center">
                <ResponsiveImage
                  src={page.url}
                  alt={page.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={562}
                  className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" /> Full Resolution Spread
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-dark/85 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-surface border border-white/10">
                  Spread {String(page.index).padStart(2, "0")} / 50
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block mb-1">
                    {page.chapter}
                  </span>
                  <h3 className="text-lg font-serif text-on-dark line-clamp-1 group-hover:text-accent transition-colors">
                    {page.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-on-dark-muted line-clamp-2 leading-relaxed">
                    {page.subtitle}
                  </p>
                </div>

                {/* Swatch palette preview dots */}
                <div className="mt-4 pt-3.5 border-t border-border-teal flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {page.paletteHint.map((c, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-black/40 shadow-inner"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-accent font-medium group-hover:underline transition-all inline-flex items-center gap-1">
                    Inspect Spread &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-between border-t border-border-teal pt-6">
            <span className="text-xs sm:text-sm text-on-dark-muted">
              Showing page {currentPage} of {totalPages} ({filteredPages.length} scans total)
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="bg-dark-surface border-border-teal text-surface hover:bg-brand-secondary disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-8 h-8 rounded text-xs font-mono transition-colors ${
                      currentPage === num
                        ? "bg-dark-surface text-on-dark font-bold"
                        : "text-on-dark-muted hover:bg-brand-secondary hover:text-accent"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="bg-dark-surface border-border-teal text-surface hover:bg-brand-secondary disabled:opacity-30"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Spread Lightbox Modal */}
        <Dialog open={!!activeSpread} onOpenChange={(open) => !open && setActiveSpread(null)}>
          <DialogContent
            showCloseButton={false}
            className="w-[96vw] max-w-5xl lg:max-w-6xl h-[88vh] md:h-[82vh] max-h-[850px] bg-[#0A272C] border border-border-teal/80 text-on-dark p-0 overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row gap-0"
          >
            {activeSpread && (
              <>
                {/* Left Column: Large high-resolution scan view */}
                <div className="relative w-full md:w-3/5 lg:w-[58%] h-[42vh] md:h-full bg-gradient-to-b from-[#041215] via-[#071d21] to-[#041215] flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none border-b md:border-b-0 md:border-r border-border-teal/50 shrink-0">
                  {/* Subtle decorative background gradient */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,107,115,0.18)_0%,transparent_70%)] pointer-events-none" />

                  {/* Top Badge: Spread Index & Chapter */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
                    <span className="bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white/90 border border-white/15 shadow-md flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-accent" />
                      Spread {activeSpread.index} <span className="text-white/40">/ 50</span>
                    </span>
                    <span className="hidden sm:inline-block bg-[#0E353B]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-sans font-medium text-accent border border-accent/25 shadow-sm">
                      {activeSpread.chapter}
                    </span>
                  </div>

                  {/* Mobile Close Button overlayed on top right */}
                  <button
                    type="button"
                    onClick={() => setActiveSpread(null)}
                    className="md:hidden absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg transition-transform active:scale-95"
                    aria-label="Close Spread Inspector"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Image Presentation */}
                  <div className="relative w-full h-full flex items-center justify-center py-2">
                    <ResponsiveImage
                      key={activeSpread.url}
                      src={activeSpread.url}
                      alt={activeSpread.title}
                      className="max-h-full max-w-full object-contain rounded-lg shadow-2xl drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  {/* Navigation Prev Button */}
                  <button
                    type="button"
                    onClick={handlePrevSpread}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#123F46] text-white hover:text-accent border border-white/15 backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 group"
                    aria-label="Previous Spread"
                    title="Previous spread (←)"
                  >
                    <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                  </button>

                  {/* Navigation Next Button */}
                  <button
                    type="button"
                    onClick={handleNextSpread}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#123F46] text-white hover:text-accent border border-white/15 backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 group"
                    aria-label="Next Spread"
                    title="Next spread (→)"
                  >
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  {/* Keyboard hint on desktop */}
                  <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none hidden md:block">
                    <span className="text-[11px] text-white/40 font-mono tracking-wider">
                      Use ← / → keys to flip spreads
                    </span>
                  </div>
                </div>

                {/* Right Column: Editorial Context Sidebar */}
                <div className="w-full md:w-2/5 lg:w-[42%] flex flex-col h-full bg-[#0D2B30] overflow-hidden min-h-0">
                  {/* Sidebar Header */}
                  <div className="p-4 sm:p-6 pb-3 border-b border-border-teal/40 flex items-start justify-between gap-3 shrink-0">
                    <div>
                      <span className="text-[11px] sm:text-xs uppercase tracking-widest text-accent font-semibold block">
                        {activeSpread.chapter}
                      </span>
                      <DialogTitle className="text-xl sm:text-2xl font-serif text-on-dark tracking-tight leading-snug mt-1">
                        {activeSpread.title}
                      </DialogTitle>
                    </div>

                    {/* Desktop Close Button */}
                    <button
                      type="button"
                      onClick={() => setActiveSpread(null)}
                      className="hidden md:flex shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-accent/20 text-white/80 hover:text-accent items-center justify-center transition-all border border-white/10 hover:scale-105 active:scale-95"
                      aria-label="Close Inspector"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Scrollable Editorial Content with custom dark scrollbar */}
                  <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-5 [scrollbar-width:thin] [scrollbar-color:rgba(23,107,115,0.5)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-secondary/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-brand-secondary/70">
                    {/* Commentary Card */}
                    <div className="bg-black/25 p-3.5 sm:p-4 rounded-xl border border-border-teal/30">
                      <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed font-sans">
                        {activeSpread.subtitle}. This scanned page from the Birla Opus archival publication showcases curated colour combinations, textural pairings, and spatial atmosphere.
                      </p>
                    </div>

                    {/* Archival Mood Harmony Swatches */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-on-dark-muted flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent" /> Archival Mood Harmony
                        </span>
                        <span className="text-[10px] text-accent/90 font-mono">
                          Click to copy hex
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {activeSpread.paletteHint.map((color, i) => {
                          const isCopied = copiedHex === color;
                          return (
                            <div
                              key={i}
                              onClick={() => handleCopyHex(color)}
                              className="group relative bg-[#092226] hover:bg-[#071A1D] border border-border-teal/50 hover:border-accent/70 rounded-xl p-2.5 flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-[1.03] active:scale-95 shadow-sm"
                              title={`Click to copy ${color}`}
                            >
                              <div
                                className="w-full h-10 sm:h-12 rounded-lg border border-black/40 shadow-inner relative overflow-hidden flex items-center justify-center transition-transform"
                                style={{ backgroundColor: color }}
                              >
                                {isCopied && (
                                  <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center text-accent text-[11px] font-bold gap-1 animate-in fade-in">
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Copied</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-[11px] font-mono text-on-dark/90 font-medium">
                                <span>{color}</span>
                                <Copy className="w-3 h-3 text-on-dark-muted group-hover:text-accent transition-colors" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Chapter Progress Indicator */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-on-dark-muted font-mono">
                          Archive Progress
                        </span>
                        <span className="text-[10px] text-accent font-mono font-medium">
                          Spread {activeSpread.index} of 50
                        </span>
                      </div>
                      <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                        <div
                          className="bg-accent h-full transition-all duration-300 rounded-full"
                          style={{ width: `${(activeSpread.index / 50) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Action Buttons Footer */}
                  <div className="p-4 sm:p-6 pt-3.5 border-t border-border-teal/50 bg-[#081F23] space-y-2.5 shrink-0">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Colour Capsule Spread #${activeSpread.index}`,
                          `I am interested in replicating the colour direction shown on Capsule Spread ${activeSpread.index} (${activeSpread.chapter}).`
                        );
                        setActiveSpread(null);
                      }}
                      className="w-full bg-accent hover:bg-accent-hover text-on-accent font-semibold py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent/20 transition-all hover:scale-[1.01] active:scale-98"
                    >
                      <ShoppingBag className="w-4 h-4" /> Enquire This Colour Direction
                    </Button>
                    {onSelectShadeTone && activeSpread.paletteHint[0] && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          const hint = activeSpread.paletteHint[0];
                          if (hint) onSelectShadeTone(hint);
                          setActiveSpread(null);
                        }}
                        className="w-full bg-dark-surface/90 border-border-teal text-on-dark hover:bg-brand-secondary hover:text-accent hover:border-accent/40 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-accent" /> Explore Matching Shades in Swatches
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
