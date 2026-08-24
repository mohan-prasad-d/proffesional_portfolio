import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * Returns a scroll progress motion value (0 → 1) for the element, plus
 * pre-built y-offset transforms for common parallax speeds.
 * `offset` controls when the range starts/ends relative to viewport.
 */
export function useParallax(
  speed: number,
  offset: ['start end', 'end start'] = ['start end', 'end start'],
) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return { ref, y, scrollYProgress };
}

/** Imperative version: pass your own scrollYProgress to derive a y transform. */
export function parallaxY(progress: MotionValue<number>, from: number, to: number) {
  return useTransform(progress, [0, 1], [from, to]);
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?: ['start end', 'end start'];
  as?: 'div' | 'section' | 'span';
}

/**
 * Wrap content in a parallax layer. Positive speed moves down-on-scroll-up,
 * negative moves up. Typical: 40 = slow drift, 120 = strong drift.
 */
export default function Parallax({
  children,
  speed = 60,
  className = '',
  offset = ['start end', 'end start'],
  as = 'div',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  const MotionTag = motion[as];
  return (
    <MotionTag ref={ref as never} style={{ y }} className={className}>
      {children}
    </MotionTag>
  );
}
