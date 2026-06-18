import { ReactNode, useEffect, useState } from "react";
import { AnnouncementBarPart } from "@/Components/shared/announcement-bar.part";
import { NavbarPart } from "@/Components/shared/navbar.part";
import { FooterPart } from "@/Components/shared/footer.part";
import { PromoModalPart } from "@/Components/shared/promo-modal.part";
import { CartDrawerPart } from "@/Components/shared/cart-drawer.part";
import { Head, usePage } from "@inertiajs/react";

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
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary/90">
      <Head title={title ? `${title} | KENZ Import` : "KENZ Import | Chine to Maroc"} />
      
      <AnnouncementBarPart />
      <NavbarPart />
      
      {showFlash && (
        <div className={`fixed top-4 right-4 z-[90] max-w-md animate-fade-in-up ${flashType === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-700'} px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3`}>
          <span className="text-xl">{flashType === 'success' ? '✅' : '❌'}</span>
          <span className="text-sm font-medium">{flashMessage}</span>
          <button onClick={() => setShowFlash(false)} className="ml-auto opacity-60 hover:opacity-100 transition-opacity border-none bg-transparent cursor-pointer text-inherit">✕</button>
        </div>
      )}
      
      <main className="relative">
        {children}
      </main>
      
      <FooterPart />
      
      {/* Global Overlays */}
      <PromoModalPart />
      <CartDrawerPart />
    </div>
  );
}
