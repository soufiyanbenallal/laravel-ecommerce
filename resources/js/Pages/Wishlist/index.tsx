import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/lib/wishlist-store";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Atelier Nord" },
      { name: "description", content: "Objects you've saved for later." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Saved</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Wishlist</h1>

      {items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <p className="font-display text-3xl">Nothing saved yet.</p>
          <p className="mt-3 max-w-md text-muted-foreground">
            Tap the heart on any object to keep it here for later.
          </p>
          <Link to="/shop" className="mt-8 bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-accent">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
