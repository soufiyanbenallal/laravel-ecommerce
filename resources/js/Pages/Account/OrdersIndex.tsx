import MainLayout from "@/Layouts/main-layout";
import { Link } from "@inertiajs/react";

type OrdersIndexPropsType = {
  orders: {
    number: string;
    status: string;
    total: number;
    currency: string;
    createdAt: string;
    url: string;
  }[];
};

export default function OrdersIndex({ orders }: OrdersIndexPropsType) {
  return (
    <MainLayout title="Mes Commandes">
      <div className="min-h-screen bg-background py-12 md:py-20">
        <div className="max-w-[1000px] mx-auto px-7">
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-heading font-extrabold text-3xl text-foreground">Mes Commandes</h1>
            <div className="text-sm font-medium text-gray-400">{orders.length} commandes au total</div>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.number} className="bg-white rounded-3xl p-6 md:p-8 border border-black/5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl border border-black/5">
                      📦
                    </div>
                    <div>
                      <div className="font-bold text-foreground">Commande #{order.number}</div>
                      <div className="text-xs text-gray-400">Passée le {new Date(order.createdAt).toLocaleDateString("fr-FR")}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 md:gap-12">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Statut</div>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                        order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 
                        order.status === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</div>
                      <div className="font-bold text-foreground">{order.total.toLocaleString("fr-MA")} {order.currency}</div>
                    </div>

                    <Link 
                      href={order.url}
                      className="px-6 py-2.5 bg-white border-2 border-black/5 rounded-xl text-[13px] font-bold text-gray-600 hover:border-primary/30 hover:text-primary transition-all"
                    >
                      Détails
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[40px] p-20 text-center border border-black/5 shadow-sm">
              <div className="text-7xl mb-6 opacity-20">🛒</div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">Vous n'avez pas encore de commande</h3>
              <p className="text-gray-400 max-w-sm mx-auto">Explorez notre catalogue et trouvez les meilleurs produits importés de Chine au Maroc.</p>
              <Link 
                href="/catalog" 
                className="mt-8 inline-block bg-primary text-white font-bold py-3.5 px-10 rounded-2xl text-sm transition-all hover:-translate-y-1"
              >
                Commencer mes achats →
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
