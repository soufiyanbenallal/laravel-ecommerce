import { type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        type: 'tween',
        ease: [0.4, 0, 0.2, 1],
        duration,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  offset?: [string, string];
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  offset = ['start end', 'end start'],
}: ParallaxProps) {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, offset, [speed * 100, speed * -100]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  scale?: [number, number];
}

export function ScaleOnScroll({
  children,
  className,
  scale = [0.8, 1],
}: ScaleOnScrollProps) {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleValue = useTransform(scrollYProgress, [0, 1], scale);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ scale: scaleValue }} className={className}>
      {children}
    </motion.div>
  );
}

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function FadeInOnScroll({
  children,
  className,
  direction = 'up',
}: FadeInOnScrollProps) {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.3],
    direction === 'up' ? [50, 0] : direction === 'down' ? [-50, 0] : [0, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 0.3],
    direction === 'left' ? [50, 0] : direction === 'right' ? [-50, 0] : [0, 0]
  );

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ opacity, x, y }} className={className}>
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function TextReveal({
  text,
  className,
  tag: Tag = 'h2',
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: 'tween',
              ease: [0.4, 0, 0.2, 1],
              duration: 0.5,
              delay: i * 0.05,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
