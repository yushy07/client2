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
              radius={340}
              cardWidth={146}
              cardHeight={104}
              cardRadius={14}
              verticalSpacing={0}
              cardsPerTurn={13}
              speed={0.22}
              edgeBlur={0}
              edgeFade={0.05}
              centerScale={1.14}
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
            className="w-[94vw] max-w-4xl max-h-[90vh] md:max-h-[82vh] bg-[#071d21] border border-border-teal/80 text-on-dark p-0 overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
          >
            {activeWallpaper && (
              <>
                {/* Left Column: Architectural Swatch Presentation */}
                <div className="relative w-full md:w-1/2 lg:w-[52%] bg-gradient-to-br from-[#041215] via-[#081e23] to-[#041215] flex items-center justify-center p-6 sm:p-8 overflow-hidden select-none border-b md:border-b-0 md:border-r border-border-teal/60 shrink-0">
                  {/* Subtle ambient light */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,107,115,0.22)_0%,transparent_70%)] pointer-events-none" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-amber-300 border border-white/10 shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {activeWallpaper.category}
                    </span>
                  </div>

                  {/* Swatch Display */}
                  <div className="relative z-10 w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] group/swatch">
                    <ResponsiveImage
                      src={activeWallpaper.url}
                      alt={activeWallpaper.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/swatch:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/swatch:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[11px] text-white/90 font-mono">1:1 Roll Texture Reference</span>
                    </div>
                  </div>

                  {/* Bottom texture label */}
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                      Authentic Birla Opus Wallpaper Roll Spec
                    </span>
                  </div>
                </div>

                {/* Right Column: Spec & Consultation Panel */}
                <div className="relative w-full md:w-1/2 lg:w-[48%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#081e22]/90 backdrop-blur-md">
                  {/* Custom Close Button */}
                  <button
                    type="button"
                    onClick={() => setActiveWallpaper(null)}
                    className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center border border-white/15 backdrop-blur-sm transition-all"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold font-mono block mb-1">
                        Birla Opus Wallpaper Collection
                      </span>
                      <DialogTitle className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-snug">
                        {activeWallpaper.title}
                      </DialogTitle>
                    </div>

                    <p className="text-xs sm:text-sm text-on-dark-muted font-sans leading-relaxed">
                      {activeWallpaper.description}
                    </p>

                    {/* Architectural Suitability Box */}
                    <div className="bg-[#051518] p-4 rounded-xl border border-border-teal/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          Architectural Space Suitability
                        </span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Recommended
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 pt-1">
                        {activeWallpaper.suggestedSpaces.map((space, i) => (
                          <div key={i} className="text-xs text-white/85 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{space}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features Strip */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-white/70">
                      <div className="bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Washable Finish
                      </div>
                      <div className="bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Seamless Jointing
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-border-teal/60 space-y-2">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Wallpaper Family: ${activeWallpaper.title}`,
                          `I would like to order or view roll swatches for the Birla Opus ${activeWallpaper.title} wallpaper collection (${activeWallpaper.category}).`
                        );
                        setActiveWallpaper(null);
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-2.5 rounded-xl shadow-lg transition-transform active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
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
