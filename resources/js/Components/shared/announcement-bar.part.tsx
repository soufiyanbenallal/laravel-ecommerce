import { useState, useEffect } from "react";

const ANNOUNCE_MSGS = [
  "🎁 Livraison gratuite dès 500 MAD · Partout au Maroc",
  "⚡ Offres Flash du jour — jusqu'à -50% sur les smartphones",
  "🌟 Nouveauté : Service d'import sur-mesure disponible",
  "🔒 Paiement sécurisé — CB, Virement bancaire, Cash à livraison",
  "🚀 Retour gratuit sous 30 jours — Satisfaction garantie",
];

export const AnnouncementBarPart = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % ANNOUNCE_MSGS.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-foreground text-white/85 text-[13px] font-medium py-2.5 text-center tracking-wide overflow-hidden">
      <div key={idx} className="animate-fade-in-up">
        {ANNOUNCE_MSGS[idx]}
      </div>
    </div>
  );
};
