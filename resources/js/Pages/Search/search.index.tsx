import { Head } from "@inertiajs/react";
import { ProductCard } from "@/components/site/ProductCard";
import type { ProductModelType } from "@/types/ecommerce.types";

type SearchPropsType = {
  products: ProductModelType[];
  q: string;
};

export default function SearchPage({ products, q }: SearchPropsType) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Head title="Search — Atelier Nord">
        <meta name="description" content="Search objects." />
      </Head>

      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Search</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">
        {q ? <>Results for &ldquo;{q}&rdquo;</> : "Search"}
      </h1>
      <p className="mt-3 text-muted-foreground">{products.length} object{products.length === 1 ? "" : "s"}</p>
      {products.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground">
          No results found. Try a different query.
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
