import { CategoryCardPart } from "@/Components/shared/category-card.part";
import { CategoryModelType } from "@/types/ecommerce.types";
import { Link } from "@inertiajs/react";

type CategoriesSectionPropsType = {
  categories: CategoryModelType[];
};

export const HomeCategoriesPart = ({ categories }: CategoriesSectionPropsType) => {
  return (
    <section className="py-22 bg-background">
      <div className="max-w-[1340px] mx-auto px-7">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Explorer</div>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.5vw,2.9rem)] text-foreground leading-[1.12]">
              Toutes les <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Catégories</span>
            </h2>
          </div>
          <Link href="/categories" className="no-underline text-primary font-bold text-sm hover:translate-x-1 transition-transform">
            Tout voir →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {categories.map((cat) => (
            <CategoryCardPart key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};
