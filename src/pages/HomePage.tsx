import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, MapPin, Sparkles, Users, Cpu } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';
import ProfileAvatar from '@/components/ProfileAvatar';
import TiltCard from '@/components/TiltCard';
import ScrollTilt3D from '@/components/ScrollTilt3D';
import Icon from '@/components/Icon';
import { SectionHeader, Reveal } from '@/components/Section';
import { profile, skillCategories, leadership } from '@/data/portfolio';
import type { PageId } from '@/components/Navigation';

const accentMap: Record<string, { text: string; ring: string; glow: string; dot: string }> = {
  cyan: { text: 'text-cyan-glow', ring: 'group-hover:border-cyan-glow/40', glow: 'group-hover:shadow-glow', dot: 'bg-cyan-glow' },
  violet: { text: 'text-violet-glow', ring: 'group-hover:border-violet-glow/40', glow: 'group-hover:shadow-glow-violet', dot: 'bg-violet-glow' },
  emerald: { text: 'text-emerald-glow', ring: 'group-hover:border-emerald-glow/40', glow: 'group-hover:shadow-glow-emerald', dot: 'bg-emerald-glow' },
};

const statIcons: Record<string, typeof Users> = {
  Users,
  Cpu,
  MapPin,
};

export default function HomePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // hero content drifts up & fades as you scroll past it
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const avatarY = useTransform(heroProgress, [0, 1], ['0%', '-22%']);

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-16">
        <ParticleCanvas density={0.00009} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* left: text */}
          <div className="text-center lg:text-left">
            {/* floating glass banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-slate-300 lg:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-glow" />
              </span>
              <span className="truncate">{profile.banner}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Mohan Prasad D
              <span className="mt-2 block text-gradient-cv text-2xl font-bold sm:text-3xl md:text-4xl">
                {profile.tagline}
              </span>
            </motion.h1>

            {/* quick stat badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start"
            >
              {profile.stats.map((s) => {
                const I = statIcons[s.icon] ?? Sparkles;
                return (
                  <span
                    key={s.label}
                    className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-slate-300"
                  >
                    <I className="h-3.5 w-3.5 text-cyan-glow" />
                    {s.label}
                  </span>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <button
                onClick={() => onNavigate('projects')}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-glow via-violet-glow to-emerald-glow px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
              >
                Explore My Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4 text-cyan-glow" />
                Connect on LinkedIn
              </a>
            </motion.div>
          </div>

          {/* right: profile avatar — parallax + 3D tilt */}
          <motion.div
            style={{ y: avatarY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <ScrollTilt3D rotate={10} z={60} className="preserve-3d">
              <TiltCard max={14} className="rounded-full">
                <ProfileAvatar />
              </TiltCard>
            </ScrollTilt3D>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 sm:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-slate-500 to-transparent" />
        </motion.div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Technical Skill Spectrum"
            title={
              <>
                A toolkit built across <span className="text-gradient">AI, vision & web</span>
              </>
            }
            subtitle="From low-level NumPy backpropagation to glassmorphic React interfaces — the stack I reach for to ship real systems."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, i) => {
              const a = accentMap[cat.accent]!;
              return (
                <Reveal key={cat.title} delay={i * 0.06}>
                  <ScrollTilt3D rotate={5} z={30} className="h-full preserve-3d">
                    <TiltCard max={8} className="h-full rounded-2xl">
                      <div
                        className={`group glass-card relative h-full rounded-2xl border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 ${a.ring} ${a.glow}`}
                      >
                        <div className="mb-5 flex items-center gap-3">
                          <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${a.text}`}>
                            <Icon name={cat.icon} className="h-5 w-5" />
                          </span>
                          <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                          {cat.skills.map((s) => (
                            <li
                              key={s}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-slate-300 ring-1 ring-inset ring-white/5"
                            >
                              <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TiltCard>
                  </ScrollTilt3D>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section className="relative px-4 pb-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <ScrollTilt3D rotate={4} z={50} className="preserve-3d">
              <TiltCard max={6} className="rounded-3xl">
                <div className="accent-border relative overflow-hidden rounded-3xl">
                  <div className="glass-strong rounded-3xl p-8 sm:p-12">
                    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                      <div>
                        <span className="eyebrow">Leadership Highlight</span>
                        <h3 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                          {leadership.title}
                        </h3>
                        <p className="mt-1 font-mono text-sm font-medium text-cyan-glow">
                          {leadership.role} · {leadership.org}
                        </p>
                        <p className="mt-5 text-base leading-relaxed text-slate-300">
                          {leadership.description}
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {leadership.pillars.map((p, i) => (
                          <motion.div
                            key={p.label}
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: i * 0.1 }}
                            className="glass flex items-center gap-4 rounded-2xl p-4"
                          >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-violet-glow/20 text-cyan-glow">
                              <Icon name={p.icon} className="h-5 w-5" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-white">{p.label}</p>
                              <p className="text-xs text-slate-400">{p.detail}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollTilt3D>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
