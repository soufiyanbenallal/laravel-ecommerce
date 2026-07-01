import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { megaMenus, MegaMenuPanel } from "./MegaMenu";
import { SearchOverlay } from "./SearchOverlay";
import { Link } from "react-router";

const flat = [
  { to: "/collections", label: "Collections" },
] as const;

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex items-center gap-0 select-none"
      aria-label="KENZ — Home"
    >
      <span
        className="font-display text-[22px] tracking-[0.16em] uppercase text-foreground transition-opacity duration-300 group-hover:opacity-80"
        style={{ fontWeight: 500, letterSpacing: "0.18em" }}
      >
        K
        <span className="text-accent">ENZ</span>
      </span>
      <span
        className="ml-2.5 mt-[3px] hidden text-[9px] tracking-[0.28em] uppercase text-muted-foreground sm:block"
        style={{ letterSpacing: "0.3em" }}
      >
        Maison
      </span>
    </Link>
  );
}

type HeaderPropsType = {
  cart?: { totalQuantity: number } | null;
};

export function Header({ cart }: HeaderPropsType) {
  const openCart = useCart((s) => s.open);
  const wishlist = useWishlist((s) => s.ids);
  const count = cart?.totalQuantity ?? 0;
  
  const [active, setActive] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-6 py-2.5 text-[10px] uppercase tracking-[0.24em]">
          <span className="opacity-60 hidden sm:block">—</span>
          <span className="opacity-85">Complimentary worldwide delivery on orders over $250</span>
          <span className="opacity-60 hidden sm:block">—</span>
          <div className="hidden items-center gap-6 md:flex">
            <a href="#" className="opacity-55 hover:opacity-100 transition-opacity duration-200">Track</a>
            <span className="opacity-30">|</span>
            <a href="#" className="opacity-55 hover:opacity-100 transition-opacity duration-200">Stores</a>
            <span className="opacity-30">|</span>
            <a href="#" className="opacity-55 hover:opacity-100 transition-opacity duration-200">EN · USD</a>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header
        className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300"
        onMouseLeave={() => setActive(null)}
      >
        <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-6">

          {/* Left navigation */}
          <nav className="hidden flex-1 items-center gap-7 text-[13px] font-light tracking-wide md:flex" aria-label="Primary">
            {Object.keys(megaMenus).map((key) => (
              <button
                key={key}
                onMouseEnter={() => setActive(key)}
                onFocus={() => setActive(key)}
                className={
                  "py-2 transition-colors duration-200 cursor-pointer " +
                  (active === key
                    ? "text-accent"
                    : "text-foreground/65 hover:text-foreground")
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
                className="text-foreground/65 transition-colors duration-200 hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>

          {/* Center brand mark */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <BrandMark />
          </div>

          {/* Right icons */}
          <div className="flex flex-1 items-center justify-end gap-4 text-foreground/70">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hover:text-foreground transition-colors duration-200 cursor-pointer p-1"
            >
              <Search className="h-[17px] w-[17px]" strokeWidth={1.5} />
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden hover:text-foreground transition-colors duration-200 sm:block p-1"
            >
              <Heart className="h-[17px] w-[17px]" strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-accent px-[3px] text-[9px] font-medium text-accent-foreground leading-none">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              aria-label="My account"
              className="hidden hover:text-foreground transition-colors duration-200 sm:block p-1"
            >
              <User className="h-[17px] w-[17px]" strokeWidth={1.5} />
            </Link>

            <button
              aria-label="Shopping bag"
              onClick={openCart}
              className="relative hover:text-foreground transition-colors duration-200 cursor-pointer p-1"
            >
              <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-accent px-[3px] text-[9px] font-medium text-accent-foreground leading-none">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega menu panel */}
        {active && megaMenus[active] && <MegaMenuPanel group={megaMenus[active]} />}
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden flex flex-col">
          {/* Mobile header */}
          <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
            <BrandMark onClick={() => setMobileOpen(false)} />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile nav */}
          <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-8" aria-label="Mobile navigation">
            {Object.entries(megaMenus).map(([key, g]) => (
              <div key={key}>
                <div className="font-display text-3xl font-light text-foreground">{key}</div>
                <ul className="mt-3 space-y-2.5 pl-0.5">
                  {g.columns[0].links.map((l) => {
                    const href = l.params ? l.to.replace("$slug", l.params.slug) : l.to;
                    return (
                      <li key={l.label}>
                        <Link
                          to={href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[15px] text-foreground/65 hover:text-accent transition-colors duration-200"
                        >
                          {l.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {/* Flat links + account */}
            <div className="space-y-4 border-t border-border/50 pt-7">
              {flat.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-2xl font-light text-foreground hover:text-accent transition-colors duration-200"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                className="block font-display text-2xl font-light text-foreground hover:text-accent transition-colors duration-200"
              >
                Wishlist
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                className="block font-display text-2xl font-light text-foreground hover:text-accent transition-colors duration-200"
              >
                Account
              </Link>
            </div>
          </nav>

          {/* Mobile footer strip */}
          <div className="border-t border-border/50 px-6 py-5 flex items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">EN</a>
            <a href="#" className="hover:text-accent transition-colors">USD</a>
            <a href="#" className="hover:text-accent transition-colors">Track Order</a>
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
