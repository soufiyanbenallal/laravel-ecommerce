import { type ReactNode, createContext, useContext, useState, useEffect } from 'react';

// Skip Link
interface SkipLinkProps {
  href: string;
  children: ReactNode;
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background focus:outline-none"
    >
      {children}
    </a>
  );
}

// Screen Reader Only
interface ScreenReaderOnlyProps {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export function ScreenReaderOnly({ children, as: Tag = 'span' }: ScreenReaderOnlyProps) {
  return (
    <Tag className="sr-only">
      {children}
    </Tag>
  );
}

// Focus Trap
interface FocusTrapProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
}

export function FocusTrap({ children, isActive, className }: FocusTrapProps) {
  useEffect(() => {
    if (!isActive) return;

    const focusableElements = document.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  if (!isActive) return null;

  return <div className={className}>{children}</div>;
}

// Live Region
interface LiveRegionProps {
  children: ReactNode;
  level?: 'polite' | 'assertive';
  atomic?: boolean;
}

export function LiveRegion({ children, level = 'polite', atomic = true }: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={level}
      aria-atomic={atomic}
      className="sr-only"
    >
      {children}
    </div>
  );
}

// Reduced Motion Context
interface ReducedMotionContextValue {
  prefersReduced: boolean;
  setPrefersReduced: (value: boolean) => void;
}

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  prefersReduced: false,
  setPrefersReduced: () => {},
});

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(query.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return (
    <ReducedMotionContext.Provider value={{ prefersReduced, setPrefersReduced }}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotionContext() {
  return useContext(ReducedMotionContext);
}

// Keyboard Navigation Hook
export function useKeyboardNavigation(
  containerRef: React.RefObject<HTMLElement>,
  options: { orientation?: 'horizontal' | 'vertical' } = {}
) {
  const { orientation = 'horizontal' } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          '[tabindex]:not([tabindex="-1"]), a[href], button:not([disabled]), input:not([disabled])'
        )
      );

      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);

      let nextIndex: number | null = null;

      if (orientation === 'horizontal') {
        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % focusable.length;
        } else if (e.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        }
      } else {
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % focusable.length;
        } else if (e.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        }
      }

      if (nextIndex !== null) {
        e.preventDefault();
        focusable[nextIndex]?.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, orientation]);
}

// Announce to Screen Reader
export function announce(message: string, level: 'polite' | 'assertive' = 'polite') {
  const element = document.createElement('div');
  element.setAttribute('role', 'status');
  element.setAttribute('aria-live', level);
  element.setAttribute('aria-atomic', 'true');
  element.className = 'sr-only';
  element.textContent = message;
  document.body.appendChild(element);

  setTimeout(() => {
    document.body.removeChild(element);
  }, 1000);
}
