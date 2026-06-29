import { type ReactNode } from 'react';
import { motion, type Variants, type Transition } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Animation Presets
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInFromBottom: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0 },
};

export const slideInFromTop: Variants = {
  hidden: { y: '-100%' },
  visible: { y: 0 },
};

export const slideInFromLeft: Variants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

export const slideInFromRight: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
};

// Stagger Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Default Transition
export const defaultTransition: Transition = {
  type: 'tween',
  ease: [0.4, 0, 0.2, 1],
  duration: 0.4,
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// Animation Wrapper Component
interface AnimatedProps {
  children: ReactNode;
  variants?: Variants;
  initial?: string | boolean;
  animate?: string | boolean;
  exit?: string | boolean;
  transition?: Transition;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
}

export function Animated({
  children,
  variants = fadeInUp,
  initial = 'hidden',
  animate = 'visible',
  exit = 'hidden',
  transition = defaultTransition,
  className,
  delay = 0,
  ...props
}: AnimatedProps & Record<string, unknown>) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{ ...transition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// While Hover/Tap Animation
interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({ children, scale = 1.02, className }: HoverScaleProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={springTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Page Transition Wrapper
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={defaultTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
