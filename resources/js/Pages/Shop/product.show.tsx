import { useState } from "react";
import { ArrowLeft, Check, Heart, Minus, Plus, RotateCcw, Shield, Star, Truck } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { ProductCard } from "@/components/site/ProductCard";
import { toast } from "sonner";
import { Link, Head } from "@inertiajs/react";
import type { ProductModelType } from "@/types/ecommerce.types";

const tabs = ["Details", "Materials & Care", "Shipping & Returns"] as const;

type ProductShowPropsType = {
  product: ProductModelType;
  related_products: ProductModelType[];
  reviews: {
    id: number;
    rating: number;
    title: string;
    content: string;
    created_at: string;
    author: { name: string };
  }[];
  review_stats: {
    average: number;
    total: number;
    distribution: Record<number, number>;
  };
};

export default function ProductPage({ product, related_products, reviews, review_stats }: ProductShowPropsType) {
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image ?? ""];
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colors?.[0] ?? "Natural");
  const [size, setSize] = useState(product.sizes?.[Math.floor((product.sizes?.length ?? 0) / 2)] ?? "M");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Details");
  
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const inWishlist = useWishlist((s) => s.ids.includes(product.id.toString()));

  const onSale = !!(product.old_price && product.old_price > product.price);
  const off = onSale ? Math.round(((product.old_price! - product.price) / product.old_price!) * 100) : 0;
  
  const detailsArray = Array.isArray(product.metadata?.details) ? product.metadata.details : [];

  return (
    <div>
      <Head title={`${product.name} — Atelier Nord`}>
        <meta name="description" content={product.description ?? product.name} />
      </Head>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/catalog" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-2 md:gap-16 md:py-12">
        {/* Gallery */}
        <div className="flex gap-3">
          {gallery.length > 1 && (
            <div className="hidden flex-col gap-3 md:flex">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={
                    "h-20 w-16 overflow-hidden border cursor-pointer " +
                    (active === i ? "border-foreground" : "border-transparent hover:border-border")
                  }
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="flex-1 space-y-3">
            <div className="overflow-hidden bg-secondary">
              <img
                src={gallery[active]}
                alt={product.name}
                width={900}
                height={1100}
                className="aspect-[5/6] w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:hidden">
                {gallery.map((src, i) => (
                  <button key={i} onClick={() => setActive(i)} className="aspect-[5/6] overflow-hidden bg-secondary border border-transparent">
                    <img src={src} alt="" className="h-full w-full object-cover opacity-90" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="md:sticky md:top-24 md:self-start">
          <Link href="/catalog" className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3 w-3" /> Back to Shop
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {product.category} · {product.gender}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" strokeWidth={0} />
              <span className="tabular-nums text-foreground">{product.rating.toFixed(1)}</span>
            </span>
            <span>· {product.reviews_count} reviews</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-2xl">${product.price}</span>
            {onSale && (
              <span className="text-sm tabular-nums text-muted-foreground line-through">${product.old_price}</span>
            )}
            <span className="text-sm text-muted-foreground">Duties included · ships in 2 days</span>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-foreground/80">{product.description}</p>

          {/* Color */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Colour</div>
                <div className="text-sm text-muted-foreground">{color}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={
                      "border px-4 py-2 text-sm transition-colors cursor-pointer " +
                      (color === c
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground")
                    }
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Size</div>
                <button className="text-xs text-accent underline-offset-4 hover:underline cursor-pointer">Size guide</button>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={
                      "border py-2.5 text-sm transition-colors cursor-pointer " +
                      (size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + add */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-3 hover:bg-secondary cursor-pointer" aria-label="Decrease">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-3 hover:bg-secondary cursor-pointer" aria-label="Increase">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
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
              className="flex flex-1 items-center justify-center gap-2 bg-foreground py-4 text-sm font-medium tracking-wide text-background transition-colors hover:bg-accent cursor-pointer"
            >
              Add to bag — ${product.price * qty}
            </button>
            <button
              onClick={() => toggle(product.id.toString())}
              aria-label="Save"
              className="flex items-center justify-center border border-border px-4 hover:border-foreground cursor-pointer"
            >
              <Heart className={"h-5 w-5 " + (inWishlist ? "fill-accent text-accent" : "")} strokeWidth={1.4} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
            {[
              { icon: Truck, t: "Free shipping" },
              { icon: RotateCcw, t: "60-day returns" },
              { icon: Shield, t: "Lifetime repairs" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex flex-col items-center gap-2 border border-border/60 p-3 text-center">
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
                {t}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-border/60 pt-6">
            <div className="flex gap-6 border-b border-border/60 text-sm">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={
                    "-mb-px border-b-2 pb-3 transition-colors cursor-pointer " +
                    (tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pt-5 text-sm text-foreground/80">
              {tab === "Details" && (
                <ul className="space-y-2">
                  {detailsArray.length > 0 ? (
                    detailsArray.map((d: string) => (
                      <li key={d} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.5} />
                        {d}
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.5} />
                      Handcrafted with care and attention to detail.
                    </li>
                  )}
                </ul>
              )}
              {tab === "Materials & Care" && (
                <div className="space-y-3">
                  <p>Composed of {product.materials && product.materials.length > 0 ? product.materials.join(", ").toLowerCase() : "premium natural materials"}. Dry clean only — or hand-wash cold and lay flat to dry. Store folded in breathable cotton.</p>
                  <p className="text-muted-foreground">If anything tears, frays, or loses a button, send it back. We repair, for life.</p>
                </div>
              )}
              {tab === "Shipping & Returns" && (
                <div className="space-y-3">
                  <p>Ships within 2 business days from our Lisbon warehouse. Free worldwide shipping over $250, duties included to most regions.</p>
                  <p>60-day returns on unworn items. Returns are free in the EU, UK and US.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl border-t border-border/60 px-6 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reviews</p>
            <h2 className="mt-3 font-display text-4xl">{review_stats.average.toFixed(1)} / 5</h2>
            <div className="mt-2 flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent" strokeWidth={0} />
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Based on {review_stats.total} verified buyers</p>
            <button className="mt-6 border border-border px-5 py-2.5 text-sm hover:border-foreground cursor-pointer">Write a review</button>
          </div>
          <div className="space-y-8 md:col-span-2">
            {reviews.map((r) => (
              <article key={r.id} className="border-b border-border/60 pb-8 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                </div>
                <h3 className="mt-3 font-display text-xl">{r.title}</h3>
                <p className="mt-2 text-sm text-foreground/80">{r.content}</p>
                <p className="mt-3 text-xs text-muted-foreground">{r.author.name} · Verified buyer</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related_products && related_products.length > 0 && (
        <section className="mx-auto max-w-7xl border-t border-border/60 px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl">You may also like</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
            {related_products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
