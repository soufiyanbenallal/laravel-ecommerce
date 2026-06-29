import { useState, useEffect } from 'react';
import type { ShopifyProduct } from '@/types';

interface ProductIslandProps {
  product?: ShopifyProduct;
  variants?: Array<{ id: number; title: string; available: boolean; price: string }>;
  options?: Array<{ name: string; values: string[]; position?: number }>;
}

export default function ProductIsland({
  product,
  variants = [],
  options = [],
}: ProductIslandProps) {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (variants.length > 0) {
      const available = variants.find((v) => v.available);
      if (available) setSelectedVariant(available.id);
    }
  }, [variants]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const matchingVariant = variants.find((variant) => {
      return options.every((option) => {
        const optionIndex = (option.position || 1) - 1;
        const variantOption = variant.title.split(' / ')[optionIndex];
        return variantOption === newOptions[option.name];
      });
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant.id);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    window.dispatchEvent(
      new CustomEvent('cart:add', { detail: { variantId: selectedVariant, quantity } })
    );
  };

  if (!product) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            {product.images[currentImageIndex] && (
              <img
                src={product.images[currentImageIndex].src}
                alt={product.images[currentImageIndex].alt || product.title}
                className="h-full w-full object-cover"
                width={product.images[currentImageIndex].width}
                height={product.images[currentImageIndex].height}
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index
                      ? 'border-foreground'
                      : 'border-transparent hover:border-muted'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt || product.title}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {product.vendor && (
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
              {product.vendor}
            </p>
          )}
          <h1 className="mb-4 font-heading text-3xl font-semibold lg:text-4xl">
            {product.title}
          </h1>

          {/* Price */}
          <div className="mb-6 flex items-baseline gap-3">
            {product.variants[0] && (
              <>
                <span className="text-2xl font-semibold">${product.variants[0].price}</span>
                {product.variants[0].compare_at_price && (
                  <span className="text-lg text-muted line-through">
                    ${product.variants[0].compare_at_price}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Options */}
          {options.map((option) => (
            <div key={option.name} className="mb-6">
              <label className="mb-3 block text-sm font-medium">
                {option.name}: {selectedOptions[option.name] || option.values[0]}
              </label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const matchingVariant = variants.find((variant) => {
                    return variant.title.includes(value);
                  });
                  const isAvailable = matchingVariant?.available ?? true;

                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={!isAvailable}
                      className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                        selectedOptions[option.name] === value
                          ? 'border-foreground bg-foreground text-background'
                          : isAvailable
                            ? 'border-border hover:border-foreground'
                            : 'cursor-not-allowed border-border text-muted line-through'
                      }`}
                      onClick={() => handleOptionChange(option.name, value)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium">Quantity</label>
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
            disabled={!selectedVariant}
            className="w-full bg-foreground py-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleAddToCart}
          >
            {selectedVariant ? 'Add to Cart' : 'Select Options'}
          </button>

          {/* Description */}
          {product.description && (
            <div className="mt-8 border-t border-border pt-8">
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
                Description
              </h3>
              <div
                className="prose prose-sm max-w-none text-muted"
                dangerouslySetInnerHTML={{ __html: product.description_html }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
