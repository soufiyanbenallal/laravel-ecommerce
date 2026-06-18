const TRUST_ITEMS = [
  "🔐 Paiement 100% Sécurisé", "🚀 Livraison Express 48h", "✅ Produits Certifiés", "🔄 Retour Gratuit 30 Jours",
  "📞 Support WhatsApp 24/7", "💎 Qualité Premium Garantie", "🌏 Import Direct Chine", "⭐ 50,000+ Clients Satisfaits",
];

export const HomeTrustBarPart = () => {
  return (
    <div className="bg-foreground py-4 overflow-hidden group">
      <div className="flex w-max gap-13 animate-marquee group-hover:[animation-play-state:paused]">
        {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
          <span 
            key={i} 
            className="text-white/70 text-[13px] font-medium whitespace-nowrap flex items-center gap-2.5"
          >
            {item}
            <span className="text-primary text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};
