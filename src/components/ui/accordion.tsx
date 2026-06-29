import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('divide-y divide-border', className)} {...props}>
        {children}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('', className)} {...props}>
        {children}
      </div>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  open?: boolean;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, open, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-colors hover:text-accent',
          className
        )}
        aria-expanded={open}
        {...props}
      >
        {children}
        <svg
          className={cn('h-4 w-4 shrink-0 text-muted transition-transform', {
            'rotate-180': open,
          })}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, open, ...props }, ref) => {
    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn('pb-4 text-sm text-muted', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
