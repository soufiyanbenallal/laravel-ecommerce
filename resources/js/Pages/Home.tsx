import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Search, Heart, Star, ArrowRight, ArrowUpRight,
  Truck, RotateCcw, Shield, Headphones, Zap, X, ChevronRight,
  Play, CheckCircle, Instagram, Twitter, Youtube, Flame,
  CreditCard, Eye, Award, Users, Globe, Minus, Plus,
  MapPin, Package, Share2, TagIcon, Gift, Sparkles, Clock,
  TrendingUp, ChevronDown, ChevronLeft, Circle
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════
   DESIGN TOKENS — Luxury Japanese-Parisian Editorial
   ══════════════════════════════════════════════════════════════════════ */
const T = {
  // Base
  white:   "#FFFFFF",
  paper:   "#FAFAF7",
  cream:   "#F5F2EB",
  silk:    "#EDE9E0",
  // Ink
  ink:     "#0F0D0A",
  inkMid:  "#3D3930",
  inkDim:  "#8A847A",
  inkFaint:"#C4BEB5",
  border:  "#E8E3DA",
  // Accent — saffron gold
  saffron: "#D4880A",
  saffronL:"#FDF4E3",
  saffronD:"#A86B00",
  // Jade
  jade:    "#1A6B4A",
  jadeL:   "#E8F5EE",
  // Crimson
  crimson: "#C8303A",
  crimsonL:"#FCEDEF",
};

/* ══════════════════════════════════════════════════════════════════════
   IMAGES — All real Unsplash photos, exact IDs for consistency
   ══════════════════════════════════════════════════════════════════════ */
const I = {
  // Hero — full-bleed cinematic
  h1: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=95&fit=crop&crop=center",
  h2: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&q=95&fit=crop&crop=center",
  h3: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=95&fit=crop&crop=center",

  // Products — large, clear, beautiful
  pw:  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=90&fit=crop",
  pb:  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=90&fit=crop",
  pp:  "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=90&fit=crop",
  ps:  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90&fit=crop",
  pg:  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90&fit=crop",
  pc:  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=90&fit=crop",
  pj:  "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=90&fit=crop",
  psk: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=90&fit=crop",

  // Editorial / banners
  e1: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=90&fit=crop",
  e2: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=90&fit=crop",
  e3: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=90&fit=crop",
  e4: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1000&q=90&fit=crop",
  e5: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&q=90&fit=crop",

  // People / lifestyle
  l1: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85&fit=crop",
  l2: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85&fit=crop",
  l3: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=85&fit=crop",

  // Avatars
  a1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=85&fit=crop&crop=face",
  a2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=85&fit=crop&crop=face",
  a3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=85&fit=crop&crop=face",
  a4: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=85&fit=crop&crop=face",
};

/* ══════════════════════════════════════════════════════════════════════
   GLOBAL STYLES
   ══════════════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: ${T.paper}; font-family: 'Jost', 'Segoe UI', sans-serif; color: ${T.ink}; -webkit-font-smoothing: antialiased; }

  ::selection { background: ${T.saffron}22; color: ${T.ink}; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes slideIn  { from { transform:translateX(-24px); opacity:0; } to { transform:translateX(0); opacity:1; } }
  @keyframes ticker   { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  @keyframes pulseRed { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
  @keyframes float    { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-8px); } }
  @keyframes shimmer  { 0% { background-position:-400px 0; } 100% { background-position:400px 0; } }
  @keyframes scaleIn  { from { transform:scale(0.97); opacity:0; } to { transform:scale(1); opacity:1; } }
  @keyframes spin     { to { transform:rotate(360deg); } }

  .fade-up   { animation: fadeUp 0.6s ease both; }
  .fade-in   { animation: fadeIn 0.5s ease both; }
  .scale-in  { animation: scaleIn 0.5s cubic-bezier(.22,.68,0,1.2) both; }

  img { display: block; }

  a { text-decoration: none; color: inherit; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${T.paper}; }
  ::-webkit-scrollbar-thumb { background: ${T.inkFaint}; border-radius: 4px; }
`;

/* ══════════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    kicker: "New Season · Spring 2026",
    headline: ["Designed", "for the", "Relentless."],
    body: "TrailForce X9 — where street craft meets performance architecture. A silhouette built to be worn everywhere.",
    cta: "Discover the Collection",
    img: I.h1,
    product: "TrailForce X9 Runner",
    price: "$189",
    tag: "NEW DROP",
    tagColor: T.saffron,
    numTag: "01 / 03",
  },
  {
    kicker: "Fine Craft · Watchmaking",
    headline: ["Time is", "the Only", "Currency."],
    body: "The Apex Chronos — sapphire crystal, Swiss movement, aerospace-grade titanium case. Worn by those who understand.",
    cta: "Explore Timepieces",
    img: I.h2,
    product: "Apex Chronos Pro",
    price: "$489",
    tag: "LIMITED",
    tagColor: T.crimson,
    numTag: "02 / 03",
  },
  {
    kicker: "The Edit · Womenswear",
    headline: ["Fashion is", "an Art,", "Wear it."],
    body: "Curated from Paris, Milan and Tokyo — the season's most considered pieces, brought together for you.",
    cta: "Shop the Edit",
    img: I.h3,
    product: "Seasonal Collection",
    price: "From $89",
    tag: "EXCLUSIVE",
    tagColor: T.jade,
    numTag: "03 / 03",
  },
];

const PRODUCTS = [
  { id:1,  name:"Apex Chronos Pro",       brand:"LUMIÈRE Watch",   price:489,  orig:589,  rating:4.9, rev:1847, img:I.pw,  colors:["#2C2018","#C0A882","#1A1A2E"], isNew:false, isSale:true,  tag:"Best Seller" },
  { id:2,  name:"Studio Pro Max Buds",    brand:"SoundCraft",      price:219,  orig:219,  rating:4.8, rev:3204, img:I.pb,  colors:["#F5F5F0","#1A1A1A","#D4880A"], isNew:true,  isSale:false, tag:"New Arrival" },
  { id:3,  name:"Ambre Soir Parfum",      brand:"Maison Lumière",  price:165,  orig:220,  rating:4.7, rev:912,  img:I.pp,  colors:["#E8D5B0","#C4956A","#8B6914"], isNew:false, isSale:true,  tag:"−25%" },
  { id:4,  name:"TrailForce X9 Runner",   brand:"Kinetic Studio",  price:189,  orig:189,  rating:4.9, rev:5830, img:I.ps,  colors:["#FAFAFA","#1A1A1A","#D4880A"], isNew:true,  isSale:false, tag:"Trending" },
  { id:5,  name:"Cuir Slouch Tote",       brand:"Maison Lumière",  price:385,  orig:485,  rating:4.8, rev:743,  img:I.pg,  colors:["#8B6914","#2C2018","#F5ECD5"], isNew:false, isSale:true,  tag:"−20%" },
  { id:6,  name:"Parallax Mirrorless",    brand:"OpticArts",       price:1149, orig:1399, rating:4.9, rev:521,  img:I.pc,  colors:["#1A1A1A","#7A7A7A"],           isNew:false, isSale:true,  tag:"Editor's Pick" },
  { id:7,  name:"Arctic Shell Jacket",    brand:"Northform",       price:295,  orig:295,  rating:4.6, rev:2108, img:I.pj,  colors:["#E8E8E8","#1A1A1A","#2C4A6E"], isNew:true,  isSale:false, tag:"New In" },
  { id:8,  name:"Radiance Serum Ritual",  brand:"Atelier Skin",    price:89,   orig:89,   rating:4.7, rev:4215, img:I.psk, colors:["#F5DEB3","#E8C4A0","#D4A88A"], isNew:true,  isSale:false, tag:"New In" },
];

const FLASH_PRODUCTS = [
  { id:9,  name:"Voyager Duffel 40L",   brand:"Transit Co",    price:159, orig:259, pct:39, img:I.pg,  stock:6,  sold:87 },
  { id:10, name:"Noir Cashmere Coat",   brand:"Atelier NX",    price:420, orig:680, pct:38, img:I.pj,  stock:11, sold:71 },
  { id:11, name:"Lumino Glow Set",      brand:"Atelier Skin",  price:72,  orig:120, pct:40, img:I.psk, stock:3,  sold:94 },
  { id:12, name:"Crystal ANC Buds",    brand:"SoundCraft",    price:149, orig:229, pct:35, img:I.pb,  stock:8,  sold:62 },
];

const COLLECTIONS = [
  { name:"The Parisian Edit",  desc:"Understated elegance from the world's style capital.", count:48,  img:I.e1, tag:"WOMEN'S" },
  { name:"Urban Architecture", desc:"Technical precision designed for the modern city.",    count:35,  img:I.e2, tag:"MEN'S" },
  { name:"Maison Objects",     desc:"Home pieces that reward daily attention to detail.",   count:27,  img:I.e5, tag:"LIVING" },
  { name:"The Sports Edit",    desc:"Performance elevated. Function as a form of beauty.",  count:61,  img:I.e4, tag:"ACTIVE" },
];

const EDITORIAL_STORIES = [
  { tag:"ESSAY", title:"On the Art of Dressing Precisely", by:"Elena Markov", time:"7 min", img:I.l1 },
  { tag:"GUIDE", title:"The 12 Objects Every Wardrobe Needs", by:"Jean Moreau", time:"5 min", img:I.l2 },
  { tag:"PROFILE", title:"How Kinetic Studio Reinvented the Sneaker", by:"Daisuke Ono", time:"9 min", img:I.l3 },
];

const TESTIMONIALS = [
  { name:"Aria Fontaine",  role:"Art Director, Paris",   rating:5, text:"LUMIÈRE has completely changed how I shop. The curation is extraordinary — nothing exists here by accident. Every piece feels considered, purposeful. I've never returned a single item.", img:I.a1 },
  { name:"Marcus Osei",   role:"Architect, London",     rating:5, text:"The Apex Chronos is the most beautiful object I own. Ordered Tuesday morning, arrived Wednesday afternoon in packaging that felt like receiving a gift. This is what luxury actually feels like.", img:I.a2 },
  { name:"Yuki Nakamura", role:"Creative Director, Tokyo",rating:5, text:"I spent weeks looking for the right leather tote. Found the Cuir Slouch on LUMIÈRE and the craftsmanship is genuinely exceptional. Three months in and it only gets better.", img:I.a3 },
  { name:"James Holt",    role:"Founder, Berlin",       rating:5, text:"The Studio Pro Buds redefined my work-from-home life. LUMIÈRE shipped same-day, packaged beautifully, and the sound quality is something I couldn't find elsewhere at any price.", img:I.a4 },
];

const BRANDS = ["Maison Lumière","Kinetic Studio","OpticArts","Atelier Skin","Northform","SoundCraft","Transit Co","Atelier NX","Parallax","Solaris"];

/* ══════════════════════════════════════════════════════════════════════
   ATOMS
   ══════════════════════════════════════════════════════════════════════ */
