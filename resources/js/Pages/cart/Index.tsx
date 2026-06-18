import MainLayout from "@/Layouts/main-layout";
import { Link, router } from "@inertiajs/react";
import { CheckoutCartItem, CheckoutTotals } from "@/types/ecommerce.types";

interface CartIndexProps {
  cartItems: CheckoutCartItem[];
  totals: CheckoutTotals;
}

export default function CartIndex({ cartItems, totals }: CartIndexProps) {
  const updateQty = (productId: number, quantity: number) => {
    if (quantity <= 0) {
        removeItem(productId);
        return;
    }
    router.patch(`/cart/items/${productId}`, { quantity }, { preserveScroll: true });
  };

  const removeItem = (productId: number) => {
    router.delete(`/cart/items/${productId}`, { preserveScroll: true });
  };

  return (
    <MainLayout title="Mon Panier">
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-[1240px] mx-auto px-7">
          <h1 className="font-heading font-extrabold text-4xl text-foreground mb-10">Mon Panier</h1>

          {cartItems && cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6 border-b border-border last:border-0 last:pb-0 first:pt-0">
                      <div className="w-24 h-24 shrink-0 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden border border-border">
                        {item.image.includes('unsplash') ? '📦' : <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.slug}`} className="text-lg font-bold text-foreground hover:text-primary transition-colors no-underline line-clamp-1">
                          {item.name}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-1 mb-4">Stock disponible • Expédition 24h</div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-secondary rounded-xl border border-border">
                            <button 
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-black/5 rounded-l-xl transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-bold text-sm select-none">{item.quantity}</span>
                            <button 
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-black/5 rounded-r-xl transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl cursor-pointer"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>

                      <div className="text-right sm:ml-auto">
                        <div className="font-heading font-extrabold text-2xl text-primary">
                          {item.totalPrice.toLocaleString("fr-MA")} {totals.currency}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">
                          {(item.unitPrice).toLocaleString("fr-MA")} {totals.currency} / unité
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="w-full lg:w-[380px] shrink-0">
                <div className="bg-white rounded-3xl p-8 border border-border shadow-sm sticky top-24">
                  <h3 className="font-heading font-bold text-xl mb-6 text-foreground">Résumé</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-bold text-foreground">{totals.subtotal.toLocaleString("fr-MA")} {totals.currency}</span>
                    </div>
                    {totals.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-600">Remise</span>
                        <span className="font-bold text-emerald-600">-{totals.discount.toLocaleString("fr-MA")} {totals.currency}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frais de livraison</span>
                      <span className="font-bold text-emerald-600 uppercase text-[10px] tracking-widest mt-1">Gratuit</span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border mb-8">
                    <div className="flex justify-between items-end">
                      <span className="font-heading font-bold text-lg text-foreground">Total</span>
                      <div className="text-right">
                        <div className="font-heading font-extrabold text-3xl text-foreground">
                          {totals.total.toLocaleString("fr-MA")} {totals.currency}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">TVA incluse</div>
                      </div>
                    </div>
                  </div>

                  <Link 
                    href="/checkout"
                    className="flex justify-center w-full bg-primary hover:bg-primary/90 text-white font-bold py-4.5 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 no-underline"
                  >
                    Passer à la caisse →
                  </Link>
                  
                  <div className="mt-6 flex items-center justify-center gap-3 text-muted-foreground opacity-80">
                    <span className="text-lg">🔒</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Paiement Sécurisé</span>
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border border-border shadow-sm max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                🛒
              </div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-3">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-8">Découvrez nos offres exceptionnelles et ajoutez des produits à votre panier.</p>
              <Link 
                href="/catalog"
                className="inline-flex justify-center bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 no-underline"
              >
                Explorer le catalogue
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
