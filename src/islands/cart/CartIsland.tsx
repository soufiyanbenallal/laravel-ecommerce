import { useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import type { CartItem } from '@/types';

interface CartIslandProps {
  upsellProducts?: Array<{
    id: number;
    title: string;
    price: string;
    image: string;
    handle: string;
  }>;
}

export default function CartIsland({ upsellProducts = [] }: CartIslandProps) {
  const {
    isOpen,
    closeCart,
    cart,
    isLoading,
    fetchCart,
    updateItem,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const handleAddToCart = (e: CustomEvent<{ variantId: number; quantity?: number }>) => {
      const { variantId, quantity = 1 } = e.detail;
      useCartStore.getState().addItem(variantId, quantity);
    };

    document.addEventListener('cart:add', handleAddToCart as EventListener);
    return () => document.removeEventListener('cart:add', handleAddToCart as EventListener);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="font-heading text-lg font-semibold">
            Cart ({cart?.item_count || 0})
          </h2>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            </div>
          ) : !cart?.items.length ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="mb-4 h-16 w-16 text-muted" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="mb-2 text-lg font-medium">Your cart is empty</p>
              <p className="mb-4 text-sm text-muted">Add items to get started</p>
              <button
                type="button"
                className="bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                onClick={closeCart}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Free Shipping Threshold */}
              {cart.total_price < 15000 && (
                <div className="mb-4 rounded-lg bg-muted p-3">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Add {formatPrice(15000 - cart.total_price)} more for free shipping</span>
                    <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${Math.min((cart.total_price / 15000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {cart.total_price >= 15000 && (
                <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    You've unlocked free shipping!
                  </span>
                </div>
              )}

              {/* Cart Items List */}
              <ul className="flex flex-col gap-4">
                {cart.items.map((item: CartItem) => (
                  <li key={item.key} className="flex gap-4">
                    <a
                      href={`/products/${item.product_handle}`}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden bg-muted"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.product_title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      )}
                    </a>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-medium line-clamp-1">
                          <a href={`/products/${item.product_handle}`} className="hover:text-accent transition-colors">
                            {item.product_title}
                          </a>
                        </h3>
                        {item.variant_title && (
                          <p className="text-xs text-muted">{item.variant_title}</p>
                        )}
                        {item.sku && (
                          <p className="text-xs text-muted">SKU: {item.sku}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded border border-border transition-colors hover:bg-muted disabled:opacity-50"
                            onClick={() => updateItem(item.key, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isLoading}
                          >
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {isLoading ? '-' : item.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded border border-border transition-colors hover:bg-muted disabled:opacity-50"
                            onClick={() => updateItem(item.key, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
                              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.line_price)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Upsell */}
              {upsellProducts.length > 0 && (
                <div className="mt-6 border-t border-border pt-6">
                  <h3 className="mb-3 text-sm font-medium">You might also like</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {upsellProducts.slice(0, 3).map((product) => (
                      <a
                        key={product.id}
                        href={`/products/${product.handle}`}
                        className="flex-shrink-0"
                      >
                        <div className="h-20 w-20 overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="mt-1 w-20 text-xs line-clamp-2">{product.title}</p>
                        <p className="text-xs font-medium">{product.price}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {cart?.items.length ? (
          <div className="border-t border-border px-4 py-4">
            {/* Notes */}
            <div className="mb-4">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between text-sm text-muted hover:text-foreground">
                  <span>Add order note</span>
                  <svg className="h-4 w-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </summary>
                <textarea
                  className="mt-3 w-full resize-none border border-border p-3 text-sm focus:border-accent focus:outline-none"
                  rows={2}
                  placeholder="Special instructions for your order..."
                />
              </details>
            </div>

            {/* Totals */}
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">{formatPrice(cart.total_price)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Taxes</span>
                <span className="text-muted">Calculated at checkout</span>
              </div>
              {cart.total_discount > 0 && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(cart.total_discount)}</span>
                </div>
              )}
            </div>

            {/* Checkout */}
            <a
              href="/checkout"
              className="flex w-full items-center justify-center bg-foreground py-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Checkout - {formatPrice(cart.total_price)}
            </a>

            {/* Continue Shopping */}
            <button
              type="button"
              className="mt-2 w-full py-3 text-center text-sm font-medium text-muted transition-colors hover:text-foreground"
              onClick={closeCart}
            >
              Continue Shopping
            </button>

            {/* Trust Badges */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Secure
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5 7 1 12 1C17 1 21 5 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Encrypted
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
