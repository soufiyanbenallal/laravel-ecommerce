const STEPS = [
  { n: "01", icon: "🔍", title: "Vous choisissez", desc: "Parcourez notre catalogue de +10,000 produits. Trouvez ce que vous cherchez ou soumettez une demande spéciale." },
  { n: "02", icon: "📦", title: "Nous importons", desc: "Nous sourcez directement auprès de fournisseurs certifiés en Chine, inspectons et expédions vers le Maroc." },
  { n: "03", icon: "✅", title: "Contrôle qualité", desc: "Chaque article passe par notre centre de contrôle au Maroc avant d'être mis en stock ou expédié." },
  { n: "04", icon: "🚚", title: "Livraison rapide", desc: "Livraison express 48-72h partout au Maroc. Suivi en temps réel par SMS et WhatsApp." },
];

export const HomeHowItWorksPart = () => {
  return (
    <section className="py-22 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      <div className="max-w-[1340px] mx-auto px-7 relative z-10">
        <div className="text-center mb-14">
          <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Comment ça marche</div>
          <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.5vw,2.9rem)] text-white leading-[1.12]">
            De la Chine à <span className="text-primary">Votre Porte</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 relative">
          {STEPS.map((step, i) => (
            <div key={step.n} className="p-9 relative group">
              {/* Connector line for desktop */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-1/2 w-full h-px bg-linear-to-r from-primary/40 to-primary/10 z-0" />
              )}
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="font-heading font-extrabold text-[13px] text-primary tracking-wider">{step.n}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-11 rounded-full text-sm transition-all hover:-translate-y-0.5">
            Commencer maintenant →
          </button>
        </div>
      </div>
    </section>
  );
};
