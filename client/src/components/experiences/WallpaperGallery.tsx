import React, { useState, useMemo } from "react";
import { WALLPAPER_GALLERY_ITEMS, type WallpaperFamily } from "@shared/wallpaperData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Palette, Maximize2, ShoppingBag, Sparkles, CheckCircle2, X, Layers } from "lucide-react";
import { MotionCursorLight, MotionImageReveal } from "@/lib/motion";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { InfiniteSpiral, ShinyText } from "@/components/reactbits";

interface WallpaperGalleryProps {
  onEnquire?: (title: string, details: string) => void;
}

const CATEGORIES = [
  "All Themes",
  "Fauna & Nature",
  "Botanical",
  "Classic & Royal",
  "Architectural & Textures",
  "Heritage & Culture",
  "Modern & Abstract",
  "Curated Designer",
];

export const WallpaperGallery: React.FC<WallpaperGalleryProps> = ({ onEnquire }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All Themes");
  const [activeWallpaper, setActiveWallpaper] = useState<WallpaperFamily | null>(null);

  const filteredWallpapers = useMemo(() => {
    if (activeCategory === "All Themes") return WALLPAPER_GALLERY_ITEMS;
    return WALLPAPER_GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="wallpaper-gallery" className="py-12 sm:py-16 lg:py-24 bg-dark text-on-dark border-t border-border-teal relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead & Panoramic 3D Wallpaper Spiral Showcase */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-12 gap-8 lg:gap-10">
          <div className="w-full lg:max-w-md xl:max-w-lg shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface text-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-border-teal">
              <Palette className="w-3.5 h-3.5" />
              <ShinyText text="Visual Wallpaper Discovery · 13 Curated Design Families" color="#d97706" shineColor="#fef08a" speed={2.5} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
              Wallpaper Gallery
            </h2>
            <p className="mt-4 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
              Move beyond solid colour into tactile patterned luxury. Discover authentic Birla Opus wallpaper collections spanning handloom heritage, intricate botanicals, and modern architectural stone textures.
            </p>
          </div>

          {/* Panoramic Wide 3D Helical Ribbon Showcase */}
          <div className="w-full flex-1 min-w-0 h-[220px] sm:h-[240px] lg:h-[260px] rounded-2xl sm:rounded-3xl overflow-hidden border border-border-teal bg-dark-surface/60 shadow-2xl relative group">
            <InfiniteSpiral
              items={WALLPAPER_GALLERY_ITEMS.map((wp) => ({
                src: wp.url,
                alt: wp.title,
                label: wp.title,
                id: wp.id,
              }))}
              radius={320}
              cardWidth={150}
              cardHeight={106}
              cardRadius={14}
              verticalSpacing={0}
              cardsPerTurn={9}
              speed={0.26}
              edgeBlur={0}
              edgeFade={0.05}
              centerScale={1.15}
              pauseOnHover={false}
              onItemClick={(item) => {
                const found = WALLPAPER_GALLERY_ITEMS.find((w) => w.id === item.id || w.url === item.src);
                if (found) setActiveWallpaper(found);
              }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

        {/* Gallery Grid with Contextual Cursor Light */}
        <MotionCursorLight tint="butter" radius={260}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredWallpapers.map((wp) => (
              <article
                key={wp.id}
                onClick={() => setActiveWallpaper(wp)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-dark-surface border border-border-teal hover:border-accent transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-surface">
                <ResponsiveImage
                  src={wp.url}
                  alt={wp.title}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect Design Motif
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-dark/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-accent font-semibold border border-border-teal">
                  {wp.category}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-serif text-on-dark group-hover:text-accent transition-colors">
                    {wp.title}
                  </h3>
                  <p className="mt-2 text-xs text-on-dark-muted line-clamp-2 leading-relaxed">
                    {wp.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border-teal flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-on-dark-muted">
                    <span>Ideal:</span>
                    <span className="text-surface font-medium">{wp.suggestedSpaces[0]}</span>
                  </div>
                  <span className="text-xs text-accent font-medium group-hover:translate-x-1 transition-transform">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </MotionCursorLight>

        {/* Luxury Wallpaper Lightbox Inspector Modal */}
        <Dialog open={!!activeWallpaper} onOpenChange={(open) => !open && setActiveWallpaper(null)}>
          <DialogContent
            showCloseButton={false}
            className="w-[95vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[88vh] bg-[#07191d] border border-border-teal/80 text-on-dark p-0 overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col md:flex-row"
          >
            {activeWallpaper && (
              <>
                {/* Left Column: Full-Height Immersive Wallpaper Showcase */}
                <div className="relative w-full md:w-[52%] lg:w-[55%] min-h-[260px] md:min-h-[460px] bg-[#051417] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden select-none border-b md:border-b-0 md:border-r border-border-teal/60 shrink-0">
                  {/* Subtle ambient light */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,107,115,0.25)_0%,transparent_70%)] pointer-events-none" />

                  {/* Top Header Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-300 border border-white/15 shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {activeWallpaper.category}
                    </span>
                  </div>

                  {/* Mobile Close Button on Top Right */}
                  <button
                    type="button"
                    onClick={() => setActiveWallpaper(null)}
                    className="md:hidden absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* High-Resolution Framed Wallpaper Image */}
                  <div className="relative z-10 w-full max-w-[360px] md:max-w-[400px] aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.7)] group/swatch">
                    <ResponsiveImage
                      src={activeWallpaper.url}
                      alt={activeWallpaper.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/swatch:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/swatch:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white/90 font-mono flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-300" /> Authentic Wallpaper Roll Pattern
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Architectural Spec & Consultation Panel */}
                <div className="relative w-full md:w-[48%] lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#081e22]/95 backdrop-blur-md">
                  {/* Desktop Close Button */}
                  <button
                    type="button"
                    onClick={() => setActiveWallpaper(null)}
                    className="hidden md:flex absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white items-center justify-center border border-white/15 backdrop-blur-sm transition-all shadow-sm"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-5">
                    <div className="pr-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-amber-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2 border border-border-teal">
                        <Palette className="w-3.5 h-3.5" />
                        Birla Opus Luxury Wallpaper
                      </div>
                      <DialogTitle className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-tight leading-tight">
                        {activeWallpaper.title}
                      </DialogTitle>
                    </div>

                    <p className="text-sm text-on-dark-muted font-sans leading-relaxed">
                      {activeWallpaper.description}
                    </p>

                    {/* Architectural Suitability Pills */}
                    <div className="bg-[#051518] p-4 sm:p-5 rounded-2xl border border-border-teal/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          Ideal Spaces
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          Recommended
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeWallpaper.suggestedSpaces.map((space, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90 font-medium shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            {space}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Performance Spec Badges */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs font-mono text-white/80">
                      <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        Washable Finish
                      </div>
                      <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        Seamless Jointing
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border-teal/70 space-y-2.5">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Wallpaper Family: ${activeWallpaper.title}`,
                          `I would like to order or view roll swatches for the Birla Opus ${activeWallpaper.title} wallpaper collection (${activeWallpaper.category}).`
                        );
                        setActiveWallpaper(null);
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-semibold py-3 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingBag className="w-4 h-4" /> Enquire This Wallpaper Design
                    </Button>
                    <p className="text-[11px] text-center text-white/50 font-sans">
                      Physical sample books & catalogues available at Jaymurti Traders, Baskhari.
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
