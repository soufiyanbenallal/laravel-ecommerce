import { SourcingFormShared } from "@/Components/shared/sourcing-form.shared";

export const HomeSourcingPart = () => {
  return (
    <section className="py-25 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-[1340px] mx-auto px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Service de Sourcing</div>
            <h2 className="font-heading font-extrabold text-[clamp(2.1rem,4vw,3.4rem)] text-foreground leading-[1.08] mb-7">
              Trouvez l'Introuvable<br />Directement à<br /><span className="text-primary">la Source</span>
            </h2>
            
            <div className="space-y-8 mb-10">
              {[
                { icon: "🏢", title: "Accès aux Usines", desc: "Nous travaillons directement avec les fabricants, pas avec des revendeurs." },
                { icon: "💎", title: "Inspection sur Place", desc: "Nos agents en Chine inspectent physiquement chaque commande avant expédition." },
                { icon: "🚢", title: "Logistique Complète", desc: "Nous gérons tout : dédouanement, transport maritime ou aérien, et livraison finale." },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform group-hover:border-primary/30 group-hover:shadow-primary/10">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground mb-1.5">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[400px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/5 flex items-center gap-5 shadow-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    {i === 4 ? "+12" : "👤"}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Agents experts à Guangzhou & Yiwu</div>
                <div className="text-[12px] text-gray-400">Prêts à négocier pour vous 24h/24</div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <SourcingFormShared />
          </div>
        </div>
      </div>
    </section>
  );
};
