import { ProductModelType } from "@/types/ecommerce.types";
import { useCartStore } from "@/stores/cart.store";
import { Link } from "@inertiajs/react";

type ProductCardPropsType = {
  product: ProductModelType;
  variant?: "default" | "minimal";
};

export const ProductCardPart = ({ product, variant = "default" }: ProductCardPropsType) => {
  const isMinimal = variant === "minimal";
  const { addItem } = useCartStore();
  
  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group relative bg-white rounded-3xl overflow-hidden border-1.5 border-black/5 hover:-translate-y-2 hover:shadow-[0_24px_52px_rgba(0,0,0,0.13)] transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer no-underline block"
    >
      {/* Image Area */}
      <div className={`relative overflow-hidden flex items-center justify-center bg-gray-50/50 aspect-square w-full`}>
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="text-7xl group-hover:scale-110 transition-transform duration-500">{product.metadata?.emoji || "📦"}</div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.75 rounded-full tracking-wide">NOUVEAU</span>
          )}
          {product.discount_percentage && (
            <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-0.75 rounded-full tracking-wide">-{product.discount_percentage}%</span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 translate-y-2.5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-250">
          <button className="w-9 h-9 rounded-xl bg-white text-gray-700 shadow-sm flex items-center justify-center hover:scale-110 transition-transform border-none cursor-pointer">🤍</button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addItem(product, 1);
            }}
            className="w-9 h-9 rounded-xl bg-primary text-white shadow-[0_4px_14px_rgba(255,98,0,0.35)] flex items-center justify-center hover:scale-110 transition-transform border-none cursor-pointer"
          >
            🛒
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-5 pt-4">
        <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">
          {product.metadata?.condition || "Neuf"}
        </div>
        <h3 className="font-bold text-base text-foreground leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex text-accent text-xs">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.round(product.rating || 5) ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.reviews_count || 0})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="font-heading font-extrabold text-lg text-primary">
              {(product.price ?? 0).toLocaleString("fr-MA")} {product.currency || "MAD"}
            </div>
            {product.old_price ? (
              <div className="text-xs text-gray-400 line-through">
                {product.old_price.toLocaleString("fr-MA")} {product.currency || "MAD"}
              </div>
            ) : null}
          </div>
          {!isMinimal && (
            <button className="bg-primary hover:bg-primary/90 text-white text-[13px] font-bold py-2 px-4 rounded-xl transition-all">
              Voir
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
