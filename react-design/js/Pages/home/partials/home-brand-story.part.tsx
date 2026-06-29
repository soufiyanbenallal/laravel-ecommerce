export const HomeBrandStoryPart = () => {
  return (
    <section className="py-25 bg-foreground relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,98,0,0.13)_0%,transparent_55%),radial-gradient(circle_at_8%_80%,rgba(245,158,11,0.07)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div className="max-w-[1340px] mx-auto px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Visual */}
          <div className="relative">
            <div className="w-full aspect-[4/3] bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center p-12 gap-8 flex-wrap">
              {[["🇨🇳", "Chine"], ["➡️", "Route de la Soie"], ["🇲🇦", "Maroc"]].map(([icon, label]) => (
                <div key={label} className="text-center group">
                  <div className="text-[56px] mb-2.5 transition-transform group-hover:scale-110">{icon}</div>
                  <div className="text-white/50 text-[11px] font-bold tracking-widest uppercase">{label}</div>
                </div>
              ))}
            </div>

            {/* Stat Pills */}
            <div className="absolute -top-5 -right-5 bg-linear-to-br from-primary to-[#FF8533] rounded-2xl p-5 px-6.5 text-white shadow-[0_16px_40px_rgba(255,98,0,0.35)] animate-float">
              <div className="font-heading font-extrabold text-[38px] leading-none">5+</div>
              <div className="text-[12px] opacity-85 mt-1">Années d'expertise</div>
            </div>
            <div className="absolute -bottom-5.5 -left-5.5 bg-white rounded-2xl p-5 px-6.5 shadow-xl animate-float [animation-delay:1.5s]">
              <div className="font-heading font-extrabold text-[38px] leading-none text-accent">98%</div>
              <div className="text-[12px] font-semibold text-gray-600 mt-1">Satisfaction client</div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Notre Histoire</div>
            <h2 className="font-heading font-extrabold text-[clamp(2rem,3.8vw,3.2rem)] text-white leading-[1.12] mb-6">
              Votre Pont Direct<br />Entre la Chine et<br /><span className="text-primary">le Maroc</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-5">
              KENZ est né d'une vision simple : rendre les meilleurs produits du monde accessibles aux Marocains sans intermédiaires. Depuis 2019, nous importons directement des usines chinoises pour vous offrir des prix imbattables.
            </p>
            <p className="text-white/45 text-[15px] leading-relaxed mb-10">
              Chaque produit est inspecté, certifié et livré directement chez vous. Produits neufs ou reconditionnés de qualité A+ — toujours au meilleur prix du marché marocain.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-5 mb-10">
              {[["200+", "Fournisseurs certifiés"], ["50k+", "Commandes livrées"], ["99%", "Taux de livraison"]].map(([v, l]) => (
                <div key={l} className="bg-white/5 rounded-2xl p-4 px-3.5 border border-white/10 group hover:border-primary/50 transition-colors">
                  <div className="font-heading font-extrabold text-2xl text-primary mb-1 group-hover:scale-105 transition-transform">{v}</div>
                  <div className="text-[12px] text-white/45 leading-snug">{l}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3.5 flex-wrap">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-full text-sm transition-all hover:-translate-y-0.5">
                Notre histoire →
              </button>
              <button className="bg-transparent border-2 border-white/20 text-white font-bold py-3.5 px-8 rounded-full text-sm hover:border-white/50 transition-all">
                Devenir partenaire
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
