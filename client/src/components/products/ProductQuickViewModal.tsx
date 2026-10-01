import React, { useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  MessageCircle,
  Palette,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export interface ProductModalData {
  name: string;
  family: string;
  slug: string;
  category: string;
  copy: string;
  colour?: string;
  text?: string;
  imageUrl: string;
  sourceUrl?: string;
}

interface ProductQuickViewModalProps {
  product: ProductModalData | null;
  productList?: readonly ProductModalData[] | ProductModalData[];
  onClose: () => void;
  onNavigate?: (product: ProductModalData) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  productList = [],
  onClose,
  onNavigate,
}) => {
  const { addToCart } = useCart();

  // Escape key and arrow keys to navigate
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && productList.length > 1 && onNavigate) {
        e.preventDefault();
        const currentIdx = productList.findIndex((p) => p.slug === product.slug);
        const prevIdx = currentIdx > 0 ? currentIdx - 1 : productList.length - 1;
        const target = productList[prevIdx];
        if (target) onNavigate(target);
      } else if (e.key === "ArrowRight" && productList.length > 1 && onNavigate) {
        e.preventDefault();
        const currentIdx = productList.findIndex((p) => p.slug === product.slug);
        const nextIdx = currentIdx < productList.length - 1 ? currentIdx + 1 : 0;
        const target = productList[nextIdx];
        if (target) onNavigate(target);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [product, productList, onClose, onNavigate]);

  // Lock body scroll
  useEffect(() => {
    if (product) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [product]);

  if (!product) return null;

  const currentIdx = productList.findIndex((p) => p.slug === product.slug);
  const whatsappUrl = `https://wa.me/918756659035?text=Hello%20Jaymurti%20Traders,%20I%20am%20enquiring%20about%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.category)}%20·%20${encodeURIComponent(product.family)}%20Series).`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          className="relative bg-gradient-to-b from-[#0A262D] to-[#06181C] border border-border-teal/60 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl shadow-black/80 max-h-[90vh] overflow-y-auto no-scrollbar z-10"
        >
          {/* Top Header Controls */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-accent bg-accent/15 px-2.5 py-1 rounded-full border border-accent/30">
                {product.category}
              </span>
              <span className="text-[10px] font-mono text-on-dark-muted">
                Series: <strong className="text-white">{product.family}</strong>
              </span>
              {productList.length > 1 && currentIdx >= 0 && (
                <span className="text-[10px] font-mono text-teal-300/80 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-700/40 hidden xs:inline">
                  {currentIdx + 1} of {productList.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {productList.length > 1 && onNavigate && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      const prevIdx = currentIdx > 0 ? currentIdx - 1 : productList.length - 1;
                      const target = productList[prevIdx];
                      if (target) onNavigate(target);
                    }}
                    className="w-8 h-8 rounded-full bg-dark-surface hover:bg-dark-surface/80 text-white/80 hover:text-accent border border-border-teal/60 flex items-center justify-center transition-all"
                    aria-label="Previous product"
                    title="Previous product (Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextIdx = currentIdx < productList.length - 1 ? currentIdx + 1 : 0;
                      const target = productList[nextIdx];
                      if (target) onNavigate(target);
                    }}
                    className="w-8 h-8 rounded-full bg-dark-surface hover:bg-dark-surface/80 text-white/80 hover:text-accent border border-border-teal/60 flex items-center justify-center transition-all"
                    aria-label="Next product"
                    title="Next product (Right Arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-dark-surface hover:bg-dark-surface/80 text-teal-200 hover:text-accent border border-border-teal/60 flex items-center justify-center transition-all ml-1"
                aria-label="Close product details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Body Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Can Product Image */}
            <div className="sm:col-span-5 flex items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-[#081F24] to-[#041215] border border-border-teal/40 aspect-[4/3] sm:aspect-square relative overflow-hidden">
              <img
                src={product.imageUrl}
                alt={`Birla Opus ${product.name}`}
                className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              />
              <div className="absolute bottom-2 left-2 right-2 text-center text-[9px] text-on-dark-muted font-mono bg-dark/60 backdrop-blur-sm rounded py-0.5">
                Authorized Birla Opus Can
              </div>
            </div>

            {/* Specifications & Copy */}
            <div className="sm:col-span-7 space-y-4">
              <div>
                <h3 id="product-modal-title" className="text-2xl font-serif text-white font-bold leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-accent font-medium mt-1">
                  Birla Opus Architectural Formulation · {product.family} Collection
                </p>
              </div>

              <p className="text-xs sm:text-sm text-on-dark-muted leading-relaxed">
                {product.copy}
              </p>

              {/* Spec Highlights Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                <div className="bg-dark-surface/70 p-2.5 rounded-xl border border-border-teal/30">
                  <span className="text-[10px] text-on-dark-muted block uppercase font-mono">Category</span>
                  <span className="text-white font-semibold">{product.category}</span>
                </div>
                <div className="bg-dark-surface/70 p-2.5 rounded-xl border border-border-teal/30">
                  <span className="text-[10px] text-on-dark-muted block uppercase font-mono">Authenticity</span>
                  <span className="text-white font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Genuine
                  </span>
                </div>
                <div className="bg-dark-surface/70 p-2.5 rounded-xl border border-border-teal/30">
                  <span className="text-[10px] text-on-dark-muted block uppercase font-mono">Tinting</span>
                  <span className="text-white font-semibold">Computerized 159 Shades</span>
                </div>
                <div className="bg-dark-surface/70 p-2.5 rounded-xl border border-border-teal/30">
                  <span className="text-[10px] text-on-dark-muted block uppercase font-mono">Availability</span>
                  <span className="text-white font-semibold text-accent">In Stock · Baskhari</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                addToCart({
                  id: `prod-${product.slug}`,
                  type: "product",
                  title: product.name,
                  meta: `${product.category} · ${product.family}`,
                  imageUrl: product.imageUrl,
                  quantity: 1,
                }, true);
                onClose();
              }}
              className="bg-accent text-dark font-bold text-xs py-3 px-5 rounded-xl w-full sm:flex-1 shadow-lg hover:bg-accent/90 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>+ Add to Enquiry Cart</span>
            </Button>

            <Button
              asChild
              className="bg-[#25D366] text-[#042412] hover:bg-[#20ba5a] font-bold text-xs py-3 px-5 rounded-xl w-full sm:w-auto shadow-lg flex items-center justify-center gap-2"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </Button>

            <Link
              href="/colour-finder"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-on-dark-muted hover:text-accent font-medium px-3 py-2 rounded-xl hover:bg-white/5 transition-colors w-full sm:w-auto text-center"
            >
              <Palette className="w-3.5 h-3.5 text-accent" />
              <span>Find Matching Shades &rarr;</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
