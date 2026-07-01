import { ArrowRight, Leaf, Truck, Sparkles, Star } from "lucide-react";
import atelierImg from "@/assets/atelier.jpg";
import bannerImg from "@/assets/banner-promo.jpg";
import { ProductCardPart } from "@/components/shared/product-card.part";
import { Link } from "react-router";
import type { ProductModelType, CategoryModelType } from "@/types/ecommerce.types";
import {
  EditorialHero,
  LookbookStrip,
  ManifestoStrip,
  KenzDivider,
  SectionMark,
} from "./partials/home-brand-identity.part";

// Premium fallback testimonials
const fallbackTestimonials = [
  {
    id: "1",
    name: "Clara M.",
    city: "Paris",
    text: "The drape of the merino knitwear is exceptional. It holds its shape perfectly and matches the quality of couture houses at a fraction of the cost."
  },
  {
    id: "2",
    name: "Arthur D.",
    city: "London",
    text: "Truly built to outlast decades. I had a coat resoled at their workshop after four winters of heavy rain; it returned looking and feeling brand new."
  },
  {
    id: "3",
    name: "Sophia L.",
    city: "New York",
    text: "Small batches and named artisans. You can feel the humanity and dedication in the sewing. A rare brand that actually cares about garment longevity."
  }
];

// Premium fallback collections
const fallbackCollections = [
  {
    name: "The Tailoring Edit",
    slug: "apparel",
    description: "Relaxed silhouettes in wool and organic cotton.",
    image: atelierImg
  },
  {
    name: "Footwear & Leather",
    slug: "footwear",
    description: "Goodyear welted boots and box calf loafers.",
    image: bannerImg
  },
  {
    name: "Sourcing Autumn '25",
    slug: "accessories",
    description: "Crafted in small family-owned mills.",
    image: atelierImg
  }
];

type HomePropsType = {
  products: ProductModelType[];
  collections?: { name: string; slug: string; image: string; description: string }[];
  testimonials?: { id: string; name: string; city: string; text: string }[];
};

