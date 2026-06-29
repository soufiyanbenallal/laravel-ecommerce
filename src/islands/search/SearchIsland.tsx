import { useState, useEffect, useCallback, useRef } from 'react';
import { SearchService } from '@/services/search';

interface SearchIslandProps {}

interface SearchResult {
  title: string;
  url: string;
  image?: string;
  price?: string;
  vendor?: string;
  available?: boolean;
}

interface SearchHistory {
  query: string;
  timestamp: number;
}

const SEARCH_HISTORY_KEY = 'kenz-search-history';
const MAX_HISTORY_ITEMS = 5;
const TRENDING_SEARCHES = ['New Arrivals', 'Dresses', 'Accessories', 'Sale'];

function getSearchHistory(): SearchHistory[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveSearchHistory(query: string) {
  if (typeof window === 'undefined') return;
  const history = getSearchHistory();
  const newHistory = [
    { query, timestamp: Date.now() },
    ...history.filter((item) => item.query !== query),
  ].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
}

function clearSearchHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SEARCH_HISTORY_KEY);
}

export default function SearchIsland(_props: SearchIslandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ products: SearchResult[] }>({ products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults({ products: [] });
      return;
    }

    setIsLoading(true);
    setShowHistory(false);
    try {
      const data = await SearchService.predictive(searchQuery);
      setResults(data.resources?.results || { products: [] });
    } catch {
      setResults({ products: [] });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      handleSearch(query);
    }, 300);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, handleSearch]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    document.addEventListener('search:open', handleOpen);
    document.addEventListener('search:close', handleClose);

    return () => {
      document.removeEventListener('search:open', handleOpen);
      document.removeEventListener('search:close', handleClose);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearchHistory(getSearchHistory());
      setShowHistory(true);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveSearchHistory(query.trim());
      window.location.href = `/search?q=${encodeURIComponent(query)}&type=product`;
    }
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    saveSearchHistory(historyQuery);
  };

  const handleTrendingClick = (trendingQuery: string) => {
    setQuery(trendingQuery);
    saveSearchHistory(trendingQuery);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    setResults({ products: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* Search Panel */}
      <div className="absolute inset-x-0 top-0 mx-auto max-w-2xl px-4 pt-4">
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
          {/* Search Input */}
          <form onSubmit={handleSubmit} className="flex items-center border-b border-border px-4">
            <svg className="h-5 w-5 text-muted" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, collections..."
              className="flex-1 bg-transparent py-4 pl-3 pr-4 text-lg outline-none placeholder:text-muted"
              aria-label="Search"
            />
            <div className="flex items-center gap-2">
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-xs text-muted sm:inline">
                ESC
              </kbd>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-xs text-muted hover:bg-muted"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </form>

          {/* Search Content */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="py-8 text-center">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              </div>
            )}

            {/* Search Results */}
            {!isLoading && results.products.length > 0 && (
              <div className="p-4">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                  Products ({results.products.length})
                </h3>
                <ul className="flex flex-col gap-1">
                  {results.products.map((product) => (
                    <li key={product.url}>
                      <a
                        href={product.url}
                        className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted"
                        onClick={() => {
                          if (query.trim()) saveSearchHistory(query.trim());
                        }}
                      >
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-14 w-14 object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.title}</p>
                          {product.vendor && (
                            <p className="text-xs text-muted">{product.vendor}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          {product.price && (
                            <p className="text-sm font-medium">{product.price}</p>
                          )}
                          {product.available === false && (
                            <span className="text-xs text-muted">Sold Out</span>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                {query.length >= 2 && (
                  <a
                    href={`/search?q=${encodeURIComponent(query)}&type=product`}
                    className="mt-4 block text-center text-sm font-medium text-accent hover:underline"
                    onClick={() => {
                      if (query.trim()) saveSearchHistory(query.trim());
                    }}
                  >
                    View all results for "{query}"
                  </a>
                )}
              </div>
            )}

            {/* No Results */}
            {!isLoading && query.length >= 2 && results.products.length === 0 && (
              <div className="py-12 text-center">
                <svg className="mx-auto mb-4 h-12 w-12 text-muted" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="mb-2 text-lg font-medium">No results found</p>
                <p className="text-sm text-muted">Try different keywords or check spelling</p>
              </div>
            )}

            {/* Search History & Trending */}
            {!isLoading && showHistory && query.length < 2 && (
              <div className="p-4">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-medium uppercase tracking-wider text-muted">
                        Recent Searches
                      </h3>
                      <button
                        type="button"
                        className="text-xs text-muted hover:text-foreground"
                        onClick={handleClearHistory}
                      >
                        Clear all
                      </button>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {searchHistory.map((item) => (
                        <li key={item.query}>
                          <button
                            type="button"
                            className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
                            onClick={() => handleHistoryClick(item.query)}
                          >
                            <svg className="h-3 w-3 text-muted" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {item.query}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                    Trending
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map((trending) => (
                      <li key={trending}>
                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
                          onClick={() => handleTrendingClick(trending)}
                        >
                          <svg className="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {trending}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div className="mt-6 border-t border-border pt-6">
                  <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
                    Quick Links
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="/collections/new-arrivals"
                      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                    >
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm">New Arrivals</span>
                    </a>
                    <a
                      href="/collections/sale"
                      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                    >
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none">
                        <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm">Sale</span>
                    </a>
                    <a
                      href="/collections/men"
                      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                    >
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm">Men</span>
                    </a>
                    <a
                      href="/collections/women"
                      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                    >
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 21L12 16L17 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm">Women</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
