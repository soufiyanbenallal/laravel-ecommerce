import { Heart, Plus, Star } from "lucide-react";
import { Link } from "@inertiajs/react";
import { ProductModelType } from "@/types/ecommerce.types";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";

type ProductCardPropsType = {
  product: ProductModelType;
  index?: number;
  variant?: "standard" | "minimal";
};

export const ProductCardPart = ({ product, index = 0, variant = "standard" }: ProductCardPropsType) => {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const inWishlist = useWishlist((s) => s.ids.includes(String(product.id)));

  const price = product.price;
  const oldPrice = product.old_price;
  const onSale = oldPrice && oldPrice > price;
  const discount = product.discount_percentage || (onSale ? Math.round(((oldPrice! - price) / oldPrice!) * 100) : 0);

  const productUrl = `/products/${product.slug}`;

  if (variant === "minimal") {
    return (
      <article className="group relative bg-white rounded-3xl p-3 border border-black/5 hover:border-primary/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
        <div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary mb-3.5">
            <img
              src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            {discount > 0 && (
              <span className="absolute left-3 top-3 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                −{discount}%
              </span>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggle(String(product.id));
              }}
              className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-foreground hover:bg-white transition-colors"
            >
              <Heart className={`h-4 w-4 ${inWishlist ? "fill-accent text-accent" : ""}`} strokeWidth={2} />
            </button>
          </div>
          <Link href={productUrl} className="block group-hover:text-primary transition-colors">
            <h4 className="font-bold text-[15px] leading-snug line-clamp-2">{product.name}</h4>
          </Link>
        </div>

        <div className="mt-4.5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-xs font-bold text-foreground">{(product.rating || 4.8).toFixed(1)}</span>
            <span className="text-xs text-gray-400">({product.reviews_count || 120})</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-heading font-extrabold text-[16px] text-foreground">{price} {product.currency || 'MAD'}</span>
              {onSale && (
                <span className="text-gray-400 line-through text-xs">{oldPrice} {product.currency || 'MAD'}</span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                add({
                  id: String(product.id),
                  name: product.name,
                  price: product.price,
                  image: product.image || "",
                  color: product.metadata?.color || "Default",
                  size: product.metadata?.size
                });
              }}
              className="w-8 h-8 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center font-bold"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative bg-white rounded-[32px] p-4 border border-black/5 hover:border-primary/20 hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] transition-all duration-400">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary mb-4.5">
        <img
          src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute left-3.5 top-3.5 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Nouveau
            </span>
          )}
          {discount > 0 && (
            <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              −{discount}%
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(String(product.id));
          }}
          className="absolute right-3.5 top-3.5 w-9 h-9 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-foreground hover:bg-white transition-colors"
        >
          <Heart className={`h-4.5 w-4.5 ${inWishlist ? "fill-accent text-accent" : ""}`} strokeWidth={2} />
        </button>
      </div>

      <div className="px-1.5">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-xs font-bold text-foreground">{(product.rating || 4.8).toFixed(1)}</span>
          <span className="text-xs text-gray-400">({product.reviews_count || 120} avis)</span>
        </div>

        <Link href={productUrl} className="block group-hover:text-primary transition-colors mb-3">
          <h3 className="font-heading font-bold text-lg leading-snug line-clamp-2">{product.name}</h3>
        </Link>

        <div className="flex items-center justify-between gap-4 pt-1 border-t border-black/[0.04] mt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-xl text-foreground">{price} {product.currency || 'MAD'}</span>
            {onSale && (
              <span className="text-gray-400 line-through text-sm">{oldPrice} {product.currency || 'MAD'}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              add({
                id: String(product.id),
                name: product.name,
                price: product.price,
                image: product.image || "",
                color: product.metadata?.color || "Default",
                size: product.metadata?.size
              });
            }}
            className="w-10 h-10 rounded-2xl bg-foreground text-white hover:bg-primary transition-all flex items-center justify-center font-bold"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
};
