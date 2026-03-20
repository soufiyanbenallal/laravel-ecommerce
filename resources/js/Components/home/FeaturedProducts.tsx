import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Heart, Eye, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import type { Product } from '../types';

// ─── Badge config ──────────────────────────────────────────────────────────
const BADGE: Record<string, { bg: string; text: string }> = {
  bestseller: { bg: 'bg-amber-100 text-amber-700',    text: '' },
  new:        { bg: 'bg-emerald-100 text-emerald-700', text: '' },
  sale:       { bg: 'bg-red-100 text-red-600',         text: '' },
  trending:   { bg: 'bg-stone-100 text-stone-600',     text: '' },
  limited:    { bg: 'bg-violet-100 text-violet-700',   text: '' },
};

// ─── Star rating ───────────────────────────────────────────────────────────
function Stars({ rating, size = 11 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <Star
          key={i} size={size}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

// ─── Single product card ───────────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  tall?: boolean;
}

function ProductCard({ product: p, tall = false }: ProductCardProps) {
  const [isWished, setIsWished] = useState(false);
  const [hovered, setHovered]  = useState(false);

  const disc = p.isSale && p.originalPrice !== p.price
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : 0;

  const badge = p.badge ? BADGE[p.badge] : null;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        'group bg-stone-50 rounded-2xl overflow-hidden border border-stone-100',
        'transition-all duration-300 ease-out cursor-pointer',
        hovered ? 'shadow-2xl shadow-stone-200/80 -translate-y-1.5 border-stone-200' : 'shadow-sm',
      ].join(' ')}
    >
      {/* Image wrapper */}
      <div className={`relative overflow-hidden bg-stone-100 ${tall ? 'h-[520px]' : 'h-[280px]'}`}>
        <img
          src={p.image}
          alt={p.name}
          className={[
            'w-full h-full object-cover transition-transform duration-500 ease-out',
            hovered ? 'scale-105' : 'scale-100',
          ].join(' ')}
          loading="lazy"
        />

        {/* Dark overlay on hover */}
        <div className={`absolute inset-0 bg-stone-900/5 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Badge */}
        {badge && p.badgeLabel && (
          <div className="absolute top-3.5 left-3.5">
            <span className={`text-[10px] font-bold tracking-[0.08em] px-2.5 py-1 rounded-full uppercase ${badge.bg}`}>
              {p.badgeLabel}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className={[
          'absolute top-3 right-3 flex flex-col gap-2 transition-all duration-250',
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2',
        ].join(' ')}>
          <button
            onClick={(e) => { e.preventDefault(); setIsWished((w) => !w); }}
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm border border-stone-100 flex items-center justify-center shadow-md transition-transform active:scale-90 hover:scale-110"
            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={15}
              className={isWished ? 'fill-red-500 text-red-500' : 'text-stone-500'}
            />
          </button>
          <button
            className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm border border-stone-100 flex items-center justify-center shadow-md transition-transform hover:scale-110"
            aria-label="Quick view"
          >
            <Eye size={15} className="text-stone-500" />
          </button>
        </div>

        {/* Quick Add – slides up */}
        <div className={[
          'absolute bottom-0 inset-x-0 p-3.5 transition-transform duration-300 ease-out',
          hovered ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}>
          <button className="w-full flex items-center justify-center gap-2.5 py-3 bg-stone-900 text-white text-[12.5px] font-bold tracking-[0.08em] uppercase rounded-xl hover:bg-amber-500 transition-colors duration-200">
            <ShoppingBag size={13} />
            Quick Add to Cart
          </button>
        </div>
      </div>

      {/* Card info */}
      <div className="px-4 pt-4 pb-5">
        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mb-3">
          {p.variants.slice(0, 4).map((v) => (
            <div
              key={v.id}
              title={v.color}
              className="w-3.5 h-3.5 rounded-full border-2 border-stone-200 cursor-pointer hover:scale-125 transition-transform"
              style={{ background: v.colorHex }}
            />
          ))}
          {p.variants.length > 4 && (
            <span className="text-[10px] text-stone-400 font-medium">+{p.variants.length - 4}</span>
          )}
        </div>

        <p className="text-[10.5px] font-semibold text-stone-400 tracking-[0.1em] uppercase mb-1">
          {p.brand}
        </p>
        <h3 className="text-[15.5px] font-semibold text-stone-900 leading-snug mb-2.5"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {p.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={p.rating} />
          <span className="text-[11px] text-stone-400">{p.rating} ({p.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className={`text-[20px] font-black ${disc > 0 ? 'text-red-500' : 'text-stone-900'}`}>
            ${p.price}
          </span>
          {disc > 0 && (
            <>
              <span className="text-[13px] text-stone-400 line-through">${p.originalPrice}</span>
              <span className="bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                −{disc}%
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── Featured Products section ─────────────────────────────────────────────
const TABS = ['All', 'New Arrivals', 'On Sale', 'Trending'] as const;
type Tab = typeof TABS[number];

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [tab, setTab] = useState<Tab>('All');

  const filtered =
    tab === 'All'         ? products :
    tab === 'New Arrivals'? products.filter((p) => p.isNew) :
    tab === 'On Sale'     ? products.filter((p) => p.isSale) :
                            products.filter((p) => p.badge === 'trending' || p.badge === 'bestseller');

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">

        {/* Section header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-[11px] font-bold text-amber-600 tracking-[0.18em] uppercase">
                Curated Selection
              </span>
            </div>
            <h2
              className="text-[clamp(36px,3.8vw,54px)] font-bold text-stone-900 leading-[1.0] tracking-[-0.025em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Featured<br />
              <em className="italic font-light">Products</em>
            </h2>
          </div>

          <div className="flex flex-col items-end gap-4">
            {/* Filter tabs */}
            <div className="flex overflow-hidden rounded-xl border border-stone-200">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={[
                    'px-4 py-2.5 text-[12px] font-semibold tracking-wide transition-all duration-200 border-r border-stone-200 last:border-r-0 uppercase',
                    t === tab
                      ? 'bg-stone-900 text-white'
                      : 'bg-white text-stone-500 hover:text-stone-900 hover:bg-stone-50',
                  ].join(' ')}
                >
                  {t}
                </button>
              ))}
            </div>

            <Link
              href="/products"
              className="flex items-center gap-1.5 text-amber-600 text-[12.5px] font-semibold tracking-wide hover:gap-2.5 transition-all"
            >
              View All Products <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Asymmetric grid — first card taller */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-auto">
          {filtered.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className={i === 0 && tab === 'All' ? 'row-span-2' : ''}
            >
              <ProductCard product={p} tall={i === 0 && tab === 'All'} />
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-stone-900 text-stone-900 text-[13px] font-bold tracking-wide uppercase rounded-xl hover:bg-stone-900 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            Browse All Products <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
