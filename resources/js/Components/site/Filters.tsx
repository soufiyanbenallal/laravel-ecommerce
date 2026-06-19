import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export type FilterState = {
  sizes: string[];
  colors: string[];
  materials: string[];
  priceMax: number;
  onSale: boolean;
};

export const emptyFilters: FilterState = {
  sizes: [],
  colors: [],
  materials: [],
  priceMax: 1000,
  onSale: false,
};

type Props = {
  state: FilterState;
  onChange: (s: FilterState) => void;
  allSizes: string[];
  allColors: string[];
  allMaterials: string[];
  count: number;
};

export function FiltersSidebar(props: Props) {
  return (
    <div className="hidden w-64 flex-none lg:block">
      <FilterBody {...props} />
    </div>
  );
}

export function FiltersDrawer(props: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-background p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="font-display text-2xl">Filters</div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterBody {...props} />
          </div>
        </div>
      )}
    </>
  );
}

function FilterBody({ state, onChange, allSizes, allColors, allMaterials, count }: Props) {
  const toggle = (key: keyof FilterState, value: string) => {
    const arr = state[key] as string[];
    onChange({
      ...state,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span>{count} objects</span>
        <button onClick={() => onChange(emptyFilters)} className="hover:text-foreground">
          Reset
        </button>
      </div>

      {allSizes.length > 0 && (
        <Group label="Size">
          <div className="flex flex-wrap gap-2">
            {allSizes.map((s) => (
              <button
                key={s}
                onClick={() => toggle("sizes", s)}
                className={
                  "border px-3 py-1.5 text-sm transition-colors " +
                  (state.sizes.includes(s)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground")
                }
              >
                {s}
              </button>
            ))}
          </div>
        </Group>
      )}

      <Group label="Colour">
        <div className="space-y-2">
          {allColors.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={state.colors.includes(c)}
                onChange={() => toggle("colors", c)}
                className="h-4 w-4 accent-foreground"
              />
              {c}
            </label>
          ))}
        </div>
      </Group>

      <Group label="Material">
        <div className="space-y-2">
          {allMaterials.map((m) => (
            <label key={m} className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={state.materials.includes(m)}
                onChange={() => toggle("materials", m)}
                className="h-4 w-4 accent-foreground"
              />
              {m}
            </label>
          ))}
        </div>
      </Group>

      <Group label={`Max price · $${state.priceMax}`}>
        <input
          type="range"
          min={50}
          max={1000}
          step={25}
          value={state.priceMax}
          onChange={(e) => onChange({ ...state, priceMax: Number(e.target.value) })}
          className="w-full accent-foreground"
        />
        <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
          <span>$50</span>
          <span>$1000</span>
        </div>
      </Group>

      <label className="flex cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={state.onSale}
          onChange={(e) => onChange({ ...state, onSale: e.target.checked })}
          className="h-4 w-4 accent-foreground"
        />
        On sale only
      </label>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

export function applyFilters<T extends { sizes?: string[]; colors: string[]; materials: string[]; price: number; old_price?: number | null }>(
  items: T[],
  f: FilterState,
): T[] {
  return items.filter((p) => {
    if (f.sizes.length && !(p.sizes ?? []).some((s) => f.sizes.includes(s))) return false;
    if (f.colors.length && !p.colors.some((c) => f.colors.includes(c))) return false;
    if (f.materials.length && !p.materials.some((m) => f.materials.includes(m))) return false;
    if (p.price > f.priceMax) return false;
    if (f.onSale && !(p.old_price && p.old_price > p.price)) return false;
    return true;
  });
}
