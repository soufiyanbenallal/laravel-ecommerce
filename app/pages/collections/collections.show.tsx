import { Link } from "react-router";
import { ProductCardPart } from "@/components/shared/product-card.part";
import type { ProductModelType } from "@/types/ecommerce.types";

type CollectionItemType = {
  id: string | number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
};

type CollectionsShowPropsType = {
  collection: CollectionItemType;
  products: ProductModelType[];
};

export default function CollectionPage({ collection, products = [] }: CollectionsShowPropsType) {
  return (
    <div className="bg-background">
      {/* ── Collection Header ── */}
      <section className="relative overflow-hidden border-b border-border/60 min-h-[300px] flex items-center bg-secondary/30">
        {collection.image && (
          <img
            src={collection.image}
            alt={collection.name}
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
        )}
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Collection</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-light">{collection.name}</h1>
          <p className="mt-4 max-w-xl text-[14px] font-light leading-relaxed text-muted-foreground">{collection.description}</p>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="mx-auto max-w-7xl md:px-6 px-2 py-16">
        {products.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground font-light">
            No products found in this collection.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCardPart key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
