import { useState, useEffect } from 'react';
import type { ShopifyProduct } from '@/types';
import { ProductGallery } from './ProductGallery';
import { VariantPicker } from './VariantPicker';

interface QuickViewProps {
  product: ShopifyProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      const initialOptions: Record<string, string> = {};
      product.options.forEach((option) => {
        initialOptions[option.name] = option.values[0];
      });
      setSelectedOptions(initialOptions);
      setQuantity(1);
    }
  }, [product]);

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

  if (!isOpen || !product) return null;

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const getSelectedVariant = () => {
    return product.variants.find((variant) => {
      return product.options.every((option) => {
        const selectedValue = selectedOptions[option.name];
        if (!selectedValue) return true;
        const variantValue = variant.title.split(' / ')[option.position - 1];
        return variantValue === selectedValue;
      });
    });
  };

  const selectedVariant = getSelectedVariant();

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    window.dispatchEvent(
      new CustomEvent('cart:add', { detail: { variantId: selectedVariant.id, quantity } })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-x-4 top-1/2 mx-auto max-w-4xl -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-2xl sm:inset-x-6 lg:inset-x-auto">
        {/* Close Button */}
        <button
          type="button"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-colors hover:bg-white"
          onClick={onClose}
          aria-label="Close quick view"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <ProductGallery
                images={product.images}
                aspectRatio="3/4"
                showThumbnails={product.images.length > 1}
                enableZoom={false}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Vendor */}
              {product.vendor && (
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
                  {product.vendor}
                </p>
              )}

              {/* Title */}
              <h2 className="mb-2 font-heading text-2xl font-semibold">
                {product.title}
              </h2>

              {/* Price */}
              <div className="mb-6 flex items-baseline gap-3">
                {selectedVariant ? (
                  <>
                    <span className="text-xl font-semibold">
                      ${selectedVariant.price}
                    </span>
                    {selectedVariant.compare_at_price && (
                      <span className="text-muted line-through">
                        ${selectedVariant.compare_at_price}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-xl font-semibold">
                    ${product.variants[0]?.price}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <p className="line-clamp-3 text-sm text-muted">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Variant Picker */}
              <div className="mb-6">
                <VariantPicker
                  options={product.options}
                  variants={product.variants}
                  selectedOptions={selectedOptions}
                  onOptionChange={handleOptionChange}
                />
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Quantity</label>
                <div className="flex w-32 items-center rounded-md border border-border">
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-muted"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-muted"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                disabled={!selectedVariant?.available}
                className="w-full bg-foreground py-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleAddToCart}
              >
                {selectedVariant?.available ? 'Add to Cart' : 'Sold Out'}
              </button>

              {/* View Full Details */}
              <a
                href={`/products/${product.handle}`}
                className="mt-4 text-center text-sm font-medium text-accent hover:underline"
              >
                View Full Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
