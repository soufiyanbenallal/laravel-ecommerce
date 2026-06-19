import { useState } from "react";
import { Head } from "@inertiajs/react";

const FAQ_ITEMS = [
  {
    category: "Commandes & Livraison",
    questions: [
      { q: "Quels sont les délais de livraison au Maroc ?", a: "Les commandes pour les produits en stock local (Casablanca) sont livrées sous 24h à 48h. Pour les produits en import direct de Chine, comptez entre 10 et 15 jours ouvrables." },
      { q: "Livrez-vous partout au Maroc ?", a: "Oui, nous livrons dans toutes les villes du Maroc grâce à nos partenaires logistiques (Amana, Aramex, etc.)." },
      { q: "Comment suivre ma commande ?", a: "Dès l'expédition de votre commande, vous recevrez un email avec un numéro de suivi. Vous pouvez également suivre l'état depuis votre espace 'Mon Compte'." }
    ]
  },
  {
    category: "Paiement & Facturation",
    questions: [
      { q: "Quels sont les modes de paiement acceptés ?", a: "Nous acceptons le paiement à la livraison (Cash on Delivery), le virement bancaire, et le paiement par carte bancaire marocaine ou internationale." },
      { q: "Les prix incluent-ils la TVA et les frais de douane ?", a: "Oui, tous les prix affichés sur KENZ Import incluent la TVA marocaine et tous les frais de dédouanement. Vous n'aurez aucun frais caché à la réception." }
    ]
  },
  {
    category: "Retours & Garanties",
    questions: [
      { q: "Puis-je retourner un produit ?", a: "Vous disposez de 7 jours après la réception pour retourner un produit non utilisé dans son emballage d'origine. Les frais de retour peuvent s'appliquer." },
      { q: "Quelle est la garantie sur les produits ?", a: "Tous nos produits électroniques (neufs et reconditionnés) bénéficient d'une garantie locale de 6 à 12 mois selon la marque." }
    ]
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<string>("0-0");

  return (
    <div className="bg-background min-h-screen py-16">
      <Head title="Foire aux Questions" />
      <div className="max-w-[800px] mx-auto px-7">
        <div className="text-center mb-16">
          <h1 className="font-heading font-extrabold text-4xl text-foreground mb-4">Questions Fréquentes</h1>
          <p className="text-muted-foreground text-lg">Retrouvez toutes les réponses à vos questions concernant nos produits, la livraison et nos garanties.</p>
        </div>

        <div className="space-y-12">
          {FAQ_ITEMS.map((section, sIdx) => (
            <div key={section.category}>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((item, qIdx) => {
                  const id = `${sIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={id} className="bg-white border border-border rounded-2xl overflow-hidden transition-all shadow-sm">
                      <button 
                        onClick={() => setOpenIndex(isOpen ? "" : id)}
                        className="w-full text-left px-6 py-5 font-bold text-foreground flex justify-between items-center focus:outline-none"
                      >
                        {item.q}
                        <span className={`transform transition-transform text-primary ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-4">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-primary/5 rounded-3xl p-8 text-center border border-primary/10">
          <h3 className="font-bold text-lg text-foreground mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
          <p className="text-muted-foreground mb-6">Notre équipe de support est disponible pour vous aider.</p>
          <a href="/contact" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary/90 transition-all shadow-md hover:-translate-y-0.5 no-underline">
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
}
