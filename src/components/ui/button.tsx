import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'cursor-pointer',
          {
            'bg-accent text-white hover:bg-accent/90': variant === 'primary',
            'border border-border bg-transparent text-foreground hover:bg-muted': variant === 'secondary',
            'bg-transparent text-foreground hover:bg-muted': variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
            'bg-transparent text-accent underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-8 px-3 text-xs rounded-md gap-1.5': size === 'sm',
            'h-10 px-5 text-sm rounded-md gap-2': size === 'md',
            'h-12 px-6 text-base rounded-lg gap-2': size === 'lg',
            'h-10 w-10 rounded-md p-0': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
