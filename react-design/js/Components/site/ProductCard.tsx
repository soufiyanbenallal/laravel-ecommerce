import { Heart, Plus, Star } from "lucide-react";
import type { ProductModelType } from "@/types/ecommerce.types";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { Link } from "@inertiajs/react";

type ProductCardPropsType = {
  product: ProductModelType;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardPropsType) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const inWishlist = useWishlist((s) => s.ids.includes(product.id.toString()));
  const onSale = product.old_price && product.old_price > product.price;
  const off = onSale ? Math.round(((product.old_price! - product.price) / product.old_price!) * 100) : 0;

  return (
    <article className="group fade-up" style={{ animationDelay: `${index * 60}ms` }}>
      {/* ── Image Tile ── */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={1100}
          className="aspect-[5/6] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />

        {/* ── Badges ── */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span className="bg-background/92 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-foreground">
              {product.badge}
            </span>
          )}
          {onSale && (
            <span className="bg-accent px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-accent-foreground">
              −{off}%
            </span>
          )}
        </div>

        {/* ── Wishlist button ── */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product.id.toString());
          }}
          aria-label={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
          className={
            "absolute right-3 top-3 flex h-8 w-8 items-center justify-center transition-all duration-200 cursor-pointer " +
            (inWishlist
              ? "bg-accent text-accent-foreground"
              : "bg-background/90 text-foreground hover:bg-background")
          }
        >
          <Heart
            className={"h-3.5 w-3.5 " + (inWishlist ? "fill-current" : "")}
            strokeWidth={1.5}
          />
        </button>

        {/* ── Quick Add ── */}
        <button
          onClick={(e) => {
            e.preventDefault();
            add({
              id: product.id.toString(),
              name: product.name,
              price: product.price,
              image: product.image ?? "",
              color: product.colors[0],
              size: product.sizes?.[Math.floor(product.sizes.length / 2)],
            });
          }}
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-foreground py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-background opacity-0 transition-all duration-300 ease-out hover:bg-accent cursor-pointer group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus className="h-3 w-3" />
          Quick Add
        </button>
      </Link>

      {/* ── Product Info ── */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Category / Gender tag */}
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {product.category} · {product.gender}
          </div>

          {/* Name */}
          <Link
            href={`/products/${product.slug}`}
            className="mt-1 block truncate text-[14px] font-light hover:text-accent transition-colors duration-200"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground">
            <Star className="h-2.5 w-2.5 fill-accent text-accent" strokeWidth={0} />
            <span className="tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="opacity-60">({product.reviews_count})</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          <div className="text-[14px] tabular-nums font-light">${product.price}</div>
          {onSale && (
            <div className="text-[11px] tabular-nums text-muted-foreground line-through">
              ${product.old_price}
            </div>
          )}
        </div>
      </div>

      {/* ── Color swatches ── */}
      {product.colors.length > 1 && (
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c}
              title={c}
              className="h-2.5 w-2.5 rounded-full border border-border/60 cursor-pointer hover:scale-125 transition-transform duration-150"
              style={{ background: swatch(c) }}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-[10px] text-muted-foreground">+{product.colors.length - 5}</span>
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
    gold: "#B08D57",
    white: "#f5f5f0",
    grey: "#8e8e8e",
  };
  return map[name.toLowerCase()] ?? "#b8a78c";
}
