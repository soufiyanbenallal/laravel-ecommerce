import { Link } from "@inertiajs/react";

const FOOTER_LINKS = {
  "À Propos": [
    { label: "Notre histoire", href: "/#brand-story" },
    { label: "Blog", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Partenaires", href: "/sourcing" },
  ],
  "Boutique": [
    { label: "Nouveautés", href: "/nouveautes" },
    { label: "Offres Flash", href: "/promotions" },
    { label: "Reconditionnés", href: "/reconditionnes" },
    { label: "Import Groupé", href: "/grossiste" },
    { label: "Tout le catalogue", href: "/catalog" },
  ],
  "Aide & Support": [
    { label: "FAQ", href: "/faq" },
    { label: "Contactez-nous", href: "/contact" },
    { label: "Service Sourcing", href: "/sourcing" },
    { label: "Suivi de commande", href: "/account/orders" },
  ],
  "Légal": [
    { label: "CGV", href: "/cgv" },
    { label: "Confidentialité", href: "/politique-confidentialite" },
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Sitemap", href: "#" },
  ],
};

export const FooterPart = () => {
  return (
    <footer className="bg-[#060710] text-white/55 pt-18 pb-8">
      <div className="max-w-[1340px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-[2.4fr_repeat(4,1fr)] gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-[#FF8533] flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-[0_4px_16px_rgba(255,98,0,0.3)]">
                K
              </div>
              <span className="font-heading font-extrabold text-[22px] text-white leading-none tracking-tight">KENZ</span>
            </div>
            <p className="text-sm leading-relaxed mb-7 max-w-[270px]">
              L'import direct de Chine vers votre porte. Qualité certifiée, prix imbattables, service irréprochable depuis 2019.
            </p>
            {/* Socials */}
            <div className="flex gap-2.5 mb-7">
              {["📘", "📸", "🐦", "▶️", "💬"].map((icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg hover:bg-primary hover:text-white hover:-translate-y-1 transition-all border-none cursor-pointer"
                >
                  {icon}
                </button>
              ))}
            </div>
            {/* Payment Methods */}
            <div className="flex gap-2 flex-wrap">
              {["💳 CB", "🏦 Virement", "💵 Cash", "📱 Mobile"].map((method) => (
                <span
                  key={method}
                  className="text-[11px] font-semibold py-1.5 px-3 rounded-lg bg-white/5 border border-white/10"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-[13px] tracking-wider uppercase mb-5">{title}</h4>
              <ul className="flex flex-col gap-2.5 p-0 list-none">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-white/45 no-underline hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-7 md:p-9 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <h3 className="font-heading font-bold text-lg text-white mb-1">📬 Restez informé des meilleures offres</h3>
            <p className="text-[13px] text-white/50">Alertes flash, nouveautés et promotions exclusives dans votre boîte mail</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto min-w-0 md:min-w-[320px]">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-[13px] outline-none focus:border-primary/50 transition-colors"
            />
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl text-[13px] whitespace-nowrap transition-all">
              S'abonner
            </button>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/5 pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-[13px]">© 2025 KENZ Import SARL. Tous droits réservés. 🇲🇦 Fait avec ❤️ au Maroc</p>
          <div className="flex gap-6 flex-wrap justify-center">
            {["🔒 SSL Sécurisé", "💳 Paiement Sécurisé", "🏆 Certifié ICE Maroc", "📦 Colissimo Partenaire"].map((label) => (
              <span key={label} className="text-[11px] text-white/30 font-medium">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
