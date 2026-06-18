import { CategoryModelType } from "@/types/ecommerce.types";

type CategoryCardPropsType = {
  category: CategoryModelType;
};

export const CategoryCardPart = ({ category }: CategoryCardPropsType) => {
  const color = category.color || "#FF6200";
  
  return (
    <div 
      className="group flex items-center gap-4 p-4.5 rounded-2xl bg-white border border-border hover:-translate-y-1 hover:border-primary hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110 overflow-hidden relative"
        style={{ backgroundColor: `${color}15` }}
      >
        {category.image ? (
           <img src={category.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
        ) : (
          <span className="relative z-10">{category.icon || "📦"}</span>
        )}
      </div>
      <div>
        <div className="font-bold text-sm text-foreground mb-0.5">{category.name}</div>
        <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{category.products_count || 0} produits</div>
      </div>
    </div>
  );
};
