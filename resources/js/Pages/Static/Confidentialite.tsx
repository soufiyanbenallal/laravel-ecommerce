import MainLayout from "@/Layouts/main-layout";

export default function Confidentialite() {
  return (
    <MainLayout title="Politique de Confidentialité">
      <div className="bg-background min-h-screen py-16">
        <div className="max-w-[800px] mx-auto px-7">
          <h1 className="font-heading font-extrabold text-4xl text-foreground mb-8">Politique de Confidentialité</h1>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-sm space-y-8">
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Collecte des données</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Nous collectons les données personnelles suivantes lors de votre inscription et de vos commandes : nom, prénom, adresse email, numéro de téléphone, adresse de livraison et adresse de facturation. Ces données sont nécessaires au traitement de vos commandes et à la gestion de votre compte client.
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Utilisation des données</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Vos données personnelles sont utilisées pour : le traitement et la livraison de vos commandes, la gestion de votre compte client, l'envoi de communications commerciales (avec votre consentement), et l'amélioration de nos services.
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Protection des données</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                KENZ Import met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles contre tout accès non autorisé, alteration, divulgation ou destruction.
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Vos droits</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous à : privacy@kenz-import.ma
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Cookies</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ce site utilise des cookies strictement nécessaires à son bon fonctionnement. Nous n'utilisons pas de cookies de tracking tiers sans votre consentement explicite.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
