import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { SITE_ROUTES_SEO } from "@shared/seoKeywordMap";
import { ExtendedTextures } from "@/components/experiences/ExtendedTextures";
import { WallpaperGallery } from "@/components/experiences/WallpaperGallery";
import { useCart } from "@/contexts/CartContext";
import { Sparkles, Layers, Palette } from "lucide-react";
import { SplitText, DriftWall, ShinyText } from "@/components/reactbits";
import { EXTENDED_TEXTURE_COLLECTIONS } from "@shared/extendedTexturesData";

export const SurfaceStudioPage: React.FC = () => {
  const seo = SITE_ROUTES_SEO["/surface-studio"];
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<"textures" | "wallpapers">("textures");

  const driftWallItems = useMemo(() => {
    return EXTENDED_TEXTURE_COLLECTIONS.slice(0, 16).map((texture) => ({
      image: texture.url,
      title: texture.name,
    }));
  }, []);

  return (
    <SEOPageLayout seo={seo}>
      {/* Introduction Banner */}
      <div className="bg-dark-surface/80 p-6 sm:p-8 rounded-3xl border border-border-teal/50 mb-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-accent" />
          <ShinyText text="MATERIAL TACTILITY & TEXTURE ARTISTRY" speed={3.5} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white">
          <SplitText
            text="Explore Custom Wall Textures, Metallic Sheens & Designer Wallpapers"
            delay={30}
            splitType="words"
            className="inline"
          />
        </h2>
        <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed max-w-3xl">
          Elevate plain flat walls into tactile statement features. Surface Studio showcases metallic trowel effects, artisanal stucco, textured stone finishes, and designer wallpapers available at Jaymurti Traders showroom in Baskhari.
        </p>

        {/* Experience Section Navigation Tabs to Avoid Giant Continuous Scroll */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("textures")}
            className={`text-xs px-4 py-2 rounded-xl border transition-all font-semibold flex items-center gap-2 ${
              activeTab === "textures"
                ? "bg-accent text-dark border-accent shadow-md"
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tactile Textures & Reliefs (17 Studies)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("wallpapers")}
            className={`text-xs px-4 py-2 rounded-xl border transition-all font-semibold flex items-center gap-2 ${
              activeTab === "wallpapers"
                ? "bg-accent text-dark border-accent shadow-md"
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Designer Wallpapers (13 Families)</span>
          </button>
        </div>
      </div>

      {activeTab === "textures" && (
        <div className="space-y-10 visual-texture-refinement">
          {/* Interactive Drift Wall Showcase */}
          <div className="rounded-3xl overflow-hidden border border-border-teal/40 bg-dark-surface/50 p-4 sm:p-6">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Interactive Perspective Wall</h3>
                <p className="text-xs text-on-dark-muted">Hover and drift across real swatch captures</p>
              </div>
              <span className="text-[11px] text-teal-300/80 bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-500/20 self-start sm:self-auto">
                3D Dynamic Tilt Active
              </span>
            </div>
            <div className="h-[320px] sm:h-[460px] rounded-2xl overflow-hidden border border-border-teal/30">
              <DriftWall
                items={driftWallItems}
                columns={typeof window !== 'undefined' && window.innerWidth < 640 ? 3 : 4}
                tileWidth={typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 240}
                tileHeight={typeof window !== 'undefined' && window.innerWidth < 640 ? 105 : 160}
                speed={0.5}
                tilt={12}
                turn={-6}
                depth={90}
                gap={12}
              />
            </div>
          </div>

          {/* Extended Textures Showcase */}
          <div className="rounded-3xl overflow-hidden border border-border-teal/40">
            <ExtendedTextures
              onEnquire={(title, details) => {
                addToCart({
                  id: `ext-tex-${Date.now()}`,
                  type: "texture",
                  title,
                  meta: details,
                });
                setIsCartOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {activeTab === "wallpapers" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Curated Wallcoverings
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              Designer Wallpaper Gallery
            </h2>
            <p className="text-xs sm:text-sm text-on-dark-muted max-w-2xl">
              Botanical, geometric, and classical motifs for living alcoves, dining rooms, and executive office backdrops.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border-teal/40">
            <WallpaperGallery
              onEnquire={(title, details) => {
                addToCart({
                  id: `wallpaper-${Date.now()}`,
                  type: "product",
                  title,
                  meta: details,
                });
                setIsCartOpen(true);
              }}
            />
          </div>
        </div>
      )}
    </SEOPageLayout>
  );
};
