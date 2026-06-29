import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction = 'col', align, justify, gap = 'md', wrap, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          {
            'flex-row': direction === 'row',
            'flex-col': direction === 'col',
          },
          {
            'items-start': align === 'start',
            'items-center': align === 'center',
            'items-end': align === 'end',
            'items-stretch': align === 'stretch',
          },
          {
            'justify-start': justify === 'start',
            'justify-center': justify === 'center',
            'justify-end': justify === 'end',
            'justify-between': justify === 'between',
            'justify-around': justify === 'around',
          },
          {
            'gap-0': gap === 'none',
            'gap-2': gap === 'xs',
            'gap-4': gap === 'sm',
            'gap-6': gap === 'md',
            'gap-8': gap === 'lg',
            'gap-12': gap === 'xl',
          },
          {
            'flex-wrap': wrap,
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

Stack.displayName = 'Stack';

export { Stack };
