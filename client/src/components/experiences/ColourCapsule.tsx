import React, { useState, useMemo } from "react";
import { COLOUR_CAPSULE_PAGES, type ColourCapsulePage } from "@shared/colourCapsuleData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, ChevronLeft, ChevronRight, Maximize2, Sparkles, ShoppingBag } from "lucide-react";
import { MotionImageReveal } from "@/lib/motion";

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

  return (
    <section id="colour-capsule" className="py-12 sm:py-16 lg:py-24 bg-dark text-on-dark border-t border-border-teal relative overflow-hidden">
      {/* Subtle architectural background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Masthead */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-border-teal">
            <BookOpen className="w-3.5 h-3.5" />
            Birla Opus Archive · 50 Editorial Spreads
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
                <img
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
                        : "text-on-dark-muted hover:bg-brand-secondary hover:text-white"
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
          <DialogContent className="max-w-4xl bg-dark-surface border-border-teal text-on-dark p-0 overflow-hidden sm:rounded-2xl">
            {activeSpread && (
              <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                {/* Large high-resolution scan view */}
                <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-auto p-4">
                  <img
                    src={activeSpread.url}
                    alt={activeSpread.title}
                    className="max-h-[70vh] w-auto object-contain rounded shadow-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-xs text-white/90">
                    Spread {activeSpread.index} of 50
                  </div>
                </div>

                {/* Editorial context sidebar */}
                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                      {activeSpread.chapter}
                    </span>
                    <DialogTitle className="text-2xl font-serif text-on-dark mt-2 mb-3">
                      {activeSpread.title}
                    </DialogTitle>
                    <p className="text-sm text-on-dark-muted leading-relaxed mb-6">
                      {activeSpread.subtitle}. This scanned page from the Birla Opus archival publication showcases colour combinations and spatial inspiration.
                    </p>

                    {/* Palette hints */}
                    <div className="mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-on-dark-muted block mb-2">
                        Archival Mood Harmony
                      </span>
                      <div className="flex items-center gap-2">
                        {activeSpread.paletteHint.map((color, i) => (
                          <div key={i} className="flex flex-col items-center gap-1">
                            <span
                              className="w-9 h-9 rounded-lg border border-white/20 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: color }}
                              onClick={() => onSelectShadeTone?.(color)}
                              title={`Explore shades near ${color}`}
                            />
                            <span className="text-[10px] font-mono text-on-dark-muted">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-border-teal">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Colour Capsule Spread #${activeSpread.index}`,
                          `I am interested in replicating the colour direction shown on Capsule Spread ${activeSpread.index} (${activeSpread.chapter}).`
                        );
                        setActiveSpread(null);
                      }}
                      className="w-full bg-dark-surface hover:bg-dark text-on-dark border border-brand-secondary font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Enquire This Colour Direction
                    </Button>
                    {onSelectShadeTone && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          onSelectShadeTone(activeSpread.paletteHint[0]);
                          setActiveSpread(null);
                        }}
                        className="w-full bg-dark-surface border-border-teal text-surface hover:bg-brand-secondary py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-accent" /> Jump to Colour Finder Swatches
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
