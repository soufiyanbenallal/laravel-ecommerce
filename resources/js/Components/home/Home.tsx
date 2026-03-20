import React from 'react';
import { Head } from '@inertiajs/react';
import type { HomePageProps } from './index';
import { IMG } from './data';

// Components
import Navbar from './Navbar';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import FlashSale from './FlashSale';
import {
  BrandTicker,
  Categories,
  PromoBanners,
  Collections,
  WhyNexus,
  StatsBar,
  Testimonials,
  Journal,
  Newsletter,
  Footer,
} from './Sections';

// ─── Global CSS injected via Tailwind @layer / inline ─────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,300;1,400;1,600&family=Jost:wght@300;400;500;600;700;800;900&display=swap');

  @keyframes ticker  { from { transform: translateX(0); }     to { transform: translateX(-50%); } }
  @keyframes float   { 0%,100% { transform: translateY(0); }  50% { transform: translateY(-10px); } }
  @keyframes fadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes slideIn  { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
  @keyframes pulseAmber { 0%,100% { opacity:1; } 50% { opacity:0.55; } }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Jost', 'Segoe UI', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #FAFAF7;
    color: #1C1917;
  }

  ::selection { background: #FEF3C714; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #F5F5F4; }
  ::-webkit-scrollbar-thumb { background: #D6D3D1; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #A8A29E; }

  img { display: block; }
  * { box-sizing: border-box; }

  /* Scale utility not in Tailwind v4 base */
  .scale-103 { transform: scale(1.03); }
  .scale-104 { transform: scale(1.04); }
  .scale-105 { transform: scale(1.05); }
  .scale-108 { transform: scale(1.08); }

  .group:hover .group-hover\\:scale-103 { transform: scale(1.03); }
  .group:hover .group-hover\\:scale-104 { transform: scale(1.04); }
  .group:hover .group-hover\\:scale-105 { transform: scale(1.05); }
  .group:hover .group-hover\\:scale-108 { transform: scale(1.08); }

  /* Duration extras */
  .duration-400 { transition-duration: 400ms; }
  .duration-450 { transition-duration: 450ms; }

  /* Tailwind v4 uses @theme for custom values — add any needed overrides */
`;

// ─── Home Page Component ───────────────────────────────────────────────────
export default function HomePage({
  auth,
  featuredProducts,
  flashDeals,
  categories,
  collections,
  testimonials,
  blogPosts,
  heroSlides,
  stats,
}: HomePageProps) {
  const avatars = [IMG.av1, IMG.av2, IMG.av3, IMG.av4];

  return (
    <>
      {/* SEO */}
      <Head>
        <title>NEXUS — Premium Tech & Lifestyle Gear</title>
        <meta
          name="description"
          content="Discover curated premium tech, fashion, and lifestyle products. Free express shipping on orders over $120. 30-day returns. 2-year guarantee."
        />
        <meta property="og:title" content="NEXUS — Premium Tech & Lifestyle Gear" />
        <meta
          property="og:description"
          content="Curated premium products from the world's best brands. Shop watches, audio, footwear, bags, cameras and more."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inject global CSS */}
        <style>{GLOBAL_CSS}</style>
      </Head>

      {/* ── Layout ─────────────────────────────────────────────────────── */}
      <div className="min-h-screen antialiased">

        {/* Navigation */}
        <Navbar />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <Hero slides={heroSlides} />

        {/* ── Brand Ticker ─────────────────────────────────────────────── */}
        <BrandTicker />

        {/* ── Categories ───────────────────────────────────────────────── */}
        <Categories categories={categories} />

        {/* ── Featured Products ─────────────────────────────────────────── */}
        <FeaturedProducts products={featuredProducts} />

        {/* ── Flash Sale ───────────────────────────────────────────────── */}
        <FlashSale deals={flashDeals} />

        {/* ── Promo Banners ─────────────────────────────────────────────── */}
        <PromoBanners
          bannerStore={IMG.banner1}
          bannerFashion={IMG.banner2}
          bannerGift={IMG.banner3}
        />

        {/* ── Curated Collections ───────────────────────────────────────── */}
        <Collections collections={collections} />

        {/* ── Why NEXUS / Perks ─────────────────────────────────────────── */}
        <WhyNexus />

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <StatsBar stats={stats} />

        {/* ── Testimonials ─────────────────────────────────────────────── */}
        <Testimonials testimonials={testimonials} />

        {/* ── Blog / Journal ────────────────────────────────────────────── */}
        <Journal posts={blogPosts} />

        {/* ── Newsletter ───────────────────────────────────────────────── */}
        <Newsletter
          newsletterImage={IMG.newsletter}
          avatars={avatars}
        />

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <Footer />
      </div>
    </>
  );
}
