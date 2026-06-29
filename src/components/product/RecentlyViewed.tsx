import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn, formatPrice } from '@/lib/utils';

const RECENTLY_VIEWED_KEY = 'kenz-recently-viewed';
const MAX_ITEMS = 10;

interface RecentProduct {
  id: number;
  title: string;
  handle: string;
  image: string;
  price: string;
  vendor?: string;
}

interface RecentlyViewedProps {
  title?: string;
}

function getRecentlyViewed(): RecentProduct[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addToRecentlyViewed(product: RecentProduct) {
  if (typeof window === 'undefined') return;
  const items = getRecentlyViewed();
  const filtered = items.filter((item) => item.id !== product.id);
  const newItems = [product, ...filtered].slice(0, MAX_ITEMS);
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(newItems));
}

export function trackProductView(product: {
  id: number;
  title: string;
  handle: string;
  image: string;
  price: string;
  vendor?: string;
}) {
  addToRecentlyViewed(product);
}

export function RecentlyViewed({ title = 'Recently Viewed' }: RecentlyViewedProps) {
  const [products, setProducts] = useState<RecentProduct[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    setProducts(getRecentlyViewed());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-heading text-2xl font-semibold lg:text-3xl">{title}</h2>
        <div className="flex gap-1">
          <button
            type="button"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors',
              canScrollPrev
                ? 'hover:border-foreground hover:bg-foreground hover:text-background'
                : 'cursor-not-allowed opacity-50'
            )}
            onClick={() => emblaApi?.scrollPrev()}
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
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[200px] sm:w-[240px]">
              <a href={`/products/${product.handle}`} className="group block">
                <div className="mb-2 aspect-[3/4] overflow-hidden bg-muted">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
                <h3 className="mb-1 text-sm font-medium line-clamp-1 group-hover:text-accent transition-colors">
                  {product.title}
                </h3>
                {product.vendor && (
                  <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted">
                    {product.vendor}
                  </p>
                )}
                <p className="text-sm font-medium">
                  {formatPrice(parseFloat(product.price) * 100)}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
