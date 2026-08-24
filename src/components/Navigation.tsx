import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Sparkles } from 'lucide-react';
import { profile } from '@/data/portfolio';

export type PageId = 'home' | 'projects' | 'activity';

interface NavProps {
  active: PageId;
  onNavigate: (p: PageId) => void;
}

const links: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'activity', label: 'Activity' },
];

export default function Navigation({ active, onNavigate }: NavProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-cyan-glow via-violet-glow to-emerald-glow"
        style={{ scaleX: progress }}
      />

      {/* desktop nav */}
      <header className="fixed left-1/2 top-3 z-50 -translate-x-1/2 px-4">
        <nav className="glass-strong flex items-center gap-1 rounded-full p-1.5 pl-2.5 shadow-glass">
          <button
            onClick={() => onNavigate('home')}
            className="mr-1 flex items-center gap-2 rounded-full px-2 py-1"
            aria-label="Home"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-glow via-violet-glow to-emerald-glow">
              <Sparkles className="h-4 w-4 text-ink-950" strokeWidth={2.5} />
            </span>
            <span className="hidden pr-1 text-sm font-bold tracking-tight text-white sm:inline">
              Mohan<span className="text-cyan-glow">.</span>
            </span>
          </button>

          <div className="flex items-center">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => onNavigate(l.id)}
                className="relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4"
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative ${
                    active === l.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {l.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />

          <div className="flex items-center gap-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </header>

      {/* mobile bottom bar */}
      <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:hidden">
        <div className="glass-strong flex items-center gap-1 rounded-full p-1.5 shadow-glass">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              className="relative rounded-full px-4 py-2 text-xs font-semibold"
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill-mobile"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative ${active === l.id ? 'text-white' : 'text-slate-400'}`}>
                {l.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
