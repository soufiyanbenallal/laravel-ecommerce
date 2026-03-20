import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  ArrowRight, CheckCircle, Star, Clock, Truck, RotateCcw,
  Shield, Headphones, CreditCard, Award, Instagram, Twitter,
  Youtube, Zap, ChevronRight
} from 'lucide-react';
import type { Category, Collection, Testimonial, BlogPost } from '../types';

// ─── Brand Ticker ──────────────────────────────────────────────────────────
const BRANDS = ['Sony', 'Apple', 'Nike', 'Leica', 'Hermès', 'Dyson', 'B&O', 'Samsung', 'Canon', 'Gucci', 'Bose', 'Rolex'];

export function BrandTicker() {
  return (
    <div className="bg-stone-100 border-y border-stone-200 py-4 overflow-hidden">
      <div
        className="flex items-center gap-16 whitespace-nowrap"
        style={{ animation: 'ticker 24s linear infinite', width: 'max-content' }}
      >
        {[...BRANDS, ...BRANDS].map((b, i) => (
          <span
            key={i}
            className="text-stone-400 text-[12px] font-bold tracking-[0.16em] uppercase shrink-0"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Categories ────────────────────────────────────────────────────────────
interface CategoriesProps { categories: Category[] }

export function Categories({ categories }: CategoriesProps) {
  return (
    <section className="bg-[#FAFAF7] py-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-[11px] font-bold text-amber-600 tracking-[0.18em] uppercase">Browse</span>
            </div>
            <h2
              className="text-[clamp(34px,3.5vw,50px)] font-bold text-stone-900 leading-[1.0] tracking-[-0.025em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Shop by Category
            </h2>
          </div>
          <Link href="/categories" className="flex items-center gap-1.5 text-amber-600 text-[12.5px] font-semibold hover:gap-3 transition-all">
            All Categories <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl shadow-sm"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3.5">
                  <div className="text-white font-bold text-[15px] leading-tight">{cat.name}</div>
                  <div className="text-white/65 text-[11.5px] mt-0.5">{cat.count}+ styles</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Promo Banners ─────────────────────────────────────────────────────────
interface PromoBannersProps {
  bannerStore: string;
  bannerFashion: string;
  bannerGift: string;
}

export function PromoBanners({ bannerStore, bannerFashion, bannerGift }: PromoBannersProps) {
  const banners = [
    { img: bannerFashion, tag: 'NEW ARRIVALS',  title: ['Fresh Fits,', 'This Week.'],   cta: 'Shop Fashion', href: '/women' },
    { img: bannerGift,    tag: 'GIFT FINDER',   title: ['Perfect Gift,', 'Found.'],     cta: 'Find a Gift',  href: '/gifts' },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 grid lg:grid-cols-[1.55fr_1fr] gap-5">

        {/* Big banner */}
        <div
          className="relative rounded-3xl overflow-hidden min-h-[420px] cursor-pointer group"
        >
          <img
            src={bannerStore}
            alt="Join NEXUS Pro"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/75 via-stone-950/40 to-stone-950/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-12">
            <div className="mb-3">
              <span className="bg-white/15 backdrop-blur-sm text-white/85 text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full">
                MEMBERS EXCLUSIVE
              </span>
            </div>
            <h3
              className="text-white text-[clamp(30px,3.5vw,44px)] font-bold leading-[1.08] mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Join NEXUS Pro.<br />
              <em className="italic font-light">Save 20%, Always.</em>
            </h3>
            <p className="text-white/65 text-[15px] mb-7 max-w-sm leading-relaxed font-light">
              Member pricing, priority shipping, early drop access, and concierge support — from day one.
            </p>
            <button className="inline-flex w-fit items-center gap-2.5 bg-white text-stone-900 text-[13px] font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 tracking-wide">
              Become a Member · $9/mo <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Two small banners stacked */}
        <div className="flex flex-col gap-5">
          {banners.map((b, i) => (
            <Link
              key={i}
              href={b.href}
              className="relative rounded-2xl overflow-hidden flex-1 min-h-[190px] cursor-pointer group"
            >
              <img
                src={b.img}
                alt={b.title[0]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-450"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/65 via-stone-950/35 to-transparent" />
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <span className="bg-white/15 backdrop-blur-sm text-white/85 text-[9.5px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full w-fit mb-2.5">
                  {b.tag}
                </span>
                <div
                  className="text-white font-bold text-[26px] leading-[1.1] mb-3"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {b.title.map((l, li) => <span key={li} className="block">{l}</span>)}
                </div>
                <span className="flex items-center gap-1.5 text-white/80 text-[12.5px] font-semibold tracking-wide">
                  {b.cta} <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Collections ───────────────────────────────────────────────────────────
interface CollectionsProps { collections: Collection[] }

export function Collections({ collections }: CollectionsProps) {
  return (
    <section className="bg-[#FAFAF7] py-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-emerald-500" />
              <span className="text-[11px] font-bold text-emerald-600 tracking-[0.18em] uppercase">Curated Collections</span>
            </div>
            <h2
              className="text-[clamp(34px,3.5vw,50px)] font-bold text-stone-900 leading-[1.0] tracking-[-0.025em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Shop the<br /><em className="italic font-light">World's Best.</em>
            </h2>
          </div>
          <Link href="/collections" className="flex items-center gap-1.5 text-stone-500 text-[12.5px] font-semibold hover:text-stone-900 transition-colors">
            All Collections <ArrowRight size={13} />
          </Link>
        </div>

        {/* Mosaic layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-3 h-auto md:h-[600px]">
          {/* Tall left */}
          <Link href={`/collections/${collections[0].slug}`}
            className="md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <img src={collections[0].image} alt={collections[0].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 min-h-[300px]" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-7">
              <span className="bg-white/15 backdrop-blur-sm text-white/85 text-[9.5px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full">{collections[0].tag}</span>
              <div className="text-white/55 text-[12px] mt-3 mb-1.5">{collections[0].itemCount} pieces</div>
              <h3 className="text-white font-bold text-[26px] leading-[1.15] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{collections[0].name}</h3>
              <p className="text-white/65 text-[13px] mb-4 leading-relaxed">{collections[0].description}</p>
              <span className="flex items-center gap-1.5 text-white/80 text-[12px] font-bold tracking-wide uppercase">Explore <ArrowRight size={12} /></span>
            </div>
          </Link>

          {/* Top mid */}
          <Link href={`/collections/${collections[1].slug}`}
            className="relative rounded-2xl overflow-hidden group cursor-pointer min-h-[285px]">
            <img src={collections[1].image} alt={collections[1].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-stone-900/35 group-hover:bg-stone-900/20 transition-colors duration-300" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-white/15 text-white/85 text-[9.5px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full w-fit mb-2">{collections[1].tag}</span>
              <h3 className="text-white font-bold text-[22px] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{collections[1].name}</h3>
              <div className="text-white/55 text-[12px] mt-1">{collections[1].itemCount} pieces</div>
            </div>
          </Link>

          {/* Bottom mid — accent colored */}
          <Link href={`/collections/${collections[2].slug}`}
            className="relative rounded-2xl overflow-hidden group cursor-pointer min-h-[285px]"
            style={{ background: collections[2].accentColor }}>
            <img src={collections[2].image} alt={collections[2].name}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${collections[2].accentColor}CC, ${collections[2].accentColor}99)` }} />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="bg-white/20 text-white/90 text-[9.5px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full w-fit mb-2">{collections[2].tag}</span>
              <h3 className="text-white font-bold text-[22px] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{collections[2].name}</h3>
              <div className="text-white/70 text-[12px] mt-1">{collections[2].itemCount} pieces</div>
            </div>
          </Link>

          {/* Tall right */}
          <Link href={`/collections/${collections[3].slug}`}
            className="md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[300px]">
            <img src={collections[3].image} alt={collections[3].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-7">
              <span className="bg-white/15 backdrop-blur-sm text-white/85 text-[9.5px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full">{collections[3].tag}</span>
              <div className="text-white/55 text-[12px] mt-3 mb-1.5">{collections[3].itemCount} pieces</div>
              <h3 className="text-white font-bold text-[26px] leading-[1.15] mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{collections[3].name}</h3>
              <p className="text-white/65 text-[13px] mb-4 leading-relaxed">{collections[3].description}</p>
              <span className="flex items-center gap-1.5 text-white/80 text-[12px] font-bold tracking-wide uppercase">Explore <ArrowRight size={12} /></span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Why NEXUS ─────────────────────────────────────────────────────────────
export function WhyNexus() {
  const perks = [
    { Icon: Truck,      title: 'Free Express Delivery',   body: 'On all orders over $120 worldwide.',    color: '#16A34A' },
    { Icon: RotateCcw,  title: 'Effortless Returns',      body: '30 days, no questions asked.',           color: '#F97316' },
    { Icon: Shield,     title: '2-Year Guarantee',        body: 'On every single product we sell.',       color: '#D97706' },
    { Icon: Headphones, title: 'Concierge Support',       body: 'Real experts available 24/7, always.',   color: '#7C3AED' },
    { Icon: CreditCard, title: 'Secure & Encrypted',      body: '14 payment methods, bank-grade SSL.',    color: '#16A34A' },
    { Icon: Award,      title: 'Authenticity Assured',    body: 'Every item verified before it ships.',   color: '#F97316' },
  ];

  return (
    <section className="bg-stone-100 border-y border-stone-200 py-20">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-500" />
            <span className="text-amber-600 text-[11px] font-bold tracking-[0.18em] uppercase">Why NEXUS</span>
            <div className="w-8 h-px bg-amber-500" />
          </div>
          <h2
            className="text-[clamp(32px,3.5vw,48px)] font-bold text-stone-900 leading-[1.0] tracking-[-0.025em]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Shopping Made <em className="italic font-light">Exceptional</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {perks.map(({ Icon, title, body, color }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 border border-stone-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-250 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-200"
                style={{ background: color + '18' }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="text-stone-900 font-semibold text-[15.5px] mb-2.5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {title}
              </h3>
              <p className="text-stone-500 text-[13.5px] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats bar ─────────────────────────────────────────────────────────────
interface StatsProps {
  stats: { customers: string; countries: string; satisfaction: string; responseTime: string }
}

export function StatsBar({ stats }: StatsProps) {
  const items = [
    { val: stats.customers,    label: 'Happy Customers' },
    { val: stats.countries,    label: 'Countries Delivered' },
    { val: stats.satisfaction, label: 'Satisfaction Score' },
    { val: stats.responseTime, label: 'Support Response' },
  ];

  return (
    <div className="bg-stone-900">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 grid grid-cols-2 lg:grid-cols-4">
        {items.map((x, i) => (
          <div
            key={x.label}
            className={`py-14 px-8 text-center ${i < items.length - 1 ? 'border-r border-white/8' : ''}`}
          >
            <div
              className="text-white text-[clamp(36px,4vw,54px)] font-bold leading-none mb-2 tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {x.val}
            </div>
            <div className="text-white/40 text-[12.5px] font-medium tracking-wide">{x.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
interface TestimonialsProps { testimonials: Testimonial[] }

function Stars5({ size = 13 }: { size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <Star key={i} size={size} className="fill-amber-400 text-amber-400" strokeWidth={1.5} />
      ))}
    </span>
  );
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="bg-[#FAFAF7] py-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stone-300" />
            <span className="text-emerald-600 text-[11px] font-bold tracking-[0.18em] uppercase">Verified Reviews</span>
            <div className="w-8 h-px bg-stone-300" />
          </div>
          <h2
            className="text-[clamp(34px,3.5vw,52px)] font-bold text-stone-900 leading-[1.0] tracking-[-0.025em] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Worn, Loved, <em className="italic font-light">Repeated.</em>
          </h2>
          <div className="flex items-center justify-center gap-2.5">
            <Stars5 size={17} />
            <span className="text-stone-500 text-[14px] font-medium">
              4.9 average · 52,000+ verified reviews
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-9 border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Decorative quote */}
              <div
                className="text-[72px] leading-[0.7] text-amber-500/20 mb-5 select-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                "
              </div>

              <p className="text-stone-500 text-[15.5px] leading-[1.82] mb-8 italic font-light"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-stone-100 shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-stone-900 font-semibold text-[14.5px] truncate">{t.name}</span>
                    {t.verified && <CheckCircle size={13} className="text-emerald-500 fill-emerald-500 shrink-0" />}
                  </div>
                  <div className="text-stone-400 text-[12.5px] truncate">{t.role}</div>
                  {t.productBought && (
                    <div className="text-amber-600 text-[11px] font-medium mt-0.5">
                      Bought: {t.productBought}
                    </div>
                  )}
                </div>
                <Stars5 size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Blog / Journal ────────────────────────────────────────────────────────
interface JournalProps { posts: BlogPost[] }

export function Journal({ posts }: JournalProps) {
  return (
    <section className="bg-white py-24 border-t border-stone-100">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-stone-400" />
              <span className="text-stone-500 text-[11px] font-bold tracking-[0.18em] uppercase">The NEXUS Journal</span>
            </div>
            <h2
              className="text-[clamp(34px,3.5vw,50px)] font-bold text-stone-900 leading-[1.0] tracking-[-0.025em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Fashion as<br /><em className="italic font-light">Conversation.</em>
            </h2>
          </div>
          <Link href="/blog" className="flex items-center gap-1.5 text-stone-400 text-[12.5px] font-semibold hover:text-stone-900 transition-colors">
            All Stories <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group border border-stone-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className={`relative overflow-hidden ${i === 0 ? 'h-64' : 'h-52'}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/30" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-amber-50 text-amber-700 text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full uppercase">
                    {post.tag}
                  </span>
                  <span className="text-stone-400 text-[11px] flex items-center gap-1.5">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>
                <h3
                  className="text-stone-900 font-semibold text-[17px] leading-snug mb-2.5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-stone-400 text-[12.5px] font-medium">By {post.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ────────────────────────────────────────────────────────────
interface NewsletterProps { newsletterImage: string; avatars: string[] }

export function Newsletter({ newsletterImage, avatars }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [done, setDone]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="bg-stone-950">
      <div className="grid lg:grid-cols-2 min-h-[480px]">
        {/* Image */}
        <div className="relative overflow-hidden hidden lg:block">
          <img
            src={newsletterImage}
            alt="Subscribe to NEXUS"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-950" />
          {/* Floating stat */}
          <div className="absolute bottom-10 left-10 bg-white/8 backdrop-blur-xl border border-white/14 rounded-2xl p-6">
            <div
              className="text-white text-[40px] font-bold leading-none mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              200K+
            </div>
            <div className="text-white/50 text-[12.5px]">subscribers worldwide</div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex items-center justify-center py-20 px-8 lg:px-16">
          <div className="max-w-sm w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-amber-500 text-[11px] font-bold tracking-[0.18em] uppercase">The Inner Circle</span>
            </div>

            <h2
              className="text-white text-[clamp(34px,3.5vw,50px)] font-bold leading-[1.05] tracking-[-0.025em] mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              First Access.<br /><em className="italic font-light text-amber-400">Always.</em>
            </h2>

            <p className="text-white/50 text-[15px] leading-relaxed mb-9 font-light">
              Join 200,000+ subscribers who get exclusive drops, member-only pricing, and the NEXUS Journal delivered first.
            </p>

            {!done ? (
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex border border-white/15 rounded-xl overflow-hidden mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 bg-white/6 text-white placeholder-white/30 text-[14px] px-5 py-3.5 outline-none focus:bg-white/8 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-stone-900 text-[12px] font-bold px-5 tracking-wide uppercase transition-colors shrink-0"
                  >
                    Join
                  </button>
                </div>
                <p className="text-white/25 text-[11.5px]">No spam. Unsubscribe anytime. Privacy guaranteed.</p>
              </form>
            ) : (
              <div className="flex items-center gap-3 bg-emerald-950/50 border border-emerald-700/30 rounded-xl px-5 py-4 mb-4">
                <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-semibold text-[14px]">
                  Welcome! Check your inbox for a gift 🎁
                </span>
              </div>
            )}

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-6">
              <div className="flex">
                {avatars.map((av, i) => (
                  <img
                    key={i}
                    src={av}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border-2 border-stone-950"
                    style={{ marginLeft: i > 0 ? -10 : 0 }}
                    loading="lazy"
                  />
                ))}
              </div>
              <span className="text-white/40 text-[12.5px]">
                <strong className="text-white/70">200,000+</strong> already subscribed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
export function Footer() {
  const cols = [
    { title: 'Discover',    links: ['New Arrivals', "Women's Edit", "Men's Edit", 'Brands', 'Gift Cards', 'Sale'] },
    { title: 'Collections', links: ['Summer Edit', 'Urban Architecture', 'Audiophile', 'Sports Edit', 'Seasonal Drops'] },
    { title: 'Company',     links: ['About NEXUS', 'Sustainability', 'Careers', 'Press', 'Partners', 'Journal'] },
    { title: 'Support',     links: ['Help Centre', 'Track Order', 'Returns & Refunds', 'Shipping Info', 'Contact Us', 'Size Guide'] },
  ];

  return (
    <footer className="bg-stone-950 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 py-16 border-b border-white/7">

          {/* Brand col */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span
                className="text-white text-[20px] font-black tracking-[-0.04em]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                NEXUS
              </span>
            </div>
            <p className="text-white/35 text-[13.5px] leading-relaxed max-w-[220px] mb-7 font-light">
              Premium tech & lifestyle gear, curated for those who refuse to compromise.
            </p>
            <div className="flex gap-2.5">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/6 border border-white/9 flex items-center justify-center hover:bg-amber-500/25 hover:border-amber-500/50 transition-all duration-200"
                >
                  <Icon size={14} className="text-white/40" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-white/80 font-bold text-[12px] tracking-[0.10em] uppercase mb-5">
                {col.title}
              </div>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-white/36 text-[13.5px] mb-2.5 hover:text-white/80 transition-colors duration-150 font-light"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <span className="text-white/22 text-[12px]">
            © 2026 NEXUS Commerce, Inc. All rights reserved. Powered by Laravel Shopper.
          </span>
          <div className="flex gap-2 flex-wrap justify-center">
            {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Klarna'].map((pm) => (
              <span
                key={pm}
                className="bg-white/5 border border-white/8 rounded-md px-2.5 py-1 text-white/28 text-[10px] font-bold tracking-wide"
              >
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
