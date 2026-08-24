import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Search, ArrowUpRight } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import ScrollTilt3D from '@/components/ScrollTilt3D';
import Icon from '@/components/Icon';
import { SectionHeader, Reveal } from '@/components/Section';
import { projects, type ProjectCategory } from '@/data/portfolio';

const tabs: ProjectCategory[] = ['All', 'Web Apps', 'AI & Computer Vision', 'Tools'];

const catColor: Record<string, string> = {
  'Web Apps': 'text-violet-glow',
  'AI & Computer Vision': 'text-cyan-glow',
  Tools: 'text-emerald-glow',
};

export default function ProjectsPage() {
  const [active, setActive] = useState<ProjectCategory>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const inTab = active === 'All' || p.category.includes(active as never);
      const q = query.trim().toLowerCase();
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tech.join(' ').toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return inTab && inQuery;
    });
  }, [active, query]);

  return (
    <div className="relative px-4 pt-28 pb-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Featured Projects"
          title={
            <>
              Verified builds from <span className="text-gradient">GitHub</span>
            </>
          }
          subtitle="Every card below maps to a real repository. Filter by domain, search by stack — no template demos, no filler."
        />

        {/* controls */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className="relative rounded-full px-4 py-2 text-xs font-semibold transition-colors"
              >
                {active === t && (
                  <motion.span
                    layoutId="proj-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-glow/20 to-violet-glow/20 ring-1 ring-inset ring-white/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative ${active === t ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                  {t}
                </span>
              </button>
            ))}
          </div>

          <div className="glass relative flex items-center rounded-full px-4 py-2.5 sm:w-72">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tech, title…"
              className="ml-2 w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* grid */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              >
                <ScrollTilt3D rotate={6} z={35} className="h-full preserve-3d">
                <TiltCard max={9} className="h-full rounded-2xl">
                  <div className="group glass-card relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/30 hover:shadow-glow">
                    {/* header */}
                    <div className="mb-4 flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/15 to-violet-glow/15 text-cyan-glow ring-1 ring-inset ring-white/10">
                        <Icon name={p.icon} className="h-5 w-5" />
                      </span>
                      <div className="flex flex-wrap justify-end gap-1.5">
                        {p.category.map((c) => (
                          <span
                            key={c}
                            className={`rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold ${catColor[c]}`}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold leading-snug text-white">{p.title}</h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">
                      {p.description}
                    </p>

                    {/* metrics */}
                    {p.metrics && (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {p.metrics.map((m) => (
                          <div key={m.label} className="rounded-lg bg-white/[0.03] px-3 py-2">
                            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                              {m.label}
                            </p>
                            <p className="text-xs font-semibold text-slate-200">{m.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* tech tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-slate-300 ring-1 ring-inset ring-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* repo button */}
                    <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4">
                      {p.repo ? (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-cyan-glow/15 hover:text-cyan-glow"
                        >
                          <Github className="h-3.5 w-3.5" />
                          View Repo
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <span className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/[0.02] px-3 py-2 text-xs font-medium text-slate-500">
                          <Github className="h-3.5 w-3.5" />
                          Private / In-repo
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
                </ScrollTilt3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <Reveal className="mt-16 text-center">
            <p className="text-slate-400">
              No projects match <span className="text-white">“{query}”</span> in this category.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActive('All');
              }}
              className="mt-3 text-sm font-semibold text-cyan-glow hover:underline"
            >
              Reset filters
            </button>
          </Reveal>
        )}
      </div>
    </div>
  );
}
