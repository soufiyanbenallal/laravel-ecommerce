import { useState } from "react";
import {
  ArrowLeft, Check, Heart, Minus, Plus,
  RotateCcw, Shield, Star, Truck, Package,
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { ProductCard } from "@/components/site/ProductCard";
import { toast } from "sonner";
import { Link, Head } from "@inertiajs/react";
import type { ProductModelType } from "@/types/ecommerce.types";
import { KenzDivider, SectionMark } from "../Home/partials/home-brand-identity.part";

/* ────────────────────────────────────────────────────────────
   Types
──────────────────────────────────────────────────────────── */
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
  product: ProductModelType;
  related_products: ProductModelType[];
  reviews: ReviewType[];
  review_stats: {
    average: number;
    total: number;
    distribution: Record<number, number>;
  };
};

/* ────────────────────────────────────────────────────────────
   Sub-components
──────────────────────────────────────────────────────────── */
function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-4 w-4" : "h-3 w-3";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < Math.round(rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Page
──────────────────────────────────────────────────────────── */
export default function ProductPage({
  product,
  related_products,
  reviews,
  review_stats,
}: ProductShowPropsType) {
  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image ?? ""];

  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colors?.[0] ?? "Natural");
  const [size, setSize] = useState(
    product.sizes?.[Math.floor((product.sizes?.length ?? 0) / 2)] ?? "M",
  );
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Details");

  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const inWishlist = useWishlist((s) => s.ids.includes(product.id.toString()));

  const onSale = !!(product.old_price && product.old_price > product.price);
  const off = onSale
    ? Math.round(((product.old_price! - product.price) / product.old_price!) * 100)
    : 0;
  const detailsArray = Array.isArray(product.metadata?.details)
    ? product.metadata.details
    : [];

  return (
    <div>
      <Head title={`${product.name} — KENZ Maison`}>
        <meta name="description" content={product.description ?? product.name} />
      </Head>

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl md:px-6 px-2 pt-7">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link>
          <span className="text-accent">✦</span>
          <Link href="/catalog" className="hover:text-accent transition-colors duration-200">Shop</Link>
          <span className="text-accent">✦</span>
          <span className="text-foreground/70">{product.name}</span>
        </nav>
      </div>

      {/* ── Product Main ── */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-8 md:grid-cols-2 md:gap-16 md:py-12">

        {/* ── Gallery ── */}
        <div className="flex gap-3">
          {/* Thumbnails — desktop */}
          {gallery.length > 1 && (
            <div className="hidden flex-col gap-2 md:flex">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={
                    "h-20 w-16 overflow-hidden border transition-all duration-200 cursor-pointer " +
                    (active === i
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
                src={gallery[active]}
                alt={product.name}
                width={900}
                height={1100}
                className="aspect-[5/6] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              />
              {/* Badge */}
              {onSale && (
                <div className="absolute left-4 top-4 bg-accent px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-accent-foreground">
                  −{off}%
                </div>
              )}
              {product.badge && (
                <div className="absolute left-4 top-4 bg-foreground/90 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-background">
                  {product.badge}
                </div>
              )}
              {/* Index watermark */}
              <div className="pointer-events-none absolute right-5 top-5 font-display text-[11px] tracking-[0.2em] text-foreground/20 select-none">
                {String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </div>
            </div>

            {/* Thumbnails — mobile */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:hidden">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={
                      "aspect-[5/6] overflow-hidden border transition-all duration-200 cursor-pointer " +
                      (active === i ? "border-accent" : "border-transparent opacity-60")
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
          {/* Back link */}
          <Link
            href="/catalog"
            className="mb-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Shop
          </Link>

          {/* Category / gender tag */}
          <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
            {product.category} · {product.gender}
          </p>

          {/* Product name */}
          <h1 className="mt-3 font-display text-4xl font-light leading-[1.05] md:text-5xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-3">
            <StarRow rating={product.rating} />
            <span className="text-[12px] tabular-nums text-foreground/70">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-muted-foreground">
              · {product.reviews_count} reviews
            </span>
          </div>

          {/* ── Thin gold divider ── */}
          <div className="my-5 h-px w-full bg-gradient-to-r from-accent/30 via-accent/60 to-transparent" />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-light">${product.price}</span>
            {onSale && (
              <span className="text-sm tabular-nums text-muted-foreground line-through">
                ${product.old_price}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground font-light">
              Duties included · ships in 2 days
            </span>
          </div>

          {/* Description */}
          <p className="mt-5 text-[14px] font-light leading-relaxed text-foreground/70">
            {product.description}
          </p>

          {/* ── Colour selector ── */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">Colour</span>
                <span className="text-[12px] font-light text-foreground/80">{color}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={
                      "border px-4 py-2 text-[12px] font-light transition-all duration-200 cursor-pointer " +
                      (color === c
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border hover:border-foreground/40")
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Size selector ── */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">Size</span>
                <button className="text-[11px] uppercase tracking-[0.18em] text-accent hover:underline underline-offset-4 cursor-pointer">
                  Size guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      "border py-2.5 text-[12px] font-light transition-all duration-200 cursor-pointer " +
                      (size === s
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border hover:border-foreground/40")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

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

            {/* Add to bag */}
            <button
              onClick={() => {
                add(
                  {
                    id: product.id.toString(),
                    name: product.name,
                    price: product.price,
                    image: product.image ?? "",
                    color,
                    size: product.sizes && product.sizes.length > 0 ? size : undefined,
                    slug: product.slug,
                  },
                  qty,
                );
                toast.success(`${product.name} added to your bag`);
              }}
              className="flex flex-1 items-center justify-center gap-2 bg-foreground py-4 text-[11px] uppercase tracking-[0.22em] font-medium text-background transition-all duration-300 hover:bg-accent cursor-pointer"
            >
              Add to Bag — ${(product.price * qty).toFixed(0)}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => toggle(product.id.toString())}
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

          {/* ── Trust badges ── */}
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

          {/* ── Info Tabs ── */}
          <div className="mt-10 border-t border-border/50 pt-6">
            <div className="flex gap-7 border-b border-border/40">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={
                    "-mb-px border-b-2 pb-3 text-[11px] uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer " +
                    (tab === t
                      ? "border-accent text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground")
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="pt-5 text-[13px] font-light leading-relaxed text-foreground/75">
              {tab === "Details" && (
                <ul className="space-y-2.5">
                  {detailsArray.length > 0 ? (
                    detailsArray.map((d: string) => (
                      <li key={d} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                        {d}
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} />
                      Handcrafted with care and attention to detail.
                    </li>
                  )}
                </ul>
              )}
              {tab === "Materials & Care" && (
                <div className="space-y-3">
                  <p>
                    Composed of{" "}
                    {product.materials && product.materials.length > 0
                      ? product.materials.join(", ").toLowerCase()
                      : "premium natural materials"}
                    . Dry clean only — or hand-wash cold and lay flat to dry.
                  </p>
                  <p className="text-muted-foreground">
                    If anything tears, frays, or loses a button, send it back. We repair, for life.
                  </p>
                </div>
              )}
              {tab === "Shipping & Returns" && (
                <div className="space-y-3">
                  <p>
                    Ships within 2 business days from our warehouse. Free worldwide shipping over
                    $250, duties included.
                  </p>
                  <p>60-day returns on unworn items. Free returns in EU, UK and US.</p>
                </div>
              )}
            </div>
          </div>

          {/* Brand footer note */}
          <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            <Package className="h-3.5 w-3.5" strokeWidth={1.5} />
            Made in small batches by named artisans — KENZ Maison
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <KenzDivider className="mx-auto max-w-7xl md:px-6 px-2" />

      {/* ── Reviews ── */}
      <section className="mx-auto max-w-7xl md:px-6 py-20 px-2">
        <div className="grid gap-16 md:grid-cols-3">

          {/* Review summary */}
          <div>
            <SectionMark n="✦" label="Reviews" />
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-light">{review_stats.average.toFixed(1)}</span>
              <span className="font-display text-2xl font-light text-muted-foreground">/ 5</span>
            </div>
            <StarRow rating={review_stats.average} size="md" />
            <p className="mt-2 text-[12px] font-light text-muted-foreground">
              Based on {review_stats.total} verified buyers
            </p>

            {/* Distribution bars */}
            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = review_stats.distribution[star] ?? 0;
                const pct = review_stats.total > 0
                  ? Math.round((count / review_stats.total) * 100)
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

            <button className="mt-7 border border-border/60 px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer">
              Write a review
            </button>
          </div>

          {/* Review list */}
          <div className="space-y-8 md:col-span-2">
            {reviews.length === 0 && (
              <div className="py-12 text-center text-muted-foreground font-light">
                No reviews yet — be the first to share your experience.
              </div>
            )}
            {reviews.map((r) => (
              <article key={r.id} className="border-b border-border/40 pb-8 last:border-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <StarRow rating={r.rating} />
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
      {related_products && related_products.length > 0 && (
        <section className="border-t border-border/40 bg-secondary/20 py-20">
          <div className="mx-auto max-w-7xl md:px-6 px-2">
            <SectionMark n="✦" label="You May Also Like" />
            <h2 className="font-display text-4xl font-light md:text-5xl">Complete the look.</h2>
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
              {related_products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
