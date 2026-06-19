import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart, cartCount } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { megaMenus, MegaMenuPanel } from "./MegaMenu";
import { SearchOverlay } from "./SearchOverlay";
import { Link } from "@inertiajs/react";

const flat = [
  { to: "/collections", label: "Collections" },
  { to: "/journal", label: "Journal" },
] as const;

export function Header() {
  const items = useCart((s) => s.items);
  const open = useCart((s) => s.open);
  const wishlist = useWishlist((s) => s.ids);
  const count = cartCount(items);
  const [active, setActive] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-[11px] uppercase tracking-[0.18em]">
          <span className="opacity-70">Complimentary worldwide shipping over $250</span>
          <div className="hidden items-center gap-5 md:flex">
            <a href="#" className="opacity-70 hover:opacity-100">Track order</a>
            <a href="#" className="opacity-70 hover:opacity-100">Stores</a>
            <a href="#" className="opacity-70 hover:opacity-100">EN · USD</a>
          </div>
        </div>
      </div>

      <header
        className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md"
        onMouseLeave={() => setActive(null)}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Left nav */}
          <nav className="hidden flex-1 items-center gap-8 text-sm md:flex">
            {Object.keys(megaMenus).map((key) => (
              <button
                key={key}
                onMouseEnter={() => setActive(key)}
                onFocus={() => setActive(key)}
                className={
                  "py-2 text-foreground/70 transition-colors hover:text-foreground " +
                  (active === key ? "text-foreground" : "")
                }
              >
                {key}
              </button>
            ))}
            {flat.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onMouseEnter={() => setActive(null)}
                className="text-foreground/70 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="font-display text-2xl tracking-tight">
            Atelier <span className="text-accent">Nord</span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-5 text-foreground/80">
            <button aria-label="Search" onClick={() => setSearchOpen(true)} className="hover:text-foreground">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className="relative hidden hover:text-foreground sm:block">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button aria-label="Account" className="hidden hover:text-foreground sm:block">
              <User className="h-[18px] w-[18px]" />
            </button>
            <button aria-label="Cart" onClick={open} className="relative hover:text-foreground">
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega menu panel */}
        {active && megaMenus[active] && <MegaMenuPanel group={megaMenus[active]} />}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="font-display text-2xl">
              Atelier <span className="text-accent">Nord</span>
            </Link>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="px-6 py-8 space-y-6">
            {Object.entries(megaMenus).map(([key, g]) => (
              <div key={key}>
                <div className="font-display text-3xl">{key}</div>
                <ul className="mt-3 space-y-2 pl-1">
                  {g.columns[0].links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        params={l.params as never}
                        onClick={() => setMobileOpen(false)}
                        className="text-foreground/70 hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-3 border-t border-border/60 pt-6">
              {flat.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl"
                >
                  {n.label}
                </Link>
              ))}
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="block font-display text-2xl">
                Wishlist
              </Link>
            </div>
          </nav>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
