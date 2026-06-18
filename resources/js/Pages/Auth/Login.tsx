import MainLayout from "@/Layouts/main-layout";
import { Link, useForm, Head } from "@inertiajs/react";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <MainLayout title="Connexion">
      <Head title="Connexion" />
      <div className="min-h-screen bg-background flex items-center justify-center py-16 px-7">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-black/5 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-[#FF8533] flex items-center justify-center text-white font-heading font-extrabold text-2xl shadow-[0_4px_16px_rgba(255,98,0,0.3)] mx-auto mb-4">
                K
              </div>
              <h1 className="font-heading font-extrabold text-2xl text-foreground">Bon retour !</h1>
              <p className="text-gray-400 text-sm mt-1.5">Connectez-vous à votre compte KENZ</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {errors.email && !errors.password && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl font-medium">
                  {errors.email}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-black/5 focus:border-primary outline-none transition-all text-sm text-foreground"
                  required
                />
                {errors.email && errors.password && (
                  <p className="text-[10px] text-red-500 font-bold uppercase">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                  Mot de passe <span className="text-primary">*</span>
                </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-black/5 focus:border-primary outline-none transition-all text-sm text-foreground"
                  required
                />
                {errors.password && (
                  <p className="text-[10px] text-red-500 font-bold uppercase">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.remember}
                    onChange={(e) => setData("remember", e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-sm text-gray-500">Se souvenir de moi</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_12px_24px_rgba(255,98,0,0.25)] hover:-translate-y-0.5 disabled:opacity-50"
              >
                {processing ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Pas encore de compte ?{" "}
                <Link href="/register" className="text-primary font-bold hover:underline">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