const Tag = ({ text, color = T.saffron, bg }) => (
  <span style={{
    display:"inline-flex", alignItems:"center",
    background: bg || color + "16",
    color, fontSize:9.5, fontWeight:700,
    letterSpacing:"0.14em", padding:"4px 11px",
    borderRadius:2, textTransform:"uppercase",
    fontFamily:"'Jost',sans-serif",
  }}>{text}</span>
);

const Stars = ({ n = 5, size = 11 }) => (
  <span style={{ display:"inline-flex", gap:2 }}>
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={size} color={T.saffron}
        fill={i <= n ? T.saffron : "none"} strokeWidth={1.5}/>
    ))}
  </span>
);

// Elegant button — no border-radius extremes, just a clean 3px radius
const Btn = ({ children, onClick=() => {}, v="fill", color=T.ink, sx={} }) => {
  const base = { display:"inline-flex", alignItems:"center", gap:9, padding:"13px 30px", fontSize:13, fontWeight:600, letterSpacing:"0.06em", cursor:"pointer", fontFamily:"'Jost',sans-serif", transition:"all 0.25s", border:"none", borderRadius:3, textTransform:"uppercase" };
  const vars = {
    fill:    { background:color, color:"#fff" },
    outline: { background:"transparent", color:color, border:`1.5px solid ${color}`, padding:"12px 29px" },
    ghost:   { background:"transparent", color:color, padding:"12px 0" },
    saffron: { background:T.saffron, color:"#fff" },
    white:   { background:"#fff", color:T.ink },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...vars[v], ...sx }}
      onMouseEnter={e => {
        if(v==="fill")    { e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-1px)"; }
        if(v==="outline") { e.currentTarget.style.background=color; e.currentTarget.style.color="#fff"; }
        if(v==="saffron") { e.currentTarget.style.background=T.saffronD; e.currentTarget.style.transform="translateY(-1px)"; }
        if(v==="white")   { e.currentTarget.style.background=T.cream; }
        if(v==="ghost")   { e.currentTarget.style.opacity="0.6"; }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity="";
        e.currentTarget.style.transform="";
        e.currentTarget.style.background= vars[v].background||"";
        e.currentTarget.style.color= vars[v].color||"";
      }}
    >{children}</button>
  );
};

const Divider = ({ my = 0 }) => (
  <div style={{ height:1, background:T.border, margin:`${my}px 0` }}/>
);

