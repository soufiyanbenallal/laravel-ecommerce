import { useMemo, useState } from "react";
import { categories, products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { applyFilters, emptyFilters, FiltersDrawer, FiltersSidebar, type FilterState } from "@/components/site/Filters";
import { usePage } from "@inertiajs/react";



export default function CategoryPage() {
  const { cat } = usePage().props;
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<"featured" | "low" | "high" | "rating">("featured");

  const base = useMemo(() => products.filter((p) => p.category === cat), [cat]);

  const allSizes = useMemo(() => unique(base.flatMap((p) => p.sizes ?? [])), [base]);
  const allColors = useMemo(() => unique(base.flatMap((p) => p.colors)), [base]);
  const allMaterials = useMemo(() => unique(base.flatMap((p) => p.materials)), [base]);

  const filtered = useMemo(() => {
    const f = applyFilters(base, filters);
    return [...f].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [base, filters, sort]);

  return (
    <div>
      <header className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
          <nav className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{cat}</span>
          </nav>
          <h1 className="mt-6 font-display text-5xl md:text-6xl">{cat}</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Pieces in our {cat.toLowerCase()} category — small batches, named makers, materials we&apos;d wear ourselves.
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
                No objects match these filters. <button onClick={() => setFilters(emptyFilters)} className="text-accent underline-offset-4 hover:underline">Reset</button>
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
