import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MenuItem {
  title: string;
  url: string;
  links?: MenuItem[];
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  menu: MenuItem[];
}

export function MobileNavigation({ isOpen, onClose, menu }: MobileNavigationProps) {
  const [menuHistory, setMenuHistory] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset menu state when closing
      setTimeout(() => {
        setMenuHistory([]);
      }, 300);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMenuClick = (item: MenuItem) => {
    if (item.links && item.links.length > 0) {
      setMenuHistory((prev) => [...prev, item]);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    const newHistory = menuHistory.slice(0, -1);
    setMenuHistory(newHistory);
  };

  const getCurrentMenu = (): MenuItem[] => {
    if (menuHistory.length === 0) return menu;
    return menuHistory[menuHistory.length - 1].links || menu;
  };

  const currentMenu = getCurrentMenu();
  const breadcrumbs = menuHistory.map((item) => item.title);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Navigation Panel */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-full max-w-sm bg-white transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          {menuHistory.length > 0 ? (
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium"
              onClick={handleBack}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          ) : (
            <span className="text-sm font-medium">Menu</span>
          )}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-xs text-muted">
            <button
              type="button"
              className="hover:text-foreground"
              onClick={() => {
                setMenuHistory([]);
              }}
            >
              Menu
            </button>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb} className="flex items-center gap-2">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={index === breadcrumbs.length - 1 ? 'text-foreground' : ''}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Menu Items */}
        <nav className="overflow-y-auto" style={{ height: 'calc(100vh - 140px)' }}>
          <ul className="flex flex-col">
            {currentMenu.map((item, index) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center justify-between border-b border-border px-4 py-4 text-left transition-colors hover:bg-muted',
                    index === currentMenu.length - 1 && 'border-b-0'
                  )}
                  onClick={() => handleMenuClick(item)}
                >
                  <span className="font-medium">{item.title}</span>
                  {item.links && item.links.length > 0 && (
                    <svg className="h-4 w-4 text-muted" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-white p-4">
          <div className="flex gap-4">
            <a
              href="/account"
              className="flex flex-1 items-center justify-center gap-2 border border-border py-3 text-sm font-medium transition-colors hover:bg-muted"
              onClick={onClose}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Account
            </a>
            <a
              href="/cart"
              className="flex flex-1 items-center justify-center gap-2 border border-border py-3 text-sm font-medium transition-colors hover:bg-muted"
              onClick={onClose}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.9606 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
