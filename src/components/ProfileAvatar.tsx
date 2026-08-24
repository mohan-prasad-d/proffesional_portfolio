import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/data/portfolio';

export default function ProfileAvatar({ size = 'lg' }: { size?: 'lg' | 'md' }) {
  const [errored, setErrored] = useState(false);
  const dims = size === 'lg' ? 'h-40 w-40 sm:h-48 sm:w-48' : 'h-24 w-24';

  return (
    <div className={`relative ${dims}`}>
      {/* pulsing glow ring */}
      <span className="absolute -inset-3 rounded-full bg-gradient-to-br from-cyan-glow/40 via-violet-glow/40 to-emerald-glow/40 blur-xl animate-pulse-ring" />
      <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-glow via-violet-glow to-emerald-glow opacity-80 blur-[2px]" />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="accent-border relative h-full w-full overflow-hidden rounded-full bg-ink-850"
      >
        {!errored ? (
          <img
            src={profile.photoUrl}
            alt="Mohan Prasad D"
            className="h-full w-full object-cover"
            onError={() => setErrored(true)}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-800 to-ink-900">
            <span className="font-mono text-3xl font-bold text-gradient">MP</span>
          </div>
        )}
      </motion.div>

      {/* orbiting dot */}
      <span className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-glow shadow-glow" />
    </div>
  );
}
