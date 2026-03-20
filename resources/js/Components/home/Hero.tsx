import React, { useState, useEffect, useCallback } from 'react';
import { Link } from '@inertiajs/react';
import {
  ArrowRight, Play, ChevronLeft, ChevronRight,
  ShoppingBag, Truck, RotateCcw, Shield, Flame
} from 'lucide-react';
import type { HeroSlide } from '../types';

interface HeroProps {
  slides: HeroSlide[];
}

export default function Hero({ slides }: HeroProps) {
  const [idx, setIdx]       = useState(0);
  const [fading, setFading] = useState(false);
  const slide               = slides[idx];

  const go = useCallback((to: number) => {
    setFading(true);
    setTimeout(() => {
      setIdx(to);
      setFading(false);
    }, 380);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go((idx + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [idx, go, slides.length]);

  return (
    <section className="relative min-h-screen flex flex-col pt-[108px] overflow-hidden">
      {/* ── Background image ──────────────────────────────────────────── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{ opacity: i === idx ? (fading ? 0 : 1) : 0, transform: i === idx ? 'scale(1)' : 'scale(1.04)' }}
        >
          <img
            src={s.image}
            alt={s.productName}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* ── Overlays ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-stone-950/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center max-w-[1400px] mx-auto w-full px-8 lg:px-16">
        <div
          className="max-w-[600px] transition-all duration-500 ease-out"
          style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(14px)' : 'translateY(0)' }}
        >
          {/* Kicker */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-px" style={{ background: slide.accentColor }} />
            <span className="text-white/65 text-[11.5px] font-semibold tracking-[0.16em] uppercase">
              {slide.kicker}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white leading-[0.94] mb-8 tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(58px, 7vw, 100px)',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
            }}
          >
            {slide.headline.map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <em className="italic">{line}</em> : line}
              </span>
            ))}
          </h1>

          <p className="text-white/65 text-[16.5px] leading-[1.75] max-w-[420px] mb-10 font-light">
            {slide.body}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 mb-14">
            <Link
              href={`/collections/${slides[idx].id}`}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-stone-900 font-bold text-[13.5px] tracking-wide uppercase rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              style={{ background: '#fff' }}
            >
              {slide.cta}
              <ArrowRight size={15} />
            </Link>

            <button className="inline-flex items-center gap-2.5 text-white/75 text-[13px] font-semibold tracking-wide border-b border-white/30 pb-0.5 hover:text-white hover:border-white/60 transition-all duration-200">
              <Play size={13} className="fill-current" />
              {slide.ctaSecondary}
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex items-center gap-7 flex-wrap">
            {[
              { Icon: Truck,     text: 'Free express shipping' },
              { Icon: RotateCcw, text: '30-day returns' },
              { Icon: Shield,    text: '2-year guarantee' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/55 text-[12px] font-medium">
                <Icon size={13} style={{ color: slide.accentColor }} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating product card ──────────────────────────────────────── */}
      <div
        className="absolute bottom-12 right-16 z-20 hidden lg:block transition-all duration-500"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 min-w-[240px] shadow-2xl animate-[float_4s_ease-in-out_infinite]">
          <div
            className="text-[9.5px] font-bold tracking-[0.16em] uppercase mb-1.5"
            style={{ color: slide.accentColor }}
          >
            {slide.tag}
          </div>
          <div className="text-white font-semibold text-[16px] mb-3 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {slide.productName}
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-white text-[22px] font-black">{slide.productPrice}</span>
            <button
              className="flex items-center gap-2 px-4 py-2 text-stone-900 text-[12px] font-bold tracking-wide rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{ background: slide.accentColor }}
            >
              <ShoppingBag size={12} />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* ── Slide controls ────────────────────────────────────────────── */}
      <div className="absolute bottom-10 left-8 lg:left-16 z-20 flex items-center gap-5">
        <span className="text-white/40 text-[10.5px] tracking-[0.14em] tabular-nums hidden sm:inline">
          {String(idx + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]"
              style={{
                width: i === idx ? 28 : 6,
                height: 6,
                background: i === idx ? slide.accentColor : 'rgba(255,255,255,0.35)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex gap-2">
          {[
            { dir: -1, Icon: ChevronLeft },
            { dir:  1, Icon: ChevronRight },
          ].map(({ dir, Icon }) => (
            <button
              key={dir}
              onClick={() => go((idx + dir + slides.length) % slides.length)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              aria-label={dir < 0 ? 'Previous' : 'Next'}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Slide thumbnail tabs ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-8 lg:px-16 pb-10 pt-6">
        <div className="flex gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={[
                'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 flex-1 text-left',
                i === idx
                  ? 'border-white/30 bg-white/15 backdrop-blur-md'
                  : 'border-white/10 bg-white/5 hover:bg-white/10',
              ].join(' ')}
            >
              <img
                src={s.thumbImage}
                alt={s.productName}
                className="w-11 h-11 rounded-lg object-cover shrink-0"
              />
              <div className="hidden sm:block">
                <div className={`text-[12.5px] font-semibold leading-tight ${i === idx ? 'text-white' : 'text-white/60'}`}>
                  {s.productName}
                </div>
                <div
                  className="text-[11.5px] font-bold mt-0.5"
                  style={{ color: i === idx ? s.accentColor : 'rgba(255,255,255,0.4)' }}
                >
                  {s.productPrice}
                </div>
              </div>
              {i === idx && <ChevronRight size={13} className="ml-auto shrink-0" style={{ color: s.accentColor }} />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
