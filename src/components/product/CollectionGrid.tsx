import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { ShopifyProduct } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

export interface Filter {
  id: string;
  label: string;
  type: 'text' | 'price' | 'boolean' | 'list';
  options?: Array<{ value: string; label: string; count?: number }>;
  min?: number;
  max?: number;
}

export interface SortOption {
  value: string;
  label: string;
}

interface CollectionGridProps {
  products: ShopifyProduct[];
  filters?: Filter[];
  sortOptions?: SortOption[];
  columns?: 2 | 3 | 4;
  showFilters?: boolean;
  showSort?: boolean;
}

export function CollectionGrid({
  products,
  filters = [],
  sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'bestselling', label: 'Bestselling' },
  ],
  columns = 3,
  showFilters = true,
  showSort = true,
}: CollectionGridProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply filters
    Object.entries(activeFilters).forEach(([filterId, values]) => {
      if (values.length === 0) return;
      result = result.filter((product) => {
        const productValue = product.options?.find(
          (opt) => opt.name.toLowerCase() === filterId.toLowerCase()
        );
        if (!productValue) return false;
        return values.some((v) => productValue.values.includes(v));
      });
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = parseFloat(a.variants[0]?.price || '0');
          const priceB = parseFloat(b.variants[0]?.price || '0');
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = parseFloat(a.variants[0]?.price || '0');
          const priceB = parseFloat(b.variants[0]?.price || '0');
          return priceB - priceA;
        });
        break;
      case 'newest':
        result.sort((a, b) => {
          const dateA = new Date(a.published_at || a.created_at).getTime();
          const dateB = new Date(b.published_at || b.created_at).getTime();
          return dateB - dateA;
        });
        break;
      case 'bestselling':
        // Keep original order for bestselling
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [products, activeFilters, sortBy]);

  const toggleFilter = (filterId: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterId]: newValues };
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  const hasActiveFilters = Object.values(activeFilters).some((v) => v.length > 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showFilters && filters.length > 0 && (
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium lg:hidden"
              onClick={() => setIsFilterOpen(true)}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Filters
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-white">
                  {Object.values(activeFilters).flat().length}
                </span>
              )}
            </button>
          )}
          <p className="text-sm text-muted">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {showSort && (
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border-b border-transparent bg-transparent pr-6 text-sm font-medium transition-colors hover:border-foreground focus:border-foreground focus:outline-none cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        {showFilters && filters.length > 0 && (
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Filters</h3>
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="text-xs text-muted hover:text-foreground"
                    onClick={clearFilters}
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-6">
                {filters.map((filter) => (
                  <div key={filter.id}>
                    <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                      {filter.label}
                    </h4>
                    {filter.type === 'list' && filter.options && (
                      <ul className="flex flex-col gap-2">
                        {filter.options.map((option) => (
                          <li key={option.value}>
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={(activeFilters[filter.id] || []).includes(option.value)}
                                onChange={() => toggleFilter(filter.id, option.value)}
                                className="h-4 w-4 rounded border-border accent-accent"
                              />
                              <span>{option.label}</span>
                              {option.count !== undefined && (
                                <span className="ml-auto text-xs text-muted">({option.count})</span>
                              )}
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Product Grid */}
        <div
          className={cn('grid flex-1 gap-6', {
            'grid-cols-2': columns === 2,
            'grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-2 lg:grid-cols-4': columns === 4,
          })}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showVendor={false}
              showQuickAdd={true}
            />
          ))}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <h2 className="font-medium">Filters</h2>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center"
                onClick={() => setIsFilterOpen(false)}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="flex flex-col gap-6">
                {filters.map((filter) => (
                  <div key={filter.id}>
                    <h4 className="mb-3 text-sm font-medium">{filter.label}</h4>
                    {filter.type === 'list' && filter.options && (
                      <ul className="flex flex-col gap-2">
                        {filter.options.map((option) => (
                          <li key={option.value}>
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={(activeFilters[filter.id] || []).includes(option.value)}
                                onChange={() => toggleFilter(filter.id, option.value)}
                                className="h-4 w-4 rounded border-border accent-accent"
                              />
                              <span>{option.label}</span>
                              {option.count !== undefined && (
                                <span className="ml-auto text-xs text-muted">({option.count})</span>
                              )}
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border p-4">
              <div className="flex gap-3">
                {hasActiveFilters && (
                  <button
                    type="button"
                    className="flex-1 border border-border py-3 text-sm font-medium"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  className="flex-1 bg-foreground py-3 text-sm font-medium text-background"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="py-16 text-center">
          <p className="mb-2 text-lg font-medium">No products found</p>
          <p className="mb-6 text-muted">Try adjusting your filters</p>
          <button
            type="button"
            className="text-sm font-medium text-accent hover:underline"
            onClick={clearFilters}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
