import { useState, useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn, formatPrice } from '@/lib/utils';
import type { ShopifyProduct } from '@/types';

interface ProductCarouselProps {
  products: ShopifyProduct[];
  title?: string;
  viewAllUrl?: string;
  columns?: number;
}

export function ProductCarousel({
  products,
  title,
  viewAllUrl,
}: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (products.length === 0) return null;

  return (
    <div className="relative">
      {/* Header */}
      {title && (
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-semibold lg:text-3xl">{title}</h2>
          <div className="flex items-center gap-2">
            {viewAllUrl && (
              <a
                href={viewAllUrl}
                className="hidden text-sm font-medium text-accent hover:underline sm:block"
              >
                View All
              </a>
            )}
            <div className="flex gap-1">
              <button
                type="button"
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors',
                  canScrollPrev
                    ? 'hover:border-foreground hover:bg-foreground hover:text-background'
                    : 'cursor-not-allowed opacity-50'
                )}
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                type="button"
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors',
                  canScrollNext
                    ? 'hover:border-foreground hover:bg-foreground hover:text-background'
                    : 'cursor-not-allowed opacity-50'
                )}
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div ref={scrollRef} className="flex gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[280px] sm:w-[320px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View All */}
      {viewAllUrl && (
        <div className="mt-6 text-center sm:hidden">
          <a
            href={viewAllUrl}
            className="inline-block border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            View All
          </a>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const [isHovered, setIsHovered] = useState(false);
  const firstImage = product.featured_image || product.images[0];
  const secondImage = product.images[1];
  const price = product.variants[0]?.price;
  const compareAtPrice = product.variants[0]?.compare_at_price;

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-muted">
        {firstImage && (
          <>
            <img
              src={firstImage.src}
              alt={firstImage.alt || product.title}
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
                isHovered && secondImage ? 'opacity-0' : 'opacity-100'
              )}
              loading="lazy"
            />
            {secondImage && (
              <img
                src={secondImage.src}
                alt={secondImage.alt || product.title}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
                  isHovered ? 'opacity-100' : 'opacity-0'
                )}
                loading="lazy"
              />
            )}
          </>
        )}

        {/* Quick Add */}
        {product.variants[0]?.available && (
          <button
            className={cn(
              'absolute inset-x-3 bottom-3 bg-white/95 py-2.5 text-xs font-medium text-foreground backdrop-blur-sm transition-all duration-300',
              isHovered
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            )}
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('cart:add', { detail: { variantId: product.variants[0].id } })
              );
            }}
          >
            Quick Add
          </button>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {!product.variants[0]?.available && (
            <span className="bg-foreground px-2 py-1 text-[10px] font-medium text-background">
              Sold Out
            </span>
          )}
          {compareAtPrice && price && parseFloat(compareAtPrice) > parseFloat(price) && (
            <span className="bg-red-600 px-2 py-1 text-[10px] font-medium text-white">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          className={cn(
            'absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(
              new CustomEvent('wishlist:toggle', { detail: { product } })
            );
          }}
          aria-label="Add to wishlist"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div>
        {product.vendor && (
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted">
            {product.vendor}
          </p>
        )}
        <h3 className="mb-1 text-sm font-medium line-clamp-1">
          <a href={`/products/${product.handle}`} className="hover:text-accent transition-colors">
            {product.title}
          </a>
        </h3>
        <div className="flex items-baseline gap-2">
          {price && (
            <span className="text-sm font-medium">
              {formatPrice(parseFloat(price) * 100)}
            </span>
          )}
          {compareAtPrice && price && parseFloat(compareAtPrice) > parseFloat(price) && (
            <span className="text-xs text-muted line-through">
              {formatPrice(parseFloat(compareAtPrice) * 100)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
