import MainLayout from "@/Layouts/main-layout";
import { Link, useForm, Head } from "@inertiajs/react";
import atelierImg from "@/assets/atelier.jpg";

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
    <MainLayout title="Sign In">
      <Head title="Sign In — KENZ Maison" />
      <div className="min-h-[calc(100vh-60px)] flex">
        {/* Left Side: Editorial Art / Brand Statement (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-secondary overflow-hidden items-center justify-center p-12">
          <img
            src={atelierImg}
            alt="KENZ Atelier"
            className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-[4000ms] hover:scale-105"
          />
          {/* Warm Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          
          <div className="relative z-10 max-w-md text-center text-foreground">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">✦ KENZ MAISON ✦</span>
            <h2 className="mt-4 font-display text-4xl font-light leading-snug">
              “The art of dressing is the art of expression.”
            </h2>
            <p className="mt-4 text-[13px] font-light leading-relaxed text-foreground/70">
              Welcome back to the House of KENZ. Sourced from named European workshops, made to outlast seasons.
            </p>
          </div>
        </div>

        {/* Right Side: Clean Modern Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-16 px-6 sm:px-12 bg-background">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center lg:text-left">
              <span className="text-[10px] uppercase tracking-[0.24em] text-accent">Welcome Back</span>
              <h1 className="mt-2 font-display text-4xl font-light text-foreground">Sign In.</h1>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                Enter your credentials to access your Maison account.
              </p>
            </div>

            {/* Error banner */}
            {errors.email && !errors.password && (
              <div className="mb-6 border border-destructive/20 bg-destructive/5 px-4 py-3 text-xs uppercase tracking-[0.12em] text-destructive">
                {errors.email}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/70">
                  Email Address <span className="text-accent">✦</span>
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full border-b border-border/80 bg-transparent py-2.5 text-sm font-light tracking-wide outline-none transition-all focus:border-accent"
                  required
                />
                {errors.email && errors.password && (
                  <p className="text-[11px] text-destructive font-light tracking-wide">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/70">
                    Password <span className="text-accent">✦</span>
                  </label>
                </div>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-b border-border/80 bg-transparent py-2.5 text-sm font-light tracking-wide outline-none transition-all focus:border-accent"
                  required
                />
                {errors.password && (
                  <p className="text-[11px] text-destructive font-light tracking-wide">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-light text-muted-foreground select-none">
                  <input
                    type="checkbox"
                    checked={data.remember}
                    onChange={(e) => setData("remember", e.target.checked)}
                    className="w-3.5 h-3.5 border border-border/60 bg-transparent accent-accent rounded-none cursor-pointer"
                  />
                  <span>Remember my preferences</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {processing ? "Connecting..." : "Sign In"}
              </button>
            </form>

            {/* Create account suggestion */}
            <div className="mt-10 border-t border-border/40 pt-6 text-center lg:text-left">
              <p className="text-xs font-light text-muted-foreground">
                Don't have an account yet?{" "}
                <Link
                  href="/register"
                  className="text-accent hover:underline underline-offset-4 font-normal"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
