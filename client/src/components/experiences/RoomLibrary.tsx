import React, { useState, useMemo } from "react";
import { ROOM_LIBRARY_PAGES, type RoomLibraryPage, type RoomCategory } from "@shared/roomLibraryData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Compass, ChevronLeft, ChevronRight, Maximize2, ShoppingBag, Sparkles, Home, LayoutGrid, Layers, X } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { Masonry, type MasonryItem, ShinyText } from "@/components/reactbits";
import { ScrollableRow } from "@/components/ui/ScrollableRow";

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
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
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

  const masonryItems: MasonryItem[] = useMemo(() => {
    return filteredSpaces.slice(0, 24).map((space, idx) => ({
      id: space.index,
      img: space.url,
      title: space.title,
      subtitle: `${space.category} · Page ${space.index}`,
      height: (idx % 3 === 0 ? 320 : idx % 3 === 1 ? 260 : 380),
    }));
  }, [filteredSpaces]);

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
            <ShinyText text="ARCHITECTURAL ARCHIVE · 102 SCANNED ROOMS" speed={3.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
            The Room Library
          </h2>
          <p className="mt-4 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
            A comprehensive visual index of complete spaces from the official Birla Opus Rooms &amp; House Catalogue.
            Examine real wall-to-trim finishes, lighting angles, and whole-room executions.
          </p>
        </div>

        {/* View Mode & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10">
          <div className="w-full sm:w-auto flex-1 min-w-0">
            <ScrollableRow innerClassName="gap-2 pb-2 sm:pb-0" showArrows={true} scrollStep={220}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                    activeCategory === cat
                      ? "bg-accent text-dark font-semibold shadow-md"
                      : "bg-dark-surface text-on-dark-muted hover:text-accent hover:border-accent/40 border border-border-teal"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </ScrollableRow>
          </div>

          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-dark-surface border border-border-teal self-start sm:self-auto shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-on-dark-muted hover:text-accent"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Grid
            </button>
            <button
              onClick={() => setViewMode("masonry")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "masonry"
                  ? "bg-accent/20 text-accent font-semibold"
                  : "text-on-dark-muted hover:text-accent"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Masonry Flow
            </button>
          </div>
        </div>

        {/* Masonry View */}
        {viewMode === "masonry" ? (
          <div className="mb-12">
            <Masonry
              items={masonryItems}
              duration={0.6}
              stagger={0.06}
              onItemClick={(item) => {
                const space = filteredSpaces.find((s) => s.index === item.id);
                if (space) setActiveSpace(space);
              }}
            />
          </div>
        ) : (
          /* Spatial Cards Grid */
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
      )}

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
                        : "text-on-dark-muted hover:bg-dark-surface hover:text-accent"
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
          <DialogContent
            showCloseButton={false}
            className="w-[95vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[88vh] bg-[#07191d] border border-border-teal/80 text-on-dark p-0 overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col md:flex-row"
          >
            {activeSpace && (
              <>
                {/* Left Column: Full-Height Immersive Room Showcase */}
                <div className="relative w-full md:w-[52%] lg:w-[55%] min-h-[260px] md:min-h-[460px] bg-[#051417] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden select-none border-b md:border-b-0 md:border-r border-border-teal/60 shrink-0">
                  {/* Ambient Light */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,107,115,0.25)_0%,transparent_70%)] pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-300 border border-white/15 shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {activeSpace.category}
                    </span>
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white/80 border border-white/10 shadow-xs">
                      Page {activeSpace.index} / 102
                    </span>
                  </div>

                  {/* Mobile Close Button on Top Right */}
                  <button
                    type="button"
                    onClick={() => setActiveSpace(null)}
                    className="md:hidden absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 text-white hover:text-accent flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* High-Resolution Framed Room Image */}
                  <div className="relative z-10 w-full max-w-[380px] md:max-w-[420px] aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.7)] group/swatch">
                    <ResponsiveImage
                      src={activeSpace.url}
                      alt={activeSpace.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/swatch:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/swatch:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white/90 font-mono flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-300" /> Whole-House Portfolio Concept
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Spec & Consultation Panel */}
                <div className="relative w-full md:w-[48%] lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#081e22]/95 backdrop-blur-md">
                  {/* Desktop Close Button */}
                  <button
                    type="button"
                    onClick={() => setActiveSpace(null)}
                    className="hidden md:flex absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-accent/20 text-white/80 hover:text-accent items-center justify-center border border-white/15 backdrop-blur-sm transition-all shadow-sm"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-5">
                    <div className="pr-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-amber-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2 border border-border-teal">
                        <Home className="w-3.5 h-3.5" />
                        Birla Opus 102 Room Library
                      </div>
                      <DialogTitle className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-tight leading-tight">
                        {activeSpace.title}
                      </DialogTitle>
                    </div>

                    <p className="text-sm text-on-dark-muted font-sans leading-relaxed">
                      {activeSpace.styleContext}. Archival architectural reference captured in the Birla Opus whole-house portfolio, illustrating harmonious trim, flooring, and wall interaction.
                    </p>

                    {/* Recommended Coating Solution Box */}
                    <div className="bg-[#051518] p-4 sm:p-5 rounded-2xl border border-border-teal/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5" />
                          Recommended Coating Solution
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          Curated Finish
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-white/95 font-sans leading-relaxed">
                        {activeSpace.suggestedFinish}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border-teal/70 space-y-2.5">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Room Library Space #${activeSpace.index} (${activeSpace.title})`,
                          `I would like an estimate and consultation to finish my ${activeSpace.category.toLowerCase()} similar to Room Library Page #${activeSpace.index}.`
                        );
                        setActiveSpace(null);
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-semibold py-3 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
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
                        className="w-full bg-dark-surface hover:bg-dark border border-border-teal text-white/80 hover:text-accent hover:border-accent/40 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Home className="w-3.5 h-3.5 text-amber-400" /> Browse Associated Products in Catalogue
                      </Button>
                    )}
                    <p className="text-[11px] text-center text-white/50 font-sans">
                      Consultation &amp; estimates provided by Jaymurti Traders, Baskhari.
                    </p>
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
