import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MegaMenuItem {
  title: string;
  url: string;
  links?: Array<{ title: string; url: string }>;
  image?: string;
  description?: string;
}

interface MegaMenuProps {
  items: MegaMenuItem[];
  isActive: boolean;
  onClose: () => void;
}

export function MegaMenu({ items, isActive, onClose }: MegaMenuProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, onClose]);

  const handleMouseEnter = (itemTitle: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveItem(itemTitle);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 100);
  };

  const activeMenuItem = items.find((item) => item.title === activeItem);

  if (!isActive) return null;

  return (
    <div
      ref={menuRef}
      className="absolute left-0 right-0 top-full z-50 border-b border-border bg-white shadow-lg"
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Menu Items List */}
          <div className="col-span-3">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.title}>
                  <button
                    type="button"
                    className={cn(
                      'flex w-full items-center justify-between py-3 text-left transition-colors',
                      activeItem === item.title
                        ? 'text-accent'
                        : 'text-foreground hover:text-accent'
                    )}
                    onMouseEnter={() => handleMouseEnter(item.title)}
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.links && item.links.length > 0 && (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Submenu Content */}
          <div className="col-span-6">
            {activeMenuItem?.links && activeMenuItem.links.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {activeMenuItem.links.map((link) => (
                  <a
                    key={link.title}
                    href={link.url}
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted"
                  >
                    <span className="text-sm">{link.title}</span>
                  </a>
                ))}
              </div>
            )}
            {activeMenuItem?.description && (
              <p className="mt-4 text-sm text-muted">{activeMenuItem.description}</p>
            )}
          </div>

          {/* Featured Image */}
          <div className="col-span-3">
            {activeMenuItem?.image ? (
              <a href={activeMenuItem.url} className="group block overflow-hidden">
                <img
                  src={activeMenuItem.image}
                  alt={activeMenuItem.title}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <p className="mt-3 text-sm font-medium group-hover:text-accent">
                  Shop {activeMenuItem.title}
                </p>
              </a>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center bg-muted">
                <svg className="h-16 w-16 text-muted" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
