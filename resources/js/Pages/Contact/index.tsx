import { createFileRoute, Link } from "@tanstack/react-router";
import { collections, getProductsByCollection } from "@/lib/products";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Atelier Nord" },
      { name: "description", content: "Seasonal and ongoing collections of clothing, footwear and home objects." },
      { property: "og:title", content: "Collections — Atelier Nord" },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <div>
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
          {collections.map((c, i) => {
            const count = getProductsByCollection(c.slug).length;
            return (
              <Link
                key={c.slug}
                to="/collection/$slug"
                params={{ slug: c.slug }}
                className="group block fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="overflow-hidden bg-secondary">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{count} pieces</div>
                    <h2 className="mt-2 font-display text-3xl">{c.title}</h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">{c.tagline}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
