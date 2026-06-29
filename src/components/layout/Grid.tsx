import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = 3, gap = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          {
            'grid-cols-1': columns === 1,
            'grid-cols-1 sm:grid-cols-2': columns === 2,
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': columns === 3,
            'grid-cols-2 lg:grid-cols-4': columns === 4,
            'grid-cols-2 lg:grid-cols-5': columns === 5,
            'grid-cols-2 lg:grid-cols-6': columns === 6,
          },
          {
            'gap-0': gap === 'none',
            'gap-2': gap === 'xs',
            'gap-4': gap === 'sm',
            'gap-6': gap === 'md',
            'gap-8': gap === 'lg',
            'gap-12': gap === 'xl',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Grid };
