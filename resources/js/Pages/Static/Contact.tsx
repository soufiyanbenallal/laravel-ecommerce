import MainLayout from "@/Layouts/main-layout";
import { useForm } from "@inertiajs/react";

export default function Contact() {
  const { data, setData, post, processing, wasSuccessful, reset } = useForm({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/contact", {
      onSuccess: () => reset(),
    });
  };

  return (
    <MainLayout title="Contactez-nous">
      <div className="bg-background min-h-screen py-16">
        <div className="max-w-[1240px] mx-auto px-7">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="font-heading font-extrabold text-4xl text-foreground mb-4">Contactez KENZ Import</h1>
            <p className="text-muted-foreground text-lg">Une question sur un produit, une commande ou nos services de grossiste ? Notre équipe est là pour vous répondre.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📱</div>
                <h3 className="font-bold text-foreground mb-2">WhatsApp / Téléphone</h3>
                <p className="text-muted-foreground text-sm">+212 6 00 00 00 00<br/>Lun-Ven, 9h-18h</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✉️</div>
                <h3 className="font-bold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground text-sm">support@kenz-import.ma<br/>Réponse sous 24h</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📍</div>
                <h3 className="font-bold text-foreground mb-2">Bureaux</h3>
                <p className="text-muted-foreground text-sm">Quartier Industriel, Casablanca<br/>Sur rendez-vous uniquement</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-border shadow-sm">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Envoyez-nous un message</h2>
                {wasSuccessful ? (
                  <div className="bg-emerald-50 text-emerald-700 p-6 rounded-2xl text-center">
                    <div className="text-4xl mb-4">✅</div>
                    <h4 className="font-bold text-lg mb-2">Message envoyé avec succès !</h4>
                    <p className="text-sm opacity-90">Notre équipe vous contactera dans les plus brefs délais.</p>
                    <button onClick={() => reset()} className="mt-6 font-bold text-emerald-800 underline">Envoyer un autre message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Nom complet *</label>
                        <input 
                          required type="text" 
                          value={data.name}
                          onChange={e => setData('name', e.target.value)}
                          className="w-full px-5 py-3.5 bg-secondary border border-transparent focus:border-primary rounded-xl outline-none transition-colors" 
                          placeholder="Ex: Ahmed Bennani" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Email *</label>
                        <input 
                          required type="email" 
                          value={data.email}
                          onChange={e => setData('email', e.target.value)}
                          className="w-full px-5 py-3.5 bg-secondary border border-transparent focus:border-primary rounded-xl outline-none transition-colors" 
                          placeholder="votre@email.com" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Sujet *</label>
                      <select 
                        required 
                        value={data.subject}
                        onChange={e => setData('subject', e.target.value)}
                        className="w-full px-5 py-3.5 bg-secondary border border-transparent focus:border-primary rounded-xl outline-none transition-colors appearance-none"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="order">Suivi de commande</option>
                        <option value="product">Information produit</option>
                        <option value="wholesale">Devenir grossiste</option>
                        <option value="other">Autre demande</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Message *</label>
                      <textarea 
                        required rows={5} 
                        value={data.message}
                        onChange={e => setData('message', e.target.value)}
                        className="w-full px-5 py-4 bg-secondary border border-transparent focus:border-primary rounded-xl outline-none transition-colors resize-none" 
                        placeholder="Comment pouvons-nous vous aider ?"
                      ></textarea>
                    </div>
                    <button type="submit" disabled={processing} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-50">
                      {processing ? "Envoi..." : "Envoyer le message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
