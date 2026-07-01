import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useWishlist } from "@/lib/wishlist-store";
import { ProductCardPart } from "@/components/shared/product-card.part";
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
      },
      body: JSON.stringify({ ids }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        return res.json();
      })
      .then((data) => {
        setItems(data as ProductModelType[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [ids]);

  return (
    <div className="mx-auto max-w-7xl md:px-6 px-2 py-16 min-h-[50vh]">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Saved</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl font-light">Wishlist</h1>

      {loading ? (
        <div className="py-24 text-center text-muted-foreground font-light tracking-wider">
          Loading your saved items…
        </div>
      ) : items.length === 0 ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <p className="font-display text-3xl font-light">Nothing saved yet.</p>
          <p className="mt-3 max-w-md text-muted-foreground font-light">
            Tap the heart on any object to keep it here for later.
          </p>
          <Link
            to="/catalog"
            className="mt-8 bg-foreground px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium text-background hover:bg-accent cursor-pointer transition-colors duration-300"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCardPart key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
