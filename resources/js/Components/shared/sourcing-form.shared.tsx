import { useForm } from "@inertiajs/react";

export const SourcingFormShared = () => {
  const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
    product_name: "",
    category: "",
    quantity: "",
    budget: "",
    description: "",
    contact_phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/sourcing", {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="bg-white rounded-[32px] p-8 md:p-10 border border-black/5 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary to-accent" />
      
      <div className="mb-8">
        <h3 className="font-heading font-extrabold text-2xl text-foreground mb-2">Besoin d'un produit spécifique ?</h3>
        <p className="text-gray-500 text-sm">Nous sourçons n'importe quel produit directement des usines en Chine pour vous.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Nom du produit</label>
            <input 
              type="text" 
              value={data.product_name}
              onChange={e => setData('product_name', e.target.value)}
              placeholder="Ex: Machine à café industrielle"
              className="w-full px-5 py-3.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-sm text-foreground"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Catégorie</label>
            <select 
              value={data.category}
              onChange={e => setData('category', e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-sm appearance-none text-foreground"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="electronics">Électronique</option>
              <option value="machinery">Machines & Outils</option>
              <option value="furniture">Mobilier</option>
              <option value="textile">Textile & Mode</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Quantité estimée</label>
            <input 
              type="number" 
              value={data.quantity}
              onChange={e => setData('quantity', e.target.value)}
              placeholder="Ex: 50"
              className="w-full px-5 py-3.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-sm text-foreground"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Budget approx. (MAD)</label>
            <input 
              type="text" 
              value={data.budget}
              onChange={e => setData('budget', e.target.value)}
              placeholder="Ex: 10,000 - 15,000"
              className="w-full px-5 py-3.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-sm text-foreground"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Description & Spécifications</label>
          <textarea 
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            placeholder="Détaillez vos besoins techniques, couleurs, matériaux..."
            rows={4}
            className="w-full px-5 py-3.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-sm resize-none text-foreground"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Votre numéro WhatsApp</label>
          <div className="flex gap-2">
            <div className="bg-secondary px-4 py-3.5 rounded-xl text-sm font-bold text-gray-500 border-2 border-transparent">+212</div>
            <input 
              type="tel" 
              value={data.contact_phone}
              onChange={e => setData('contact_phone', e.target.value)}
              placeholder="6 00 00 00 00"
              className="flex-1 px-5 py-3.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all text-sm text-foreground"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={processing}
          className="w-full bg-foreground hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:-translate-y-1 disabled:opacity-50"
        >
          {processing ? 'Envoi en cours...' : 'Envoyer ma demande de sourcing →'}
        </button>

        <p className="text-[10px] text-center text-gray-400 mt-4">
          En envoyant ce formulaire, un de nos agents vous contactera sous 24h ouvrées.
        </p>
      </form>
    </div>
  );
};
