import { useState, useEffect, useCallback } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | null;
}

export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
  });

  const handleScroll = useCallback(() => {
    const newY = window.scrollY;
    const newX = window.scrollX;

    setPosition((prev) => ({
      x: newX,
      y: newY,
      direction: newY > prev.y ? 'down' : newY < prev.y ? 'up' : prev.direction,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return position;
}

export function useScrollDirection(): 'up' | 'down' | null {
  const { direction } = useScrollPosition();
  return direction;
}

export function useIsScrolled(threshold = 0): boolean {
  const { y } = useScrollPosition();
  return y > threshold;
}
