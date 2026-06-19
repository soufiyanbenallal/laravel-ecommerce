import { Link } from "@inertiajs/react";
import { Instagram, Twitter, Facebook } from "lucide-react";

const shopLinks = [
  { label: "New Arrivals", href: "/catalog" },
  { label: "Women", href: "/category/apparel" },
  { label: "Men", href: "/category/apparel" },
  { label: "Footwear", href: "/category/footwear" },
  { label: "Collections", href: "/collections" },
  { label: "Gift Cards", href: "/catalog" },
];

const maisonLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Sourcing", href: "/sourcing" },
  { label: "Journal", href: "/journal" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
];

const helpLinks = [
  { label: "Shipping & Returns", href: "#" },
  { label: "Size Guide", href: "#" },
  { label: "Care Instructions", href: "#" },
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">

      {/* ── Upper footer ── */}
      <div className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-14 md:grid-cols-12">

            {/* Brand column */}
            <div className="md:col-span-4">
              {/* Brand mark */}
              <div className="font-display text-4xl font-light tracking-[0.14em] uppercase">
                K<span className="text-accent">ENZ</span>
                <span className="ml-2.5 text-[13px] tracking-[0.28em] text-muted-foreground align-middle">Maison</span>
              </div>

              <p className="mt-5 max-w-[280px] text-[13px] leading-relaxed text-muted-foreground font-light">
                Premium clothing designed with the workshops that craft them. Small batches, natural materials, built to outlast decades.
              </p>

              {/* Newsletter */}
              <div className="mt-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/60 mb-3">Join the inner circle</p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex max-w-[300px] items-center border-b border-foreground/25 pb-2.5 transition-colors focus-within:border-accent"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground/70 font-light"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="text-[11px] font-medium tracking-[0.18em] uppercase text-accent hover:text-foreground transition-colors duration-200 cursor-pointer ml-3"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Social */}
              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter / X"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <Twitter className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {/* Link columns */}
            <div className="md:col-span-8 grid grid-cols-2 gap-10 sm:grid-cols-3">

              {/* Shop */}
              <div>
                <h4 className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground mb-5">
                  Shop
                </h4>
                <ul className="space-y-3">
                  {shopLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] font-light text-foreground/75 hover:text-accent transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Maison */}
              <div>
                <h4 className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground mb-5">
                  Maison
                </h4>
                <ul className="space-y-3">
                  {maisonLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] font-light text-foreground/75 hover:text-accent transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help */}
              <div>
                <h4 className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground mb-5">
                  Help
                </h4>
                <ul className="space-y-3">
                  {helpLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] font-light text-foreground/75 hover:text-accent transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border/50 bg-secondary/20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center">
          <div className="tracking-wide">
            © {new Date().getFullYear()} <span className="font-medium uppercase tracking-[0.14em]">KENZ Maison</span>. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 uppercase tracking-[0.18em]">
            <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Cookies</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
