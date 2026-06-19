import { useMemo, useState } from "react";
import { products, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { applyFilters, emptyFilters, FiltersDrawer, FiltersSidebar, type FilterState } from "@/components/site/Filters";

const cats: ("All" | Category)[] = ["All", ...categories];


export default function ProductsList() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [sort, setSort] = useState<"featured" | "low" | "high" | "rating">("featured");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);

  const base = useMemo(() => products.filter((p) => cat === "All" || p.category === cat), [cat]);
  const allSizes = useMemo(() => Array.from(new Set(base.flatMap((p) => p.sizes ?? []))), [base]);
  const allColors = useMemo(() => Array.from(new Set(base.flatMap((p) => p.colors))), [base]);
  const allMaterials = useMemo(() => Array.from(new Set(base.flatMap((p) => p.materials))), [base]);

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
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Shop</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl">All Objects</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Pieces in stock and ready to ship. Each made in numbered runs — once gone, gone for the season.
          </p>
        </div>
      </header>

      <div className="sticky top-16 z-30 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-center gap-1 overflow-x-auto">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={
                  "whitespace-nowrap px-3 py-1.5 text-sm transition-colors " +
                  (cat === c
                    ? "bg-foreground text-background"
                    : "text-foreground/70 hover:text-foreground")
                }
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FiltersDrawer
              state={filters}
              onChange={setFilters}
              allSizes={allSizes}
              allColors={allColors}
              allMaterials={allMaterials}
              count={filtered.length}
            />
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
      </div>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex gap-10">
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
                Nothing matches these filters.{" "}
                <button onClick={() => setFilters(emptyFilters)} className="text-accent underline-offset-4 hover:underline">
                  Reset
                </button>
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
      </section>
    </div>
  );
}
