import MainLayout from "@/Layouts/main-layout";

export default function MentionsLegales() {
  return (
    <MainLayout title="Mentions Légales">
      <div className="bg-background min-h-screen py-16">
        <div className="max-w-[800px] mx-auto px-7">
          <h1 className="font-heading font-extrabold text-4xl text-foreground mb-8">Mentions Légales</h1>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-sm space-y-8">
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Éditeur du site</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                KENZ Import SARL<br />
                Quartier Industriel, Casablanca, Maroc<br />
                Capital social : 100 000 MAD<br />
                RC : 123456 | ICE : 002123456000067<br />
                Tél : +212 6 00 00 00 00<br />
                Email : contact@kenz-import.ma
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Directeur de la publication</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                M. KENZ — Gérant de la société KENZ Import SARL
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Hébergeur</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ce site est hébergé par les serveurs Laravel/Vercel.<br />
                Pour toute réclamation, vous pouvez nous contacter à : contact@kenz-import.ma
              </p>
            </section>
            <section>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">Propriété intellectuelle</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                L'ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive de KENZ Import SARL ou de ses partenaires. Toute reproduction, même partielle, est interdite sans autorisation préalable.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
