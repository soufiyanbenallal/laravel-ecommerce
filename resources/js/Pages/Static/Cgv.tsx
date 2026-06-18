import MainLayout from "@/Layouts/main-layout";
import { Link } from "@inertiajs/react";

export default function Cgv() {
  return (
    <MainLayout title="Conditions Générales de Vente">
      <div className="bg-background min-h-screen py-16">
        <div className="max-w-[800px] mx-auto px-7">
          <h1 className="font-heading font-extrabold text-4xl text-foreground mb-8">Conditions Générales de Vente</h1>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-sm space-y-8">
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Article 1 — Objet</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre la société KENZ Import SARL et ses clients. Toute commande passée sur le site kenz-import.ma implique l'acceptation sans réserve des présentes CGV.
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Article 2 — Prix</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Les prix sont indiqués en dirhams marocains (MAD) toutes taxes comprises (TVA et frais de douane inclus). KENZ Import se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix applicable est celui en vigueur au moment de la validation de la commande.
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Article 3 — Paiement</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Le paiement peut être effectué par carte bancaire, virement bancaire, ou paiement à la livraison (cash on delivery). Le paiement à la livraison est soumis à une limite de 10 000 MAD.
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Article 4 — Livraison</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                La livraison est effectuée partout au Maroc. Les délais de livraison sont de 24 à 72 heures pour les produits en stock local, et de 10 à 15 jours ouvrables pour les produits en import direct. KENZ Import ne saurait être tenu responsable des retards de livraison imputables au transporteur.
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Article 5 — Droit de rétractation</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Conformément à la réglementation en vigueur, le client dispose d'un délai de 7 jours après réception pour retourner un produit non utilisé dans son emballage d'origine. Les frais de retour sont à la charge du client, sauf en cas de produit défectueux.
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Article 6 — Garantie</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tous les produits électroniques bénéficient d'une garantie de 6 à 12 mois selon la marque. La garantie couvre les défauts de fabrication. Elle ne couvre pas les dommages résultant d'une utilisation non conforme.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
