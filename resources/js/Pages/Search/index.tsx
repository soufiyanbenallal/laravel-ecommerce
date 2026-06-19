import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

const schema = z.object({ q: fallback(z.string(), "").default("") });

export const Route = createFileRoute("/search")({
  validateSearch: zodValidator(schema),
  head: () => ({ meta: [{ title: "Search — Atelier Nord" }] }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = q ? searchProducts(q) : [];
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Search</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">
        {q ? <>Results for &ldquo;{q}&rdquo;</> : "Search"}
      </h1>
      <p className="mt-3 text-muted-foreground">{results.length} object{results.length === 1 ? "" : "s"}</p>
      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {results.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
