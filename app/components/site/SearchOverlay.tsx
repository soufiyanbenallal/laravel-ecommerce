import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type { ProductModelType } from "@/types/ecommerce.types";

const trending = ["Apparel", "Footwear", "Bags", "Accessories"];

type SearchOverlayPropsType = {
  open: boolean;
  onClose: () => void;
  suggested?: ProductModelType[];
};

export function SearchOverlay({ open, onClose, suggested = [] }: SearchOverlayPropsType) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<ProductModelType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  // Handle Search Submission
  const handleSearchSubmit = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    onClose();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/30 backdrop-blur-sm">
      <div className="fade-up w-full bg-background max-h-[85vh] overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit(q);
          }}
          className="mx-auto flex max-w-7xl items-center gap-4 border-b border-border/60 px-6 py-5"
        >
          <Search className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, materials, collections…"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-muted-foreground hover:text-foreground cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </form>

        <div className="mx-auto max-w-7xl md:px-6 px-2 py-10">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Trending</div>
              <ul className="space-y-2.5">
                {trending.map((t) => (
                  <li key={t}>
                    <button
                      type="button"
                      onClick={() => {
                        setQ(t);
                        handleSearchSubmit(t);
                      }}
                      className="text-left text-[15px] hover:text-accent cursor-pointer"
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {suggested.length > 0 && (
              <div className="md:col-span-2">
                <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Popular right now</div>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {suggested.slice(0, 4).map((p) => (
                    <Link
                      key={p.id}
                      to={`/products/${p.slug}`}
                      onClick={onClose}
                      className="group"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-secondary">
                        {p.image && <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />}
                      </div>
                      <div className="mt-2 text-sm group-hover:text-accent font-medium truncate">{p.name}</div>
                      <div className="text-xs tabular-nums text-muted-foreground">{p.price} {p.currency || 'MAD'}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
