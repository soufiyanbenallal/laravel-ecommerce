import { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";

const HERO_SLIDES = [
  {
    id: 1,
    badge: "⚡ Importation directe · Livraison Maroc",
    headline: ["L'Import Direct", "de Chine —", "Pour le Maroc"],
    highlight: 1,
    sub: "Smartphones, électronique, déco maison, auto et plus encore. Prix imbattables, qualité certifiée, livraison rapide partout au Maroc.",
    cta: "Explorer les Produits",
    bg: "bg-[#0B0C17]",
    gradient: "radial-gradient(circle at 25% 60%, rgba(255,98,0,0.13) 0%, transparent 55%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.07) 0%, transparent 50%)",
    accent: "text-primary",
    accentBg: "bg-primary",
    product: { 
      image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=600&auto=format&fit=crop", 
      label: "Smartphones Premium", 
      badge1: { icon: "⚡", text: "+2,400 nouveaux produits ce mois" }, 
      badge2: "245 visiteurs actifs" 
    },
  },
  {
    id: 2,
    badge: "🏠 Nouvelle Collection Maison & Déco",
    headline: ["Transformez", "Votre Intérieur", "Sans Vous Ruiner"],
    highlight: 2,
    sub: "Mobilier design, électroménager smart et déco tendance importés directement des meilleures usines chinoises.",
    cta: "Voir la Collection",
    bg: "bg-[#120A02]",
    gradient: "radial-gradient(circle at 25% 60%, rgba(245,158,11,0.13) 0%, transparent 55%)",
    accent: "text-accent",
    accentBg: "bg-accent",
    product: { 
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop", 
      label: "Maison & Déco", 
      badge1: { icon: "🌟", text: "Qualité vérifiée par nos experts" }, 
      badge2: "189 commandes aujourd'hui" 
    },
  },
];

export const HomeHeroPart = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const s = HERO_SLIDES[active];

  return (
    <section className="relative h-[90vh] min-h-[620px] overflow-hidden">
      {/* Background Slides */}
      {HERO_SLIDES.map((sl, i) => (
        <div 
          key={sl.id} 
          className={`absolute inset-0 transition-opacity duration-900 ease-in-out ${sl.bg} ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-0" style={{ backgroundImage: sl.gradient }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
      ))}

      {/* Content */}
      <div className="max-w-[1340px] mx-auto px-7 h-full flex items-center justify-between gap-10 relative z-10">
        {/* Left Side */}
        <div className="flex-[0_0_54%] max-w-[620px]">
          <div key={active} className="animate-fade-in-left">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/15 rounded-full ${s.accent} text-xs font-bold tracking-wide mb-7`}>
              {s.badge}
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-[clamp(2.6rem,5.2vw,4.6rem)] leading-[1.07] tracking-tight text-white mb-7">
              {s.headline.map((line, i) => (
                <span key={i} className={`block ${i === s.highlight ? s.accent : ""}`}>{line}</span>
              ))}
            </h1>

            <p className="text-base text-white/65 leading-relaxed mb-9 max-w-[500px]">
              {s.sub}
            </p>

            {/* Hero Search */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const search = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
                router.get('/catalog', { search });
              }}
              className="flex bg-white rounded-2xl p-1.5 gap-2 mb-9 shadow-[0_20px_52px_rgba(0,0,0,0.28)] max-w-[520px]"
            >
              <div className="flex-1 flex items-center gap-2.5 px-3">
                <span className="text-lg opacity-50">🔍</span>
                <input 
                  type="text" 
                  name="search"
                  placeholder="Rechercher parmi 10,000+ produits..."
                  className="flex-1 border-none outline-none font-sans text-sm text-foreground bg-transparent"
                />
              </div>
              <button type="submit" className={`py-3 px-6 rounded-xl text-[13px] font-bold text-white transition-all transform hover:-translate-y-0.5 ${s.accentBg} border-none cursor-pointer`}>
                Explorer
              </button>
            </form>

            {/* Stats */}
            <div className="flex gap-10">
              {[["10k+", "Produits"], ["50k+", "Clients"], ["4.9★", "Satisfaction"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-heading font-extrabold text-2xl text-white leading-none">{v}</div>
                  <div className="text-[12px] text-white/45 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden lg:flex flex-[0_0_40%] justify-center items-center relative">
          <div key={`${active}-v`} className="animate-fade-in-right animate-float">
            {/* Main Card */}
            <div className="w-[300px] h-[380px] rounded-[36px] bg-white/5 backdrop-blur-3xl border border-white/10 flex flex-col items-center p-6 shadow-[0_48px_96px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)]">
              <div className="w-full h-56 rounded-3xl overflow-hidden mb-6">
                <img src={s.product.image} alt={s.product.label} loading="eager" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-[17px] text-white mb-1.5">{s.product.label}</div>
                <div className="text-[12px] text-white/40">Import Direct · Qualité Certifiée</div>
              </div>
              <div className={`mt-auto py-2.5 px-6 rounded-full text-[13px] font-bold text-white cursor-pointer ${s.accentBg}`}>
                Voir les offres →
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -top-4.5 -right-8 bg-white rounded-2xl p-2.5 px-4 shadow-xl flex items-center gap-2.5 max-w-[220px] animate-fade-in-up">
              <span className="text-xl">{s.product.badge1.icon}</span>
              <span className="text-[11px] font-semibold text-foreground leading-snug">{s.product.badge1.text}</span>
            </div>

            <div className="absolute -bottom-4.5 -left-7 bg-white rounded-xl p-2 px-4 shadow-lg flex items-center gap-2.5 animate-fade-in-up">
              <div className="relative w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring" />
                <span className="block w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-semibold text-foreground">{s.product.badge2}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="block w-full h-[60px]">
          <path d="M0,60 L0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 Z" className="fill-background" />
        </svg>
      </div>
    </section>
  );
};
