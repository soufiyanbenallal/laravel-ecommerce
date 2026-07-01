import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { useWishlist } from "@/lib/wishlist-store";
import { ProductCard } from "@/components/site/ProductCard";
import type { ProductModelType } from "@/types/ecommerce.types";

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const [items, setItems] = useState<ProductModelType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ids.length === 0) {
      setItems([]);
      return;
    }

    setLoading(true);
    fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
      },
      body: JSON.stringify({ ids: ids.map(id => parseInt(id, 10)) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [ids]);

  return (
    <div className="mx-auto max-w-7xl md:px-6 px-2 py-16">
      <Head title="Wishlist — Atelier Nord">
        <meta name="description" content="Objects you've saved for later." />
      </Head>

      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Saved</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Wishlist</h1>

      {loading ? (
        <div className="py-24 text-center text-muted-foreground">Loading your saved items…</div>
      ) : items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <p className="font-display text-3xl">Nothing saved yet.</p>
          <p className="mt-3 max-w-md text-muted-foreground">
            Tap the heart on any object to keep it here for later.
          </p>
          <Link href="/catalog" className="mt-8 bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-accent cursor-pointer">
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
