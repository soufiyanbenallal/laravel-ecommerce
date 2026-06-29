import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import heroImg from "@/assets/hero.jpg";
import catWomenImg from "@/assets/cat-women.jpg";
import catMenImg from "@/assets/cat-men.jpg";
import catShoesImg from "@/assets/cat-shoes.jpg";
import atelierImg from "@/assets/atelier.jpg";
import bannerImg from "@/assets/banner-promo.jpg";

/** Diagonal thin line separator — KENZ signature element */
export function KenzDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-border/60" />
      <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0 rotate-45">
        <rect x="2" y="2" width="6" height="6" fill="none" stroke="#B08D57" strokeWidth="1" />
      </svg>
      <div className="h-px flex-1 bg-border/60" />
    </div>
  );
}

/** Section number marker — editorial style */
export function SectionMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-3">
      <span className="font-display text-[11px] text-accent tracking-[0.3em]">{n}</span>
      <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
    </div>
  );
}

/** Full-bleed editorial hero with giant watermark logotype */
export function EditorialHero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxY = scrollY * 0.28;

  return (
    <section
      ref={heroRef}
      className="relative h-[92vh] min-h-[640px] max-h-[960px] overflow-hidden border-b border-border/40"
    >
      {/* ── Background image with parallax ── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${parallaxY}px) scale(1.08)` }}
      >
        <img
          src={heroImg}
          alt="KENZ Maison — AW Collection"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
      </div>

      {/* ── Giant KENZ watermark (brand signature) ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-end justify-end overflow-hidden select-none"
        aria-hidden
      >
        <span
          className="font-display leading-none text-foreground/[0.04]"
          style={{
            fontSize: "clamp(180px, 28vw, 420px)",
            letterSpacing: "-0.03em",
            fontWeight: 700,
            transform: `translateY(${scrollY * 0.1}px)`,
            willChange: "transform",
          }}
        >
          KENZ
        </span>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 md:pb-24">
        {/* Season tag */}
        <div className="mb-6 flex items-center gap-3 fade-up">
          <div className="h-px w-10 bg-accent/60" />
          <span className="text-[10px] uppercase tracking-[0.32em] text-foreground/60">
            Autumn / Winter 2025 — Vol. 07
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-display font-light leading-[0.9] fade-up"
          style={{ fontSize: "clamp(3.8rem, 9vw, 9rem)", animationDelay: "80ms" }}
        >
          The Art of
          <br />
          <em className="not-italic" style={{ color: "#B08D57" }}>Dressing Well.</em>
        </h1>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between fade-up" style={{ animationDelay: "160ms" }}>
          <p className="max-w-xs text-[13px] font-light leading-relaxed text-foreground/60">
            Premium clothing sourced from artisan workshops across Europe and North Africa — made to last, not to be replaced.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-3 bg-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] font-medium text-background transition-all duration-300 hover:bg-accent cursor-pointer"
            >
              Explore Collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="text-[11px] uppercase tracking-[0.22em] text-foreground/50 hover:text-foreground transition-colors duration-200"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Trust micro-row */}
        <div className="mt-8 flex items-center gap-8 fade-up" style={{ animationDelay: "240ms" }}>
          {[["12+", "Workshops"], ["100%", "Natural Fiber"], ["60d", "Free Returns"], ["∞", "Lifetime Repair"]].map(([v, l]) => (
            <div key={l} className="hidden sm:block">
              <div className="font-display text-xl font-light">{v}</div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 md:flex fade-up" style={{ animationDelay: "400ms" }}>
        <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground" style={{ writingMode: "vertical-rl" }}>
          Scroll
        </div>
        <div className="h-12 w-px bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}

/** Horizontal drag-to-scroll lookbook strip — editorial brand signature */
export function LookbookStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const slides = [
    { img: catWomenImg, label: "Women AW '25", sub: "Look 01" },
    { img: catMenImg, label: "Men Tailoring", sub: "Look 02" },
    { img: catShoesImg, label: "Footwear", sub: "Look 03" },
    { img: atelierImg, label: "The Atelier", sub: "Behind the piece" },
    { img: bannerImg, label: "The Knitwear Edit", sub: "Vol. 07" },
  ];

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const onDown = (e: MouseEvent) => {
      isDown.current = true;
      el.style.cursor = "grabbing";
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
    };
    const onUp = () => { isDown.current = false; el.style.cursor = "grab"; };
    const onMove = (e: MouseEvent) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1.6;
      el.scrollLeft = scrollLeft.current - walk;
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="py-16 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 mb-8 flex items-end justify-between">
        <div>
          <SectionMark n="✦" label="The Lookbook" />
          <h2 className="font-display text-4xl font-light md:text-5xl">
            Wear the story.
          </h2>
        </div>
        <Link
          href="/collections"
          className="hidden text-[11px] uppercase tracking-[0.22em] text-foreground/55 hover:text-accent transition-colors md:inline-block cursor-pointer"
        >
          All Looks →
        </Link>
      </div>

      {/* Horizontal scrolling strip */}
      <div
        ref={stripRef}
        className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-none"
        style={{ cursor: "grab", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {slides.map((s, i) => (
          <div
            key={s.label}
            className="group relative shrink-0 overflow-hidden bg-secondary"
            style={{ width: "clamp(240px, 28vw, 380px)", height: "clamp(340px, 44vw, 520px)" }}
          >
            <img
              src={s.img}
              alt={s.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out p-5">
              <div className="text-[9px] uppercase tracking-[0.28em] text-background/70">{s.sub}</div>
              <div className="font-display text-xl font-light text-background mt-1">{s.label}</div>
            </div>
            {/* Index */}
            <div className="absolute right-4 top-4 font-display text-[11px] tracking-[0.2em] text-background/40">
              0{i + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
          ← Drag to explore
        </p>
      </div>
    </div>
  );
}

/** Brand manifesto strip — full width, statement typography */
export function ManifestoStrip() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-foreground py-20 md:py-28">
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* KENZ watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none" aria-hidden>
        <span
          className="font-display text-background/[0.03] leading-none font-bold"
          style={{ fontSize: "clamp(200px, 35vw, 500px)", letterSpacing: "-0.04em" }}
        >
          KENZ
        </span>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Gold diamond */}
        <div className="mx-auto mb-8 flex h-10 w-10 items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="#B08D57" />
          </svg>
        </div>

        <blockquote className="font-display text-[clamp(1.8rem,4vw,3.4rem)] font-light leading-[1.15] text-background">
          "We believe the most sustainable act of fashion<br className="hidden md:block" />
          <em className="not-italic" style={{ color: "#B08D57" }}> is buying less, and wearing it more."</em>
        </blockquote>

        <div className="mt-8 text-[11px] uppercase tracking-[0.28em] text-background/40">
          — KENZ Maison, Founded 2019
        </div>
      </div>
    </section>
  );
}
