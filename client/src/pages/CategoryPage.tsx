import React, { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { SEOPageLayout } from "@/components/seo/SEOPageLayout";
import { SITE_ROUTES_SEO } from "@shared/seoKeywordMap";
import { birlaOpusProducts, birlaOpusCategories, type BirlaOpusCategory } from "@shared/birlaOpusCatalogue";
import { textureLibrary } from "@shared/discoveryContent";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import {
  ShoppingBag,
  MessageCircle,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Palette
} from "lucide-react";

interface CategoryPageProps {
  routePath: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ routePath }) => {
  const seo = SITE_ROUTES_SEO[routePath] || SITE_ROUTES_SEO["/paint-products"];
  const targetCategory = seo.category;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<string>("All");

  // Filter products
  const products = useMemo(() => {
    let list = targetCategory
      ? birlaOpusProducts.filter((p) => p.category === targetCategory)
      : birlaOpusProducts;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.copy.toLowerCase().includes(q)
      );
    }

    if (selectedFamily !== "All") {
      list = list.filter((p) => p.family === selectedFamily);
    }

    return list;
  }, [targetCategory, searchQuery, selectedFamily]);

  // Distinct families in this category
  const availableFamilies = useMemo(() => {
    const set = new Set<string>();
    const baseList = targetCategory
      ? birlaOpusProducts.filter((p) => p.category === targetCategory)
      : birlaOpusProducts;
    baseList.forEach((p) => set.add(p.family));
    return ["All", ...Array.from(set)];
  }, [targetCategory]);

  return (
    <SEOPageLayout seo={seo}>
      {/* Category Switcher Pills */}
      <div className="mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Link
            href="/paint-products"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/paint-products"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            All Products ({birlaOpusProducts.length})
          </Link>
          <Link
            href="/interior-paints"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/interior-paints"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            Interior Paints
          </Link>
          <Link
            href="/exterior-paints"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/exterior-paints"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            Exterior Paints
          </Link>
          <Link
            href="/waterproofing"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/waterproofing"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            Waterproofing
          </Link>
          <Link
            href="/enamels"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/enamels"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            Enamels
          </Link>
          <Link
            href="/wood-finishes"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/wood-finishes"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            Wood Finishes
          </Link>
          <Link
            href="/wall-textures"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/wall-textures"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            Wall Textures
          </Link>
          <Link
            href="/wallpapers"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/wallpapers"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            Wallpapers
          </Link>
          <Link
            href="/paint-tools"
            className={`text-xs px-4 py-2 rounded-xl border transition-all whitespace-nowrap font-medium ${
              routePath === "/paint-tools"
                ? "bg-accent text-dark border-accent font-bold shadow-md"
                : "bg-dark-surface/60 border-border-teal/50 text-on-dark-muted hover:text-white"
            }`}
          >
            Paint Tools
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-dark-surface/80 p-4 rounded-2xl border border-border-teal/50 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-on-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name or series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark/80 border border-border-teal/60 rounded-xl text-xs text-white placeholder:text-on-dark-muted focus:outline-none focus:border-accent"
          />
        </div>

        {/* Family Filters */}
        {availableFamilies.length > 2 && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            <span className="text-[11px] font-semibold text-on-dark-muted uppercase mr-1 flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3 h-3 text-accent" /> Series:
            </span>
            {availableFamilies.map((fam) => (
              <button
                key={fam}
                onClick={() => setSelectedFamily(fam)}
                className={`text-[11px] px-3 py-1 rounded-lg border transition-all flex-shrink-0 ${
                  selectedFamily === fam
                    ? "bg-accent text-dark border-accent font-bold shadow-sm"
                    : "bg-dark/60 text-on-dark-muted border-border-teal/50 hover:text-white"
                }`}
              >
                {fam}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Special Category: Wall Textures Showcase */}
      {routePath === "/wall-textures" && (
        <div className="mb-12 space-y-6">
          <div className="border-b border-border-teal/40 pb-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" /> Designer Textures & Accent Finishes
            </h2>
            <p className="text-xs text-on-dark-muted mt-1">
              Live texture effects available for physical sample inspection at Jaymurti Traders showroom in Baskhari.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {textureLibrary.slice(0, 8).map((tex, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-dark-surface border border-border-teal/60 flex flex-col justify-between hover:border-accent transition-all group shadow-lg"
              >
                <div className="aspect-[4/3] bg-dark overflow-hidden relative">
                  <ResponsiveImage
                    src={tex.imageUrl}
                    alt={`${tex.name} texture finish`}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-accent font-semibold uppercase">
                    {tex.group}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold text-white">{tex.name}</h3>
                  <p className="text-xs text-on-dark-muted">Artisanal {tex.group.toLowerCase()} textured wall application by Birla Opus.</p>
                  
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders,%20I%20am%20enquiring%20about%20the%20${encodeURIComponent(tex.name)}%20texture%20finish.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-semibold"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Enquire Sample on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border-teal/40 pb-3">
          <h2 className="text-xl font-serif text-white">
            Available Formulations ({products.length})
          </h2>
          <span className="text-xs text-on-dark-muted font-mono">
            Birla Opus Authorized Catalogue
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-dark-surface/50 rounded-2xl border border-border-teal/40 space-y-3">
            <p className="text-sm text-on-dark-muted">No products found matching your search.</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedFamily("All");
              }}
              className="border-border-teal text-xs text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const whatsappUrl = `https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders,%20I%20am%20enquiring%20about%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.category)}).`;

              return (
                <article
                  key={product.slug}
                  className="group rounded-2xl overflow-hidden bg-dark-surface border border-border-teal/60 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 flex flex-col justify-between"
                >
                  {/* Image Card */}
                  <div className="aspect-[4/3] w-full bg-dark/80 overflow-hidden relative p-4 flex items-center justify-center">
                    <img
                      src={product.imageUrl}
                      alt={`Birla Opus ${product.name} ${product.category}`}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-lg"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-accent font-semibold uppercase">
                      {product.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 bg-dark-surface/90 flex-1 flex flex-col justify-between space-y-3 border-t border-border-teal/40">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-on-dark-muted font-mono uppercase tracking-wider">
                          Series: {product.family}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-on-dark-muted leading-relaxed line-clamp-3">
                        {product.copy}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs px-3 py-1.5 rounded-lg transition-all w-full justify-center font-medium"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Cross-linking cards */}
      <div className="mt-14 pt-8 border-t border-border-teal/40">
        <h3 className="text-lg font-serif text-white mb-4">Explore More Inspiration & Tools</h3>
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
            href="/surface-studio"
            className="p-5 rounded-2xl bg-dark-surface border border-border-teal/50 hover:border-accent transition-all group flex flex-col justify-between"
          >
            <Sparkles className="w-5 h-5 text-accent mb-2" />
            <h4 className="text-sm font-semibold text-white group-hover:text-accent">Surface Studio</h4>
            <p className="text-xs text-on-dark-muted mt-1">Metallic finishes, stucco textures, and tactile swatches.</p>
          </Link>
        </div>
      </div>
    </SEOPageLayout>
  );
};
