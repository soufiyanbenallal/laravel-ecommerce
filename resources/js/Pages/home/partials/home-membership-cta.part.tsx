import { useState } from "react";

export const HomeMembershipCtaPart = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-25 bg-foreground relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,98,0,0.2)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 border border-primary/10 pointer-events-none animate-float" />
      <div className="absolute -bottom-[30%] -left-[5%] w-[400px] h-[400px] rounded-full bg-accent/3 border border-accent/7 pointer-events-none animate-float [animation-delay:2s]" />

      <div className="max-w-[840px] mx-auto px-7 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/12 border border-primary/30 rounded-full text-primary text-[13px] font-bold tracking-widest uppercase mb-8 animate-fade-in-up">
          👑 KENZ Premium Membership
        </div>

        <h2 className="font-heading font-extrabold text-[clamp(2.2rem,4.5vw,3.8rem)] text-white leading-[1.08] mb-5.5 animate-fade-in-up">
          Rejoignez l'Élite<br />des <span className="bg-linear-to-r from-primary via-[#FF8533] to-accent bg-clip-text text-transparent animate-gradient-pan [background-size:200%_200%]">Acheteurs Malins</span>
        </h2>

        <p className="text-white/60 text-[17px] leading-relaxed mb-11 max-w-[560px] mx-auto animate-fade-in-up">
          Accédez aux meilleures offres en avant-première, bénéficiez de réductions exclusives et d'une livraison prioritaire. L'import intelligent, c'est KENZ Premium.
        </p>

        {/* Feature Pills */}
        <div className="flex justify-center gap-3.5 mb-11 flex-wrap animate-fade-in-up">
          {["-15% supplémentaires", "Livraison offerte", "Early access"].map((f) => (
            <div 
              key={f} 
              className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-white/7 border border-white/10 rounded-full text-white/80 text-[13px] font-medium group hover:bg-white/10 transition-colors"
            >
              <span className="text-primary group-hover:scale-125 transition-transform">✓</span> {f}
            </div>
          ))}
        </div>

        {/* Email Form */}
        <div className="flex flex-col sm:flex-row max-w-[500px] mx-auto bg-white/7 rounded-2xl p-1.5 gap-2 border border-white/10 animate-fade-in-up">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Votre adresse email..."
            className="flex-1 bg-transparent border-none outline-none text-white font-sans text-sm px-3.5 py-3 sm:py-0"
          />
          <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6.5 rounded-xl text-sm whitespace-nowrap transition-all shadow-lg hover:-translate-y-0.5">
            Rejoindre Gratuitement
          </button>
        </div>
        
        <p className="text-white/30 text-[12px] mt-4.5 animate-fade-in-up">
          Gratuit pour toujours · Sans engagement · Désabonnement en 1 clic
        </p>
      </div>
    </section>
  );
};
