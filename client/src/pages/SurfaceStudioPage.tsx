import React from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { SITE_ROUTES_SEO } from "@shared/seoKeywordMap";
import { ExtendedTextures } from "@/components/experiences/ExtendedTextures";
import { WallpaperGallery } from "@/components/experiences/WallpaperGallery";
import { Sparkles, Layers, Palette, MessageCircle } from "lucide-react";

export const SurfaceStudioPage: React.FC = () => {
  const seo = SITE_ROUTES_SEO["/surface-studio"];

  return (
    <SEOPageLayout seo={seo}>
      {/* Introduction Banner */}
      <div className="bg-dark-surface/80 p-6 sm:p-8 rounded-3xl border border-border-teal/50 mb-12 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Material Tactility & Texture Artistry
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white">
          Explore Custom Wall Textures, Metallic Sheens & Designer Wallpapers
        </h2>
        <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed max-w-3xl">
          Elevate plain flat walls into tactile statement features. Surface Studio showcases metallic trowel effects, artisanal stucco, textured stone finishes, and designer wallpapers available at Jaymurti Traders showroom.
        </p>
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
