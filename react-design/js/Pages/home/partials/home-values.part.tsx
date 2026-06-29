const VALUES = [
  { icon: "🛡️", title: "Produits Certifiés", desc: "Chaque article est inspecté et certifié par nos experts qualité avant expédition depuis la Chine.", color: "text-primary", bg: "bg-primary/10" },
  { icon: "⚡", title: "Livraison 48h", desc: "Livraison express 48-72h partout au Maroc pour tous les produits en stock local.", color: "text-accent", bg: "bg-accent/10" },
  { icon: "🔄", title: "Retour 30 Jours", desc: "Politique de retour sans friction — satisfait ou remboursé sous 30 jours, sans questions.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: "💬", title: "Support 7j/7", desc: "Notre équipe francophone est disponible 7 jours sur 7 par chat, téléphone et WhatsApp.", color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

export const HomeValuesPart = () => {
  return (
    <section className="py-22 bg-background">
      <div className="max-w-[1340px] mx-auto px-7">
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Pourquoi KENZ</div>
          <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.5vw,2.9rem)] text-foreground leading-[1.12]">
            Notre Engagement <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Envers Vous</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <div 
              key={i} 
              className="p-8 px-7 rounded-3xl bg-background border-1.5 border-black/5 hover:border-primary hover:shadow-[0_12px_32px_rgba(255,98,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className={`w-15 h-15 rounded-2xl ${v.bg} flex items-center justify-center text-3xl mb-5.5 group-hover:scale-110 transition-transform`}>
                {v.icon}
              </div>
              <h3 className="font-heading font-bold text-[19px] text-foreground mb-2.5">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              <div className={`mt-4.5 h-0.75 w-10 rounded-full transition-all group-hover:w-full ${v.bg.replace('/10', '')}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
