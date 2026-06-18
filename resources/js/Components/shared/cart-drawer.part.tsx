import { useCartStore } from "@/stores/cart.store";
import { router } from "@inertiajs/react";

export const CartDrawerPart = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();

  const handleCheckout = () => {
    router.post('/cart/sync', {
      items: items.map(i => ({ id: i.id, quantity: i.quantity }))
    }, {
      onSuccess: () => setIsOpen(false)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-fade-in-right">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-heading font-extrabold text-xl">Votre Panier <span className="text-gray-400 text-sm font-normal ml-2">({totalItems()} articles)</span></h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors border-none bg-transparent cursor-pointer text-xl" aria-label="Fermer le panier">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-10">
              <div className="text-6xl mb-4 opacity-20">🛒</div>
              <div className="font-bold text-gray-400">Votre panier est vide</div>
              <p className="text-sm text-gray-400 mt-2">Découvrez nos produits importés de Chine au meilleur prix.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-6 bg-primary text-white font-bold py-3 px-8 rounded-xl text-sm"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                  {item.image && !item.image.includes('unsplash') ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">{item.metadata?.emoji || "📦"}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-sm text-foreground line-clamp-1">{item.name}</div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">{item.metadata?.condition || "Neuf"}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-gray-50 border-none bg-transparent cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-50 border-none bg-transparent cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <div className="font-bold text-primary">{(item.price * item.quantity).toLocaleString("fr-MA")} MAD</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 font-medium">Sous-total</span>
              <span className="font-heading font-extrabold text-xl text-foreground">{subtotal().toLocaleString("fr-MA")} MAD</span>
            </div>
            <p className="text-[11px] text-gray-400 mb-6">Livraison gratuite et taxes incluses. Profitez de nos garanties import.</p>
            <div className="grid gap-3">
              <button 
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 border-none cursor-pointer"
              >
                Passer à la caisse →
              </button>
              <button onClick={() => setIsOpen(false)} className="w-full bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer">
                Continuer mes achats
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
