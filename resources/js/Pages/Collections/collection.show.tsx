import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollection, getProductsByCollection, type Product } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/collection/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection, items: getProductsByCollection(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.collection.title ?? "Collection"} — Atelier Nord` },
      { name: "description", content: loaderData?.collection.tagline ?? "" },
      { property: "og:title", content: `${loaderData?.collection.title ?? ""} — Atelier Nord` },
      { property: "og:image", content: loaderData?.collection.image ?? "" },
    ],
  }),
  component: CollectionPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl">No such collection.</h1>
      <Link to="/collections" className="mt-6 inline-block text-accent hover:underline">
        Back to collections
      </Link>
    </div>
  ),
});

function CollectionPage() {
  const { collection, items } = Route.useLoaderData() as { collection: { title: string; tagline: string; image: string; slug: string }; items: Product[] };
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <img
          src={collection.image}
          alt={collection.title}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Collection</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{collection.title}</h1>
          <p className="mt-4 max-w-xl text-foreground/80">{collection.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
