import { ArrowRight, Leaf, Hammer, Truck, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import atelierImg from "@/assets/atelier.jpg";
import banner from "@/assets/banner-promo.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catShoes from "@/assets/cat-shoes.jpg";
import { products, collections } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Link } from "@inertiajs/react";

export default function Home() {
  const featured = products.slice(0, 4);
  const bestsellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-12 md:gap-10 md:py-24">
          <div className="md:col-span-5 md:pt-16">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground fade-up">
              Autumn / Winter — Volume 07
            </p>
            <h1 className="mt-6 font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] fade-up" style={{ animationDelay: "80ms" }}>
              Quiet objects, <br />
              <em className="text-accent">made slowly.</em>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground fade-up" style={{ animationDelay: "160ms" }}>
              A small shop of clothing, leather and home pieces, designed with the workshops that make them. No seasons, no sales — just things meant to last.
            </p>
            <div className="mt-10 flex items-center gap-6 fade-up" style={{ animationDelay: "240ms" }}>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 bg-foreground px-7 py-4 text-sm font-medium tracking-wide text-background transition-colors hover:bg-accent"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/about" className="text-sm underline-offset-4 hover:underline">
                Our story
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-7">
            <div className="relative overflow-hidden bg-secondary">
              <img
                src={heroImg}
                alt="Cream wool coat, AW collection"
                width={1600}
                height={1200}
                className="aspect-4/5 w-full object-cover md:aspect-5/6"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-background">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">Look 01</div>
                  <div className="font-display text-2xl">The Halden Coat</div>
                </div>
                <div className="text-sm tabular-nums">$685</div>
              </div>
            </div>
            <div className="pointer-events-none absolute -left-6 -top-6 hidden font-display text-7xl text-foreground/10 md:block">07</div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-b border-border/60 bg-secondary/50 py-5">
        <div className="marquee flex w-max items-center gap-12 whitespace-nowrap font-display text-2xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Knitted in Scotland", "•", "Sewn in Florence", "•", "Thrown in Tokyo", "•", "Cut in Porto", "•", "Tanned in Tuscany", "•"].map((t, i) => (
              <span key={`${k}-${i}`} className={t === "•" ? "text-accent" : ""}>{t}</span>
            )),
          )}
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Shop by</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Three rooms, one house</h2>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { img: catWomen, title: "Women", to: "/category/$slug", slug: "apparel", count: "32 pieces" },
            { img: catMen, title: "Men", to: "/category/$slug", slug: "apparel", count: "26 pieces" },
            { img: catShoes, title: "Shoes", to: "/category/$slug", slug: "footwear", count: "14 pieces" },
          ].map((c, i) => (
            <Link
              key={c.title}
              href={c.to}
              params={{ slug: c.slug }}
              className="group relative block overflow-hidden bg-secondary fade-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-background">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">{c.count}</div>
                  <div className="font-display text-3xl">{c.title}</div>
                </div>
                <ArrowRight className="h-5 w-5 translate-x-0 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Edit</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">New this season</h2>
          </div>
          <Link href="/shop" className="hidden text-sm underline-offset-4 hover:underline md:inline">
            See all 24 objects →
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative grid items-center gap-0 overflow-hidden md:grid-cols-2">
          <img
            src={banner}
            alt="Autumn knitwear"
            loading="lazy"
            className="h-full w-full object-cover md:aspect-[4/3]"
          />
          <div className="bg-foreground p-10 text-background md:p-16">
            <p className="text-xs uppercase tracking-[0.22em] text-background/60">Featured edit</p>
            <h3 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
              The Knitwear<br/><em className="text-accent">Edit.</em>
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-background/70">
              Twelve pieces in cashmere, lambswool and merino. Knitted in small mills in Scotland and Italy — built to outlast a decade of winters.
            </p>
            <Link
              href="/collection/$slug"
              params={{ slug: "autumn-volume-07" }}
              className="mt-8 inline-flex items-center gap-2 border border-background/30 px-6 py-3 text-sm font-medium hover:bg-background hover:text-foreground"
            >
              Shop the edit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS STRIP */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Collections</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Edits, not seasons</h2>
          </div>
          <Link href="/collections" className="hidden text-sm underline-offset-4 hover:underline md:inline">
            All collections →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={`/collection/${c.slug}`}
              className="group block fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="overflow-hidden bg-secondary">
                <img src={c.image} alt={c.title} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl group-hover:text-accent">{c.title}</div>
                <div className="text-sm text-muted-foreground">{c.tagline}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STORY STRIP */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="relative overflow-hidden bg-secondary">
            <img
              src={atelierImg}
              alt="Inside our Lisbon atelier"
              width={1400}
              height={1000}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Atelier</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              We know the hands <br /> behind every piece.
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground">
              Atelier Nord works with a handful of independent makers — a knitter in Hawick, a leather workshop in Florence, a ceramicist in Setagaya. Small runs, no warehouses, no waste.
            </p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              Visit the atelier <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Loved most</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Bestsellers</h2>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {bestsellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="mt-10 border-y border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3">
          {[
            { icon: Hammer, title: "Made by hand", body: "Small batches by named makers — no factories, no shortcuts." },
            { icon: Leaf, title: "Natural materials", body: "Cashmere, linen, vegetable-tanned leather, porcelain." },
            { icon: Truck, title: "Carbon-neutral delivery", body: "Free worldwide shipping on orders over $250. 60-day returns." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col">
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.4} />
              <h3 className="mt-5 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">In their words</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Worn, kept, repaired.</h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { name: "Marguerite L.", place: "Paris", text: "The Halden coat has lived through three winters and looks better each one. Worth every euro." },
            { name: "Daichi K.", place: "Kyoto", text: "Loafers that feel like they were made for my feet. The resoling service is a small miracle." },
            { name: "Anna B.", place: "Copenhagen", text: "I bought the cashmere on a whim and now I own four. Quiet confidence in every stitch." },
          ].map((r) => (
            <figure key={r.name} className="border border-border/60 bg-card p-8">
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-xl leading-snug">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                {r.name} · {r.place}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* JOURNAL TEASER */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Journal</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Notes from the studio</h2>
          </div>
          <Link href="/journal" className="hidden text-sm underline-offset-4 hover:underline md:inline">
            Read all →
          </Link>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            { tag: "Materials", title: "Why we returned to mineral lenses", read: "4 min read" },
            { tag: "Workshop", title: "Three days in Hawick with the knitters", read: "7 min read" },
            { tag: "Care", title: "How to fold cashmere so it lasts a decade", read: "3 min read" },
          ].map((post) => (
            <article key={post.title} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <div className="h-full w-full bg-gradient-to-br from-muted to-secondary transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {post.tag} · {post.read}
                </div>
                <h3 className="mt-2 font-display text-2xl leading-snug group-hover:text-accent">{post.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
