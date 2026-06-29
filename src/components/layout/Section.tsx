import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'dark';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, padding = 'lg', background = 'default', children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          {
            'py-0': padding === 'none',
            'py-8 sm:py-12': padding === 'sm',
            'py-12 sm:py-16': padding === 'md',
            'py-16 sm:py-24': padding === 'lg',
            'py-24 sm:py-32': padding === 'xl',
          },
          {
            'bg-background': background === 'default',
            'bg-muted': background === 'muted',
            'bg-foreground text-background': background === 'dark',
          },
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
