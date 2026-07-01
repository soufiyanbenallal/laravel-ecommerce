import { useMemo, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { ProductCard } from "@/components/site/ProductCard";
import {
  applyFilters,
  emptyFilters,
  FiltersDrawer,
  FiltersSidebar,
  type FilterState,
} from "@/components/site/Filters";
import type { ProductModelType } from "@/types/ecommerce.types";
import { SlidersHorizontal } from "lucide-react";

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

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Top Rated" },
  { value: "low", label: "Price · Low" },
  { value: "high", label: "Price · High" },
] as const;

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
      <Head title={`${category.name} — KENZ Maison`}>
        <meta
          name="description"
          content={
            category.description ??
            `${category.name} collection — small batches, named makers, materials we'd wear ourselves.`
          }
        />
      </Head>

      {/* ── Category Header ── */}
      <header className="relative overflow-hidden border-b border-border/40">
        {/* Category image backdrop */}
        {category.image && (
          <>
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover opacity-15"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
            </div>
          </>
        )}

        {/* Watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden select-none"
          aria-hidden
        >
          <span
            className="font-display text-foreground/[0.04] font-bold leading-none pr-2"
            style={{ fontSize: "clamp(100px, 16vw, 220px)", letterSpacing: "-0.04em" }}
          >
            {category.name.toUpperCase()}
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link>
            <span className="text-accent">✦</span>
            <Link href="/catalog" className="hover:text-accent transition-colors duration-200">Shop</Link>
            <span className="text-accent">✦</span>
            <span className="text-foreground/70">{category.name}</span>
          </nav>

          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">KENZ Collection</p>
          <h1 className="mt-3 font-display text-5xl font-light md:text-7xl">{category.name}.</h1>
          <p className="mt-4 max-w-lg text-[14px] font-light leading-relaxed text-muted-foreground">
            {category.description ??
              `Pieces in our ${category.name.toLowerCase()} collection — small batches, named makers, materials we'd wear ourselves.`}
          </p>

          {/* Piece count */}
          <div className="mt-6 flex items-center gap-3">
            <span className="font-display text-2xl font-light">{filtered.length}</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {filtered.length === 1 ? "Piece" : "Pieces"}
            </span>
          </div>
        </div>
      </header>

      {/* ── Toolbar ── */}
      <div className="sticky top-[60px] z-30 border-b border-border/40 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
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
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-transparent text-[11px] uppercase tracking-[0.16em] outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="mx-auto max-w-7xl md:px-6 px-2 py-14">
        <div className="mt-0 flex gap-10">
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
                  No pieces match these filters.
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
      </div>
    </div>
  );
}
