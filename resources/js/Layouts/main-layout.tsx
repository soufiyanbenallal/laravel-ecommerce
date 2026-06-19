import { ReactNode, useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

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

      <Header />

      
      <main className="relative">
        {children}
      </main>
      
      <Footer />
      
    </div>
  );
}
