import MainLayout from "@/Layouts/main-layout";
import { Link } from "@inertiajs/react";

type OrderSubmittedPropsType = {
  order: {
    number: string;
    total: number;
    currency: string;
    createdAt: string;
    paymentMethod: string;
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      streetAddress: string;
      city: string;
    };
    items: {
      name: string;
      quantity: number;
      totalPrice: number;
    }[];
  };
};

export default function OrderSubmitted({ order }: OrderSubmittedPropsType) {
  return (
    <MainLayout title={`Commande #${order.number} Confirmée`}>
      <div className="min-h-screen bg-background py-20">
        <div className="max-w-[800px] mx-auto px-7">
          <div className="bg-white rounded-[40px] p-10 md:p-16 border border-black/5 shadow-sm text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 border-4 border-white shadow-sm">
              ✅
            </div>
            
            <h1 className="font-heading font-extrabold text-4xl text-foreground mb-4">Merci pour votre commande !</h1>
            <p className="text-gray-500 mb-10 max-w-md mx-auto">
              Votre commande <span className="font-bold text-foreground">#{order.number}</span> a été enregistrée avec succès. Un email de confirmation a été envoyé à <span className="text-foreground font-medium">{order.customer.email}</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
              <div className="p-6 rounded-3xl bg-background border border-black/5">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Détails de Livraison</h4>
                <div className="text-sm font-bold text-foreground mb-1">{order.customer.firstName} {order.customer.lastName}</div>
                <div className="text-sm text-gray-500 leading-relaxed">
                  {order.customer.streetAddress}<br />
                  {order.customer.city}<br />
                  {order.customer.phone}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-background border border-black/5">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Résumé de Paiement</h4>
                <div className="text-sm font-bold text-foreground mb-1">{order.paymentMethod}</div>
                <div className="text-2xl font-heading font-extrabold text-primary mt-2">
                  {order.total.toLocaleString("fr-MA")} {order.currency}
                </div>
                <div className="text-[10px] text-gray-400 mt-1 uppercase">Paiement à la livraison</div>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <Link 
                href="/" 
                className="w-full inline-block bg-foreground hover:bg-black text-white font-bold py-4.5 rounded-2xl transition-all shadow-lg hover:-translate-y-1"
              >
                Retour à l'Accueil
              </Link>
              <Link 
                href="/account/orders" 
                className="w-full inline-block bg-white border-2 border-black/5 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all"
              >
                Suivre mes Commandes
              </Link>
            </div>

            <p className="text-[11px] text-gray-400">
              Besoin d'aide ? Contactez notre support WhatsApp au <span className="text-primary font-bold">+212 6 00 00 00 00</span>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
