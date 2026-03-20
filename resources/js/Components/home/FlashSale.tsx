import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Flame, ArrowRight, ShoppingBag } from 'lucide-react';
import type { FlashDeal } from '../types';

interface FlashSaleProps {
  deals: FlashDeal[];
}

function useCountdown(hours: number, minutes: number, seconds: number) {
  const [time, setTime] = useState({ h: hours, m: minutes, s: seconds });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return time;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-white/8 border border-white/12 rounded-xl flex items-center justify-center">
        <span
          className="text-white text-[28px] font-black leading-none tabular-nums"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {pad(value)}
        </span>
      </div>
      <span className="text-white/40 text-[9px] font-bold tracking-[0.16em] uppercase mt-1.5">
        {label}
      </span>
    </div>
  );
}

export default function FlashSale({ deals }: FlashSaleProps) {
  const time = useCountdown(5, 47, 22);

  return (
    <section className="bg-stone-950 py-20 relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,255,255,0.03) 48px, rgba(255,255,255,0.03) 49px),
            repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.03) 48px, rgba(255,255,255,0.03) 49px)
          `,
        }}
      />

      {/* Amber glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(ellipse, #F59E0B, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Flame size={20} className="text-amber-500 fill-amber-500 animate-pulse" />
              <span className="text-amber-500 text-[11px] font-bold tracking-[0.2em] uppercase">
                Flash Sale · Today Only
              </span>
            </div>
            <h2
              className="text-white text-[clamp(40px,5vw,64px)] font-bold leading-[1.0] tracking-[-0.02em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Exceptional Pieces,<br />
              <em className="italic font-light text-amber-400">Exceptional Prices.</em>
            </h2>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2">
            <TimeUnit value={time.h} label="Hours" />
            <span className="text-white/30 text-[28px] font-black mb-4">:</span>
            <TimeUnit value={time.m} label="Min" />
            <span className="text-white/30 text-[28px] font-black mb-4">:</span>
            <TimeUnit value={time.s} label="Sec" />
          </div>
        </div>

        {/* Deal cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {deals.map((deal) => {
            const p = deal.product;
            return (
              <div
                key={deal.id}
                className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden group hover:bg-white/7 hover:border-white/15 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-400"
                    loading="lazy"
                  />
                  {/* Discount badge */}
                  <div className="absolute top-3 right-3 bg-red-500 text-white font-black text-[18px] px-3 py-1.5 rounded-xl"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    −{deal.discountPercent}%
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-white/40 text-[10px] font-bold tracking-[0.12em] uppercase mb-1.5">
                    {p.brand}
                  </p>
                  <h3 className="text-white font-semibold text-[15px] mb-3 leading-snug"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {p.name}
                  </h3>

                  {/* Prices */}
                  <div className="flex items-baseline gap-2.5 mb-4">
                    <span className="text-amber-400 text-[24px] font-black">${p.price}</span>
                    <span className="text-white/30 text-[14px] line-through">${p.originalPrice}</span>
                  </div>

                  {/* Stock progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-[11px] mb-2">
                      <span className="text-white/45 font-medium">
                        Claimed: {deal.soldPercent}%
                      </span>
                      <span className="text-red-400 font-bold animate-pulse">
                        {deal.stockRemaining} left
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${deal.soldPercent}%`,
                          background: 'linear-gradient(90deg, #F59E0B, #EF4444)',
                        }}
                      />
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 text-[12.5px] font-bold tracking-[0.08em] uppercase rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                    <ShoppingBag size={13} />
                    Claim This Deal
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <Link
            href="/sale"
            className="flex items-center gap-2 text-white/50 text-[12.5px] font-semibold tracking-wide hover:text-white transition-colors"
          >
            View all flash deals <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
