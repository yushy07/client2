import React, { useState, useMemo } from "react";
import { WALLPAPER_GALLERY_ITEMS, type WallpaperFamily } from "@shared/wallpaperData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Palette, Maximize2, ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";
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
        {/* Masthead */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-12 gap-8">
          <div className="max-w-2xl">
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

          {/* Responsive 3D Helical Spiral Showcase */}
          <div className="flex flex-col w-full max-w-[340px] sm:max-w-[360px] h-[240px] sm:h-[280px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-border-teal bg-dark-surface/60 shadow-2xl relative group shrink-0">
            <InfiniteSpiral
              items={WALLPAPER_GALLERY_ITEMS.map((wp) => ({
                src: wp.url,
                alt: wp.title,
                label: wp.title,
                id: wp.id,
              }))}
              radius={120}
              cardWidth={100}
              cardHeight={85}
              cardRadius={10}
              speed={0.45}
              pauseOnHover={true}
              onItemClick={(item) => {
                const found = WALLPAPER_GALLERY_ITEMS.find((w) => w.id === item.id || w.url === item.src);
                if (found) setActiveWallpaper(found);
              }}
            />
            {/* Contextual Badges */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-amber-300 bg-black/75 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10 pointer-events-none shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>3D Wallpaper Swatches</span>
            </div>
            <div className="absolute bottom-2.5 right-3 z-10 text-[10px] text-white/60 font-sans pointer-events-none bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              Hover / Drag · Tap to view
            </div>
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

        {/* Wallpaper Lightbox Modal */}
        <Dialog open={!!activeWallpaper} onOpenChange={(open) => !open && setActiveWallpaper(null)}>
          <DialogContent className="max-w-4xl bg-dark-surface border-border-teal text-on-dark p-0 overflow-hidden sm:rounded-2xl">
            {activeWallpaper && (
              <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                <div className="relative md:w-3/5 bg-black flex items-center justify-center p-4 overflow-auto">
                  <ResponsiveImage
                    src={activeWallpaper.url}
                    alt={activeWallpaper.title}
                    className="max-h-[70vh] w-auto object-contain rounded shadow-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs text-accent font-medium">
                    {activeWallpaper.category}
                  </div>
                </div>

                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                      Birla Opus Wallpaper Family
                    </span>
                    <DialogTitle className="text-2xl font-serif text-on-dark mt-2 mb-3">
                      {activeWallpaper.title}
                    </DialogTitle>
                    <p className="text-sm text-on-dark-muted leading-relaxed mb-6">
                      {activeWallpaper.description}
                    </p>

                    <div className="bg-dark-surface p-4 rounded-xl border border-border-teal mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-on-dark-muted block mb-2">
                        Architectural Space Suitability
                      </span>
                      <ul className="space-y-1.5">
                        {activeWallpaper.suggestedSpaces.map((space, i) => (
                          <li key={i} className="text-xs text-surface flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                            {space}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-border-teal">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Wallpaper Family: ${activeWallpaper.title}`,
                          `I would like to order or view roll swatches for the Birla Opus ${activeWallpaper.title} wallpaper collection (${activeWallpaper.category}).`
                        );
                        setActiveWallpaper(null);
                      }}
                      className="w-full bg-dark-surface hover:bg-dark text-on-dark border border-brand-secondary font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Enquire This Wallpaper Design
                    </Button>
                    <p className="text-[11px] text-center text-on-dark-muted">
                      Patterns and application guidance can be enquired at Jaymurti Traders, Baskhari.
                    </p>
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
