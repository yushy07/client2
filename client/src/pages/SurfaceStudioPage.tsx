import React, { useMemo } from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { SITE_ROUTES_SEO } from "@shared/seoKeywordMap";
import { ExtendedTextures } from "@/components/experiences/ExtendedTextures";
import { WallpaperGallery } from "@/components/experiences/WallpaperGallery";
import { Sparkles, Layers, Palette, MessageCircle } from "lucide-react";
import { SplitText, DriftWall, ShinyText } from "@/components/reactbits";
import { EXTENDED_TEXTURE_COLLECTIONS } from "@shared/extendedTexturesData";

export const SurfaceStudioPage: React.FC = () => {
  const seo = SITE_ROUTES_SEO["/surface-studio"];

  const driftWallItems = useMemo(() => {
    return EXTENDED_TEXTURE_COLLECTIONS.slice(0, 16).map((texture) => ({
      image: texture.image,
      title: texture.title,
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
          Elevate plain flat walls into tactile statement features. Surface Studio showcases metallic trowel effects, artisanal stucco, textured stone finishes, and designer wallpapers available at Jaymurti Traders showroom.
        </p>
      </div>

      {/* Interactive Drift Wall Showcase */}
      <div className="mb-14 rounded-3xl overflow-hidden border border-border-teal/40 bg-dark-surface/50 p-4 sm:p-6">
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

      {/* 1. Extended Textures Showcase */}
      <div className="rounded-3xl overflow-hidden mb-16 border border-border-teal/40">
        <ExtendedTextures />
      </div>

      {/* 2. Designer Wallpaper Gallery */}
      <div className="space-y-6 pt-10 border-t border-border-teal/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs text-accent font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Curated Wallcoverings
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            Designer Wallpaper Gallery
          </h2>
          <p className="text-xs sm:text-sm text-on-dark-muted max-w-2xl">
            Botanical, geometric, and classical motifs for bedrooms, dining alcoves, and executive office backdrops.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden border border-border-teal/40">
          <WallpaperGallery />
        </div>
      </div>
    </SEOPageLayout>
  );
};
