import { useState } from "react";
import { Link, Form } from "react-router";
import { Search, X, Loader2, BookOpen, FileText } from "lucide-react";
import { ProductCardPart } from "@/components/shared/product-card.part";
import type { ProductModelType } from "@/types/ecommerce.types";

type SearchPagePropsType = {
  term: string;
  error?: string;
  result?: {
    total: number;
    items: {
      products: {
        nodes: any[];
        pageInfo?: any;
      };
      articles: {
        nodes: any[];
      };
      pages: {
        nodes: any[];
      };
    };
  };
};

const POPULAR_SUGGESTIONS = ["Linen", "Silk", "New Arrivals", "Tailoring", "Lisbon", "Casablanca"];

export default function SearchPage({ term, error, result }: SearchPagePropsType) {
  const [query, setQuery] = useState(term);
  const [activeTab, setActiveTab] = useState<"all" | "products" | "articles" | "pages">("all");

  const hasResults = result && result.total > 0;
  const products = result?.items?.products?.nodes || [];
  const articles = result?.items?.articles?.nodes || [];
  const pages = result?.items?.pages?.nodes || [];

  // Map Shopify products to clean ProductModelType structures
  const mappedProducts: ProductModelType[] = products.map((node) => {
    const variant = node.selectedOrFirstAvailableVariant;
    return {
      id: node.id,
      name: node.title,
      slug: node.handle,
      price: parseFloat(variant?.price?.amount || "0"),
      old_price: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : undefined,
      currency: variant?.price?.currencyCode || "USD",
      image: variant?.image?.url || "",
      rating: 4.8,
      reviews_count: 12,
      stock_status: "in_stock",
      colors: [],
      sizes: [],
      materials: [],
      gender: "unisex",
    };
  });

  return (
    <div className="bg-background min-h-[70vh] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6 w-full">
        
        {/* Editorial Heading */}
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-3">Atelier Finder</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground tracking-tight">
            Search <em className="text-accent not-italic">the Collection</em>
          </h1>
        </div>

        {/* Elegant Search Input */}
        <div className="max-w-2xl mx-auto mb-16">
          <Form method="get" action="/search" className="relative flex items-center border-b border-border hover:border-accent focus-within:border-accent transition-all duration-300 py-3">
            <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" strokeWidth={1.5} />
            <input
              type="text"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by collection, fabric, fit..."
              className="w-full bg-transparent text-lg md:text-xl font-light outline-none placeholder:text-muted-foreground/60 text-foreground"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="ml-4 border border-border hover:border-accent hover:text-accent px-5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-all bg-transparent cursor-pointer"
            >
              Find
            </button>
          </Form>

          {/* Suggestions under search bar when no query or results */}
          <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
            <span className="text-[11px] text-muted-foreground font-light mr-1">Popular searches:</span>
            {POPULAR_SUGGESTIONS.map((suggestion) => (
              <Link
                key={suggestion}
                to={`/search?q=${encodeURIComponent(suggestion)}`}
                className="text-[11px] text-foreground hover:text-accent font-light border border-border/60 hover:border-accent/40 rounded-full px-3 py-0.5 transition-all duration-200"
              >
                {suggestion}
              </Link>
            ))}
          </div>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="max-w-md mx-auto p-4 border border-accent/20 bg-accent/5 text-center mb-8">
            <p className="text-xs text-accent font-light">{error}</p>
          </div>
        )}

        {/* Results Info */}
        {term && (
          <div className="border-b border-border/40 pb-6 mb-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <div>
              <p className="text-[12px] font-light text-muted-foreground">
                Showing {result?.total || 0} results for <span className="font-medium text-foreground">"{term}"</span>
              </p>
            </div>

            {/* Quiet Luxury Tabs Filter */}
            {hasResults && (
              <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
                {(["all", "products", "articles", "pages"] as const).map((tab) => {
                  const count =
                    tab === "all"
                      ? result.total
                      : tab === "products"
                      ? mappedProducts.length
                      : tab === "articles"
                      ? articles.length
                      : pages.length;

                  if (count === 0 && tab !== "all") return null;

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[11px] uppercase tracking-[0.2em] pb-1 border-b transition-all shrink-0 cursor-pointer ${
                        activeTab === tab
                          ? "border-accent text-accent font-medium"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab} ({count})
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Results Output */}
        {term && !hasResults && (
          <div className="text-center py-16 border border-dashed border-border/80 rounded-2xl bg-secondary/10">
            <p className="font-display text-xl text-foreground font-light mb-3">No Results Found</p>
            <p className="text-xs text-muted-foreground font-light max-w-sm mx-auto leading-relaxed mb-6">
              We couldn't find anything matching your search. Try different keywords or browse our catalog.
            </p>
            <Link
              to="/catalog"
              className="inline-block border border-foreground hover:border-accent hover:text-accent px-8 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300"
            >
              Browse Catalog
            </Link>
          </div>
        )}

        {hasResults && (
          <div className="space-y-16">
            
            {/* Products Grid tab */}
            {(activeTab === "all" || activeTab === "products") && mappedProducts.length > 0 && (
              <div>
                {activeTab === "all" && (
                  <h3 className="text-[12px] uppercase tracking-[0.2em] font-medium text-foreground mb-6">
                    Products
                  </h3>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {mappedProducts.map((product, idx) => (
                    <ProductCardPart key={product.id} product={product} index={idx} />
                  ))}
                </div>
              </div>
            )}

            {/* Articles List tab */}
            {(activeTab === "all" || activeTab === "articles") && articles.length > 0 && (
              <div>
                {activeTab === "all" && (
                  <h3 className="text-[12px] uppercase tracking-[0.2em] font-medium text-foreground mb-6">
                    Journal & Editorial
                  </h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {articles.map((article) => {
                    const articleUrl = `/blogs/${article.handle}`;
                    return (
                      <div
                        key={article.id}
                        className="group border border-border/60 hover:border-accent/40 bg-card p-6 transition-all duration-300 flex items-start gap-4"
                      >
                        <BookOpen className="w-5 h-5 text-accent shrink-0 mt-1" strokeWidth={1.5} />
                        <div>
                          <h4 className="font-display text-lg font-light text-foreground group-hover:text-accent transition-colors duration-200 mb-2">
                            <Link to={articleUrl}>{article.title}</Link>
                          </h4>
                          <Link
                            to={articleUrl}
                            className="text-[10px] uppercase tracking-[0.16em] text-accent font-medium inline-block hover:underline"
                          >
                            Read Article →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pages List tab */}
            {(activeTab === "all" || activeTab === "pages") && pages.length > 0 && (
              <div>
                {activeTab === "all" && (
                  <h3 className="text-[12px] uppercase tracking-[0.2em] font-medium text-foreground mb-6">
                    Pages & Information
                  </h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pages.map((page) => {
                    const pageUrl = `/pages/${page.handle}`;
                    return (
                      <div
                        key={page.id}
                        className="group border border-border/60 hover:border-accent/40 bg-card p-5 transition-all duration-300 flex items-start gap-4"
                      >
                        <FileText className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <h4 className="font-sans text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-200 mb-1">
                            <Link to={pageUrl}>{page.title}</Link>
                          </h4>
                          <Link
                            to={pageUrl}
                            className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground hover:text-accent transition-colors"
                          >
                            View Page
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
