import { type ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Tilts children in 3D as the element scrolls through the viewport:
 * rotates from -rotate to +rotate on X, and lifts on Z for depth.
 */
export default function ScrollTilt3D({
  children,
  className = '',
  rotate = 8,
  z = 40,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  z?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [rotate, 0, -rotate]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-z, 0, -z]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, translateZ, scale, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
