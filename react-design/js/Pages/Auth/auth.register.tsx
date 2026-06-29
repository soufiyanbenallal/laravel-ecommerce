import MainLayout from "@/Layouts/main-layout";
import { Link, useForm, Head } from "@inertiajs/react";
import heroImg from "@/assets/hero.jpg";

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
    <MainLayout title="Create Account">
      <Head title="Create Account — KENZ Maison" />
      <div className="min-h-[calc(100vh-60px)] flex">
        {/* Left Side: Editorial Art / Brand Statement (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-secondary overflow-hidden items-center justify-center p-12">
          <img
            src={heroImg}
            alt="KENZ Collection"
            className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-[4000ms] hover:scale-105"
          />
          {/* Warm Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          
          <div className="relative z-10 max-w-md text-center text-foreground">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium">✦ THE ART OF DRESSING ✦</span>
            <h2 className="mt-4 font-display text-4xl font-light leading-snug">
              “Simplicity is the ultimate sophistication.”
            </h2>
            <p className="mt-4 text-[13px] font-light leading-relaxed text-foreground/70">
              Join the KENZ Maison community to track your orders, view historical invoices, and enjoy lifetime repair services.
            </p>
          </div>
        </div>

        {/* Right Side: Clean Modern Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-16 px-6 sm:px-12 bg-background">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center lg:text-left">
              <span className="text-[10px] uppercase tracking-[0.24em] text-accent">Join the Maison</span>
              <h1 className="mt-2 font-display text-4xl font-light text-foreground">Create Account.</h1>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                Register to save items, track shipments and explore custom edits.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name fields row */}
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/70">
                    First Name <span className="text-accent">✦</span>
                  </label>
                  <input
                    type="text"
                    value={data.first_name}
                    onChange={(e) => setData("first_name", e.target.value)}
                    placeholder="Paul"
                    className="w-full border-b border-border/80 bg-transparent py-2.5 text-sm font-light tracking-wide outline-none transition-all focus:border-accent"
                    required
                  />
                  {errors.first_name && (
                    <p className="text-[11px] text-destructive font-light tracking-wide">{errors.first_name}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/70">
                    Last Name <span className="text-accent">✦</span>
                  </label>
                  <input
                    type="text"
                    value={data.last_name}
                    onChange={(e) => setData("last_name", e.target.value)}
                    placeholder="Valéry"
                    className="w-full border-b border-border/80 bg-transparent py-2.5 text-sm font-light tracking-wide outline-none transition-all focus:border-accent"
                    required
                  />
                  {errors.last_name && (
                    <p className="text-[11px] text-destructive font-light tracking-wide">{errors.last_name}</p>
                  )}
                </div>
              </div>

              {/* Email Address */}
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
                {errors.email && (
                  <p className="text-[11px] text-destructive font-light tracking-wide">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/70">
                  Password <span className="text-accent">✦</span>
                </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full border-b border-border/80 bg-transparent py-2.5 text-sm font-light tracking-wide outline-none transition-all focus:border-accent"
                  required
                />
                {errors.password && (
                  <p className="text-[11px] text-destructive font-light tracking-wide">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/70">
                  Confirm Password <span className="text-accent">✦</span>
                </label>
                <input
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData("password_confirmation", e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full border-b border-border/80 bg-transparent py-2.5 text-sm font-light tracking-wide outline-none transition-all focus:border-accent"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {processing ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-10 border-t border-border/40 pt-6 text-center lg:text-left">
              <p className="text-xs font-light text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-accent hover:underline underline-offset-4 font-normal"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
