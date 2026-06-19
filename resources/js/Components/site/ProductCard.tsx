import { Heart, Plus, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { Link } from "@inertiajs/react";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const inWishlist = useWishlist((s) => s.ids.includes(product.id));
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const off = onSale ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) : 0;

  return (
    <article className="group fade-up" style={{ animationDelay: `${index * 60}ms` }}>
      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={1100}
          className="aspect-[5/6] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className="bg-background/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground">
              {product.badge}
            </span>
          )}
          {onSale && (
            <span className="bg-accent px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-accent-foreground">
              −{off}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id);
          }}
          aria-label="Save to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-background/90 text-foreground transition-colors hover:bg-background"
        >
          <Heart className={"h-4 w-4 " + (inWishlist ? "fill-accent text-accent" : "")} strokeWidth={1.5} />
        </button>

        {/* Quick add */}
        <button
          onClick={(e) => {
            e.preventDefault();
            add({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              color: product.colors[0],
              size: product.sizes?.[Math.floor(product.sizes.length / 2)],
            });
          }}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-center gap-2 bg-foreground py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-background opacity-0 transition-all hover:bg-accent group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus className="h-3.5 w-3.5" /> Quick add
        </button>
      </Link>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {product.category} · {product.gender}
          </div>
          <Link
            href={`/product/${product.id}`}
            className="mt-1 block truncate text-[15px] hover:text-accent"
          >
            {product.name}
          </Link>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" strokeWidth={0} />
            <span className="tabular-nums">{product.rating.toFixed(1)}</span>
            <span>· {product.reviews}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm tabular-nums">${product.price}</div>
          {onSale && (
            <div className="text-xs tabular-nums text-muted-foreground line-through">
              ${product.compareAtPrice}
            </div>
          )}
        </div>
      </div>
      {/* Color dots */}
      {product.colors.length > 1 && (
        <div className="mt-2 flex gap-1.5">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c}
              title={c}
              className="h-3 w-3 rounded-full border border-border"
              style={{ background: swatch(c) }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-muted-foreground">+{product.colors.length - 4}</span>
          )}
        </div>
      )}
    </article>
  );
}

function swatch(name: string): string {
  const map: Record<string, string> = {
    bone: "#efe9dd",
    ivory: "#f3eee3",
    cream: "#f0e8d8",
    sand: "#d8c8a8",
    stone: "#c4b9a4",
    clay: "#c08768",
    terracotta: "#b56a4d",
    cognac: "#8c5230",
    espresso: "#3d2618",
    oxblood: "#5a1e1e",
    onyx: "#1a1a1a",
    black: "#0d0d0d",
    charcoal: "#2e2e2e",
    slate: "#5c6470",
    navy: "#1d2a44",
    olive: "#5a5a35",
    sage: "#9aa890",
    camel: "#b8895a",
  };
  return map[name.toLowerCase()] ?? "#b8a78c";
}
