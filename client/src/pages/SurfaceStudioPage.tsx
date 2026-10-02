import React, { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { getRouteSEO } from "@shared/seoKeywordMap";
import { ExtendedTextures } from "@/components/experiences/ExtendedTextures";
import { WallpaperGallery } from "@/components/experiences/WallpaperGallery";
import { useCart } from "@/contexts/CartContext";
import { Sparkles, Layers, Palette, ShoppingBag } from "lucide-react";
import { SplitText, DriftWall, ShinyText } from "@/components/reactbits";
import { EXTENDED_TEXTURE_COLLECTIONS } from "@shared/extendedTexturesData";

export const SurfaceStudioPage: React.FC = () => {
  const seo = getRouteSEO("/surface-studio");
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<"textures" | "wallpapers">("textures");
  const [selectedTexture, setSelectedTexture] = useState<any>(null);
  const [highlightedTextureId, setHighlightedTextureId] = useState<string | null>(null);

  const driftWallItems = useMemo(() => {
    return EXTENDED_TEXTURE_COLLECTIONS.map((texture) => ({
      id: texture.id,
      image: texture.url,
      title: texture.name,
      category: texture.category,
      subtitle: texture.materialSensory,
      raw: texture,
    }));
  }, []);

  const [screenWidth, setScreenWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const wallConfig = useMemo(() => {
    if (screenWidth < 640) {
      return { columns: 3, tileWidth: 145, tileHeight: 102, gap: 10, scale: 1.36, depth: 75 };
    }
    if (screenWidth < 1024) {
      return { columns: 4, tileWidth: 210, tileHeight: 142, gap: 14, scale: 1.38, depth: 90 };
    }
    if (screenWidth < 1440) {
      return { columns: 5, tileWidth: 255, tileHeight: 168, gap: 16, scale: 1.42, depth: 100 };
    }
    return { columns: 6, tileWidth: 275, tileHeight: 180, gap: 18, scale: 1.45, depth: 110 };
  }, [screenWidth]);

  const handleSelectWallItem = (item: any) => {
    const matched = item.raw || EXTENDED_TEXTURE_COLLECTIONS.find((t) => t.id === item.id || t.name === item.title);
    if (matched) {
      setActiveTab("textures");
      setSelectedTexture(matched);
      setHighlightedTextureId(matched.id);

      // Smooth scroll down to the respective texture card
      setTimeout(() => {
        const el = document.getElementById(`texture-card-${matched.id}`) || document.getElementById("extended-textures");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 80);

      // Auto-clear highlight ring after 3.5 seconds
      setTimeout(() => {
        setHighlightedTextureId((current) => (current === matched.id ? null : current));
      }, 3500);
    }
  };

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
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-accent hover:border-accent/50"
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
                : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-accent hover:border-accent/50"
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
          <div className="rounded-3xl overflow-hidden border border-border-teal/40 bg-dark-surface/50 p-4 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Interactive Perspective Wall</h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                </div>
                <p className="text-xs text-on-dark-muted mt-0.5">
                  Continuous upward infinite loop. Hover to tilt in 3D &middot; click any swatch to view &amp; inspect specifications.
                </p>
              </div>
              <span className="text-[11px] text-teal-300/90 bg-teal-950/70 px-3 py-1 rounded-full border border-teal-500/30 self-start sm:self-auto flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                3D Dynamic Tilt Active
              </span>
            </div>
            <div className="h-[360px] sm:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden border border-border-teal/30 bg-[#061418]">
              <DriftWall
                items={driftWallItems}
                columns={wallConfig.columns}
                tileWidth={wallConfig.tileWidth}
                tileHeight={wallConfig.tileHeight}
                gap={wallConfig.gap}
                scale={wallConfig.scale}
                depth={wallConfig.depth}
                speed={26}
                direction="up"
                variance={0.25}
                tilt={13}
                turn={-7}
                parallax={0.65}
                lift={70}
                onSelect={handleSelectWallItem}
              />
            </div>
          </div>

          {/* Extended Textures Showcase */}
          <div className="rounded-3xl overflow-hidden border border-border-teal/40">
            <ExtendedTextures
              externalActiveTexture={selectedTexture}
              highlightedTextureId={highlightedTextureId}
              onSelectTexture={(t) => setSelectedTexture(t)}
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

      {/* Cross-linking navigation cards to prevent dead ends */}
      <div className="mt-14 pt-8 border-t border-border-teal/40">
        <h3 className="text-lg font-serif text-white mb-4">Explore More Inspiration &amp; Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/colour-finder"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <Palette className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Birla Opus Colour Finder</h4>
            <p className="text-xs text-on-dark-muted mt-1">159 verified shades with exact hex codes and tone groupings.</p>
          </Link>

          <Link
            href="/room-inspiration"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <Layers className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Room Shade Studio</h4>
            <p className="text-xs text-on-dark-muted mt-1">12 architectural spaces with real wall shade variations.</p>
          </Link>

          <Link
            href="/paint-products"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <ShoppingBag className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Paint Products Catalog</h4>
            <p className="text-xs text-on-dark-muted mt-1">Interior, exterior, waterproofing, enamels &amp; wood finishes.</p>
          </Link>
        </div>
      </div>
    </SEOPageLayout>
  );
};