/* ══════════════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      position:"fixed", top:0, left:0, right:0, zIndex:1000,
      transition:"all 0.4s cubic-bezier(.4,0,.2,1)",
    }}>
      {/* Announcement ribbon */}
      <div style={{ background:T.ink, padding:"10px 0", textAlign:"center" }}>
        <p style={{ color:"rgba(255,255,255,0.75)", fontSize:11.5, fontWeight:500, letterSpacing:"0.08em", margin:0 }}>
          Free express worldwide delivery on orders over <span style={{color:T.saffron, fontWeight:700}}>$120</span> · Use <strong style={{color:"#fff"}}>LUMIERE20</strong> for 20% off your first order
        </p>
      </div>

      {/* Main nav */}
      <div style={{
        background: scrolled ? "rgba(250,250,247,0.97)" : T.paper,
        backdropFilter:"blur(20px)",
        borderBottom:`1px solid ${scrolled ? T.border : "transparent"}`,
        transition:"all 0.35s",
      }}>
        <div style={{
          maxWidth:1400, margin:"0 auto", padding:"0 48px",
          display:"grid", gridTemplateColumns:"1fr auto 1fr",
          alignItems:"center", height:68,
        }}>
          {/* Left nav */}
          <nav style={{ display:"flex", gap:0, alignItems:"center" }}>
            {["New In","Women","Men","Brands","Lifestyle"].map((l, i) => (
              <a key={l} href="#" style={{
                padding:"8px 16px", fontSize:12.5, fontWeight:500,
                letterSpacing:"0.08em", color:T.inkMid,
                textTransform:"uppercase", transition:"color 0.2s",
                borderBottom:"1.5px solid transparent",
              }}
                onMouseEnter={e => { e.currentTarget.style.color=T.ink; e.currentTarget.style.borderBottomColor=T.saffron; }}
                onMouseLeave={e => { e.currentTarget.style.color=T.inkMid; e.currentTarget.style.borderBottomColor="transparent"; }}
              >{l}</a>
            ))}
          </nav>

          {/* Logo — centered */}
          <a href="#" style={{ textAlign:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0 }}>
              <span style={{
                fontSize:22, fontWeight:300, color:T.ink,
                fontFamily:"'Cormorant Garamond',Georgia,serif",
                letterSpacing:"0.32em", lineHeight:1,
                textTransform:"uppercase",
              }}>LUMIÈRE</span>
              <div style={{ width:24, height:1, background:T.saffron, margin:"4px auto 0" }}/>
            </div>
          </a>

          {/* Right actions */}
          <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center", gap:4 }}>
            {/* Search */}
            <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
              {searchOpen && (
                <input
                  autoFocus value={q} onChange={e => setQ(e.target.value)}
                  placeholder="Search…"
                  style={{
                    position:"absolute", right:"100%", marginRight:8,
                    width:220, background:"#fff",
                    border:`1px solid ${T.border}`, borderRadius:2,
                    padding:"9px 14px", fontSize:13, fontFamily:"'Jost',sans-serif",
                    color:T.ink, outline:"none",
                    boxShadow:"0 4px 20px rgba(0,0,0,0.08)",
                    animation:"slideIn 0.2s ease",
                  }}
                />
              )}
              <button onClick={() => setSearchOpen(!searchOpen)} style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer", color:T.inkMid, transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color=T.ink}
                onMouseLeave={e=>e.currentTarget.style.color=T.inkMid}
              >
                {searchOpen ? <X size={17}/> : <Search size={17}/>}
              </button>
            </div>

            {["heart", "bag"].map((icon, i) => (
              <button key={icon} style={{ width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer", color:T.inkMid, position:"relative", transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color=T.ink}
                onMouseLeave={e=>e.currentTarget.style.color=T.inkMid}
              >
                {icon==="heart" ? <Heart size={17}/> : <ShoppingBag size={17}/>}
                {icon==="bag" && (
                  <span style={{ position:"absolute", top:6, right:6, width:14, height:14, background:T.saffron, borderRadius:"50%", fontSize:8, fontWeight:700, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>3</span>
                )}
              </button>
            ))}

            <div style={{ width:1, height:18, background:T.border, margin:"0 8px" }}/>
            <a href="#" style={{ fontSize:12, fontWeight:600, color:T.inkMid, letterSpacing:"0.06em", textTransform:"uppercase", transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color=T.ink}
              onMouseLeave={e=>e.currentTarget.style.color=T.inkMid}
            >Sign In</a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   HERO — Full-bleed cinematic with asymmetric layout
   ══════════════════════════════════════════════════════════════════════ */
function Hero() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const s = HERO_SLIDES[idx];

  const go = (to) => {
    setFading(true);
    setTimeout(() => { setIdx(to); setFading(false); }, 380);
  };

  useEffect(() => {
    const t = setInterval(() => go((idx + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, [idx]);

  return (
    <section style={{
      height:"100vh", minHeight:700, position:"relative",
      overflow:"hidden", paddingTop:108,
      display:"flex", flexDirection:"column",
    }}>
      {/* Background image */}
      <img
        key={idx} src={s.img} alt={s.product}
        style={{
          position:"absolute", inset:0, width:"100%", height:"100%",
          objectFit:"cover", objectPosition:"center",
          opacity: fading ? 0 : 1,
          transform: fading ? "scale(1.02)" : "scale(1)",
          transition:"opacity 0.5s ease, transform 0.5s ease",
        }}
      />

      {/* Layered overlays */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg, rgba(15,13,10,0.72) 0%, rgba(15,13,10,0.28) 55%, rgba(15,13,10,0.10) 100%)" }}/>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(15,13,10,0.55) 0%, transparent 50%)" }}/>

      {/* Content */}
      <div style={{
        flex:1, maxWidth:1400, margin:"0 auto", padding:"0 48px",
        width:"100%", display:"flex", alignItems:"center",
        position:"relative", zIndex:2,
      }}>
        <div style={{
          maxWidth:620,
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(16px)" : "translateY(0)",
          transition:"opacity 0.4s ease, transform 0.4s ease",
        }}>
          {/* Kicker */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
            <div style={{ width:32, height:1.5, background:T.saffron }}/>
            <span style={{ color:"rgba(255,255,255,0.72)", fontSize:11.5, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase" }}>
              {s.kicker}
            </span>
          </div>

          {/* Headline — Cormorant for drama */}
          <h1 style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontSize:"clamp(60px,7.5vw,108px)",
            fontWeight:300, color:"#fff", lineHeight:0.95,
            letterSpacing:"-0.01em", margin:"0 0 32px",
          }}>
            {s.headline.map((line, i) => (
              <span key={i} style={{ display:"block", fontStyle: i===1 ? "italic" : "normal" }}>
                {i===1 ? <em>{line}</em> : line}
              </span>
            ))}
          </h1>

          <p style={{ color:"rgba(255,255,255,0.68)", fontSize:16, lineHeight:1.78, maxWidth:440, marginBottom:40, fontWeight:300 }}>
            {s.body}
          </p>

          <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:60 }}>
            <Btn v="white">{s.cta} <ArrowRight size={14}/></Btn>
            <Btn v="ghost" sx={{ color:"rgba(255,255,255,0.75)", borderBottom:"1px solid rgba(255,255,255,0.35)", borderRadius:0, padding:"12px 0", paddingBottom:"4px" }}>
              <Play size={13} fill="rgba(255,255,255,0.75)"/> Watch Film
            </Btn>
          </div>

          {/* Trust pills */}
          <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
            {[{ icon:Truck, t:"Free express shipping" },{ icon:RotateCcw, t:"30-day returns" },{ icon:Shield, t:"2-year guarantee" }].map((x,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:7, color:"rgba(255,255,255,0.6)", fontSize:12.5, fontWeight:400 }}>
                <x.icon size={13} color={T.saffron}/> {x.t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating product card — bottom right */}
      <div style={{
        position:"absolute", bottom:48, right:64, zIndex:3,
        background:"rgba(255,255,255,0.10)", backdropFilter:"blur(16px)",
        border:"1px solid rgba(255,255,255,0.20)",
        borderRadius:4, padding:"20px 24px", minWidth:240,
        opacity: fading ? 0 : 1, transition:"opacity 0.4s",
        animation:"float 4s ease-in-out infinite",
      }}>
        <span style={{ color:s.tagColor, fontSize:9.5, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" }}>{s.tag}</span>
        <div style={{ color:"#fff", fontWeight:600, fontSize:16, margin:"6px 0 10px", fontFamily:"'Cormorant Garamond',Georgia,serif" }}>{s.product}</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
          <span style={{ color:"#fff", fontWeight:700, fontSize:20, fontFamily:"'Jost',sans-serif" }}>{s.price}</span>
          <button style={{
            background:T.saffron, color:"#fff", border:"none",
            borderRadius:3, padding:"9px 18px", fontSize:11.5, fontWeight:700,
            cursor:"pointer", fontFamily:"'Jost',sans-serif", letterSpacing:"0.06em",
            textTransform:"uppercase", transition:"background 0.2s",
          }}
            onMouseEnter={e=>e.currentTarget.style.background=T.saffronD}
            onMouseLeave={e=>e.currentTarget.style.background=T.saffron}
          >Add to Bag</button>
        </div>
      </div>

      {/* Slide counter + controls — bottom left */}
      <div style={{
        position:"absolute", bottom:48, left:48, zIndex:3,
        display:"flex", alignItems:"center", gap:20,
      }}>
        <span style={{ color:"rgba(255,255,255,0.5)", fontSize:11, letterSpacing:"0.12em", fontVariantNumeric:"tabular-nums" }}>
          {s.numTag}
        </span>
        <div style={{ display:"flex", gap:6 }}>
          {HERO_SLIDES.map((_,i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i===idx ? 28 : 6, height:6, borderRadius:99,
              background: i===idx ? T.saffron : "rgba(255,255,255,0.35)",
              border:"none", cursor:"pointer", padding:0,
              transition:"all 0.35s cubic-bezier(.4,0,.2,1)",
            }}/>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={() => go((idx-1+HERO_SLIDES.length)%HERO_SLIDES.length)} style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.10)"}
          ><ChevronLeft size={14} color="#fff"/></button>
          <button onClick={() => go((idx+1)%HERO_SLIDES.length)} style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.10)"}
          ><ChevronRight size={14} color="#fff"/></button>
        </div>
      </div>

      {/* Vertical brand ticker — right edge */}
      <div style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%) rotate(90deg)", zIndex:3, transformOrigin:"center" }}>
        <div style={{ display:"flex", gap:32, animation:"ticker 16s linear infinite", whiteSpace:"nowrap" }}>
          {[...BRANDS,...BRANDS].map((b,i) => (
            <span key={i} style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.3)", letterSpacing:"0.14em", textTransform:"uppercase" }}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MARQUEE / BRAND STRIP
   ══════════════════════════════════════════════════════════════════════ */
function Marquee() {
  return (
    <div style={{ background:T.cream, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"16px 0", overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:56, animation:"ticker 24s linear infinite", whiteSpace:"nowrap", width:"max-content" }}>
        {[...BRANDS,...BRANDS].map((b,i) => (
          <span key={i} style={{ fontSize:12, fontWeight:600, color:T.inkFaint, letterSpacing:"0.14em", textTransform:"uppercase", flexShrink:0 }}>{b}</span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FEATURED PRODUCTS — Editorial grid with asymmetric sizing
   ══════════════════════════════════════════════════════════════════════ */
function FeaturedProducts() {
  const [wish, setWish] = useState([]);
  const [hov, setHov] = useState(null);
  const [tab, setTab] = useState("All");
  const tabs = ["All","New Arrivals","On Sale","Trending"];

  const list = tab==="All" ? PRODUCTS
    : tab==="New Arrivals" ? PRODUCTS.filter(p=>p.isNew)
    : tab==="On Sale"      ? PRODUCTS.filter(p=>p.isSale)
    : PRODUCTS.filter(p=>p.tag==="Trending"||p.tag==="Best Seller");

  const badgeColors = {
    "Best Seller":  { c:T.saffron,  bg:T.saffronL },
    "New Arrival":  { c:T.jade,     bg:T.jadeL },
    "New In":       { c:T.jade,     bg:T.jadeL },
    "Trending":     { c:T.inkMid,   bg:T.silk },
    "Editor's Pick":{ c:T.inkMid,   bg:T.silk },
  };
  const bc = t => badgeColors[t] || { c:T.crimson, bg:T.crimsonL };

  return (
    <section style={{ background:T.paper, padding:"100px 0" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px" }}>

        {/* Section header — editorial style */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:56 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:24, height:1.5, background:T.saffron }}/>
              <span style={{ fontSize:11, fontWeight:600, color:T.saffron, letterSpacing:"0.16em", textTransform:"uppercase" }}>Curated Selection</span>
            </div>
            <h2 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(42px,4vw,62px)", fontWeight:300,
              color:T.ink, lineHeight:1.0, letterSpacing:"-0.01em",
            }}>
              Featured<br/><em style={{ fontStyle:"italic" }}>Products</em>
            </h2>
          </div>

          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:16 }}>
            <div style={{ display:"flex", gap:0, border:`1px solid ${T.border}`, borderRadius:3, overflow:"hidden" }}>
              {tabs.map(t => (
                <button key={t} onClick={()=>setTab(t)} style={{
                  padding:"9px 18px", fontSize:12, fontWeight:600, letterSpacing:"0.06em",
                  background: t===tab ? T.ink : "transparent",
                  color: t===tab ? "#fff" : T.inkDim,
                  border:"none", cursor:"pointer", fontFamily:"'Jost',sans-serif",
                  textTransform:"uppercase", transition:"all 0.2s",
                  borderRight:`1px solid ${T.border}`,
                }}>{t}</button>
              ))}
            </div>
            <a href="#" style={{ color:T.saffron, fontSize:12, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:6 }}>
              View All <ArrowRight size={13}/>
            </a>
          </div>
        </div>

        {/* Product Grid — asymmetric: first card tall, rest standard */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, gridAutoRows:"auto" }}>
          {list.map((p, i) => {
            const isH = hov === p.id;
            const disc = p.isSale && p.orig !== p.price ? Math.round((1-p.price/p.orig)*100) : 0;
            const b = bc(p.tag);
            const isTall = i === 0 && tab === "All"; // first card spans 2 rows

            return (
              <div key={p.id}
                onMouseEnter={() => setHov(p.id)}
                onMouseLeave={() => setHov(null)}
                style={{
                  gridRow: isTall ? "span 2" : "span 1",
                  background:T.white, cursor:"pointer",
                  transition:"box-shadow 0.35s, transform 0.35s",
                  boxShadow: isH ? "0 24px 64px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.04)",
                  transform: isH ? "translateY(-4px)" : "none",
                  position:"relative", overflow:"hidden",
                  borderRadius:2,
                  border:`1px solid ${T.border}`,
                }}
              >
                {/* Image */}
                <div style={{ position:"relative", height: isTall ? 520 : 280, overflow:"hidden" }}>
                  <img src={p.img} alt={p.name}
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s cubic-bezier(.4,0,.2,1)", transform: isH ? "scale(1.05)" : "scale(1)" }}
                  />
                  <div style={{ position:"absolute", inset:0, background:"rgba(15,13,10,0.0)", opacity: isH ? 1 : 0, transition:"opacity 0.3s" }}/>

                  {/* Badge */}
                  <div style={{ position:"absolute", top:14, left:14 }}>
                    <span style={{ background:b.bg, color:b.c, fontSize:9.5, fontWeight:700, letterSpacing:"0.12em", padding:"4px 10px", borderRadius:2, textTransform:"uppercase" }}>{p.tag}</span>
                  </div>

                  {/* Actions — appear on hover */}
                  <div style={{
                    position:"absolute", top:12, right:12,
                    display:"flex", flexDirection:"column", gap:7,
                    opacity: isH ? 1 : 0,
                    transform: isH ? "translateX(0)" : "translateX(8px)",
                    transition:"all 0.28s",
                  }}>
                    <button
                      onClick={e => { e.stopPropagation(); setWish(w => w.includes(p.id) ? w.filter(x=>x!==p.id) : [...w,p.id]); }}
                      style={{ width:36, height:36, borderRadius:2, background:"rgba(255,255,255,0.95)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", backdropFilter:"blur(6px)" }}
                    >
                      <Heart size={15} color={wish.includes(p.id) ? T.crimson : T.inkMid} fill={wish.includes(p.id) ? T.crimson : "none"}/>
                    </button>
                    <button style={{ width:36, height:36, borderRadius:2, background:"rgba(255,255,255,0.95)", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", backdropFilter:"blur(6px)" }}>
                      <Eye size={15} color={T.inkMid}/>
                    </button>
                  </div>

                  {/* Quick add — slides up on hover */}
                  <div style={{
                    position:"absolute", bottom:0, left:0, right:0,
                    transform: isH ? "translateY(0)" : "translateY(100%)",
                    transition:"transform 0.3s cubic-bezier(.4,0,.2,1)",
                  }}>
                    <button style={{
                      width:"100%", background:T.ink, color:"#fff",
                      border:"none", padding:"14px 0", fontSize:12, fontWeight:700,
                      cursor:"pointer", fontFamily:"'Jost',sans-serif",
                      letterSpacing:"0.10em", textTransform:"uppercase",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:9,
                      transition:"background 0.2s",
                    }}
                      onMouseEnter={e=>e.currentTarget.style.background=T.saffron}
                      onMouseLeave={e=>e.currentTarget.style.background=T.ink}
                    >
                      <ShoppingBag size={13}/> Add to Bag
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding:"16px 18px 20px" }}>
                  <div style={{ display:"flex", gap:5, marginBottom:10 }}>
                    {p.colors.map((c,ci) => (
                      <div key={ci} style={{ width:13, height:13, borderRadius:"50%", background:c, border:`1.5px solid ${T.border}`, cursor:"pointer", transition:"transform 0.2s" }}
                        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.2)"}
                        onMouseLeave={e=>e.currentTarget.style.transform=""}
                      />
                    ))}
                  </div>
                  <p style={{ color:T.inkDim, fontSize:10.5, fontWeight:600, letterSpacing:"0.10em", textTransform:"uppercase", marginBottom:4 }}>{p.brand}</p>
                  <p style={{ color:T.ink, fontWeight:600, fontSize:15.5, lineHeight:1.35, marginBottom:10, fontFamily:"'Cormorant Garamond',Georgia,serif" }}>{p.name}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:12 }}>
                    <Stars n={Math.round(p.rating)}/>
                    <span style={{ color:T.inkFaint, fontSize:11 }}>{p.rating} ({p.rev.toLocaleString()})</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"baseline", gap:9 }}>
                    <span style={{ fontSize:20, fontWeight:700, color: disc>0 ? T.crimson : T.ink, fontFamily:"'Jost',sans-serif" }}>${p.price}</span>
                    {disc>0 && <>
                      <span style={{ fontSize:13, color:T.inkFaint, textDecoration:"line-through" }}>${p.orig}</span>
                      <span style={{ background:T.crimsonL, color:T.crimson, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:2, textTransform:"uppercase", letterSpacing:"0.06em" }}>−{disc}%</span>
                    </>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   EDITORIAL SPLIT — Large image + copy, alternating
   ══════════════════════════════════════════════════════════════════════ */
function EditorialSplit() {
  const panels = [
    {
      tag:"MEMBER BENEFIT",
      title:["Join Lumière", "Maison & Save", "20% Always."],
      body:"Unlock member-only pricing across every category. Priority shipping, early access to limited drops, and concierge support — from day one.",
      cta:"Become a Member · €9/mo",
      img:I.e2, imgSide:"right",
      accent:T.saffron,
    },
    {
      tag:"THE SEASON'S EDIT",
      title:["Fresh Vision.", "Curated", "Weekly."],
      body:"Our buyers travel the world to bring you the season's most considered pieces — before they reach anyone else.",
      cta:"Explore New Arrivals",
      img:I.e1, imgSide:"left",
      accent:T.jade,
    },
  ];

  return (
    <section style={{ background:T.white }}>
      {panels.map((p, pi) => (
        <div key={pi} style={{
          display:"grid",
          gridTemplateColumns: p.imgSide==="right" ? "1fr 1fr" : "1fr 1fr",
          minHeight:560,
          borderTop:`1px solid ${T.border}`,
        }}>
          {/* Copy side */}
          {p.imgSide==="right" && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 80px" }}>
              <div style={{ maxWidth:420 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
                  <div style={{ width:20, height:1.5, background:p.accent }}/>
                  <span style={{ fontSize:10.5, fontWeight:700, color:p.accent, letterSpacing:"0.16em", textTransform:"uppercase" }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(36px,3.5vw,52px)", fontWeight:300, color:T.ink, lineHeight:1.05, letterSpacing:"-0.01em", margin:"0 0 24px" }}>
                  {p.title.map((l,i) => <span key={i} style={{ display:"block", fontStyle:i===2?"italic":"normal" }}>{l}</span>)}
                </h3>
                <p style={{ color:T.inkDim, fontSize:15.5, lineHeight:1.75, marginBottom:36, fontWeight:300 }}>{p.body}</p>
                <Btn v="fill" color={p.accent}>{p.cta} <ArrowRight size={14}/></Btn>
                <div style={{ display:"flex", gap:32, marginTop:40 }}>
                  {[{ n:"180+", l:"Countries shipped" },{ n:"48hr", l:"Max delivery" },{ n:"99%", l:"Satisfaction" }].map((x,i) => (
                    <div key={i}>
                      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:32, fontWeight:600, color:T.ink, lineHeight:1 }}>{x.n}</div>
                      <div style={{ fontSize:11, color:T.inkDim, marginTop:4, letterSpacing:"0.06em" }}>{x.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Image side */}
          <div style={{ position:"relative", overflow:"hidden" }}>
            <img src={p.img} alt={p.title[0]}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s", cursor:"default" }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 60%, rgba(15,13,10,0.25) 100%)" }}/>
          </div>

          {/* Copy side (left variant) */}
          {p.imgSide==="left" && (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 80px" }}>
              <div style={{ maxWidth:420 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
                  <div style={{ width:20, height:1.5, background:p.accent }}/>
                  <span style={{ fontSize:10.5, fontWeight:700, color:p.accent, letterSpacing:"0.16em", textTransform:"uppercase" }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(36px,3.5vw,52px)", fontWeight:300, color:T.ink, lineHeight:1.05, letterSpacing:"-0.01em", margin:"0 0 24px" }}>
                  {p.title.map((l,i) => <span key={i} style={{ display:"block", fontStyle:i===0?"italic":"normal" }}>{l}</span>)}
                </h3>
                <p style={{ color:T.inkDim, fontSize:15.5, lineHeight:1.75, marginBottom:36, fontWeight:300 }}>{p.body}</p>
                <Btn v="fill" color={p.accent}>{p.cta} <ArrowRight size={14}/></Btn>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FLASH SALE — Energetic section with bold countdown
   ══════════════════════════════════════════════════════════════════════ */
function FlashSale() {
  const [t, setT] = useState({ h:6, m:22, s:48 });
  useEffect(() => {
    const id = setInterval(() => setT(p => {
      let { h, m, s } = p; s--;
      if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=23;m=59;s=59;}
      return { h, m, s };
    }), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2,"0");

  return (
    <section style={{ background:T.ink, padding:"88px 0", position:"relative", overflow:"hidden" }}>
      {/* Texture */}
      <div style={{ position:"absolute", inset:0, backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.013) 40px,rgba(255,255,255,0.013) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.013) 40px,rgba(255,255,255,0.013) 41px)` }}/>
      {/* Saffron glow */}
      <div style={{ position:"absolute", top:"-20%", left:"50%", transform:"translateX(-50%)", width:800, height:400, background:`radial-gradient(ellipse,${T.saffron}18 0%,transparent 65%)`, pointerEvents:"none" }}/>

      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px", position:"relative", zIndex:1 }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:56 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <Flame size={20} color={T.saffron} fill={T.saffron}/>
              <span style={{ color:T.saffron, fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase" }}>Flash Sale — Today Only</span>
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(44px,5vw,70px)", fontWeight:300, color:"#fff", lineHeight:1, letterSpacing:"-0.01em" }}>
              Exceptional Pieces,<br/><em>Exceptional Prices.</em>
            </h2>
          </div>

          {/* Countdown */}
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            {[{v:t.h,l:"HRS"},{v:t.m,l:"MIN"},{v:t.s,l:"SEC"}].map((x,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{
                    width:72, height:72,
                    background:"rgba(255,255,255,0.06)",
                    border:`1px solid rgba(255,255,255,0.10)`,
                    borderRadius:3, display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"'Cormorant Garamond',Georgia,serif",
                    fontSize:36, fontWeight:600, color:"#fff", lineHeight:1,
                  }}>{pad(x.v)}</div>
                  <div style={{ color:"rgba(255,255,255,0.35)", fontSize:9, letterSpacing:"0.14em", marginTop:6, fontWeight:600, textTransform:"uppercase" }}>{x.l}</div>
                </div>
                {i<2 && <span style={{ color:"rgba(255,255,255,0.3)", fontSize:28, marginBottom:20, fontWeight:300 }}>:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }}>
          {FLASH_PRODUCTS.map((p,i) => (
            <div key={p.id} style={{
              background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.07)",
              transition:"all 0.3s", cursor:"pointer", overflow:"hidden",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}
            >
              {/* Image */}
              <div style={{ position:"relative", height:240, overflow:"hidden" }}>
                <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"brightness(0.88)", transition:"filter 0.3s, transform 0.4s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.filter="brightness(0.98)"; e.currentTarget.style.transform="scale(1.04)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.filter="brightness(0.88)"; e.currentTarget.style.transform="scale(1)"; }}
                />
                <div style={{ position:"absolute", top:14, right:14, background:T.crimson, color:"#fff", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:22, fontWeight:600, padding:"6px 14px", borderRadius:2 }}>
                  −{p.pct}%
                </div>
              </div>

              <div style={{ padding:"20px 22px 24px" }}>
                <p style={{ color:"rgba(255,255,255,0.4)", fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:4 }}>{p.brand}</p>
                <p style={{ color:"#fff", fontWeight:500, fontSize:15.5, marginBottom:14, fontFamily:"'Cormorant Garamond',Georgia,serif" }}>{p.name}</p>

                <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:16 }}>
                  <span style={{ fontSize:24, fontWeight:700, color:T.saffron }}>${p.price}</span>
                  <span style={{ fontSize:14, color:"rgba(255,255,255,0.3)", textDecoration:"line-through" }}>${p.orig}</span>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom:18 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ color:"rgba(255,255,255,0.45)", fontSize:11, fontWeight:500 }}>Claimed: {p.sold}%</span>
                    <span style={{ color:T.crimson, fontSize:11, fontWeight:700, animation:"pulseRed 1.5s ease infinite" }}>{p.stock} remaining</span>
                  </div>
                  <div style={{ height:3, background:"rgba(255,255,255,0.08)", borderRadius:99 }}>
                    <div style={{ height:"100%", width:`${p.sold}%`, background:`linear-gradient(90deg,${T.saffron},${T.crimson})`, borderRadius:99, transition:"width 1s" }}/>
                  </div>
                </div>

                <button style={{
                  width:"100%", background:T.saffron, color:"#fff", border:"none",
                  padding:"12px 0", fontSize:12, fontWeight:700,
                  cursor:"pointer", fontFamily:"'Jost',sans-serif",
                  letterSpacing:"0.10em", textTransform:"uppercase", borderRadius:2,
                  transition:"background 0.2s",
                }}
                  onMouseEnter={e=>e.currentTarget.style.background=T.saffronD}
                  onMouseLeave={e=>e.currentTarget.style.background=T.saffron}
                >Claim This Deal</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   COLLECTIONS — Full-bleed mosaic
   ══════════════════════════════════════════════════════════════════════ */
function Collections() {
  return (
    <section style={{ background:T.paper, padding:"100px 0" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:56 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:24, height:1.5, background:T.jade }}/>
              <span style={{ fontSize:11, fontWeight:600, color:T.jade, letterSpacing:"0.16em", textTransform:"uppercase" }}>Curated Collections</span>
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(42px,4vw,62px)", fontWeight:300, color:T.ink, lineHeight:1, letterSpacing:"-0.01em" }}>
              Shop the<br/><em>World's Best.</em>
            </h2>
          </div>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:7, color:T.inkDim, fontSize:12, fontWeight:600, letterSpacing:"0.10em", textTransform:"uppercase", transition:"color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.color=T.ink}
            onMouseLeave={e=>e.currentTarget.style.color=T.inkDim}
          >All Collections <ArrowRight size={13}/></a>
        </div>

        {/* Mosaic: 2 tall left + 2 stacked right */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gridTemplateRows:"300px 300px", gap:3 }}>
          {/* Big left */}
          <div style={{ gridRow:"1/3", position:"relative", overflow:"hidden", cursor:"pointer" }}
            onMouseEnter={e=>e.currentTarget.querySelector("img").style.transform="scale(1.04)"}
            onMouseLeave={e=>e.currentTarget.querySelector("img").style.transform="scale(1)"}
          >
            <img src={COLLECTIONS[0].img} alt={COLLECTIONS[0].name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(15,13,10,0.7) 0%,transparent 55%)" }}/>
            <div style={{ position:"absolute", bottom:30, left:28 }}>
              <Tag text={COLLECTIONS[0].tag} color="rgba(255,255,255,0.8)" bg="rgba(255,255,255,0.14)"/>
              <div style={{ color:"#fff", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:30, fontWeight:400, marginTop:10, marginBottom:6, lineHeight:1.1 }}>{COLLECTIONS[0].name}</div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13 }}>{COLLECTIONS[0].count} pieces</div>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:16, color:"rgba(255,255,255,0.8)", fontSize:12, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                Explore <ArrowRight size={12}/>
              </div>
            </div>
          </div>

          {/* Top mid */}
          <div style={{ position:"relative", overflow:"hidden", cursor:"pointer" }}
            onMouseEnter={e=>e.currentTarget.querySelector("img").style.transform="scale(1.05)"}
            onMouseLeave={e=>e.currentTarget.querySelector("img").style.transform="scale(1)"}
          >
            <img src={COLLECTIONS[1].img} alt={COLLECTIONS[1].name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s" }}/>
            <div style={{ position:"absolute", inset:0, background:"rgba(15,13,10,0.35)" }}/>
            <div style={{ position:"absolute", inset:"20px 22px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <Tag text={COLLECTIONS[1].tag} color="rgba(255,255,255,0.8)" bg="rgba(255,255,255,0.14)"/>
              <div style={{ color:"#fff", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:24, marginTop:8, marginBottom:3 }}>{COLLECTIONS[1].name}</div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:12 }}>{COLLECTIONS[1].count} pieces</div>
            </div>
          </div>

          {/* Bottom mid */}
          <div style={{ position:"relative", overflow:"hidden", cursor:"pointer", background:T.saffron }}
            onMouseEnter={e=>{const img=e.currentTarget.querySelector("img"); if(img)img.style.transform="scale(1.05)"}}
            onMouseLeave={e=>{const img=e.currentTarget.querySelector("img"); if(img)img.style.transform="scale(1)"}}
          >
            <img src={COLLECTIONS[2].img} alt={COLLECTIONS[2].name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s", opacity:0.6 }}/>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,${T.saffron}CC 0%,${T.saffronD}99 100%)` }}/>
            <div style={{ position:"absolute", inset:"20px 22px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <Tag text={COLLECTIONS[2].tag} color="#fff" bg="rgba(255,255,255,0.2)"/>
              <div style={{ color:"#fff", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:24, marginTop:8, marginBottom:3 }}>{COLLECTIONS[2].name}</div>
              <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12 }}>{COLLECTIONS[2].count} pieces</div>
            </div>
          </div>

          {/* Right big */}
          <div style={{ gridRow:"1/3", position:"relative", overflow:"hidden", cursor:"pointer" }}
            onMouseEnter={e=>e.currentTarget.querySelector("img").style.transform="scale(1.04)"}
            onMouseLeave={e=>e.currentTarget.querySelector("img").style.transform="scale(1)"}
          >
            <img src={COLLECTIONS[3].img} alt={COLLECTIONS[3].name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.6s" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(15,13,10,0.7) 0%,transparent 55%)" }}/>
            <div style={{ position:"absolute", bottom:30, left:28 }}>
              <Tag text={COLLECTIONS[3].tag} color="rgba(255,255,255,0.8)" bg="rgba(255,255,255,0.14)"/>
              <div style={{ color:"#fff", fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:30, fontWeight:400, marginTop:10, marginBottom:6, lineHeight:1.1 }}>{COLLECTIONS[3].name}</div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13 }}>{COLLECTIONS[3].count} pieces</div>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:16, color:"rgba(255,255,255,0.8)", fontSize:12, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                Explore <ArrowRight size={12}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TRUST BAR
   ══════════════════════════════════════════════════════════════════════ */
function TrustBar() {
  const perks = [
    { icon:Truck,      title:"Free Express Delivery",  body:"On orders over $120 worldwide" },
    { icon:RotateCcw,  title:"Effortless Returns",     body:"30 days, no questions asked" },
    { icon:Shield,     title:"2-Year Guarantee",       body:"On every single product" },
    { icon:Headphones, title:"Concierge Support",      body:"Real experts, 24/7, always" },
    { icon:CreditCard, title:"Secure & Encrypted",     body:"14 payment methods accepted" },
    { icon:Award,      title:"Authenticity Assured",   body:"Every item verified" },
  ];

  return (
    <section style={{ background:T.cream, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"64px 0" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px", display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:0 }}>
        {perks.map((p,i) => (
          <div key={i} style={{
            textAlign:"center", padding:"0 20px",
            borderRight: i<5 ? `1px solid ${T.border}` : "none",
            transition:"all 0.25s",
          }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.7"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}
          >
            <div style={{ width:44, height:44, borderRadius:"50%", border:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
              <p.icon size={18} color={T.saffron}/>
            </div>
            <div style={{ color:T.ink, fontWeight:600, fontSize:13.5, marginBottom:5, fontFamily:"'Cormorant Garamond',Georgia,serif" }}>{p.title}</div>
            <div style={{ color:T.inkDim, fontSize:12, lineHeight:1.5 }}>{p.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   STATS
   ══════════════════════════════════════════════════════════════════════ */
function Stats() {
  const items = [
    { val:"2.4M+", label:"Customers worldwide" },
    { val:"180+",  label:"Countries delivered" },
    { val:"4.9",   label:"Average review score" },
    { val:"< 2hr", label:"Support response time" },
  ];
  return (
    <div style={{ background:T.white, borderBottom:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px", display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
        {items.map((x,i) => (
          <div key={i} style={{ padding:"56px 40px", borderRight:i<3?`1px solid ${T.border}`:"none", textAlign:"center" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(44px,4vw,60px)", fontWeight:300, color:T.ink, lineHeight:1, letterSpacing:"-0.02em" }}>{x.val}</div>
            <div style={{ color:T.inkDim, fontSize:12.5, marginTop:8, fontWeight:500, letterSpacing:"0.06em" }}>{x.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ══════════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ background:T.paper, padding:"100px 0" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:1, background:T.border }}/>
            <span style={{ fontSize:11, fontWeight:600, color:T.saffron, letterSpacing:"0.16em", textTransform:"uppercase" }}>Verified Reviews</span>
            <div style={{ width:32, height:1, background:T.border }}/>
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(40px,4vw,60px)", fontWeight:300, color:T.ink, letterSpacing:"-0.01em", lineHeight:1 }}>
            Worn, Loved, <em>Repeated.</em>
          </h2>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:16 }}>
            <Stars n={5} size={16}/>
            <span style={{ color:T.inkDim, fontSize:14, fontWeight:400 }}>4.9 average · 52,000+ reviews</span>
          </div>
        </div>

        {/* Testimonial cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:3 }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} style={{
              background:T.white, padding:"44px 48px",
              border:`1px solid ${T.border}`,
              position:"relative", transition:"all 0.3s",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 20px 60px rgba(0,0,0,0.07)"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow=""; e.currentTarget.style.transform=""; }}
            >
              {/* Decorative quote mark */}
              <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:80, lineHeight:0.7, color:T.saffron, opacity:0.18, marginBottom:24, userSelect:"none" }}>"</div>

              <p style={{ color:T.inkMid, fontSize:16, lineHeight:1.8, marginBottom:32, fontWeight:300, fontStyle:"italic", fontFamily:"'Cormorant Garamond',Georgia,serif" }}>
                "{t.text}"
              </p>

              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <img src={t.img} alt={t.name} style={{ width:48, height:48, borderRadius:"50%", objectFit:"cover", border:`2px solid ${T.border}` }}/>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:2 }}>
                    <span style={{ color:T.ink, fontWeight:600, fontSize:14.5 }}>{t.name}</span>
                    <CheckCircle size={13} color={T.jade} fill={T.jade}/>
                  </div>
                  <span style={{ color:T.inkDim, fontSize:12 }}>{t.role}</span>
                </div>
                <Stars n={t.rating} size={12}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   EDITORIAL / JOURNAL
   ══════════════════════════════════════════════════════════════════════ */
function Journal() {
  return (
    <section style={{ background:T.white, padding:"100px 0", borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:56 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:24, height:1.5, background:T.inkDim }}/>
              <span style={{ fontSize:11, fontWeight:600, color:T.inkDim, letterSpacing:"0.16em", textTransform:"uppercase" }}>The Lumière Journal</span>
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(40px,3.8vw,58px)", fontWeight:300, color:T.ink, lineHeight:1, letterSpacing:"-0.01em" }}>
              Fashion as<br/><em>Conversation.</em>
            </h2>
          </div>
          <a href="#" style={{ color:T.inkDim, fontSize:12, fontWeight:600, letterSpacing:"0.10em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:6, transition:"color 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.color=T.ink}
            onMouseLeave={e=>e.currentTarget.style.color=T.inkDim}
          >All Stories <ArrowRight size={13}/></a>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr", gap:3 }}>
          {EDITORIAL_STORIES.map((s,i) => (
            <div key={i} style={{ cursor:"pointer", border:`1px solid ${T.border}`, overflow:"hidden", transition:"all 0.3s" }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,0.08)"; e.currentTarget.querySelector("img").style.transform="scale(1.04)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow=""; e.currentTarget.querySelector("img").style.transform="scale(1)"; }}
            >
              <div style={{ height: i===0 ? 360 : 260, overflow:"hidden", position:"relative" }}>
                <img src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.55s" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 50%,rgba(15,13,10,0.38) 100%)" }}/>
              </div>
              <div style={{ padding:"24px 26px 28px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <Tag text={s.tag} color={T.saffron} bg={T.saffronL}/>
                  <span style={{ color:T.inkFaint, fontSize:11, display:"flex", alignItems:"center", gap:4 }}><Clock size={11}/> {s.time}</span>
                </div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize: i===0 ? 24 : 20, fontWeight:400, color:T.ink, lineHeight:1.3, marginBottom:10 }}>{s.title}</h3>
                <p style={{ color:T.inkDim, fontSize:12.5, fontWeight:500 }}>By {s.by}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   NEWSLETTER — Full-width with image
   ══════════════════════════════════════════════════════════════════════ */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section style={{ background:T.ink, position:"relative", overflow:"hidden" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:480 }}>
        {/* Image side */}
        <div style={{ position:"relative", overflow:"hidden" }}>
          <img src={I.e3} alt="Subscribe to Lumière" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"brightness(0.55)" }}/>
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(to right, transparent 60%, ${T.ink} 100%)` }}/>
          {/* Floating stat */}
          <div style={{ position:"absolute", bottom:40, left:40, background:"rgba(255,255,255,0.09)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.14)", borderRadius:3, padding:"20px 28px" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:40, color:"#fff", fontWeight:300, lineHeight:1 }}>200K+</div>
            <div style={{ color:"rgba(255,255,255,0.55)", fontSize:12.5, marginTop:6 }}>readers worldwide</div>
          </div>
        </div>

        {/* Copy side */}
        <div style={{ display:"flex", alignItems:"center", padding:"80px 80px 80px 64px" }}>
          <div style={{ maxWidth:400 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <div style={{ width:24, height:1.5, background:T.saffron }}/>
              <span style={{ fontSize:11, fontWeight:600, color:T.saffron, letterSpacing:"0.16em", textTransform:"uppercase" }}>The Inner Circle</span>
            </div>

            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(38px,3.5vw,54px)", fontWeight:300, color:"#fff", lineHeight:1.05, letterSpacing:"-0.01em", margin:"0 0 20px" }}>
              First Access.<br/><em>Always.</em>
            </h2>
            <p style={{ color:"rgba(255,255,255,0.55)", fontSize:15, lineHeight:1.75, marginBottom:36, fontWeight:300 }}>
              Join 200,000+ subscribers who get exclusive drops, member-only pricing, and the Lumière Journal delivered first.
            </p>

            {!done ? (
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"flex", gap:0, border:`1px solid rgba(255,255,255,0.18)`, borderRadius:3, overflow:"hidden", marginBottom:12 }}>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address"
                    style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"none", padding:"14px 18px", color:"#fff", fontSize:14, fontFamily:"'Jost',sans-serif", outline:"none" }}
                  />
                  <button onClick={()=>email&&setDone(true)} style={{
                    background:T.saffron, color:"#fff", border:"none", padding:"14px 24px",
                    fontSize:12, fontWeight:700, cursor:"pointer",
                    fontFamily:"'Jost',sans-serif", letterSpacing:"0.08em", textTransform:"uppercase",
                    transition:"background 0.2s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.background=T.saffronD}
                    onMouseLeave={e=>e.currentTarget.style.background=T.saffron}
                  >Join</button>
                </div>
                <p style={{ color:"rgba(255,255,255,0.3)", fontSize:11.5 }}>No spam. Unsubscribe anytime. Privacy guaranteed.</p>
              </div>
            ) : (
              <div style={{ background:T.jadeL, border:`1px solid ${T.jade}30`, borderRadius:3, padding:"16px 22px", display:"inline-flex", alignItems:"center", gap:10, color:T.jade, fontWeight:600, marginBottom:16 }}>
                <CheckCircle size={16}/> Welcome. Check your inbox for a gift.
              </div>
            )}

            {/* Avatars */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:24 }}>
              <div style={{ display:"flex" }}>
                {[I.a1,I.a2,I.a3,I.a4].map((av,i) => (
                  <img key={i} src={av} alt="" style={{ width:28, height:28, borderRadius:"50%", objectFit:"cover", border:`2px solid ${T.ink}`, marginLeft:i>0?-8:0 }}/>
                ))}
              </div>
              <span style={{ color:"rgba(255,255,255,0.45)", fontSize:12.5 }}>
                <strong style={{color:"rgba(255,255,255,0.75)"}}>200,000+</strong> already subscribed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════════ */
function Footer() {
  const cols = [
    { h:"Discover",   links:["New Arrivals","Women's Edit","Men's Edit","Brands","Gift Cards","Sale"] },
    { h:"Collections",links:["Parisian Edit","Urban Architecture","Maison Objects","Sports Edit","Seasonal Drops"] },
    { h:"Company",    links:["About Lumière","Sustainability","Careers","Press","Affiliates","Journal"] },
    { h:"Support",    links:["Help Centre","Track Order","Returns","Shipping","Contact Us","Size Guide"] },
  ];

  return (
    <footer style={{ background:T.ink, borderTop:`1px solid rgba(255,255,255,0.06)` }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 48px" }}>
        {/* Main footer content */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:56, padding:"72px 0 56px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom:20 }}>
              <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:26, fontWeight:300, color:"#fff", letterSpacing:"0.24em", textTransform:"uppercase" }}>LUMIÈRE</div>
              <div style={{ width:28, height:1.5, background:T.saffron, marginTop:6 }}/>
            </div>
            <p style={{ color:"rgba(255,255,255,0.38)", fontSize:13.5, lineHeight:1.78, maxWidth:240, marginBottom:28, fontWeight:300 }}>
              Premium fashion, tech, and lifestyle — curated with intention for those who choose quality over everything.
            </p>
            <div style={{ display:"flex", gap:10 }}>
              {[Instagram, Twitter, Youtube].map((Icon,i) => (
                <a key={i} href="#" style={{ width:36, height:36, borderRadius:2, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.09)", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", transition:"all 0.22s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=T.saffron+"30"; e.currentTarget.style.borderColor=T.saffron+"55"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; }}
                ><Icon size={14} color="rgba(255,255,255,0.4)"/></a>
              ))}
            </div>
          </div>

          {cols.map((col,ci) => (
            <div key={ci}>
              <div style={{ color:"rgba(255,255,255,0.82)", fontWeight:600, fontSize:12, letterSpacing:"0.10em", textTransform:"uppercase", marginBottom:20 }}>{col.h}</div>
              {col.links.map((l,li) => (
                <a key={li} href="#" style={{ display:"block", color:"rgba(255,255,255,0.36)", fontSize:13.5, marginBottom:10, fontWeight:400, transition:"color 0.18s" }}
                  onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.82)"}
                  onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.36)"}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"24px 0" }}>
          <span style={{ color:"rgba(255,255,255,0.24)", fontSize:12 }}>
            © 2026 Lumière Commerce. All rights reserved. Powered by Laravel Shopper.
          </span>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {["Visa","Mastercard","Amex","PayPal","Apple Pay","Klarna"].map((pm,i) => (
              <span key={i} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:2, padding:"4px 10px", color:"rgba(255,255,255,0.28)", fontSize:10, fontWeight:700, letterSpacing:"0.04em" }}>{pm}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{GLOBAL_CSS}</style>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   ROOT
   ══════════════════════════════════════════════════════════════════════ */
export default function LumiereHome() {
  return (
    <div style={{ background:T.paper }}>
      <Navbar/>
      <Hero/>
      <Marquee/>
      <FeaturedProducts/>
      <EditorialSplit/>
      <FlashSale/>
      <Collections/>
      <TrustBar/>
      <Stats/>
      <Testimonials/>
      <Journal/>
      <Newsletter/>
      <Footer/>
    </div>
  );
}