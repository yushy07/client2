import React, { useState, useMemo } from "react";
import { EXTENDED_TEXTURE_COLLECTIONS, type ExtendedTextureItem, type TextureCategory } from "@shared/extendedTexturesData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Layers, Maximize2, ShoppingBag, Sparkles, Feather } from "lucide-react";
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

        {/* Modal Lightbox */}
        <Dialog open={!!activeTexture} onOpenChange={(open) => !open && setActiveTexture(null)}>
          <DialogContent className="max-w-4xl bg-dark-surface border-border-teal text-on-dark p-0 overflow-hidden sm:rounded-2xl">
            {activeTexture && (
              <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                <div className="relative md:w-3/5 bg-black flex items-center justify-center p-4 overflow-auto">
                  <ResponsiveImage
                    src={activeTexture.url}
                    alt={activeTexture.name}
                    className="max-h-[70vh] w-auto object-contain rounded shadow-2xl"
                  />
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs text-accent font-medium">
                    {activeTexture.category}
                  </div>
                </div>

                <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                      Architectural Plaster / Texture Finish
                    </span>
                    <DialogTitle className="text-2xl font-serif text-on-dark mt-2 mb-3">
                      {activeTexture.name}
                    </DialogTitle>
                    <p className="text-sm text-on-dark-muted leading-relaxed mb-6">
                      {activeTexture.description}
                    </p>

                    <div className="bg-dark-surface p-4 rounded-xl border border-border-teal mb-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-on-dark-muted block mb-1">
                        Sensory &amp; Material Quality
                      </span>
                      <p className="text-sm text-surface">
                        {activeTexture.materialSensory}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-border-teal">
                    <Button
                      onClick={() => {
                        onEnquire?.(
                          `Extended Texture: ${activeTexture.name}`,
                          `I would like to enquire about material specifications and applicator application for the ${activeTexture.name} texture finish (${activeTexture.category}).`
                        );
                        setActiveTexture(null);
                      }}
                      className="w-full bg-dark-surface hover:bg-dark text-on-dark border border-brand-secondary font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
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
                        className="w-full bg-dark-surface border-border-teal text-surface hover:bg-brand-secondary py-2 rounded-xl text-xs flex items-center justify-center gap-1.5"
                      >
                        <Layers className="w-3.5 h-3.5 text-accent" /> Go to 21-Finish Surface Studio
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
