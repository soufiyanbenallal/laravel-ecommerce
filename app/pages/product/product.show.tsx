import { useState } from "react";
import {
  ArrowLeft, Check, Heart, Minus, Plus,
  RotateCcw, Shield, Star, Truck, Package,
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { ProductCardPart } from "@/components/shared/product-card.part";
import { Link, useNavigate } from "react-router";
import { CartForm, Image, Money } from "@shopify/hydrogen";
import { KenzDivider, SectionMark } from "../home/partials/home-brand-identity.part";

const tabs = ["Details", "Materials & Care", "Shipping & Returns"] as const;

type ReviewType = {
  id: number;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  author: { name: string };
};

type ProductShowPropsType = {
  product: any;
  selectedVariant: any;
  productOptions: any[];
  relatedProducts?: any[];
  reviews?: ReviewType[];
  reviewStats?: {
    average: number;
    total: number;
    distribution: Record<number, number>;
  };
};

const defaultReviews: ReviewType[] = [
  {
    id: 1,
    rating: 5,
    title: "Exceptional fabric and drape",
    content: "The knit is heavy yet breathable, holding its shape beautifully throughout the day. It has a true editorial quality. Worth every dollar.",
    created_at: "2025-05-18T10:00:00Z",
    author: { name: "Charlotte M." }
  },
  {
    id: 2,
    rating: 5,
    title: "Built to last decades",
    content: "Every stitch is clean and sturdy. Sourced materials are top-tier. A rare wardrobe investment that stands out from fast fashion options.",
    created_at: "2025-04-12T10:00:00Z",
    author: { name: "Julian G." }
  }
];

const defaultReviewStats = {
  average: 4.9,
  total: 32,
  distribution: {
    5: 29,
    4: 2,
    3: 1,
    2: 0,
    1: 0
  }
};

export default function ProductPage({
  product,
  selectedVariant,
  productOptions = [],
  relatedProducts = [],
  reviews = defaultReviews,
  reviewStats = defaultReviewStats
}: ProductShowPropsType) {
  const navigate = useNavigate();
  const openCart = useCart((s) => s.open);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const inWishlist = useWishlist((s) => s.ids.includes(String(product.id)));

  // Setup gallery images
  const mediaNodes = product.media?.nodes ?? [];
  const gallery = mediaNodes.length > 0 
    ? mediaNodes.map((m: any) => m.image?.url).filter(Boolean)
    : [selectedVariant?.image?.url ?? product.featuredImage?.url ?? ""];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Details");

  const onSale = !!selectedVariant?.compareAtPrice;
  
  return (
    <div className="bg-background">
      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl md:px-6 px-2 pt-7">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors duration-200">Home</Link>
          <span className="text-accent">✦</span>
          <Link to="/catalog" className="hover:text-accent transition-colors duration-200">Shop</Link>
          <span className="text-accent">✦</span>
          <span className="text-foreground/70">{product.title}</span>
        </nav>
      </div>

      {/* ── Product Main ── */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-8 md:grid-cols-2 md:gap-16 md:py-12">
        {/* ── Gallery ── */}
        <div className="flex gap-3">
          {/* Thumbnails — desktop */}
          {gallery.length > 1 && (
            <div className="hidden flex-col gap-2 md:flex">
              {gallery.map((src: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={
                    "h-20 w-16 overflow-hidden border transition-all duration-200 cursor-pointer bg-secondary " +
                    (activeImageIdx === i
                      ? "border-accent"
                      : "border-transparent opacity-55 hover:opacity-100")
                  }
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="flex-1 space-y-3">
            <div className="group relative overflow-hidden bg-secondary">
              <img
                src={gallery[activeImageIdx]}
                alt={product.title}
                className="aspect-[5/6] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              />
              {onSale && (
                <div className="absolute left-4 top-4 bg-accent px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-accent-foreground">
                  Sale
                </div>
              )}
              <div className="pointer-events-none absolute right-5 top-5 font-display text-[11px] tracking-[0.2em] text-foreground/20 select-none">
                {String(activeImageIdx + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </div>
            </div>

            {/* Thumbnails — mobile */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:hidden">
                {gallery.map((src: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={
                      "aspect-[5/6] overflow-hidden border transition-all duration-200 cursor-pointer bg-secondary " +
                      (activeImageIdx === i ? "border-accent" : "border-transparent opacity-60")
                    }
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Product Info (sticky on desktop) ── */}
        <div className="md:sticky md:top-24 md:self-start">
          <Link
            to="/catalog"
            className="mb-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Shop
          </Link>

          <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
            {product.vendor}
          </p>

          <h1 className="mt-3 font-display text-4xl font-light leading-[1.05] md:text-5xl">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.round(reviewStats.average) ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="text-[12px] tabular-nums text-foreground/70">
              {reviewStats.average.toFixed(1)}
            </span>
            <span className="text-[11px] text-muted-foreground">
              · {reviewStats.total} reviews
            </span>
          </div>

          <div className="my-5 h-px w-full bg-gradient-to-r from-accent/30 via-accent/60 to-transparent" />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-light">
              {selectedVariant?.price ? (
                <Money data={selectedVariant.price} />
              ) : (
                "-"
              )}
            </span>
            {onSale && (
              <span className="text-sm tabular-nums text-muted-foreground line-through">
                <Money data={selectedVariant.compareAtPrice} />
              </span>
            )}
            <span className="text-[11px] text-muted-foreground font-light">
              Duties included · ships in 2 days
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-5 text-[14px] font-light leading-relaxed text-foreground/77">
              {product.description}
            </p>
          )}

          {/* ── Variant Selectors ── */}
          {productOptions.map((option) => {
            if (option.optionValues.length <= 1) return null;

            return (
              <div className="mt-6" key={option.name}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                    {option.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.optionValues.map((value: any) => {
                    const { name, selected, exists, variantUriQuery } = value;
                    return (
                      <button
                        key={name}
                        disabled={!exists}
                        onClick={() => {
                          if (!selected) {
                            void navigate(`?${variantUriQuery}`, {
                              replace: true,
                              preventScrollReset: true,
                            });
                          }
                        }}
                        className={
                          "border px-4 py-2 text-[12px] font-light transition-all duration-200 cursor-pointer disabled:opacity-30 " +
                          (selected
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-border hover:border-foreground/40")
                        }
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* ── Qty + Add to bag ── */}
          <div className="mt-8 flex items-stretch gap-3">
            {/* Qty stepper */}
            <div className="flex items-center border border-border/70">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-3.5 hover:bg-secondary transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-10 text-center text-[13px] tabular-nums">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-3.5 hover:bg-secondary transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            {/* Add to bag form submission via Shopify CartForm */}
            {selectedVariant ? (
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.LinesAdd}
                inputs={{
                  lines: [
                    {
                      merchandiseId: selectedVariant.id,
                      quantity: qty,
                    }
                  ]
                }}
              >
                <button
                  type="submit"
                  onClick={openCart}
                  disabled={!selectedVariant.availableForSale}
                  className="flex flex-1 items-center justify-center gap-2 bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.22em] font-medium text-background transition-all duration-300 hover:bg-accent cursor-pointer disabled:opacity-50 disabled:bg-muted"
                >
                  {selectedVariant.availableForSale ? (
                    <>Add to Bag — <Money data={{...selectedVariant.price, amount: String(parseFloat(selectedVariant.price.amount) * qty)}} /></>
                  ) : (
                    "Sold Out"
                  )}
                </button>
              </CartForm>
            ) : (
              <button
                disabled
                className="flex flex-1 items-center justify-center bg-foreground opacity-55 py-4 text-[11px] uppercase tracking-[0.22em] font-medium text-background"
              >
                Unavailable
              </button>
            )}

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(String(product.id))}
              aria-label={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
              className={
                "flex items-center justify-center border px-4 transition-all duration-200 cursor-pointer " +
                (inWishlist
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:border-foreground/40")
              }
            >
              <Heart
                className={"h-4.5 w-4.5 " + (inWishlist ? "fill-current" : "")}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Over $250" },
              { icon: RotateCcw, label: "60-Day Returns", sub: "Hassle-free" },
              { icon: Shield, label: "Lifetime Repair", sub: "We fix it" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 border border-border/50 px-2 py-3 text-center hover:border-accent/30 transition-colors duration-300"
              >
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.4} />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em]">{label}</span>
                <span className="text-[10px] text-muted-foreground">{sub}</span>
              </div>
            ))}
          </div>

          {/* Info Tabs */}
          <div className="mt-10 border-t border-border/50 pt-6">
            <div className="flex gap-7 border-b border-border/40">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={
                    "-mb-px border-b-2 pb-3 text-[11px] uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer " +
                    (activeTab === t
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground")
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="pt-5 text-[13px] font-light leading-relaxed text-foreground/75">
              {activeTab === "Details" && (
                <ul className="space-y-2.5 pl-0">
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                    Handcrafted by named masters in limited, numbered batches.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                    Finished with clean luxury seams and classic French tailoring.
                  </li>
                </ul>
              )}
              {activeTab === "Materials & Care" && (
                <div className="space-y-3">
                  <p>
                    Composed of premium, sustainably sourced organic cotton, linen, and cashmere fibers. Dry clean or hand-wash cold, dry flat.
                  </p>
                  <p className="text-muted-foreground">
                    Lifetime repair guarantee: If buttons loosen or seams stretch, we will mend it for life.
                  </p>
                </div>
              )}
              {activeTab === "Shipping & Returns" && (
                <div className="space-y-3">
                  <p>
                    Ships worldwide within 2 business days. Complimentary delivery on purchases over $250.
                  </p>
                  <p>60-day return policy on all unworn items. Shipping slips are fully prepaid.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            <Package className="h-3.5 w-3.5" strokeWidth={1.5} />
            Sourced and curated with ethical practices — KENZ Maison
          </div>
        </div>
      </section>

      <KenzDivider className="mx-auto max-w-7xl md:px-6 px-2" />

      {/* ── Reviews ── */}
      <section className="mx-auto max-w-7xl md:px-6 py-20 px-2">
        <div className="grid gap-16 md:grid-cols-3">
          <div>
            <SectionMark n="✦" label="Reviews" />
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-light">{reviewStats.average.toFixed(1)}</span>
              <span className="font-display text-2xl font-light text-muted-foreground">/ 5</span>
            </div>
            <div className="flex gap-0.5 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4.5 w-4.5 ${i < Math.round(reviewStats.average) ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                  strokeWidth={0}
                />
              ))}
            </div>
            <p className="mt-2 text-[12px] font-light text-muted-foreground">
              Based on {reviewStats.total} verified buyers
            </p>

            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviewStats.distribution[star] ?? 0;
                const pct = reviewStats.total > 0
                  ? Math.round((count / reviewStats.total) * 100)
                  : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-4 text-[11px] text-muted-foreground tabular-nums">{star}</span>
                    <div className="flex-1 h-1 bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-[10px] text-muted-foreground">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-8 md:col-span-2">
            {reviews.map((r) => (
              <article key={r.id} className="border-b border-border/40 pb-8 last:border-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-3 w-3 ${idx < r.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent/70">
                    Verified buyer
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-light">{r.title}</h3>
                <p className="mt-2 text-[13px] font-light leading-relaxed text-foreground/70">
                  {r.content}
                </p>
                <p className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[9px] font-medium text-foreground">
                    {r.author.name.charAt(0)}
                  </span>
                  {r.author.name}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="border-t border-border/40 bg-secondary/20 py-20">
          <div className="mx-auto max-w-7xl md:px-6 px-2">
            <SectionMark n="✦" label="You May Also Like" />
            <h2 className="font-display text-4xl font-light md:text-5xl">Complete the look.</h2>
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
              {relatedProducts.map((p, i) => (
                <ProductCardPart key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
