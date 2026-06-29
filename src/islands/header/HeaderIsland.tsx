import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { MegaMenu } from '@/components/layout/MegaMenu';

interface MenuItem {
  title: string;
  url: string;
  links?: Array<{ title: string; url: string }>;
  image?: string;
  description?: string;
}

interface HeaderIslandProps {
  logo?: string;
  menu?: MenuItem[];
  cartCount?: number;
  transparent?: boolean;
}

export default function HeaderIsland({
  logo,
  menu = [],
  cartCount = 0,
  transparent = false,
}: HeaderIslandProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { y, direction } = useScrollPosition();
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const { toggleCart, itemCount } = useCartStore();
  const displayCount = itemCount || cartCount;

  const isScrolled = y > 50;
  const isHidden = direction === 'down' && y > 200;

  const handleMegaMenuOpen = (title: string) => {
    setActiveMegaMenu(title);
  };

  const handleMegaMenuClose = () => {
    setActiveMegaMenu(null);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          {
            'bg-transparent': transparent && !isScrolled,
            'bg-background/95 backdrop-blur-md border-b border-border': !transparent || isScrolled,
            '-translate-y-full': isHidden && !isMobileMenuOpen,
            'translate-y-0': !isHidden || isMobileMenuOpen,
          }
        )}
        role="banner"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Left - Mobile Menu Toggle */}
            <div className="flex w-[100px] items-center lg:hidden">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12H21M3 6H21M3 18H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Center - Logo */}
            <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
              <a href="/" className="flex items-center">
                {logo ? (
                  <img src={logo} alt="KENZ Maison" className="h-6 lg:h-8" />
                ) : (
                  <span className="font-heading text-xl font-semibold lg:text-2xl">KENZ Maison</span>
                )}
              </a>
            </div>

            {/* Right - Icons */}
            <div className="flex w-[100px] items-center justify-end gap-1">
              {/* Search */}
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center"
                onClick={() => {
                  document.dispatchEvent(new CustomEvent('search:open'));
                }}
                aria-label="Search"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Account */}
              <a
                href="/account"
                className="hidden h-10 w-10 items-center justify-center lg:flex"
                aria-label="Account"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* Wishlist */}
              <button
                type="button"
                className="hidden h-10 w-10 items-center justify-center lg:flex"
                onClick={() => {
                  document.dispatchEvent(new CustomEvent('wishlist:open'));
                }}
                aria-label="Wishlist"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Cart */}
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center"
                onClick={toggleCart}
                aria-label={`Cart (${displayCount} items)`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {displayCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                    {displayCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          {isDesktop && menu.length > 0 && (
            <nav className="hidden border-t border-border lg:block" aria-label="Main navigation">
              <ul className="flex justify-center gap-8 py-4">
                {menu.map((item) => (
                  <li
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => item.links && handleMegaMenuOpen(item.title)}
                    onMouseLeave={() => !item.links && handleMegaMenuClose()}
                  >
                    <a
                      href={item.url}
                      className={cn(
                        'text-sm font-medium transition-colors hover:text-accent',
                        activeMegaMenu === item.title && 'text-accent'
                      )}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Mega Menu */}
        {isDesktop && activeMegaMenu && (
          <MegaMenu
            items={menu.filter((item) => item.title === activeMegaMenu)}
            isActive={!!activeMegaMenu}
            onClose={handleMegaMenuClose}
          />
        )}
      </header>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menu={menu}
      />
    </>
  );
}
