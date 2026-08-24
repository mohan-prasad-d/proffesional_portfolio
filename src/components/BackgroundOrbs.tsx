import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundOrbs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // each layer drifts at a different rate → depth
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 12]);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* base gradient */}
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,240,255,0.10),transparent_50%)]" />

      {/* floating orbs — parallax depth layers */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-cyan-glow/20 blur-[120px] animate-float"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-violet-glow/20 blur-[120px] animate-float"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-emerald-glow/15 blur-[120px] animate-float"
      />

      {/* faint grid — scrolls slower than content */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 bg-grid-faint [background-size:44px_44px] opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,13,0.85))]" />
    </div>
  );
}
