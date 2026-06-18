import MainLayout from "@/Layouts/main-layout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { CheckoutCartItem, CheckoutTotals, PaymentMethodItem } from "@/types/ecommerce.types";

type CheckoutPropsType = {
  cartItems: CheckoutCartItem[];
  paymentMethods: PaymentMethodItem[];
  totals: CheckoutTotals;
};

export default function CheckoutIndex({ cartItems, paymentMethods, totals }: CheckoutPropsType) {
  const [step, setStep] = useState(1);
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country_name: "Maroc",
    special_notes: "",
    payment_method_slug: paymentMethods[0]?.slug || "cash",
    promo_code: "",
    terms_accepted: false,
  });

  const subtotal = totals.subtotal;
  const discount = data.promo_code.toUpperCase() === "KENZ10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
      return;
    }
    post("/checkout");
  };

  const InputField = ({ label, name, type = "text", placeholder, required = true }: any) => (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input 
        type={type}
        value={(data as any)[name]}
        onChange={e => setData(name as any, e.target.value)}
        placeholder={placeholder}
        className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-black/5 focus:border-primary outline-none transition-all text-sm text-foreground"
        required={required}
      />
      {errors[name as keyof typeof errors] && (
        <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 uppercase">{errors[name as keyof typeof errors]}</p>
      )}
    </div>
  );

  return (
    <MainLayout title="Finaliser ma commande">
      <div className="min-h-screen bg-background pt-8 pb-20">
        <div className="max-w-[1240px] mx-auto px-7">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Side: Checkout Form */}
            <div className="flex-1 w-full">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>1</div>
                  <div className="h-px flex-1 bg-black/5" />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>2</div>
                </div>
                <h1 className="font-heading font-extrabold text-3xl text-foreground">
                  {step === 1 ? "Informations de Livraison" : "Paiement & Confirmation"}
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {step === 1 ? (
                  <div className="bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Prénom" name="first_name" placeholder="Ex: Ahmed" />
                      <InputField label="Nom" name="last_name" placeholder="Ex: Bennani" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Email" name="email" type="email" placeholder="votre@email.com" />
                      <InputField label="Téléphone" name="phone" type="tel" placeholder="06 00 00 00 00" />
                    </div>

                    <InputField label="Adresse complète" name="street_address" placeholder="N°, Rue, Quartier..." />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Ville" name="city" placeholder="Casablanca" />
                      <InputField label="Code Postal" name="postal_code" placeholder="20000" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Notes spéciales (Optionnel)</label>
                      <textarea 
                        value={data.special_notes}
                        onChange={e => setData('special_notes', e.target.value)}
                        placeholder="Instructions pour la livraison..."
                        rows={3}
                        className="w-full px-5 py-4 rounded-2xl bg-white border-2 border-black/5 focus:border-primary outline-none transition-all text-sm text-foreground resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-foreground hover:bg-black text-white font-bold py-5 rounded-2xl transition-all shadow-lg hover:-translate-y-1"
                    >
                      Continuer vers le paiement →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-sm">
                      <h3 className="font-heading font-bold text-xl mb-8">Méthode de Paiement</h3>
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <label 
                            key={method.id} 
                            className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${data.payment_method_slug === method.slug ? 'border-primary bg-primary/5' : 'border-black/5 hover:border-gray-200'}`}
                          >
                            <input 
                              type="radio" 
                              name="payment_method"
                              checked={data.payment_method_slug === method.slug}
                              onChange={() => setData('payment_method_slug', method.slug)}
                              className="w-5 h-5 accent-primary"
                            />
                            <div className="flex-1">
                              <div className="font-bold text-foreground">{method.title}</div>
                              <div className="text-xs text-gray-500">{method.description}</div>
                            </div>
                            <div className="text-2xl">
                              {method.slug === 'cash' ? '💵' : method.slug === 'bank-transfer' ? '🏦' : '💳'}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-[40px] p-8 md:p-12 border border-black/5 shadow-sm">
                      <div className="flex items-start gap-4 mb-8">
                        <input 
                          type="checkbox"
                          id="terms"
                          checked={data.terms_accepted}
                          onChange={e => setData('terms_accepted', e.target.checked)}
                          className="mt-1.5 w-5 h-5 accent-primary"
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                          J'accepte les <Link href="/cgv" className="text-primary font-bold underline">Conditions Générales de Vente</Link> et je confirme que ma commande est ferme et définitive.
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-5 rounded-2xl transition-all"
                        >
                          Retour
                        </button>
                        <button 
                          type="submit"
                          disabled={processing || !data.terms_accepted}
                          className="flex-[2] bg-primary hover:bg-primary/90 text-white font-heading font-extrabold text-lg py-5 rounded-2xl transition-all shadow-[0_12px_24px_rgba(255,98,0,0.25)] hover:-translate-y-1 disabled:opacity-50"
                        >
                          {processing ? 'Traitement...' : 'Confirmer ma Commande'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Right Side: Order Summary */}
            <aside className="w-full lg:w-96 sticky top-24">
              <div className="bg-white rounded-[40px] p-8 border border-black/5 shadow-sm">
                <h3 className="font-heading font-bold text-xl mb-8">Résumé de Commande</h3>
                
                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 border border-black/5 flex items-center justify-center text-2xl shrink-0">
                        {item.image.includes('unsplash') ? '📦' : <img src={item.image} alt="" className="w-full h-full object-cover rounded-xl" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-foreground truncate">{item.name}</div>
                        <div className="text-xs text-gray-400">Qté: {item.quantity}</div>
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {(item.unitPrice * item.quantity).toLocaleString("fr-MA")} MAD
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-6 border-t border-black/5 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sous-total</span>
                    <span className="font-bold text-foreground">{subtotal.toLocaleString("fr-MA")} MAD</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Remise (KENZ10)</span>
                      <span className="font-bold">-{discount.toLocaleString("fr-MA")} MAD</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Frais de livraison</span>
                    <span className="font-bold text-emerald-600 uppercase text-[10px] tracking-widest mt-1">Gratuit</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="font-heading font-bold text-lg">Total</span>
                  <div className="text-right">
                    <div className="font-heading font-extrabold text-3xl text-primary">
                      {total.toLocaleString("fr-MA")} MAD
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">TVA incluse · Import direct</div>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Code promo"
                    value={data.promo_code}
                    onChange={e => setData('promo_code', e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-background border-none text-[13px] outline-none focus:ring-1 focus:ring-ring"
                  />
                  <button className="px-4 py-2.5 bg-foreground text-white rounded-xl text-[11px] font-bold uppercase tracking-wider">Appliquer</button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 flex items-center justify-center gap-3 text-gray-400 opacity-60">
                <span className="text-xl">🔒</span>
                <span className="text-[11px] font-bold uppercase tracking-widest">Paiement 100% Sécurisé</span>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}
