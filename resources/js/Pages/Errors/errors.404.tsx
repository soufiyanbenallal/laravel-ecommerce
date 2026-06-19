import { Head, Link } from "@inertiajs/react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-background flex items-center justify-center py-20 px-7">
      <Head title="Page non trouvée" />
      <div className="text-center max-w-lg">
        <div className="font-heading font-extrabold text-[120px] md:text-[180px] text-primary/10 leading-none select-none">
          404
        </div>
        <h1 className="font-heading font-extrabold text-4xl text-foreground -mt-8 mb-4">
          Page introuvable
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-10">
          La page que vous recherchez n'existe pas ou a été déplacée. Pas de panique — explorez notre catalogue ou revenez à l'accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg hover:-translate-y-0.5 no-underline text-center"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/catalog"
            className="bg-white border-2 border-black/5 text-gray-600 font-bold py-3.5 px-8 rounded-2xl hover:border-primary/30 hover:text-primary transition-all no-underline text-center"
          >
            Explorer le catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
