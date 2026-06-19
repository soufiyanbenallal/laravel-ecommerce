import { Link } from "@inertiajs/react";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl">
              Atelier <span className="text-accent">Nord</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Objects made slowly, by people we know. We work with small workshops across Europe and Japan to design pieces meant to last a lifetime.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-sm items-center border-b border-foreground/40 pb-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="text-sm font-medium tracking-wide text-accent hover:underline">
                Subscribe →
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Shop
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/shop" className="hover:text-accent">All Objects</Link></li>
              <li><Link href="/shop" className="hover:text-accent">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-accent">The Archive</Link></li>
              <li><Link href="/shop" className="hover:text-accent">Gift Cards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Maison
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-accent">Our Story</Link></li>
              <li><Link to="/journal" className="hover:text-accent">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
              <li><a href="#" className="hover:text-accent">Press</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Atelier Nord. All objects, all stories.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground">Shipping</a>
            <a href="#" className="hover:text-foreground">Returns</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
