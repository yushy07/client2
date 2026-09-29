import React, { useState, useMemo } from "react";
import { ROOM_LIBRARY_PAGES, type RoomLibraryPage, type RoomCategory } from "@shared/roomLibraryData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Compass, ChevronLeft, ChevronRight, Maximize2, ShoppingBag, Sparkles, Home } from "lucide-react";
import { MotionImageReveal } from "@/lib/motion";
import { ResponsiveImage } from "@/components/ui/responsive-image";

interface RoomLibraryProps {
  onEnquire?: (title: string, details: string) => void;
  onExploreProducts?: () => void;
}

const CATEGORIES: Array<RoomCategory | "All Spaces"> = [
  "All Spaces",
  "Living & Lounge",
  "Bedroom Sanctuary",
  "Dining & Kitchen",
  "Exterior & Facade",
  "Study & Accent Spaces",
];

export const RoomLibrary: React.FC<RoomLibraryProps> = ({ onEnquire, onExploreProducts }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All Spaces");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeSpace, setActiveSpace] = useState<RoomLibraryPage | null>(null);
  const itemsPerPage = 9;

  const filteredSpaces = useMemo(() => {
    if (activeCategory === "All Spaces") return ROOM_LIBRARY_PAGES;
    return ROOM_LIBRARY_PAGES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage);
  const displayedSpaces = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSpaces.slice(start, start + itemsPerPage);
  }, [filteredSpaces, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section id="room-library" className="py-12 sm:py-16 lg:py-24 bg-dark text-on-dark border-t border-border-teal relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-border-teal">
            <Compass className="w-3.5 h-3.5" />
            Complete Architectural Spatial Archive · 102 Scanned Rooms
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
            The Room Library
          </h2>
          <p className="mt-4 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
            A comprehensive visual index of complete spaces from the official Birla Opus Rooms &amp; House Catalogue.
            Examine real wall-to-trim finishes, lighting angles, and whole-room executions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[40px] ${
                activeCategory === cat
                  ? "bg-dark-surface text-on-dark shadow-md shadow-dark-surface/40 font-semibold"
                  : "bg-dark-surface text-on-dark-muted hover:bg-brand-secondary hover:text-surface border border-border-teal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Spatial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedSpaces.map((space) => (
            <article
              key={space.index}
              onClick={() => setActiveSpace(space)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-dark-surface border border-border-teal hover:border-accent transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-surface">
                <ResponsiveImage
                  src={space.url}
                  alt={space.title}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" /> Full Architectural Page
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-dark/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-surface border border-white/10">
                  Page {String(space.index).padStart(3, "0")} / 102
                </div>
                <div className="absolute top-3 right-3 bg-dark-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-accent font-semibold border border-border-teal">
                  {space.category}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-serif text-on-dark line-clamp-1 group-hover:text-accent transition-colors">
                    {space.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-on-dark-muted line-clamp-2 leading-relaxed">
                    {space.styleContext}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border-teal flex items-center justify-between text-xs">
                  <span className="text-on-dark-muted truncate max-w-[200px]">
                    {space.suggestedFinish}
                  </span>
                  <span className="text-accent font-medium group-hover:translate-x-1 transition-transform">
                    Inspect &rarr;
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
              Showing page {currentPage} of {totalPages} ({filteredSpaces.length} architectural spaces total)
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 8).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-8 h-8 rounded text-xs font-mono transition-colors ${
                      currentPage === num
                        ? "bg-dark-surface text-on-dark font-bold"
                        : "text-on-dark-muted hover:bg-dark-surface hover:text-white"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                {totalPages > 8 && <span className="px-1 text-on-dark-muted">...</span>}
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

        {/* Space Modal Lightbox */}
        <Dialog open={!!activeSpace} onOpenChange={(open) => !open && setActiveSpace(null)}>
          <DialogContent className="max-w-4xl bg-dark-surface border-border-teal text-on-dark p-0 overflow-hidden sm:rounded-2xl">
            {activeSpace && (
              <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                <div className="relative md:w-3/5 bg-black flex items-center justify-center p-4 overflow-auto">
                  <ResponsiveImage
                    src={activeSpace.url}
                    alt={activeSpace.title}
                    className="max-h-[70vh] w-auto object-contain rounded shadow-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-xs text-white/90">
                    Catalogue Page {activeSpace.index} / 102
                  </div>
                </div>

                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                      {activeSpace.category}
                    </span>
                    <DialogTitle className="text-2xl font-serif text-on-dark mt-2 mb-3">
                      {activeSpace.title}
                    </DialogTitle>
                    <p className="text-sm text-on-dark-muted leading-relaxed mb-6">
                      {activeSpace.styleContext}. Archival architectural reference captured in the Birla Opus whole-house portfolio, illustrating harmonious trim, flooring, and wall interaction.
                    </p>

                    <div className="bg-dark-surface p-4 rounded-xl border border-border-teal mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-on-dark-muted block mb-1">
                        Recommended Coating Solution
                      </span>
                      <p className="text-sm font-medium text-surface">
                        {activeSpace.suggestedFinish}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-border-teal">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Room Library Space #${activeSpace.index} (${activeSpace.title})`,
                          `I would like an estimate and consultation to finish my ${activeSpace.category.toLowerCase()} similar to Room Library Page #${activeSpace.index}.`
                        );
                        setActiveSpace(null);
                      }}
                      className="w-full bg-dark-surface hover:bg-dark text-on-dark border border-brand-secondary font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Enquire This Room Concept
                    </Button>
                    {onExploreProducts && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          onExploreProducts();
                          setActiveSpace(null);
                        }}
                        className="w-full bg-dark-surface border-border-teal text-surface hover:bg-brand-secondary py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
                      >
                        <Home className="w-3.5 h-3.5 text-accent" /> Browse Associated Products in Catalogue
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
