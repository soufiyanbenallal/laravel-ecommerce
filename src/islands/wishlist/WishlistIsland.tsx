import { useState, useEffect } from 'react';
import type { ShopifyProduct } from '@/types';
import { formatPrice } from '@/lib/utils';

interface WishlistIslandProps {}

interface WishlistItem {
  id: number;
  title: string;
  handle: string;
  image: string;
  price: string;
  compareAtPrice?: string;
  available: boolean;
  vendor?: string;
  addedAt: number;
}

const WISHLIST_KEY = 'kenz-wishlist';

function getWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveWishlist(items: WishlistItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export default function WishlistIsland(_props: WishlistIslandProps) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setWishlist(getWishlist());

    const handleToggle = (e: CustomEvent<{ product: ShopifyProduct }>) => {
      const { product } = e.detail;
      toggleWishlist(product);
    };

    const handleOpen = () => setIsOpen(true);

    document.addEventListener('wishlist:toggle', handleToggle as EventListener);
    document.addEventListener('wishlist:open', handleOpen);

    return () => {
      document.removeEventListener('wishlist:toggle', handleToggle as EventListener);
      document.removeEventListener('wishlist:open', handleOpen);
    };
  }, []);

  const toggleWishlist = (product: ShopifyProduct) => {
    const exists = wishlist.find((item) => item.id === product.id);
    let newWishlist: WishlistItem[];

    if (exists) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      const firstImage = product.featured_image || product.images[0];
      newWishlist = [
        ...wishlist,
        {
          id: product.id,
          title: product.title,
          handle: product.handle,
          image: firstImage?.src || '',
          price: product.variants[0]?.price || '0',
          compareAtPrice: product.variants[0]?.compare_at_price || undefined,
          available: product.variants[0]?.available ?? false,
          vendor: product.vendor,
          addedAt: Date.now(),
        },
      ];
    }

    setWishlist(newWishlist);
    saveWishlist(newWishlist);
  };

  const removeItem = (productId: number) => {
    const newWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(newWishlist);
    saveWishlist(newWishlist);
  };

  const clearWishlist = () => {
    setWishlist([]);
    saveWishlist([]);
  };

  const handleAddToCart = (item: WishlistItem) => {
    window.dispatchEvent(
      new CustomEvent('cart:add', { detail: { variantId: item.id } })
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)} />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="font-heading text-lg font-semibold">
            Wishlist
            {wishlist.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted">
                ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            {wishlist.length > 0 && (
              <button
                type="button"
                className="text-xs text-muted hover:text-foreground"
                onClick={clearWishlist}
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
              onClick={() => setIsOpen(false)}
              aria-label="Close wishlist"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="mb-4 h-16 w-16 text-muted" viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="mb-2 text-lg font-medium">Your wishlist is empty</p>
              <p className="mb-4 text-sm text-muted">Save items you love for later</p>
              <button
                type="button"
                className="bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                onClick={() => setIsOpen(false)}
              >
                Discover Now
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {wishlist.map((item) => (
                <li key={item.id} className="group flex gap-4">
                  <a
                    href={`/products/${item.handle}`}
                    className="h-24 w-24 flex-shrink-0 overflow-hidden bg-muted"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </a>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      {item.vendor && (
                        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">
                          {item.vendor}
                        </p>
                      )}
                      <h3 className="text-sm font-medium line-clamp-1">
                        <a href={`/products/${item.handle}`} className="hover:text-accent transition-colors">
                          {item.title}
                        </a>
                      </h3>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-medium">
                          {formatPrice(parseFloat(item.price) * 100)}
                        </span>
                        {item.compareAtPrice && (
                          <span className="text-xs text-muted line-through">
                            {formatPrice(parseFloat(item.compareAtPrice) * 100)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.available ? (
                        <button
                          type="button"
                          className="text-xs font-medium text-accent hover:underline"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <span className="text-xs text-muted">Sold Out</span>
                      )}
                      <button
                        type="button"
                        className="text-xs text-muted hover:text-red-600 transition-colors"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="border-t border-border px-4 py-4">
            <a
              href="/pages/wishlist"
              className="flex w-full items-center justify-center border border-border py-3 text-sm font-medium transition-colors hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              View Full Wishlist
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
