import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  Search, Heart, ShoppingBag, X, Menu, Zap, ChevronDown
} from 'lucide-react';
import type { PageProps } from '../types';

const NAV_LINKS = [
  { label: 'New In',      href: '/new',         hot: true },
  { label: 'Women',       href: '/women' },
  { label: 'Men',         href: '/men' },
  { label: 'Tech',        href: '/tech' },
  { label: 'Brands',      href: '/brands' },
  { label: 'Sale',        href: '/sale',         sale: true },
];

export default function Navbar() {
  const { auth } = usePage<PageProps>().props;
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery]           = useState('');
  const [cartCount]                 = useState(3);
  const [wishCount]                 = useState(5);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Announcement ribbon */}
      <div className="bg-stone-900 py-2.5 text-center">
        <p className="text-white/70 text-[11.5px] font-medium tracking-wide">
          Free express shipping over{' '}
          <span className="text-amber-400 font-bold">$120</span>
          {' '}· Use{' '}
          <span className="text-white font-bold">NEXUS20</span>
          {' '}for 20% off your first order
        </p>
      </div>

      {/* Main nav */}
      <nav
        className={[
          'transition-all duration-300 border-b',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-stone-200 shadow-sm'
            : 'bg-[#FAFAF7] border-transparent',
        ].join(' ')}
      >
        <div className="max-w-[1400px] mx-auto px-8 flex items-center h-16 gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="text-[21px] font-black text-stone-900 tracking-[-0.04em] leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              NEXUS
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={[
                  'px-3.5 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-150',
                  'hover:bg-stone-100 flex items-center gap-1.5',
                  link.sale ? 'text-red-500 hover:text-red-600' : 'text-stone-500 hover:text-stone-900',
                ].join(' ')}
              >
                {link.label}
                {link.hot && (
                  <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Search */}
            <div className="relative flex items-center">
              {searchOpen && (
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, brands…"
                  className="
                    absolute right-full mr-2 w-56 bg-white border border-stone-200
                    rounded-lg px-4 py-2.5 text-[13px] text-stone-900 outline-none
                    shadow-lg animate-[slideIn_0.2s_ease]
                    focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
                    transition-all
                  "
                />
              )}
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-all duration-150"
                aria-label="Search"
              >
                {searchOpen ? <X size={16} /> : <Search size={16} />}
              </button>
            </div>

            {/* Wishlist */}
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 relative transition-all duration-150"
              aria-label="Wishlist"
            >
              <Heart size={16} />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {wishCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 relative transition-all duration-150"
              aria-label="Cart"
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="w-px h-5 bg-stone-200 mx-1 hidden md:block" />

            {/* Auth */}
            {auth?.user ? (
              <Link
                href="/profile"
                className="hidden md:flex items-center gap-2 text-[12.5px] font-semibold text-stone-600 hover:text-stone-900 transition-colors"
              >
                {auth?.user?.name}
              </Link>
            ) : (
              <a
                href="/cpanel/login"
                className="hidden md:inline-flex items-center px-4 py-2 bg-stone-900 text-white text-[12.5px] font-bold rounded-lg hover:bg-stone-800 transition-colors tracking-wide"
              >
                Sign In
              </a>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-stone-100 py-4 px-6 space-y-1 animate-[fadeDown_0.2s_ease]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={[
                  'block py-2.5 px-3 rounded-lg text-[14px] font-medium transition-colors',
                  link.sale ? 'text-red-500' : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50',
                ].join(' ')}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
