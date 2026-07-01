import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import {
  applyFilters,
  emptyFilters,
  FiltersDrawer,
  FiltersSidebar,
  type FilterState,
} from "@/components/site/Filters";
import type { ProductModelType, CategoryModelType } from "@/types/ecommerce.types";
import { Head } from "@inertiajs/react";
import { SlidersHorizontal } from "lucide-react";

type ProductsListPropsType = {
  products: ProductModelType[];
  categories: CategoryModelType[];
  filters: { search?: string; category?: string; sort?: string };
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Top Rated" },
  { value: "low", label: "Price · Low to High" },
  { value: "high", label: "Price · High to Low" },
] as const;

export default function ProductsList({
  products,
  categories,
  filters: serverFilters,
}: ProductsListPropsType) {
  const cats = useMemo(
    () => [{ slug: "All", name: "All" }, ...categories],
    [categories],
  );
  const [cat, setCat] = useState<string>(serverFilters?.category || "All");
  const [sort, setSort] = useState<"featured" | "low" | "high" | "rating">(
    (serverFilters?.sort as any) || "featured",
  );
  const [filters, setFilters] = useState<FilterState>(emptyFilters);

  const base = useMemo(() => {
    if (cat === "All") return products;
    const catObj = categories.find((c) => c.slug === cat);
    return products.filter((p) => p.category === catObj?.name);
  }, [products, cat, categories]);

  const allSizes = useMemo(
    () => Array.from(new Set(base.flatMap((p) => p.sizes ?? []))),
    [base],
  );
  const allColors = useMemo(
    () => Array.from(new Set(base.flatMap((p) => p.colors))),
    [base],
  );
  const allMaterials = useMemo(
    () => Array.from(new Set(base.flatMap((p) => p.materials))),
    [base],
  );

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
      <Head title="The Shop — KENZ Maison">
        <meta
          name="description"
          content="Browse premium clothing, footwear and accessories — sourced from artisan workshops across Europe and North Africa."
        />
      </Head>

      {/* ── Page Header ── */}
      <header className="relative overflow-hidden border-b border-border/40">
        {/* KENZ watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden select-none"
          aria-hidden
        >
          <span
            className="font-display text-foreground/[0.04] font-bold leading-none pr-4"
            style={{ fontSize: "clamp(120px, 18vw, 260px)", letterSpacing: "-0.04em" }}
          >
            SHOP
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">KENZ Maison</p>
          <h1 className="mt-3 font-display text-5xl font-light md:text-7xl">The Shop.</h1>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed text-muted-foreground">
            Pieces in stock, made in numbered runs. Small batches, named makers — once gone, gone for the season.
          </p>
          {/* Count */}
          <div className="mt-6 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="font-display text-2xl font-light text-foreground">{filtered.length}</span>
            <span className="uppercase tracking-[0.2em]">Pieces available</span>
          </div>
        </div>
      </header>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[60px] z-30 border-b border-border/40 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          {/* Category pills */}
          <div className="flex flex-wrap items-center gap-1 overflow-x-auto scrollbar-none">
            {cats.map((c) => (
              <button
                key={c.slug}
                onClick={() => setCat(c.slug)}
                className={
                  "whitespace-nowrap px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 cursor-pointer " +
                  (cat === c.slug
                    ? "bg-foreground text-background"
                    : "text-foreground/55 hover:text-foreground")
                }
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sort + filter drawer */}
          <div className="flex items-center gap-3">
            <FiltersDrawer
              state={filters}
              onChange={setFilters}
              allSizes={allSizes}
              allColors={allColors}
              allMaterials={allMaterials}
              count={filtered.length}
            />
            <div className="flex items-center gap-1.5 border border-border/50 px-2.5 py-1.5">
              <SlidersHorizontal className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="bg-transparent text-[11px] uppercase tracking-[0.16em] outline-none cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <section className="mx-auto max-w-7xl md:px-6 px-2 py-14">
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
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <div className="font-display text-5xl font-light text-foreground/20">∅</div>
                <p className="mt-4 text-[14px] font-light text-muted-foreground">
                  Nothing matches these filters.
                </p>
                <button
                  onClick={() => setFilters(emptyFilters)}
                  className="mt-5 text-[11px] uppercase tracking-[0.2em] text-accent hover:underline underline-offset-4 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                {/* Result count */}
                <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
                </p>
                <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
                  {filtered.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
