import { useRef, useEffect } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: UseIntersectionObserverOptions = {}
) {
  const { freezeOnceVisible = false, ...observerOptions } = options;
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback(entry);
        if (freezeOnceVisible) {
          hasTriggered.current = true;
          observer.disconnect();
        }
      }
    }, observerOptions);

    if (!hasTriggered.current) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [callback, freezeOnceVisible, observerOptions.threshold, observerOptions.rootMargin]);

  return ref;
}

export function useInView(options: UseIntersectionObserverOptions = {}) {
  const { freezeOnceVisible = true, ...observerOptions } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isInView.current = true;
        if (freezeOnceVisible) {
          observer.disconnect();
        }
      } else if (!freezeOnceVisible) {
        isInView.current = false;
      }
    }, observerOptions);

    observer.observe(element);
    return () => observer.disconnect();
  }, [freezeOnceVisible, observerOptions.threshold, observerOptions.rootMargin]);

  return { ref, isInView: isInView.current };
}
