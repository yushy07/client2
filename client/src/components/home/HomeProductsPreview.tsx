import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import { birlaOpusProducts, birlaOpusCategories } from "@shared/birlaOpusCatalogue";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, ArrowRight, Layers, Sparkles, SlidersHorizontal } from "lucide-react";

const FEATURED_SLUGS = [
  "one-pure-elegance-matt",
  "calista-ever-clear",
  "style-all-weather-shield",
  "all-dry-waterproof-coat",
  "neo-lux-gloss-enamel",
  "calista-ever-clean",
];

export const HomeProductsPreview: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const displayProducts = useMemo(() => {
    if (selectedCategory === "All") {
      const featured = birlaOpusProducts.filter((p) => FEATURED_SLUGS.includes(p.slug));
      return featured.length >= 4 ? featured : birlaOpusProducts.slice(0, 6);
    }
    return birlaOpusProducts.filter((p) => p.category === selectedCategory).slice(0, 6);
  }, [selectedCategory]);

  return (
    <section className="catalogue visual-catalogue-refinement reveal scroll-chapter" id="products" data-scroll-section data-section-label="Products">
      <div className="catalogue-header visual-catalogue-header">
        <div>
          <div className="eyebrow" style={{ color: "var(--color-highlight)" }}>Master Formulation Showcase</div>
          <h2 className="section-title">
            Engineered Birla Opus
            <br />
            Formulations.
          </h2>
          <p className="section-lead">
            Curated selection of Birla Opus interior luxury emulsions, all-weather exterior shields, and waterproofing barriers available at our Baskhari showroom.
          </p>
        </div>

        {/* Category Pills */}
        <div className="filter-pills" aria-label="Filter featured products">
          <button
            type="button"
            className={selectedCategory === "All" ? "active" : ""}
            onClick={() => setSelectedCategory("All")}
          >
            Featured Formulations
          </button>
          {birlaOpusCategories.slice(0, 5).map((cat) => (
            <button
              type="button"
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Curated Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 my-6">
        {displayProducts.map((product) => (
          <article
            key={product.slug}
            className="group rounded-2xl overflow-hidden bg-dark-surface border border-border-teal/50 hover:border-accent transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            style={{ background: "rgba(12, 18, 20, 0.85)" }}
          >
            <div className="h-40 sm:h-44 w-full bg-dark/60 overflow-hidden relative p-3 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading={displayProducts.indexOf(product) < 2 ? "eager" : "lazy"}
                fetchPriority={displayProducts.indexOf(product) < 2 ? "high" : "auto"}
                decoding="async"
                width={248}
                height={226}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
              />
              <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-accent font-semibold uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
              <div>
                <span className="text-[10px] text-on-dark-muted font-mono uppercase tracking-wider block mb-0.5">
                  Series: {product.family}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-accent transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-on-dark-muted leading-relaxed line-clamp-2 mt-1">
                  {product.copy}
                </p>
              </div>

              <div className="pt-2.5 border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: `prod-${product.slug}`,
                      type: "product",
                      title: product.name,
                      meta: `${product.category} · ${product.family}`,
                      quantity: 1,
                    }, true);
                  }}
                  className="button-primary text-xs py-1.5 px-3 flex-1 justify-center"
                  style={{ minHeight: "34px" }}
                >
                  <ShoppingBag size={13} />
                  <span>+ Add to Enquiry</span>
                </button>
                <Link
                  href="/paint-products"
                  className="button-ghost text-xs py-1.5 px-3"
                  style={{ minHeight: "34px" }}
                >
                  Specs
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Action Footer linking to the full 124-product catalogue */}
      <div className="catalogue-footer-cta p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-dark-surface to-dark-surface border border-border-teal/50 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs uppercase font-mono text-accent font-semibold tracking-wider">
            Complete Official Portfolio
          </span>
          <h3 className="text-lg sm:text-xl font-serif text-white">
            Explore All 124 Birla Opus Formulations & Categories
          </h3>
          <p className="text-xs text-on-dark-muted max-w-xl">
            Filter by Interior, Exterior, Waterproofing, Enamels, and Wood Finishes with side-by-side formulation comparison.
          </p>
        </div>

        <Link
          href="/paint-products"
          className="button-primary whitespace-nowrap px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-accent/20"
        >
          <span>Explore All Products</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
};
