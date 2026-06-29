import { useForm, Head } from "@inertiajs/react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { FormEvent } from "react";

export default function ContactPage() {
  const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
    name: "",
    email: "",
    subject: "wholesale",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post("/contact", {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="bg-background">
      <Head title="Contactez-nous | Chine to Maroc" />

      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">Contact</p>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Parlons de votre <br />prochain <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Projet</span>
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-10">
                Vous êtes grossiste, e-commerçant ou industriel au Maroc ? Notre équipe vous accompagne dans toutes les étapes d'importation depuis la Chine.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Téléphone & WhatsApp</h4>
                    <p className="text-gray-400 text-xs mt-0.5">+212 6 00 00 00 00</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Email de support</h4>
                    <p className="text-gray-400 text-xs mt-0.5">contact@chinetomaroc.ma</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Bureaux</h4>
                    <p className="text-gray-400 text-xs mt-0.5">Casablanca, Maroc · Guangzhou, Chine</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-3xl bg-secondary/50 border border-border/40 hidden lg:block">
              <p className="text-xs font-semibold text-foreground">Support client disponible 6j/7</p>
              <p className="text-gray-400 text-[11px] mt-1">Lundi au Samedi : 09:00 - 18:00</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-black/5 rounded-[32px] p-7 md:p-10 shadow-[0_24px_50px_rgba(0,0,0,0.03)] relative">
              {wasSuccessful && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-[32px] z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mb-6 text-emerald-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-foreground mb-3">Message Envoyé !</h3>
                  <p className="text-gray-500 text-sm max-w-[320px] leading-relaxed">
                    Votre message a été bien transmis à nos conseillers. Nous reviendrons vers vous dans un délai de 24h.
                  </p>
                  <button
                    onClick={() => reset()}
                    className="mt-8 px-6 py-2.5 rounded-full text-xs font-bold bg-primary text-white hover:bg-primary-hover transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Ex: Soufiyan Benallal"
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3.5 text-sm focus:bg-white focus:border-primary outline-none transition-all"
                  />
                  {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="Ex: contact@votreentreprise.ma"
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3.5 text-sm focus:bg-white focus:border-primary outline-none transition-all"
                  />
                  {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Sujet de votre message
                  </label>
                  <select
                    value={data.subject}
                    onChange={(e) => setData("subject", e.target.value as any)}
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3.5 text-sm focus:bg-white focus:border-primary outline-none transition-all"
                  >
                    <option value="wholesale">Achat en Gros / Wholesale</option>
                    <option value="product">Question sur un Produit</option>
                    <option value="order">Suivi de Commande</option>
                    <option value="other">Autre Demande</option>
                  </select>
                  {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Votre Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                    placeholder="Décrivez votre projet d'importation ou votre question..."
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-4.5 py-3.5 text-sm focus:bg-white focus:border-primary outline-none transition-all resize-none"
                  />
                  {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 rounded-2xl bg-primary text-white hover:bg-primary-hover font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4.5 h-4.5 animate-spin" /> Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Envoyer le Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
