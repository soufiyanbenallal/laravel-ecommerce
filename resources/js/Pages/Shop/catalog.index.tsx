import MainLayout from "@/Layouts/main-layout";
import { ProductCardPart } from "@/Components/shared/product-card.part";
import { ProductModelType, CategoryModelType } from "@/types/ecommerce.types";
import { Link, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

type CatalogIndexPropsType = {
  products: {
    data: ProductModelType[];
    links: any[];
    meta: any;
  };
  categories: CategoryModelType[];
  filters: {
    search?: string;
    category?: string;
    sort?: string;
  };
};

export default function CatalogIndex({ products, categories, filters }: CatalogIndexPropsType) {
  const [search, setSearch] = useState(filters.search || "");
  
  const handleFilter = (key: string, value: string | null) => {
    const newFilters = { ...filters, [key]: value };
    if (!value) delete (newFilters as any)[key];
    
    router.get('/catalog', newFilters, {
      preserveState: true,
      replace: true,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (filters.search || "")) {
        handleFilter('search', search || null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <MainLayout title="Catalogue">
      <div className="bg-white border-b border-black/5 py-4">
        <div className="max-w-[1340px] mx-auto px-7 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-foreground">Catalogue</span>
        </div>
      </div>

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-[1340px] mx-auto px-7">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 shrink-0 space-y-8">
              {/* Search */}
              <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Recherche</h4>
                <div className="relative">
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Filtrer les produits..."
                    className="w-full pl-4 pr-10 py-3 bg-background border-none rounded-xl text-sm text-foreground outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Catégories</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleFilter('category', null)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${!filters.category ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-500'}`}
                  >
                    Toutes les catégories
                  </button>
                  {categories.map((cat) => (
                    <button 
                      key={cat.id}
                      onClick={() => handleFilter('category', cat.slug)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${filters.category === cat.slug ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-500'}`}
                    >
                      <span className="mr-2 opacity-60">{cat.icon || "📦"}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-heading font-extrabold text-3xl text-foreground">
                  {filters.category ? categories.find(c => c.slug === filters.category)?.name : "Tous les produits"}
                  <span className="ml-3 text-sm font-normal text-gray-400">({products.meta?.total || 0} résultats)</span>
                </h1>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trier par:</span>
                  <select 
                    className="bg-white border-none rounded-xl px-4 py-2 text-sm font-semibold text-foreground shadow-sm outline-none cursor-pointer"
                    value={filters.sort || 'latest'}
                    onChange={(e) => handleFilter('sort', e.target.value)}
                  >
                    <option value="latest">Plus récents</option>
                    <option value="price_asc">Prix: Croissant</option>
                    <option value="price_desc">Prix: Décroissant</option>
                  </select>
                </div>
              </div>

              {products.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.data.map((product) => (
                    <ProductCardPart key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-black/5 shadow-sm">
                  <div className="text-7xl mb-6 opacity-20">🔎</div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">Nous n'avons trouvé aucun résultat pour vos critères actuels. Essayez de modifier vos filtres ou effectuez une demande de sourcing.</p>
                  <Link 
                    href="/" 
                    className="mt-8 inline-block bg-primary text-white font-bold py-3.5 px-10 rounded-2xl text-sm transition-all hover:-translate-y-1"
                  >
                    Demander un Sourcing →
                  </Link>
                </div>
              )}

              {/* Pagination */}
              {products.meta?.last_page > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  {products.links.map((link, i) => (
                    link.url ? (
                      <Link 
                        key={i}
                        href={link.url}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          link.active 
                            ? 'bg-primary text-white' 
                            : 'bg-white border border-black/5 text-gray-500 hover:border-primary/30 hover:text-primary'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ) : (
                      <span key={i} className="px-4 py-2 text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: link.label }} />
                    )
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
