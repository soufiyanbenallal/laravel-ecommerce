import { forwardRef, type HTMLAttributes } from 'react';
import { cn, formatPrice } from '@/lib/utils';
import type { ShopifyProduct } from '@/types';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: ShopifyProduct;
  variant?: 'grid' | 'list' | 'minimal';
  showQuickAdd?: boolean;
  showVendor?: boolean;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, product, variant = 'grid', showQuickAdd = true, showVendor = false, ...props }, ref) => {
    const firstImage = product.featured_image || product.images[0];
    const secondImage = product.images[1];
    const price = product.variants[0]?.price;
    const compareAtPrice = product.variants[0]?.compare_at_price;

    return (
      <div
        ref={ref}
        className={cn(
          'group relative flex flex-col w-full',
          {
            'flex-row gap-6': variant === 'list',
          },
          className
        )}
        {...props}
      >
        {/* Image Container */}
        <div
          className={cn(
            'relative overflow-hidden bg-muted',
            {
              'aspect-[3/4]': variant === 'grid' || variant === 'minimal',
              'w-1/3 aspect-[3/4] shrink-0': variant === 'list',
            }
          )}
        >
          {firstImage && (
            <>
              <img
                src={firstImage.src}
                alt={firstImage.alt || product.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={firstImage.width}
                height={firstImage.height}
              />
              {secondImage && (
                <img
                  src={secondImage.src}
                  alt={secondImage.alt || product.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  loading="lazy"
                  width={secondImage.width}
                  height={secondImage.height}
                />
              )}
            </>
          )}

          {/* Quick Add Button */}
          {showQuickAdd && product.variants[0]?.available && (
            <button
              className="absolute inset-x-4 bottom-4 translate-y-2 bg-white/95 py-3 text-sm font-medium text-foreground opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer hover:bg-white"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent('cart:add', { detail: { variantId: product.variants[0].id } })
                );
              }}
            >
              Quick Add
            </button>
          )}

          {/* Sold Out Badge */}
          {!product.variants[0]?.available && (
            <div className="absolute left-4 top-4 bg-foreground px-3 py-1 text-xs font-medium text-background">
              Sold Out
            </div>
          )}

          {/* Sale Badge */}
          {compareAtPrice && price && parseFloat(compareAtPrice) > parseFloat(price) && (
            <div className="absolute right-4 top-4 bg-red-600 px-3 py-1 text-xs font-medium text-white">
              Sale
            </div>
          )}
        </div>

        {/* Product Info */}
        <div
          className={cn(
            'flex flex-col gap-1.5',
            {
              'pt-3': variant === 'grid' || variant === 'minimal',
              'flex-1 justify-center py-2': variant === 'list',
            }
          )}
        >
          {showVendor && (
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {product.vendor}
            </p>
          )}

          <h3 className="text-sm font-medium leading-tight text-foreground line-clamp-2">
            <a href={`/products/${product.handle}`} className="hover:text-accent transition-colors">
              {product.title}
            </a>
          </h3>

          <div className="flex items-center gap-2">
            {price && (
              <span className="text-sm font-medium text-foreground">
                {formatPrice(parseFloat(price) * 100)}
              </span>
            )}
            {compareAtPrice && price && parseFloat(compareAtPrice) > parseFloat(price) && (
              <span className="text-sm text-muted line-through">
                {formatPrice(parseFloat(compareAtPrice) * 100)}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export { ProductCard };
