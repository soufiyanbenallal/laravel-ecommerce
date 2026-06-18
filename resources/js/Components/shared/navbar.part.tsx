import { useState, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { useCartStore } from "@/stores/cart.store";

const NAV_CATEGORIES = [
  { icon: "📱", name: "Smartphones & Tablettes", sub: "iPhone, Samsung, Xiaomi, Oppo..." },
  { icon: "💻", name: "Informatique", sub: "Laptops, PC, Accessoires, SSD..." },
  { icon: "📺", name: "Audio & Vidéo", sub: "TV 4K, Enceintes, Casques, Drones..." },
  { icon: "🏠", name: "Maison & Cuisine", sub: "Déco, Électroménager, Robot, Literie..." },
  { icon: "🚗", name: "Auto & Moto", sub: "Pièces, GPS, Cam, Accessoires..." },
  { icon: "🎮", name: "Gaming", sub: "PS5, Xbox, PC Gaming, Chaises..." },
  { icon: "📷", name: "Photo & Drone", sub: "Sony, Canon, DJI, GoPro, Objectifs..." },
  { icon: "🏋️", name: "Sport & Fitness", sub: "Équipements, Vêtements, Nutrition..." },
];

export const NavbarPart = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const { totalItems, setIsOpen } = useCartStore();
  const cartCount = totalItems();
  const [wishlist] = useState(0);
  const { auth } = usePage().props as { auth: { user?: { id: number; name: string; email: string } | null } };
  const user = auth?.user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b border-black/5 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm h-16" : "bg-white h-[72px]"
    }`}>
      <div className="max-w-[1340px] mx-auto px-7 flex items-center h-full gap-7">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-[#FF8533] flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-[0_4px_16px_rgba(255,98,0,0.3)] group-hover:scale-105 transition-transform">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-[22px] text-foreground leading-none">KENZ</span>
            <span className="text-[9px] text-primary font-bold tracking-[0.14em] uppercase">Import Maroc</span>
          </div>
        </Link>

        {/* Mega Menu Trigger */}
        <div className="relative group/nav hidden lg:block">
          <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer font-sans font-bold text-sm text-foreground py-2 px-3.5 rounded-xl hover:bg-secondary transition-colors">
            <span className="text-base">☰</span> Catégories <span className="text-[9px] text-gray-400">▼</span>
          </button>

          {/* Mega Menu Content */}
          <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-full max-w-[900px] opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 translate-y-[-10px] transition-all duration-200 pointer-events-none group-hover/nav:pointer-events-auto z-50 px-4">
            <div className="bg-white rounded-3xl shadow-[0_28px_72px_rgba(0,0,0,0.16)] border border-black/5 p-8 grid grid-cols-[3fr_2fr] gap-8">
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-[0.12em] uppercase mb-4">Toutes les catégories</div>
                <div className="grid grid-cols-2 gap-0.5">
                  {NAV_CATEGORIES.map((cat) => (
                    <Link key={cat.name} href="#" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary transition-colors no-underline group/cat">
                      <span className="text-2xl shrink-0 group-hover/cat:scale-110 transition-transform">{cat.icon}</span>
                      <div>
                        <div className="text-[13px] font-semibold text-foreground">{cat.name}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{cat.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="text-[10px] font-bold text-gray-400 tracking-[0.12em] uppercase mb-0.5">Offre du moment</div>
                <div className="bg-linear-to-br from-[#0B0C17] to-[#1a1c2e] rounded-2xl p-6 text-white flex-1 flex flex-col relative overflow-hidden group/deal">
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold tracking-wider text-primary opacity-90 mb-2.5 uppercase">⚡ Flash Deal · -38%</div>
                    <div className="text-5xl mb-2.5 leading-none animate-float">📱</div>
                    <div className="font-heading font-bold text-[17px] mb-1">iPhone 14 Pro Max</div>
                    <div className="text-[13px] opacity-65 mb-3.5">Reconditionné Grade A+ · 256GB</div>
                    <div className="font-heading font-extrabold text-2xl text-primary mb-4">5 490 MAD</div>
                    <button className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-[13px] transition-all transform hover:-translate-y-0.5">
                      Voir l'offre →
                    </button>
                  </div>
                  {/* Decor */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover/deal:bg-primary/20 transition-colors" />
                </div>
                <div className="bg-secondary rounded-2xl p-3.5 px-4">
                  <div className="text-[13px] text-foreground font-semibold mb-1">🆕 Cette semaine</div>
                  <div className="text-[12px] text-gray-500">245 nouveaux produits ajoutés — smartphones, déco...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {["Nouveautés", "Promotions", "Reconditionnés", "Grossiste"].map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} className="text-sm font-semibold text-gray-600 px-3 py-2 rounded-xl hover:text-primary hover:bg-primary/10 transition-all">
              {link}
            </Link>
          ))}
        </div>

        <div className="flex-1" />

        {/* Search */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const search = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
            router.get('/catalog', { search });
          }}
          className="hidden lg:relative lg:block w-[300px]"
        >
          <input 
            type="text" 
            name="search"
            placeholder="Rechercher un produit..."
            className="w-full pl-4.5 pr-11 py-2.5 border-2 border-transparent bg-secondary rounded-full font-sans text-[13px] text-foreground outline-none focus:border-primary focus:bg-white transition-all"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 border-none bg-transparent cursor-pointer">🔍</button>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <button className="relative p-2 rounded-xl text-xl hover:bg-secondary transition-colors border-none bg-transparent cursor-pointer">
            🤍
            {wishlist > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">{wishlist}</span>}
          </button>
          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-2 rounded-xl text-xl hover:bg-secondary transition-colors border-none bg-transparent cursor-pointer"
          >
            🛒
            {cartCount > 0 && <span className="absolute top-1 right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">{cartCount}</span>}
          </button>
          <div className="hidden lg:flex items-center gap-2 ml-2">
            {user ? (
              <div className="relative group">
                <button className="bg-foreground hover:bg-black text-white text-[13px] font-bold py-2.5 px-5 rounded-full transition-all hover:-translate-y-0.5">
                  👤 {user.first_name || user.name}
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-black/5 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link href="/account/orders" className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors no-underline">
                    Mes commandes
                  </Link>
                  <form method="POST" action="/account/logout">
                    <input type="hidden" name="_token" value={(document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''} />
                    <button type="submit" className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent">
                      Déconnexion
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <Link href="/login" className="bg-foreground hover:bg-black text-white text-[13px] font-bold py-2.5 px-5 rounded-full transition-all hover:-translate-y-0.5 no-underline">
                👤 Compte
              </Link>
            )}
          </div>
          <button 
            onClick={() => setIsOpenMobile(!isOpenMobile)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all border-none bg-transparent cursor-pointer text-xl"
          >
            {isOpenMobile ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile Menu Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpenMobile(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl flex flex-col animate-fade-in-right">
            <div className="p-6 border-b flex items-center justify-between">
              <span className="font-heading font-extrabold text-xl text-foreground">KENZ</span>
              <button onClick={() => setIsOpenMobile(false)} className="text-xl border-none bg-transparent cursor-pointer">✕</button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu</div>
                <Link href="/" className="block font-bold text-foreground no-underline">Accueil</Link>
                <Link href="/catalog" className="block font-bold text-foreground no-underline">Catalogue</Link>
                <Link href="/promotions" className="block font-bold text-foreground no-underline">Promotions</Link>
                <Link href="/sourcing" className="block font-bold text-foreground no-underline">Sourcing</Link>
              </div>
              <div className="space-y-4 pt-6 border-t border-black/5">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aide</div>
                <Link href="/contact" className="block text-sm text-gray-600 no-underline">Contact</Link>
                <Link href="/faq" className="block text-sm text-gray-600 no-underline">FAQ</Link>
              </div>
            </div>
            <div className="mt-auto p-6 border-t border-black/5">
              {user ? (
                <>
                  <Link href="/account/orders" className="block w-full bg-foreground text-white font-bold py-3.5 rounded-xl text-sm text-center no-underline mb-2">
                    Mes commandes
                  </Link>
                  <form method="POST" action="/account/logout">
                    <input type="hidden" name="_token" value={(document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || ''} />
                    <button type="submit" className="w-full bg-white border border-gray-200 text-gray-600 font-bold py-3.5 rounded-xl text-sm cursor-pointer">
                      Déconnexion
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="block w-full bg-primary text-white font-bold py-3.5 rounded-xl text-sm text-center no-underline">
                  Mon Compte
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
