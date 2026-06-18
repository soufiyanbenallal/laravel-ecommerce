import MainLayout from "@/Layouts/main-layout";
import { HomeHeroPart } from "./partials/home-hero.part";
import { HomeTrustBarPart } from "./partials/home-trust-bar.part";
import { HomeCategoriesPart } from "./partials/home-categories.part";
import { HomeFlashDealsPart } from "./partials/home-flash-deals.part";
import { HomeNewArrivalsPart } from "./partials/home-new-arrivals.part";
import { HomeBrandStoryPart } from "./partials/home-brand-story.part";
import { HomeCollectionsPart } from "./partials/home-collections.part";
import { HomeValuesPart } from "./partials/home-values.part";
import { HomeHowItWorksPart } from "./partials/home-how-it-works.part";
import { HomeTestimonialsPart } from "./partials/home-testimonials.part";
import { HomeSourcingPart } from "./partials/home-sourcing.part";
import { HomeMembershipCtaPart } from "./partials/home-membership-cta.part";
import { motion } from "motion/react";
import { ProductModelType, CategoryModelType, CollectionModelType, TestimonialType } from "@/types/ecommerce.types";

// Fallback Mock data
const MOCK_CATEGORIES: CategoryModelType[] = [
  { id: 1, icon: "📱", name: "Smartphones", products_count: 1240, color: "#FF6200", slug: "smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop" },
  { id: 2, icon: "💻", name: "Informatique", products_count: 890, color: "#6366F1", slug: "informatique", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop" },
  { id: 3, icon: "🏠", name: "Maison & Déco", products_count: 2100, color: "#F59E0B", slug: "maison", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop" },
  { id: 4, icon: "📺", name: "Électronique", products_count: 670, color: "#10B981", slug: "electronique", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop" },
  { id: 5, icon: "🚗", name: "Auto & Moto", products_count: 3400, color: "#3B82F6", slug: "auto", image: "https://images.unsplash.com/photo-1492144534655-6f2332ca1fef?q=80&w=800&auto=format&fit=crop" },
  { id: 6, icon: "🎮", name: "Gaming", products_count: 450, color: "#8B5CF6", slug: "gaming", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" },
  { id: 7, icon: "📷", name: "Photo & Vidéo", products_count: 320, color: "#EC4899", slug: "photo", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop" },
  { id: 8, icon: "🔧", name: "Outillage", products_count: 780, color: "#F97316", slug: "outillage", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=800&auto=format&fit=crop" },
];

const MOCK_FLASH_DEALS: ProductModelType[] = [
  { id: 1, name: "iPhone 14 Pro Max 256GB", price: 5490, old_price: 8900, discount_percentage: 38, rating: 4.8, reviews_count: 234, metadata: { emoji: "📱", condition: "Reconditionné Grade A+" }, slug: "iphone-14-pro-max", currency: "MAD", stock_status: 'in_stock', image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Smart TV Samsung 65\" 4K", price: 4290, old_price: 6500, discount_percentage: 34, rating: 4.9, reviews_count: 156, metadata: { emoji: "📺", condition: "Neuf · Import Direct" }, slug: "samsung-tv-65", currency: "MAD", stock_status: 'in_stock', image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop" },
];

const MOCK_COLLECTIONS: CollectionModelType[] = [
  { id: 1, name: "Tech Premium", description: "Les meilleures marques mondiales à prix import", products_count: 450, color: "#FF6200", metadata: { emoji: "⚡" }, slug: "tech-premium" },
  { id: 2, name: "Maison Moderne", description: "Transformez votre espace de vie", products_count: 780, color: "#F59E0B", metadata: { emoji: "🏡" }, slug: "maison-moderne" },
  { id: 3, name: "Auto & Passion", description: "Pour les passionnés de vitesse", products_count: 1200, color: "#10B981", metadata: { emoji: "🏎️" }, slug: "auto-passion" },
  { id: 4, name: "Mode & Style", description: "Les tendances directes de Chine", products_count: 2300, color: "#8B5CF6", metadata: { emoji: "✨" }, slug: "mode-style" },
];

const MOCK_TESTIMONIALS: TestimonialType[] = [
  { id: 1, name: "Karim El Mansouri", city: "Casablanca", rating: 5, text: "Incroyable service ! J'ai commandé un iPhone reconditionné et il est arrivé en parfait état dans les 2 jours. Prix imbattable.", product_name: "iPhone 14 Pro Max", is_verified: true },
  { id: 2, name: "Fatima Zahra Benali", city: "Rabat", rating: 5, text: "KENZ a transformé ma façon de consommer. Produits 100% authentiques, livraison ultra rapide, et des économies de 40%.", product_name: "Smart TV Samsung 65\"", is_verified: true },
];

type HomeIndexPropsType = {
  categories: CategoryModelType[];
  flash_deals: ProductModelType[];
  new_arrivals: ProductModelType[];
  collections: CollectionModelType[];
  testimonials: TestimonialType[];
};

const revealProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function HomeIndex({ 
  categories = [], 
  flash_deals = [], 
  new_arrivals = [], 
  collections = [], 
  testimonials = [] 
}: HomeIndexPropsType) {
  return (
    <MainLayout title="Premium E-Commerce | Sourcing China to Morocco">
      <HomeHeroPart />
      <HomeTrustBarPart />

      <motion.div {...revealProps}>
        <HomeCategoriesPart categories={categories.length > 0 ? categories : MOCK_CATEGORIES} />
      </motion.div>

      <motion.div {...revealProps}>
        <HomeFlashDealsPart products={flash_deals.length > 0 ? flash_deals : MOCK_FLASH_DEALS} />
      </motion.div>

      <motion.div {...revealProps}>
        <HomeNewArrivalsPart products={new_arrivals.length > 0 ? new_arrivals : MOCK_FLASH_DEALS} />
      </motion.div>

      <motion.div {...revealProps}>
        <HomeBrandStoryPart />
      </motion.div>

      <motion.div {...revealProps}>
        <HomeCollectionsPart collections={collections.length > 0 ? collections : MOCK_COLLECTIONS} />
      </motion.div>

      <motion.div {...revealProps}>
        <HomeValuesPart />
      </motion.div>

      <motion.div {...revealProps}>
        <HomeHowItWorksPart />
      </motion.div>

      <motion.div {...revealProps}>
        <HomeSourcingPart />
      </motion.div>

      <motion.div {...revealProps}>
        <HomeTestimonialsPart testimonials={testimonials.length > 0 ? testimonials : MOCK_TESTIMONIALS} />
      </motion.div>

      <HomeMembershipCtaPart />
    </MainLayout>
  );
}