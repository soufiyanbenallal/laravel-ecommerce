import { useMemo, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { ProductCard } from "@/components/site/ProductCard";
import { applyFilters, emptyFilters, FiltersDrawer, FiltersSidebar, type FilterState } from "@/components/site/Filters";
import type { ProductModelType } from "@/types/ecommerce.types";

type CategoryItemType = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
};

type CategoryShowPropsType = {
  category: CategoryItemType;
  products: ProductModelType[];
};

export default function CategoryPage({ category, products }: CategoryShowPropsType) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<"featured" | "low" | "high" | "rating">("featured");

  const allSizes = useMemo(() => unique(products.flatMap((p) => p.sizes ?? [])), [products]);
  const allColors = useMemo(() => unique(products.flatMap((p) => p.colors)), [products]);
  const allMaterials = useMemo(() => unique(products.flatMap((p) => p.materials)), [products]);

  const filtered = useMemo(() => {
    const f = applyFilters(products, filters);
    return [...f].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [products, filters, sort]);

  return (
    <div>
      <Head title={`${category.name} — Atelier Nord`}>
        <meta name="description" content={category.description ?? `Pieces in our ${category.name.toLowerCase()} category.`} />
      </Head>

      <header className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
          <nav className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/catalog" className="hover:text-foreground">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>
          <h1 className="mt-6 font-display text-5xl md:text-6xl">{category.name}</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            {category.description ?? `Pieces in our ${category.name.toLowerCase()} category — small batches, named makers, materials we'd wear ourselves.`}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
          <FiltersDrawer
            state={filters}
            onChange={setFilters}
            allSizes={allSizes}
            allColors={allColors}
            allMaterials={allMaterials}
            count={filtered.length}
          />
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted-foreground sm:inline">{filtered.length} objects</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="border border-border bg-transparent px-2 py-1.5 text-sm outline-none"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="low">Price · Low to high</option>
              <option value="high">Price · High to low</option>
            </select>
          </div>
        </div>

        <div className="mt-10 flex gap-10">
          <FiltersSidebar
            state={filters}
            onChange={setFilters}
            allSizes={allSizes}
            allColors={allColors}
            allMaterials={allMaterials}
            count={filtered.length}
          />
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="py-24 text-center text-muted-foreground">
                No objects match these filters. <button onClick={() => setFilters(emptyFilters)} className="text-accent underline-offset-4 hover:underline cursor-pointer">Reset</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}
