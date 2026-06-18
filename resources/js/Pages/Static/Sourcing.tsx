import MainLayout from "@/Layouts/main-layout";
import { SourcingFormShared } from "@/Components/shared/sourcing-form.shared";

export default function Sourcing() {
  return (
    <MainLayout title="Service de Sourcing B2B">
      <div className="bg-background min-h-screen">
        {/* Hero Section */}
        <section className="bg-foreground text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,98,0,0.15)_0%,transparent_50%)]" />
          <div className="max-w-[1240px] mx-auto px-7 relative z-10 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary font-bold text-xs rounded-full uppercase tracking-wider mb-6">
              B2B & Importation sur mesure
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl mb-6">
              Vous cherchez un produit spécifique en Chine ?
            </h1>
            <p className="text-lg text-white/70 mb-10">
              Profitez de notre réseau d'usines partenaires. Nous sourçons, négocions, contrôlons la qualité et livrons directement à votre entrepôt au Maroc.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2"><span className="text-primary text-xl">✓</span> Recherche gratuite</div>
              <div className="flex items-center gap-2"><span className="text-primary text-xl">✓</span> Devis en 48h</div>
              <div className="flex items-center gap-2"><span className="text-primary text-xl">✓</span> Qualité garantie</div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-[1240px] mx-auto px-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-heading font-extrabold text-3xl text-foreground mb-6">Comment ça marche ?</h2>
                <div className="space-y-8 mb-10">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">Demande de Sourcing</h4>
                      <p className="text-muted-foreground text-sm">Remplissez le formulaire avec les détails du produit recherché (photos, quantités, budget).</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">Recherche & Devis</h4>
                      <p className="text-muted-foreground text-sm">Nos agents en Chine trouvent les meilleurs fournisseurs et vous envoient un devis détaillé (DDP Maroc).</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">Production & Contrôle</h4>
                      <p className="text-muted-foreground text-sm">Après validation, nous lançons la production et inspectons la marchandise avant expédition.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">4</div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground mb-1">Livraison au Maroc</h4>
                      <p className="text-muted-foreground text-sm">Nous gérons toute la logistique et le dédouanement jusqu'à votre porte.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary p-6 rounded-3xl border border-border">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">⚠️ Quantités Minimum</h4>
                  <p className="text-sm text-muted-foreground">Notre service de sourcing personnalisé s'adresse principalement aux professionnels (B2B) et commandes en gros. Pour les achats à l'unité, veuillez consulter notre <a href="/catalog" className="text-primary font-bold">catalogue en ligne</a>.</p>
                </div>
              </div>

              {/* Shared Form */}
              <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl border border-border sticky top-24">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6">Nouvelle Demande</h3>
                <SourcingFormShared />
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