export default function Home({
  products = [],
  collections = fallbackCollections,
  testimonials = fallbackTestimonials
}: HomePropsType) {
  const featured = products.slice(0, 4);
  const bestsellers = products.slice(0, 4);

  return (
    <div className="relative bg-background">
      {/* ── 01 · Editorial Hero ── */}
      <EditorialHero />

      {/* ── 02 · Marquee Brand Motion Strip ── */}
      <div className="overflow-hidden border-b border-border/40 bg-secondary/30 py-4">
        <div className="marquee flex w-max items-center gap-16 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            [
              "Morocco · Europe",
              "✦",
              "Natural Materials",
              "✦",
              "Artisan Craft",
              "✦",
              "Small Batch Only",
              "✦",
              "60-Day Free Returns",
              "✦",
              "Worldwide Delivery",
              "✦",
              "Lifetime Repair Service",
              "✦",
            ].map((t, i) => (
              <span
                key={`${k}-${i}`}
                className={
                  t === "✦"
                    ? "text-accent text-base"
                    : "font-display text-[16px] font-light tracking-[0.1em] text-foreground/60"
                }
              >
                {t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── 03 · Lookbook Strip ── */}
      <LookbookStrip />

      <KenzDivider className="mx-auto max-w-7xl md:px-6 px-2" />

      {/* ── 04 · New Arrivals (The Edit) ── */}
      <section className="mx-auto max-w-7xl md:px-6 py-20 px-2">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionMark n="04" label="New This Season" />
            <h2 className="font-display text-4xl font-light md:text-5xl">The Edit.</h2>
          </div>
          <Link
            to="/catalog"
            className="hidden text-[11px] uppercase tracking-[0.22em] text-foreground/55 hover:text-accent transition-colors md:inline-block cursor-pointer"
          >
            View all →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCardPart key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center text-muted-foreground font-light py-12">
            No products found. Add products in your Shopify Admin to populate this section.
          </div>
        )}
      </section>

      {/* ── 05 · Manifesto ── */}
      <ManifestoStrip />

      {/* ── 06 · Featured Edit Promo Banner ── */}
      <section className="mx-auto max-w-7xl md:px-6 py-20 px-2">
        <div className="relative grid items-stretch overflow-hidden md:grid-cols-[3fr_2fr]">
          <div className="overflow-hidden">
            <img
              src={atelierImg}
              alt="KENZ — The Knitwear Edit AW 2025"
              loading="lazy"
              className="h-full min-h-[400px] w-full object-cover md:aspect-auto transition-transform duration-[1200ms] hover:scale-[1.02]"
            />
          </div>
          <div className="flex flex-col justify-center bg-foreground p-10 md:p-14">
            <div className="mb-6 font-display text-[11px] tracking-[0.3em] uppercase text-background/30">
              KENZ · Featured
            </div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-4">Featured Edit</p>
            <h3 className="font-display text-3xl font-light leading-[1.1] text-background md:text-4xl">
              The Knitwear<br />
              <em className="not-italic text-accent">Collection.</em>
            </h3>
            <p className="mt-5 text-[13px] leading-relaxed text-background/55 font-light">
              Twelve pieces in cashmere, lambswool and merino — knitted in small mills across Scotland and Italy. Built to outlast a decade of winters.
            </p>
            <Link
              to="/collections/apparel"
              className="mt-8 self-start inline-flex items-center gap-2.5 border border-background/20 px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium text-background hover:bg-background hover:text-foreground transition-all duration-300 cursor-pointer"
            >
              Shop the Edit <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <KenzDivider className="mx-auto max-w-7xl md:px-6 px-2" />

      {/* ── 07 · Collections List ── */}
      <section className="mx-auto max-w-7xl md:px-6 px-2 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SectionMark n="07" label="Collections" />
            <h2 className="font-display text-4xl font-light md:text-5xl">Edits, not seasons.</h2>
          </div>
          <Link
            to="/collections"
            className="hidden text-[11px] uppercase tracking-[0.22em] text-foreground/55 hover:text-accent transition-colors md:inline-block cursor-pointer"
          >
            All collections →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              to={`/collections/${c.slug}`}
              className="group block cursor-pointer fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="overflow-hidden bg-secondary relative">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute top-4 left-4 font-display text-[11px] tracking-[0.24em] text-background/50">
                  0{i + 1}
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-2">
                <div>
                  <div className="font-display text-xl font-light group-hover:text-accent transition-colors duration-300">
                    {c.name}
                  </div>
                  <div className="mt-1 text-[12px] font-light text-muted-foreground">{c.description}</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 mt-1 text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 08 · Bestsellers ── */}
      <section className="bg-secondary/25 py-20">
        <div className="mx-auto max-w-7xl md:px-6 px-2">
          <SectionMark n="08" label="Loved Most" />
          <h2 className="font-display text-4xl font-light md:text-5xl">Bestsellers.</h2>

          {bestsellers.length > 0 ? (
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
              {bestsellers.map((p, i) => (
                <ProductCardPart key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center text-muted-foreground font-light py-12">
              No products found. Add products in your Shopify Admin to populate this section.
            </div>
          )}
        </div>
      </section>

      {/* ── 09 · Values (Brand Pillars) ── */}
      <section className="border-y border-border/40">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40">
          {[
            {
              icon: Sparkles,
              n: "I",
              title: "Artisan Craft",
              body: "Each piece is made by named artisans in small batches — no mass production, no shortcuts.",
            },
            {
              icon: Leaf,
              n: "II",
              title: "Natural Materials",
              body: "Cashmere, linen, vegetable-tanned leather, Merino wool — chosen for longevity, not trend.",
            },
            {
              icon: Truck,
              n: "III",
              title: "Ethical Delivery",
              body: "Carbon-neutral shipping worldwide. Free on orders over $250. 60-day free returns, always.",
            },
          ].map(({ icon: Icon, n, title, body }) => (
            <div key={title} className="flex flex-col px-8 py-14 first:pl-0 last:pr-0 md:first:pl-0 md:last:pr-0">
              <div className="flex items-center gap-3 mb-8">
                <span className="font-display text-[11px] tracking-[0.3em] text-accent">{n}</span>
                <div className="h-px flex-1 bg-border/60" />
              </div>
              <Icon className="h-5 w-5 text-accent mb-5" strokeWidth={1.4} />
              <h3 className="font-display text-2xl font-light">{title}</h3>
              <p className="mt-3 text-[13px] font-light leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10 · Testimonials ── */}
      <section className="mx-auto max-w-7xl md:px-6 px-2 py-24">
        <div className="text-center mb-14">
          <SectionMark n="✦" label="In Their Words" />
          <h2 className="font-display text-4xl font-light md:text-5xl">Worn. Kept. Repaired.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((r) => (
            <figure
              key={r.id}
              className="group border border-border/50 bg-card p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(176,141,87,0.06)]"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-accent" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-xl font-light leading-snug">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground">
                <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-[9px] text-accent font-medium">
                    {r.name.charAt(0)}
                  </span>
                </div>
                {r.name}
                <span className="text-accent/50">·</span>
                <span className="text-accent/70">{r.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 12 · Newsletter CTA ── */}
      <section className="relative overflow-hidden bg-foreground py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
          <span
            className="font-display text-background/[0.025] font-bold leading-none"
            style={{ fontSize: "clamp(180px, 30vw, 440px)", letterSpacing: "-0.04em" }}
          >
            KENZ
          </span>
        </div>

        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-8 w-8 items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0 L14 7 L7 14 L0 7 Z" fill="#B08D57" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-light leading-[1.1] text-background md:text-4xl">
            Join the inner circle.<br />
            <em className="not-italic text-accent">Receive the Edit first.</em>
          </h2>
          <p className="mt-4 text-[13px] font-light text-background/50">
            Early access to new collections, exclusive pieces, and notes from the workshop.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex max-w-md mx-auto items-center border-b border-background/25 pb-2.5 focus-within:border-accent transition-colors duration-300"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-[14px] font-light text-background outline-none placeholder:text-background/30"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="text-[11px] uppercase tracking-[0.22em] font-medium text-accent hover:text-background transition-colors duration-200 cursor-pointer ml-4 whitespace-nowrap"
            >
              Subscribe →
            </button>
          </form>
          <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-background/25">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
