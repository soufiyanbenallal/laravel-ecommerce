import { Head } from "@inertiajs/react";
import { SourcingFormShared } from "@/components/shared/sourcing-form.shared";
import { Award, ShieldAlert, Sparkles, Zap } from "lucide-react";

export default function SourcingPage() {
  return (
    <div className="bg-background">
      <Head title="Sourcing Chine Maroc | Import Direct Usine" />

      {/* Header Banner */}
      <section className="bg-[#FFF6EE] border-b border-border/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="text-[11px] font-bold text-primary tracking-[0.2em] uppercase bg-primary/10 px-3.5 py-1.5 rounded-full">
            Service Premium
          </span>
          <h1 className="mt-6 font-heading font-extrabold text-[clamp(2.2rem,5vw,4.2rem)] text-foreground leading-[1.08] max-w-3xl mx-auto">
            Importez Directement des <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Meilleures Usines</span> Chinoises
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-gray-500 text-sm leading-relaxed">
            Profitez de l'expertise de nos agents sur place à Yiwu et Guangzhou pour négocier, inspecter et livrer vos produits en toute sécurité jusqu'à votre entrepôt au Maroc.
          </p>
        </div>
      </section>

      {/* Sourcing Process and Form */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Sourcing Info / Steps */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-4">
                Comment fonctionne notre service ?
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                De la formulation de votre besoin jusqu'à la livraison finale, nous gérons l'intégralité du processus de sourcing.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Analyse & Devis gratuit",
                  desc: "Remplissez le formulaire de demande de sourcing. Notre équipe étudie vos besoins et vous recontacte en moins de 24h."
                },
                {
                  step: "02",
                  title: "Négociation Directe Usine",
                  desc: "Nos agents en Chine contactent les fabricants agréés pour obtenir les meilleurs tarifs du marché."
                },
                {
                  step: "03",
                  title: "Contrôle Qualité & Échantillons",
                  desc: "Nous faisons valider un échantillon de pré-production et procédons à l'inspection physique des marchandises."
                },
                {
                  step: "04",
                  title: "Transport & Dédouanement Maroc",
                  desc: "Nous expédions la marchandise par voie maritime (LCL/FCL) ou aérienne et gérons toutes les formalités douanières au Maroc."
                }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-5 border-l-2 border-primary/20 hover:border-primary pl-5 py-1 transition-colors group">
                  <div className="font-heading font-extrabold text-xl text-primary/40 group-hover:text-primary transition-colors shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{step.title}</h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl border border-border/50 bg-secondary/30">
                <Award className="w-6 h-6 text-primary mb-2" />
                <h5 className="font-bold text-xs text-foreground">Fournisseurs Vérifiés</h5>
                <p className="text-gray-400 text-[10px] mt-1">Audit complet d'usine.</p>
              </div>
              <div className="p-5 rounded-2xl border border-border/50 bg-secondary/30">
                <Zap className="w-6 h-6 text-primary mb-2" />
                <h5 className="font-bold text-xs text-foreground">Zéro stress</h5>
                <p className="text-gray-400 text-[10px] mt-1">Livraison clé en main.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <SourcingFormShared />
          </div>

        </div>
      </section>
    </div>
  );
}
