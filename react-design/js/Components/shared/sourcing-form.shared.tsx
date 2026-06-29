import { useForm } from "@inertiajs/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { FormEvent } from "react";

const CATEGORIES = [
  "Électronique & High-Tech",
  "Mode & Vêtements",
  "Maison & Décoration",
  "Pièces Auto & Accessoires",
  "Beauté & Cosmétiques",
  "Sport & Loisirs",
  "Autres"
];

export const SourcingFormShared = () => {
  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
    product_name: "",
    category: "Électronique & High-Tech",
    quantity: "",
    budget: "",
    description: "",
    contact_name: "",
    contact_phone: "",
    email: "",
    whatsapp_only: false,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/sourcing", {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="bg-white border border-black/5 rounded-[32px] p-7 md:p-10 shadow-[0_24px_50px_rgba(0,0,0,0.04)] relative">
      {wasSuccessful && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-[32px] z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mb-6 text-emerald-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-foreground mb-3">Demande Envoyée !</h3>
          <p className="text-gray-500 text-sm max-w-[320px] leading-relaxed">
            Notre équipe de sourcing à Yiwu et Guangzhou va analyser votre demande et vous recontacter sous 24h.
          </p>
          <button
            onClick={() => reset()}
            className="mt-8 px-6 py-2.5 rounded-full text-xs font-bold bg-primary text-white hover:bg-primary-hover transition-colors"
          >
            Faire une autre demande
          </button>
        </div>
      )}

      <h3 className="font-heading font-extrabold text-2xl text-foreground mb-1">
        Déposer une Demande de Sourcing
      </h3>
      <p className="text-gray-400 text-xs mb-8">
        Décrivez le produit recherché en Chine. Devis gratuit sous 24 heures.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
              Nom du Produit
            </label>
            <input
              type="text"
              required
              value={data.product_name}
              onChange={(e) => setData("product_name", e.target.value)}
              placeholder="Ex: Écran OLED flexible, Coques..."
              className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3 text-sm focus:bg-white focus:border-primary outline-none transition-all font-sans"
            />
            {errors.product_name && <div className="text-red-500 text-xs mt-1">{errors.product_name}</div>}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
              Catégorie de produit
            </label>
            <select
              value={data.category}
              onChange={(e) => setData("category", e.target.value)}
              className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3 text-sm focus:bg-white focus:border-primary outline-none transition-all font-sans"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
              Quantité Cible
            </label>
            <input
              type="text"
              required
              value={data.quantity}
              onChange={(e) => setData("quantity", e.target.value)}
              placeholder="Ex: 500 pièces, 1 conteneur"
              className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3 text-sm focus:bg-white focus:border-primary outline-none transition-all font-sans"
            />
            {errors.quantity && <div className="text-red-500 text-xs mt-1">{errors.quantity}</div>}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
              Budget / Prix Cible ($)
            </label>
            <input
              type="text"
              value={data.budget}
              onChange={(e) => setData("budget", e.target.value)}
              placeholder="Ex: 2.5$ par unité"
              className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3 text-sm focus:bg-white focus:border-primary outline-none transition-all font-sans"
            />
            {errors.budget && <div className="text-red-500 text-xs mt-1">{errors.budget}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
              Nom Complet
            </label>
            <input
              type="text"
              required
              value={data.contact_name}
              onChange={(e) => setData("contact_name", e.target.value)}
              placeholder="Votre nom ou société"
              className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3 text-sm focus:bg-white focus:border-primary outline-none transition-all font-sans"
            />
            {errors.contact_name && <div className="text-red-500 text-xs mt-1">{errors.contact_name}</div>}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
              Email Professionnel
            </label>
            <input
              type="email"
              required
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              placeholder="Ex: contact@votreentreprise.ma"
              className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3 text-sm focus:bg-white focus:border-primary outline-none transition-all font-sans"
            />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
            Description & Spécifications
          </label>
          <textarea
            required
            rows={3}
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            placeholder="Matériaux, dimensions, packaging, normes de qualité recherchées..."
            className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3.5 text-sm focus:bg-white focus:border-primary outline-none transition-all resize-none font-sans"
          />
          {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
            Numéro Téléphone / WhatsApp
          </label>
          <input
            type="tel"
            required
            value={data.contact_phone}
            onChange={(e) => setData("contact_phone", e.target.value)}
            placeholder="Ex: 06 12 34 56 78"
            className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3 text-sm focus:bg-white focus:border-primary outline-none transition-all font-sans"
          />
          {errors.contact_phone && <div className="text-red-500 text-xs mt-1">{errors.contact_phone}</div>}
        </div>

        <div className="flex items-center gap-2.5 pt-1">
          <input
            type="checkbox"
            id="whatsapp_only"
            checked={data.whatsapp_only}
            onChange={(e) => setData("whatsapp_only", e.target.checked)}
            className="w-4 h-4 accent-primary rounded-sm border-gray-300"
          />
          <label htmlFor="whatsapp_only" className="text-xs text-gray-400 font-medium cursor-pointer">
            Je préfère être contacté uniquement par WhatsApp
          </label>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full py-4.5 rounded-2xl bg-primary text-white hover:bg-primary-hover font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 disabled:opacity-75 disabled:cursor-not-allowed mt-2"
        >
          {processing ? (
            <>
              <Loader2 className="w-4.5 h-4.5 animate-spin" /> Traitement en cours...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Envoyer ma Demande de Sourcing
            </>
          )}
        </button>
      </form>
    </div>
  );
};
