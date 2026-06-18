import { useState, useEffect, useRef } from "react";

export const PromoModalPart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('kenz-promo-dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setIsOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && emailRef.current) {
      emailRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('kenz-promo-dismissed', 'true');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-label="Offre promotionnelle">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-md transition-opacity" onClick={handleClose} />
      
      <div className="relative max-w-4xl w-full bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in-up">
        <button onClick={handleClose} className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-foreground flex items-center justify-center border-none cursor-pointer transition-colors backdrop-blur-sm" aria-label="Fermer">✕</button>
        
        {/* Left Side: Visual */}
        <div className="md:w-1/2 bg-[#0B0C17] relative flex items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_60%,rgba(255,98,0,0.2)_0%,transparent_55%)]" />
          <div className="relative z-10 text-center animate-float">
            <div className="text-[120px] mb-6 leading-none">🎁</div>
            <div className="font-heading font-extrabold text-3xl text-white mb-2">Cadeau de Bienvenue</div>
            <div className="text-primary font-bold tracking-widest uppercase text-sm">KENZ Import Maroc</div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold mb-6">
            ✨ OFFRE LIMITÉE
          </div>
          <h2 className="font-heading font-extrabold text-3xl text-foreground mb-4 leading-tight">
            Économisez <span className="text-primary">200 MAD</span> sur votre première commande
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Inscrivez-vous à notre newsletter et recevez un code promo exclusif par email, ainsi que nos alertes "Import Direct" hebdomadaires.
          </p>

          <div className="space-y-3">
            <input 
              ref={emailRef}
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-6 py-4 rounded-2xl bg-secondary border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-sans text-sm text-foreground"
            />
            <button className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-4 rounded-2xl transition-all shadow-[0_12px_24px_rgba(255,98,0,0.25)] hover:-translate-y-1">
              Récupérer mon cadeau →
            </button>
          </div>

          <button onClick={handleClose} className="mt-6 text-[11px] text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer font-bold uppercase tracking-wider transition-colors">
            Non merci, je préfère payer plein tarif
          </button>
        </div>
      </div>
    </div>
  );
};
