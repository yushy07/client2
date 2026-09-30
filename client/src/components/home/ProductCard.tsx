import { memo, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight, Copy, Eye } from "lucide-react";
import { birlaOpusProducts } from "../../../../shared/birlaOpusCatalogue";

export type CatalogueProduct = (typeof birlaOpusProducts)[number];
export interface CartItem {
  id: string;
  type: "product" | "shade" | "texture" | "estimate";
  title: string;
  meta: string;
  quantity?: number;
  colourHex?: string;
  notes?: string;
}

type ProductCardProps = {
  product: CatalogueProduct;
  index: number;
  isImageLoaded: boolean;
  isCompared: boolean;
  onImageLoad: (slug: string) => void;
  onCompare: (slug: string) => void;
  onQuickView: (product: CatalogueProduct) => void;
  onAddCart: (item: CartItem) => void;
  onPointerMove: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: (event: ReactPointerEvent<HTMLElement>) => void;
};

export const ProductCard = memo(function ProductCard({ product, index, isImageLoaded, isCompared, onImageLoad, onCompare, onQuickView, onAddCart, onPointerMove, onPointerLeave }: ProductCardProps) {
  return (
    <article className="product-card" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="product-image-stage">
        <div className="product-topline"><span className="product-topline-family">{product.family} · {product.category}</span><span className="product-topline-num">{String(index + 1).padStart(2, "0")}</span></div>
        <div className={`product-can ${product.imageUrl ? "with-image" : ""} ${isImageLoaded ? "image-ready" : ""}`} style={{ "--can-colour": product.colour, "--can-text": product.text } as React.CSSProperties}>
          {product.imageUrl ? <><span className="product-image-skeleton" aria-hidden="true" /><img src={product.imageUrl} alt={`${product.name} product pack`} width={248} height={226} loading="lazy" decoding="async" onLoad={() => onImageLoad(product.slug)} onError={() => onImageLoad(product.slug)} /></> : <span className="can-label">Birla<br />Opus</span>}
        </div>
      </div>
      <div className="product-utility" aria-label="Product utilities">
        <button type="button" onClick={() => onQuickView(product)} aria-label={`Quick view ${product.name}`}><Eye size={16} aria-hidden="true" />Quick View</button>
        <button type="button" className={isCompared ? "active" : ""} aria-pressed={isCompared} onClick={() => onCompare(product.slug)}><Copy size={16} aria-hidden="true" />{isCompared ? "Added" : "Compare"}</button>
      </div>
      <div className="product-card-copy">
        <div className="product-family-tag">{product.family} Series</div><h3>{product.name}</h3><p>{product.copy}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", gap: "8px" }}>
          <button type="button" className="button-primary" style={{ minHeight: "40px", padding: "0 14px", fontSize: "11px", flex: 1, justifyContent: "center" }} onClick={() => onAddCart({ id: `prod-${product.slug}`, type: "product", title: product.name, meta: `${product.category} · ${product.family}`, quantity: 1 })}>+ Add to Enquiry</button>
          <a className="product-card-action" href={product.sourceUrl} target="_blank" rel="noreferrer" style={{ padding: "0 4px", whiteSpace: "nowrap" }}>Details <ArrowRight size={12} /></a>
        </div>
      </div>
    </article>
  );
});
