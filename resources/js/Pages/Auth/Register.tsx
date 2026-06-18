import MainLayout from "@/Layouts/main-layout";
import { Link, useForm, Head } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/register");
  };

  return (
    <MainLayout title="Créer un compte">
      <Head title="Inscription" />
      <div className="min-h-screen bg-background flex items-center justify-center py-16 px-7">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-black/5 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-[#FF8533] flex items-center justify-center text-white font-heading font-extrabold text-2xl shadow-[0_4px_16px_rgba(255,98,0,0.3)] mx-auto mb-4">
                K
              </div>
              <h1 className="font-heading font-extrabold text-2xl text-foreground">Créez votre compte</h1>
              <p className="text-gray-400 text-sm mt-1.5">Rejoignez KENZ et profitez des meilleurs prix</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                    Prénom <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.first_name}
                    onChange={(e) => setData("first_name", e.target.value)}
                    placeholder="Ahmed"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-black/5 focus:border-primary outline-none transition-all text-sm text-foreground"
                    required
                  />
                  {errors.first_name && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{errors.first_name}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                    Nom <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.last_name}
                    onChange={(e) => setData("last_name", e.target.value)}
                    placeholder="Bennani"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-black/5 focus:border-primary outline-none transition-all text-sm text-foreground"
                    required
                  />
                  {errors.last_name && (
                    <p className="text-[10px] text-red-500 font-bold uppercase">{errors.last_name}</p>
                  )}
                </div>
              </div>

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
                {errors.email && (
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
                  placeholder="8 caractères minimum"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-black/5 focus:border-primary outline-none transition-all text-sm text-foreground"
                  required
                />
                {errors.password && (
                  <p className="text-[10px] text-red-500 font-bold uppercase">{errors.password}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                  Confirmer le mot de passe <span className="text-primary">*</span>
                </label>
                <input
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                  placeholder="Retapez votre mot de passe"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border-2 border-black/5 focus:border-primary outline-none transition-all text-sm text-foreground"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_12px_24px_rgba(255,98,0,0.25)] hover:-translate-y-0.5 disabled:opacity-50"
              >
                {processing ? "Création..." : "Créer mon compte"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Déjà un compte ?{" "}
                <Link href="/login" className="text-primary font-bold hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
