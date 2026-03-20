// ─── Inertia Page Props ────────────────────────────────────────────────────
export interface PageProps {
  auth: {
    user: User | null;
  };
  flash?: {
    success?: string;
    error?: string;
  };
}

// ─── User ──────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// ─── Product ───────────────────────────────────────────────────────────────
export interface ProductVariant {
  id: number;
  color: string;
  colorHex: string;
  size?: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  slug: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  badge?: 'new' | 'sale' | 'bestseller' | 'trending' | 'limited';
  badgeLabel?: string;
  variants: ProductVariant[];
  isNew: boolean;
  isSale: boolean;
  isFeatured: boolean;
  category: string;
  description?: string;
}

// ─── Category ──────────────────────────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  count: number;
  accent: string;
}

// ─── Collection ────────────────────────────────────────────────────────────
export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  tag: string;
  itemCount: number;
  accentColor: string;
}

// ─── Flash Deal ────────────────────────────────────────────────────────────
export interface FlashDeal {
  id: number;
  product: Product;
  discountPercent: number;
  stockRemaining: number;
  soldPercent: number;
  endsAt: string;
}

// ─── Testimonial ───────────────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  verified: boolean;
  productBought?: string;
}

// ─── Blog Post ─────────────────────────────────────────────────────────────
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  tag: string;
  author: string;
  readTime: string;
  date: string;
  slug: string;
}

// ─── Hero Slide ────────────────────────────────────────────────────────────
export interface HeroSlide {
  id: number;
  kicker: string;
  headline: string[];
  body: string;
  cta: string;
  ctaSecondary: string;
  image: string;
  productName: string;
  productPrice: string;
  tag: string;
  tagColor: string;
  accentColor: string;
  thumbImage: string;
}

// ─── Home Page Props ────────────────────────────────────────────────────────
export interface HomePageProps extends PageProps {
  featuredProducts: Product[];
  flashDeals: FlashDeal[];
  categories: Category[];
  collections: Collection[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  heroSlides: HeroSlide[];
  stats: {
    customers: string;
    countries: string;
    satisfaction: string;
    responseTime: string;
  };
}

// ─── Cart ──────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}
