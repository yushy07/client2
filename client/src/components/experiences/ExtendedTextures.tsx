import React, { useState, useMemo } from "react";
import { EXTENDED_TEXTURE_COLLECTIONS, type ExtendedTextureItem, type TextureCategory } from "@shared/extendedTexturesData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Layers, Maximize2, ShoppingBag, Sparkles, Feather, X, CheckCircle2 } from "lucide-react";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { ShinyText, TiltedCard, DecryptedText } from "@/components/reactbits";

interface ExtendedTexturesProps {
  onEnquire?: (title: string, details: string) => void;
  onExploreSurfaceStudio?: () => void;
}

const CATEGORIES: Array<TextureCategory | "All Worlds"> = [
  "All Worlds",
  "Organic & Woods",
  "Marine & Water",
  "Air & Atmosphere",
  "Stone & Mineral",
  "Fauna & Organic",
  "Botanical",
  "Architectural Plaster",
];

export const ExtendedTextures: React.FC<ExtendedTexturesProps> = ({ onEnquire, onExploreSurfaceStudio }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All Worlds");
  const [activeTexture, setActiveTexture] = useState<ExtendedTextureItem | null>(null);

  const filteredTextures = useMemo(() => {
    if (activeCategory === "All Worlds") return EXTENDED_TEXTURE_COLLECTIONS;
    return EXTENDED_TEXTURE_COLLECTIONS.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="extended-textures" className="py-12 sm:py-16 lg:py-24 bg-dark text-on-dark border-t border-border-teal relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-surface text-accent text-xs font-semibold uppercase tracking-wider mb-4 border border-border-teal">
            <Feather className="w-3.5 h-3.5" />
            <ShinyText text="Material & Tactile Archive · 17 Architectural Nature Studies" color="#d97706" shineColor="#fef08a" speed={3} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-on-dark tracking-tight leading-tight">
            Extended Texture Collections
          </h2>
          <p className="mt-4 text-base sm:text-lg text-on-dark-muted font-sans leading-relaxed">
            The sensory world beyond flat finishes. Explore archival stucco trowelings, wave reliefs, tree bark grains, and organic mineral plaster finishes created to catch glancing light.
          </p>
        </div>

        {/* Category Tabs */}
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTextures.map((tex) => (
            <article
              key={tex.id}
              onClick={() => setActiveTexture(tex)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-dark-surface border border-border-teal hover:border-accent transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-dark-surface">
                <TiltedCard
                  imageSrc={tex.url}
                  altText={tex.name}
                  captionText={tex.materialSensory}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  scaleOnHover={1.05}
                  rotateAmplitude={10}
                  showTooltip={false}
                  showMobileWarning={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none z-10">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5" /> Inspect Texture Grain
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-dark/85 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-accent font-semibold border border-border-teal z-10 pointer-events-none">
                  <DecryptedText text={tex.category} animateOn="hover" speed={30} />
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-serif text-on-dark group-hover:text-accent transition-colors">
                    {tex.name}
                  </h3>
                  <p className="mt-2 text-xs text-on-dark-muted line-clamp-2 leading-relaxed">
                    {tex.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border-teal flex items-center justify-between text-xs">
                  <span className="text-on-dark-muted italic">
                    {tex.materialSensory}
                  </span>
                  <span className="text-accent font-medium group-hover:translate-x-1 transition-transform">
                    View &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Luxury Texture Lightbox Modal */}
        <Dialog open={!!activeTexture} onOpenChange={(open) => !open && setActiveTexture(null)}>
          <DialogContent
            showCloseButton={false}
            className="w-[95vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[88vh] bg-[#07191d] border border-border-teal/80 text-on-dark p-0 overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col md:flex-row"
          >
            {activeTexture && (
              <>
                {/* Left Column: Full-Height Immersive Texture Showcase */}
                <div className="relative w-full md:w-[52%] lg:w-[55%] min-h-[260px] md:min-h-[460px] bg-[#051417] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden select-none border-b md:border-b-0 md:border-r border-border-teal/60 shrink-0">
                  {/* Ambient Light */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,107,115,0.25)_0%,transparent_70%)] pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-amber-300 border border-white/15 shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {activeTexture.category}
                    </span>
                  </div>

                  {/* Mobile Close Button on Top Right */}
                  <button
                    type="button"
                    onClick={() => setActiveTexture(null)}
                    className="md:hidden absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md shadow-lg"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* High-Resolution Framed Texture Image */}
                  <div className="relative z-10 w-full max-w-[360px] md:max-w-[400px] aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.7)] group/swatch">
                    <ResponsiveImage
                      src={activeTexture.url}
                      alt={activeTexture.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/swatch:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/swatch:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white/90 font-mono flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-300" /> 1:1 Architectural Plaster Sample
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Spec & Consultation Panel */}
                <div className="relative w-full md:w-[48%] lg:w-[45%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#081e22]/95 backdrop-blur-md">
                  {/* Desktop Close Button */}
                  <button
                    type="button"
                    onClick={() => setActiveTexture(null)}
                    className="hidden md:flex absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white items-center justify-center border border-white/15 backdrop-blur-sm transition-all shadow-sm"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-5">
                    <div className="pr-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-surface text-amber-400 text-[11px] font-mono font-semibold uppercase tracking-wider mb-2 border border-border-teal">
                        <Layers className="w-3.5 h-3.5" />
                        Architectural Plaster &amp; Texture Finish
                      </div>
                      <DialogTitle className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-tight leading-tight">
                        {activeTexture.name}
                      </DialogTitle>
                    </div>

                    <p className="text-sm text-on-dark-muted font-sans leading-relaxed">
                      {activeTexture.description}
                    </p>

                    {/* Sensory & Material Quality Box */}
                    <div className="bg-[#051518] p-4 sm:p-5 rounded-2xl border border-border-teal/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                          <Feather className="w-3.5 h-3.5" />
                          Sensory &amp; Material Quality
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          Hand-Applied
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed italic">
                        "{activeTexture.materialSensory}"
                      </p>
                    </div>

                    {/* Material Spec Tags */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs font-mono text-white/80">
                      <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        Mineral Base
                      </div>
                      <div className="bg-white/5 px-3 py-2 rounded-xl border border-white/10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        Master Applicator
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border-teal/70 space-y-2.5">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Extended Texture: ${activeTexture.name}`,
                          `I would like to enquire about material specifications and applicator application for the ${activeTexture.name} texture finish (${activeTexture.category}).`
                        );
                        setActiveTexture(null);
                      }}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-semibold py-3 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingBag className="w-4 h-4" /> Enquire This Texture Story
                    </Button>
                    {onExploreSurfaceStudio && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          onExploreSurfaceStudio();
                          setActiveTexture(null);
                        }}
                        className="w-full bg-dark-surface hover:bg-dark border border-border-teal text-white/80 hover:text-white py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-amber-400" /> Go to 21-Finish Surface Studio
                      </Button>
                    )}
                    <p className="text-[11px] text-center text-white/50 font-sans">
                      Touch &amp; feel physical sample boards at Jaymurti Traders, Baskhari.
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
