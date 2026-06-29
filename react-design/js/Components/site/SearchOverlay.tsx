import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "@inertiajs/react";
import type { ProductModelType } from "@/types/ecommerce.types";

const trending = ["Apparel", "Footwear", "Home", "Bags", "Accessories"];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<ProductModelType[]>([]);
  const [suggested, setSuggested] = useState<ProductModelType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Fetch popular products on open
  useEffect(() => {
    if (open) {
      fetch("/api/search/popular")
        .then((res) => res.json())
        .then((data) => setSuggested(data))
        .catch(() => {});
    }
  }, [open]);

  // Auto-complete debounced search
  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/30 backdrop-blur-sm">
      <div className="fade-up w-full bg-background max-h-[85vh] overflow-y-auto">
        <div className="mx-auto flex max-w-7xl items-center gap-4 border-b border-border/60 px-6 py-5">
          <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, materials, collections…"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} aria-label="Close search" className="text-muted-foreground hover:text-foreground cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">
          {q ? (
            loading ? (
              <div className="py-12 text-center text-muted-foreground">Searching…</div>
            ) : results.length === 0 ? (
              <p className="text-muted-foreground">No matches for &ldquo;{q}&rdquo;.</p>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{results.length} result{results.length === 1 ? "" : "s"}</span>
                  <Link href={`/search?q=${encodeURIComponent(q)}`} onClick={onClose} className="underline hover:text-foreground">
                    View all results
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      className="group flex gap-4"
                    >
                      {p.image && <img src={p.image} alt={p.name} className="h-24 w-20 flex-none object-cover" />}
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{p.category}</div>
                        <div className="mt-1 text-[15px] group-hover:text-accent font-medium">{p.name}</div>
                        <div className="mt-1 text-sm tabular-nums font-semibold">${p.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Trending</div>
                <ul className="space-y-2.5">
                  {trending.map((t) => (
                    <li key={t}>
                      <button onClick={() => setQ(t)} className="text-left text-[15px] hover:text-accent cursor-pointer">
                        {t}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-2">
                <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Popular right now</div>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {suggested.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      className="group"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-secondary">
                        {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />}
                      </div>
                      <div className="mt-2 text-sm group-hover:text-accent font-medium truncate">{p.name}</div>
                      <div className="text-xs tabular-nums text-muted-foreground">${p.price}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
