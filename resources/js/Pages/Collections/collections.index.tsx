import { Head, Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

type CollectionItemType = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  products_count: number;
};

type CollectionsIndexPropsType = {
  collections: CollectionItemType[];
};

export default function CollectionsIndex({ collections }: CollectionsIndexPropsType) {
  return (
    <div>
      <Head title="Collections — Atelier Nord">
        <meta name="description" content="Seasonal and ongoing collections of clothing, footwear and home objects." />
      </Head>

      <header className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Edits</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">Collections</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Each edit is a short story — a season, a place, a maker. We release one when it&apos;s ready, never on a calendar.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={`/collection/${c.slug}`}
              className="group block fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="overflow-hidden bg-secondary">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="aspect-[4/5] w-full bg-secondary/80 flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{c.products_count} pieces</div>
                  <h2 className="mt-2 font-display text-3xl">{c.name}</h2>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">{c.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
