import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import { birlaOpusProducts, birlaOpusCategories } from "@shared/birlaOpusCatalogue";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 my-8">
        {displayProducts.map((product) => (
          <article
            key={product.slug}
            className="group rounded-2xl overflow-hidden bg-gradient-to-b from-[#123F46] via-[#0E353B] to-[#0C292F] border border-[#176B73]/40 hover:border-accent/60 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(12,41,47,0.6)] hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Studio Showcase Pedestal for Product Can */}
            <div className="h-48 sm:h-52 w-full bg-gradient-to-b from-[#F7F6F1] via-[#E7ECEA] to-[#DCE5E2] overflow-hidden relative p-4 flex items-center justify-center border-b border-[#176B73]/20 shadow-inner">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading={displayProducts.indexOf(product) < 2 ? "eager" : "lazy"}
                fetchPriority={displayProducts.indexOf(product) < 2 ? "high" : "auto"}
                decoding="async"
                width={248}
                height={226}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-108 drop-shadow-[0_10px_16px_rgba(18,63,70,0.25)]"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="bg-[#0C292F]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-accent font-mono font-semibold uppercase tracking-wider border border-[#176B73]/50 shadow-sm">
                  {product.category}
                </span>
              </div>
              <span className="absolute top-3 right-3 bg-[#123F46]/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] text-teal-100 font-mono font-bold uppercase tracking-wider border border-[#176B73]/50 shadow-sm">
                Official Can
              </span>
            </div>

            {/* Product Metadata & Actions */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10.5px] text-amber-300/90 font-mono uppercase tracking-widest font-semibold">
                    Series: {product.family}
                  </span>
                  <span className="text-[10px] text-teal-200/80 font-mono">
                    In Stock · Baskhari
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-medium text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-teal-100/70 leading-relaxed line-clamp-2 mt-1.5">
                  {product.copy}
                </p>
              </div>

              <div className="pt-3 border-t border-[#176B73]/30 flex items-center justify-between gap-2.5">
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
                  className="button-primary text-xs py-2 px-3.5 flex-1 justify-center shadow-md font-semibold tracking-wide"
                  style={{ minHeight: "38px" }}
                >
                  <ShoppingBag size={14} />
                  <span>+ Add to Enquiry</span>
                </button>
                <Link
                  href="/paint-products"
                  className="button-ghost text-xs py-2 px-3.5 font-medium border border-[#176B73]/60 text-[#E7ECEA] bg-[#123F46]/40 hover:bg-[#176B73]/50 hover:border-accent hover:text-accent transition-all duration-200 rounded-xl"
                  style={{ minHeight: "38px" }}
                >
                  <span>Specs &rarr;</span>
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
