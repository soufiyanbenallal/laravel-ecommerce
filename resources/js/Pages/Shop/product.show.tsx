import MainLayout from "@/Layouts/main-layout";
import { ProductModelType, ReviewType, ReviewStatsType } from "@/types/ecommerce.types";
import { useCartStore } from "@/stores/cart.store";
import { Link } from "@inertiajs/react";
import { useState } from "react";

type ProductShowPropsType = {
  product: ProductModelType & {
    description: string;
    sku: string;
    stock: number;
    categories: { name: string; slug: string }[];
    attributes: { name: string; value: string }[];
  };
  related_products: ProductModelType[];
  reviews: ReviewType[];
  review_stats: ReviewStatsType;
};

const StarRating = ({ rating, size = "text-sm" }: { rating: number; size?: string }) => (
  <div className={`flex ${size} text-accent`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i}>{i <= Math.round(rating) ? "★" : "☆"}</span>
    ))}
  </div>
);

const RatingBar = ({ count, total }: { count: number; total: number }) => {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex-1">
      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
};

export default function ProductShow({ product, related_products, reviews, review_stats }: ProductShowPropsType) {
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const { addItem } = useCartStore();

  const tabs = [
    { key: "description" as const, label: "Description" },
    { key: "specs" as const, label: "Fiche Technique" },
    { key: "reviews" as const, label: `Avis (${review_stats.total})` },
  ];

  return (
    <MainLayout title={product.name}>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-black/5 py-4">
        <div className="max-w-[1340px] mx-auto px-7 flex items-center gap-2 text-xs font-medium text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span>/</span>
          {product.categories?.[0] && (
            <>
              <Link href={`/catalog?category=${product.categories[0].slug}`} className="hover:text-primary transition-colors">{product.categories[0].name}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground truncate">{product.name}</span>
        </div>
      </div>

      <section className="py-12 md:py-18 bg-white">
        <div className="max-w-[1340px] mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Product Visual */}
            <div className="space-y-6">
              <div className="aspect-square bg-background rounded-[40px] border border-black/5 flex items-center justify-center shadow-sm relative overflow-hidden group">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="text-[180px] relative z-10 group-hover:scale-110 transition-transform duration-700">
                    {product.metadata?.emoji || "📦"}
                  </div>
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,98,0,0.05)_0%,transparent_70%)]" />
              </div>

              {product.gallery && product.gallery.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  {product.gallery.map((img, i) => (
                    <div key={img.id} className={`aspect-square rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${i === 0 ? "border-primary bg-white" : "border-transparent bg-background hover:bg-gray-100"}`}>
                      <img src={img.thumb || img.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : product.image ? (
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`aspect-square rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${i === 1 ? "border-primary bg-white" : "border-transparent bg-background hover:bg-gray-100"}`}>
                      <img src={product.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.metadata?.condition || "Neuf"}
                  </span>
                  <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">SKU: {product.sku}</span>
                </div>

                <h1 className="font-heading font-extrabold text-[clamp(1.8rem,3.5vw,2.8rem)] text-foreground leading-[1.1] mb-5">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-8">
                  <StarRating rating={review_stats.average} size="text-lg" />
                  <span className="text-sm font-bold text-gray-400">
                    {review_stats.average} ({review_stats.total} avis vérifiés)
                  </span>
                </div>

                <div className="flex items-end gap-5 mb-10">
                  <div className="font-heading font-extrabold text-[42px] text-primary leading-none">
                    {product.price.toLocaleString("fr-MA")} <span className="text-2xl ml-1">{product.currency || "MAD"}</span>
                  </div>
                  {product.old_price ? (
                    <div className="text-xl text-gray-300 line-through mb-1">
                      {product.old_price.toLocaleString("fr-MA")} MAD
                    </div>
                  ) : null}
                </div>

                <p className="text-gray-500 text-base leading-relaxed mb-10 max-w-[500px]">
                  {product.description || "Ce produit importé directement de Chine répond aux plus hauts standards de qualité. Inspecté par nos agents à Shenzhen, il vous offre le meilleur rapport qualité-prix du marché marocain."}
                </p>

                {/* Attributes */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 p-6 rounded-3xl bg-background border border-black/5">
                  {[
                    { label: "Origine", value: product.metadata?.origin || "Chine" },
                    { label: "Garantie", value: product.metadata?.warranty || "12 mois" },
                    { label: "Livraison", value: "48h - 72h" },
                    { label: "Disponibilité", value: product.stock > 0 ? "En stock" : "Sur commande" },
                  ].map((attr, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{attr.label}</span>
                      <span className="text-sm font-bold text-foreground">{attr.value}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center bg-secondary rounded-2xl p-1.5 min-w-[140px]">
                    <button
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      className="w-11 h-11 flex items-center justify-center hover:bg-white rounded-xl transition-all border-none bg-transparent cursor-pointer font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold">{selectedQty}</span>
                    <button
                      onClick={() => setSelectedQty(selectedQty + 1)}
                      className="w-11 h-11 flex items-center justify-center hover:bg-white rounded-xl transition-all border-none bg-transparent cursor-pointer font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addItem(product, selectedQty)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-extrabold py-4 px-8 rounded-2xl transition-all shadow-[0_12px_24px_rgba(255,98,0,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3"
                  >
                    <span>🛒</span> Ajouter au Panier
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-auto pt-8 border-t border-black/5 flex flex-wrap gap-6">
                {[
                  { icon: "🛡️", text: "Paiement 100% sécurisé" },
                  { icon: "📦", text: "Livraison partout au Maroc" },
                  { icon: "🔄", text: "Satisfait ou remboursé 30j" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <span className="text-lg">{b.icon}</span> {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs / Detailed Info */}
      <section className="py-22 bg-background">
        <div className="max-w-[1340px] mx-auto px-7">
          <div className="bg-white rounded-[40px] border border-black/5 p-8 md:p-14 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />

            {/* Tab Headers */}
            <div className="flex gap-10 border-b border-black/5 mb-10 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-5 text-sm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.key ? "border-primary text-foreground" : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "description" && (
              <div className="max-w-[800px] animate-fade-in-up">
                <h3 className="font-heading font-extrabold text-2xl mb-6">Expertise Import Direct</h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  En tant qu'agence d'importation spécialisée, nous sélectionnons personnellement chaque usine partenaire. Ce produit bénéficie de notre circuit court : de la ligne d'assemblage en Chine à notre entrepôt au Maroc, sans intermédiaires inutiles.
                </p>
                <ul className="space-y-4 p-0 list-none">
                  {[
                    "Contrôle qualité rigoureux avant départ usine",
                    "Conformité aux normes de sécurité internationales",
                    "Emballage renforcé pour le transport international",
                    "Garantie locale assurée par notre SAV au Maroc",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                      <span className="text-primary">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-[800px] animate-fade-in-up">
                <h3 className="font-heading font-extrabold text-2xl mb-6">Fiche Technique</h3>
                {product.attributes && product.attributes.length > 0 ? (
                  <div className="space-y-0">
                    {product.attributes.map((attr, i) => (
                      <div key={i} className={`flex justify-between py-4 ${i > 0 ? "border-t border-black/5" : ""}`}>
                        <span className="text-sm font-medium text-gray-500">{attr.name}</span>
                        <span className="text-sm font-bold text-foreground">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Aucune spécification technique disponible pour ce produit.</p>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="animate-fade-in-up">
                {review_stats.total > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                    {/* Rating Summary */}
                    <div className="text-center lg:text-left">
                      <div className="font-heading font-extrabold text-6xl text-foreground mb-2">
                        {review_stats.average}
                      </div>
                      <StarRating rating={review_stats.average} size="text-xl" />
                      <p className="text-sm text-gray-400 mt-2 mb-6">{review_stats.total} avis vérifiés</p>

                      <div className="space-y-2.5">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-xs font-bold text-gray-400 w-3">{star}</span>
                            <span className="text-xs">★</span>
                            <RatingBar count={review_stats.distribution[star] || 0} total={review_stats.total} />
                            <span className="text-xs text-gray-400 w-6 text-right">{review_stats.distribution[star] || 0}</span>
                          </div>
                        ))}
                      </div>

                      {review_stats.recommendation_rate > 0 && (
                        <div className="mt-6 p-4 bg-emerald-50 rounded-2xl">
                          <div className="font-bold text-emerald-600 text-2xl">{review_stats.recommendation_rate}%</div>
                          <div className="text-xs text-emerald-600/70">recommandent ce produit</div>
                        </div>
                      )}
                    </div>

                    {/* Review List */}
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-black/5 last:border-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                              {review.author.avatar ? (
                                <img src={review.author.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
                              ) : (
                                review.author.name.charAt(0)
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-bold text-sm text-foreground">{review.author.name}</span>
                                <StarRating rating={review.rating} size="text-xs" />
                                {review.is_recommended && (
                                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Recommande</span>
                                )}
                              </div>
                              {review.title && <div className="font-bold text-sm text-foreground mb-1">{review.title}</div>}
                              {review.content && <p className="text-sm text-gray-500 leading-relaxed">{review.content}</p>}
                              <div className="text-[11px] text-gray-400 mt-2">
                                {new Date(review.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4 opacity-20">💬</div>
                    <p className="text-gray-400 font-medium">Aucun avis pour ce produit pour le moment.</p>
                    <p className="text-gray-400 text-sm mt-1">Soyez le premier à donner votre avis après achat.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related_products.length > 0 && (
        <section className="py-22 bg-background">
          <div className="max-w-[1340px] mx-auto px-7">
            <h2 className="font-heading font-extrabold text-3xl text-foreground mb-10">Vous Aimerez Aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related_products.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:-translate-y-2 hover:shadow-[0_24px_52px_rgba(0,0,0,0.13)] transition-all duration-350 no-underline block"
                >
                  <div className="aspect-square bg-gray-50/50 overflow-hidden flex items-center justify-center">
                    {rp.image ? (
                      <img src={rp.image} alt={rp.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="text-6xl">{rp.metadata?.emoji || "📦"}</div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-sm text-foreground line-clamp-2 mb-2">{rp.name}</h3>
                    <div className="font-heading font-extrabold text-primary">
                      {(rp.price ?? 0).toLocaleString("fr-MA")} {rp.currency || "MAD"}
                    </div>
                    {rp.old_price ? (
                      <div className="text-xs text-gray-400 line-through">{rp.old_price.toLocaleString("fr-MA")} MAD</div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}
