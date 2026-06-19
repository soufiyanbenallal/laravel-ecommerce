import { Head, Link } from "@inertiajs/react";
import { ProductCard } from "@/components/site/ProductCard";
import type { ProductModelType } from "@/types/ecommerce.types";

type CollectionItemType = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
};

type CollectionsShowPropsType = {
  collection: CollectionItemType;
  products: ProductModelType[];
};

export default function CollectionPage({ collection, products }: CollectionsShowPropsType) {
  return (
    <div>
      <Head title={`${collection.name} — Atelier Nord`}>
        <meta name="description" content={collection.description ?? ""} />
        <meta property="og:title" content={`${collection.name} — Atelier Nord`} />
        {collection.image && <meta property="og:image" content={collection.image} />}
      </Head>

      <section className="relative overflow-hidden border-b border-border/60 min-h-[300px] flex items-center bg-secondary/30">
        {collection.image && (
          <img
            src={collection.image}
            alt={collection.name}
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
        )}
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Collection</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{collection.name}</h1>
          <p className="mt-4 max-w-xl text-foreground/80">{collection.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {products.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            No products found in this collection.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
