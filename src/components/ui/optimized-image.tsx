import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  aspectRatio,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const element = imgRef.current;
    if (!element || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [priority]);

  // Generate srcSet for responsive images
  const srcSet = width
    ? [
        `${src}&width=${Math.round(width * 0.5)} ${Math.round(width * 0.5)}w`,
        `${src}&width=${width} ${width}w`,
        `${src}&width=${Math.round(width * 1.5)} ${Math.round(width * 1.5)}w`,
      ].join(', ')
    : undefined;

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden bg-muted', className)}
      style={aspectRatio ? { aspectRatio } : width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {/* Placeholder */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
      />

      {/* Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          srcSet={srcSet}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  );
}

// Progressive Image with LQIP
interface ProgressiveImageProps {
  src: string;
  alt: string;
  lqip?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ProgressiveImage({
  src,
  alt,
  lqip,
  width,
  height,
  className,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* LQIP Placeholder */}
      {lqip && (
        <img
          src={lqip}
          alt=""
          className={cn(
            'absolute inset-0 h-full w-full object-cover blur-lg scale-110 transition-opacity duration-500',
            isLoaded ? 'opacity-0' : 'opacity-100'
          )}
          aria-hidden="true"
        />
      )}

      {/* Full Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}
