import { Link } from "react-router";
import { CategoryModelType } from "@/types/ecommerce.types";

type CategoryCardPropsType = {
  category: CategoryModelType;
};

export const CategoryCardPart = ({ category }: CategoryCardPropsType) => {
  const categoryUrl = `/collections/${category.slug}`;
  const backgroundColor = category.color || "#FF6200";

  return (
    <Link
      to={categoryUrl}
      className="group relative bg-white rounded-3xl p-5 border border-black/5 hover:border-black/10 hover:shadow-lg transition-all duration-300 flex items-center gap-4.5 overflow-hidden"
    >
      {/* Accent Background Glow */}
      <div 
        className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-500" 
        style={{ backgroundColor }}
      />
      
      {/* Icon Wrapper */}
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 shrink-0"
        style={{ backgroundColor: `${backgroundColor}15`, color: backgroundColor }}
      >
        {category.icon || "📦"}
      </div>

      <div className="min-w-0">
        <h4 className="font-bold text-[16px] text-foreground leading-snug truncate group-hover:text-primary transition-colors">
          {category.name}
        </h4>
        <p className="text-[12px] text-gray-400 mt-1 font-medium">
          {category.products_count !== undefined ? `${category.products_count} produits` : "Découvrir →"}
        </p>
      </div>
    </Link>
  );
};
