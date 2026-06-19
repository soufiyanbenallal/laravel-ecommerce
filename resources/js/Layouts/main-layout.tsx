import { ReactNode, useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { CheckCircle, XCircle, X } from "lucide-react";

type MainLayoutPropsType = {
  children: ReactNode;
  title?: string;
};

type FlashType = {
  success?: string;
  error?: string;
};

export default function MainLayout({ children, title }: MainLayoutPropsType) {
  const { flash } = usePage().props as { flash?: FlashType };
  const [showFlash, setShowFlash] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (flash?.success) {
      setFlashMessage(flash.success);
      setFlashType("success");
      setShowFlash(true);
    } else if (flash?.error) {
      setFlashMessage(flash.error);
      setFlashType("error");
      setShowFlash(true);
    }
  }, [flash]);

  useEffect(() => {
    if (showFlash) {
      const timer = setTimeout(() => setShowFlash(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showFlash]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-accent/20 selection:text-accent">
      <Head title={title ? `${title} | KENZ Maison` : "KENZ Maison — The Art of Dressing Well"} />

      <Header />
      <CartDrawer />

      <main className="relative">{children}</main>

      <Footer />

      {/* ── Flash Notification ── */}
      {showFlash && (
        <div
          className={
            "fixed bottom-6 right-6 z-[60] flex items-start gap-3 px-5 py-4 shadow-2xl border max-w-sm animate-[fadeInUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both] " +
            (flashType === "success"
              ? "bg-card border-accent/30 text-foreground"
              : "bg-card border-destructive/30 text-foreground")
          }
          role="alert"
          aria-live="polite"
        >
          {flashType === "success" ? (
            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
          ) : (
            <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" strokeWidth={1.5} />
          )}
          <p className="flex-1 text-[13px] font-light leading-relaxed">{flashMessage}</p>
          <button
            onClick={() => setShowFlash(false)}
            aria-label="Dismiss"
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
