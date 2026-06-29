import { TestimonialType } from "@/types/ecommerce.types";

type TestimonialsSectionPropsType = {
  testimonials: TestimonialType[];
};

export const HomeTestimonialsPart = ({ testimonials }: TestimonialsSectionPropsType) => {
  return (
    <section className="py-22 bg-secondary">
      <div className="max-w-[1340px] mx-auto px-7">
        <div className="text-center mb-10">
          <div className="text-[11px] font-bold text-primary tracking-[0.14em] uppercase mb-2.5">Témoignages Clients</div>
          <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.5vw,2.9rem)] text-foreground leading-[1.12]">
            Ce Que Disent <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Nos Clients</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5.5 mb-15">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 border-1.5 border-black/5 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4.5">
                <div className="w-12.5 h-12.5 rounded-full bg-linear-to-br from-primary to-primary/50 flex items-center justify-center text-white font-heading font-extrabold text-xl shrink-0 group-hover:rotate-12 transition-transform">
                  {t.avatar || t.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-foreground">{t.name}</div>
                  <div className="text-[12px] text-gray-400">📍 {t.city}</div>
                </div>
                {t.is_verified && (
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-0.75 rounded-full border border-emerald-100">✓ Vérifié</span>
                )}
              </div>
              
              <div className="flex text-accent text-[13px] tracking-widest mb-3.5">
                {[...Array(5)].map((_, j) => (
                  <span key={j}>{j < t.rating ? "★" : "☆"}</span>
                ))}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-3.5 italic">"{t.text}"</p>
              
              <div className="text-[12px] text-gray-400 border-t border-black/5 pt-3">
                Acheté : <span className="text-primary font-semibold">{t.product_name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <div className="bg-white rounded-[28px] p-11 px-14 flex justify-around flex-wrap gap-8 shadow-sm border border-black/5">
          {[["50 000+", "Clients satisfaits"], ["4.9 / 5", "Note moyenne"], ["98%", "Recommandent KENZ"], ["30 jours", "Garantie retour"]].map(([v, l]) => (
            <div key={l} className="text-center group">
              <div className="font-heading font-extrabold text-[34px] text-primary leading-none group-hover:scale-110 transition-transform">{v}</div>
              <div className="text-[13px] text-gray-500 mt-2 font-medium">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
