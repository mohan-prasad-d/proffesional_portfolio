import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, MapPin, Mail, Send, CheckCircle2, Star, ExternalLink } from 'lucide-react';
import TiltCard from '@/components/TiltCard';
import ScrollTilt3D from '@/components/ScrollTilt3D';
import Icon from '@/components/Icon';
import Counter from '@/components/Counter';
import { SectionHeader, Reveal } from '@/components/Section';
import { githubProfile, starredRepos, profile } from '@/data/portfolio';

// deterministic pseudo-random contribution intensity (0-4)
const levelFor = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  const v = x - Math.floor(x);
  if (v < 0.35) return 0;
  if (v < 0.6) return 1;
  if (v < 0.8) return 2;
  if (v < 0.93) return 3;
  return 4;
};

const levelColor = ['bg-white/5', 'bg-cyan-glow/25', 'bg-cyan-glow/45', 'bg-cyan-glow/70', 'bg-cyan-glow'];

function ContributionGraph() {
  // 53 weeks x 7 days
  const weeks = 53;
  const days = 7;
  return (
    <div className="no-scrollbar overflow-x-auto">
      <div className="flex gap-1" style={{ minWidth: 'fit-content' }}>
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, d) => {
              const idx = w * days + d;
              const lvl = levelFor(idx);
              return (
                <motion.span
                  key={d}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 30) * 0.008 }}
                  className={`h-2.5 w-2.5 rounded-[3px] ${levelColor[lvl]}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const validate = (field?: string) => {
    const e: Record<string, string> = {};
    if (!field || field === 'name') if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!field || field === 'email') {
      if (!form.email.trim()) e.email = 'Please enter your email.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    }
    if (!field || field === 'subject') if (!form.subject.trim()) e.subject = 'Add a subject.';
    if (!field || field === 'message') if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3500);
    }, 1200);
  };

  const field = (name: keyof typeof form, label: string, type = 'text', textarea = false) => (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-400">{label}</label>
      {textarea ? (
        <textarea
          rows={4}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          onBlur={() => setErrors((p) => ({ ...p, ...validate(name) }))}
          className={`glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
            errors[name] ? 'ring-rose-400/60' : 'focus:ring-cyan-glow/40'
          }`}
          placeholder="Tell me about your project or opportunity…"
        />
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          onBlur={() => setErrors((p) => ({ ...p, ...validate(name) }))}
          className={`glass w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
            errors[name] ? 'ring-rose-400/60' : 'focus:ring-cyan-glow/40'
          }`}
          placeholder={label}
        />
      )}
      {errors[name] && <p className="mt-1.5 text-xs text-rose-300">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-6 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {field('name', 'Name')}
        {field('email', 'Email', 'email')}
      </div>
      <div className="mt-4">{field('subject', 'Subject')}</div>
      <div className="mt-4">{field('message', 'Message', 'text', true)}</div>

      <button
        type="submit"
        disabled={status !== 'idle'}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-glow via-violet-glow to-emerald-glow px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-glow transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-80"
      >
        {status === 'idle' && (
          <>
            Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
        {status === 'sending' && (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            className="h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950"
          />
        )}
        {status === 'sent' && (
          <>
            Message Sent <CheckCircle2 className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function ActivityPage() {
  return (
    <div className="relative px-4 pt-28 pb-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="GitHub Activity & Contact"
          title={
            <>
              Open source, <span className="text-gradient">in the open</span>
            </>
          }
          subtitle="A snapshot of contributions, curated bookmarks, and a direct line to reach me."
        />

        {/* GitHub profile card */}
        <Reveal className="mt-12">
          <ScrollTilt3D rotate={4} z={45} className="preserve-3d">
          <TiltCard max={5} className="rounded-3xl">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ink-700 to-ink-900 ring-1 ring-white/10">
                    <Github className="h-7 w-7 text-white" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-slate-500">GitHub Profile</p>
                    <a
                      href={githubProfile.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 text-xl font-bold text-white hover:text-cyan-glow"
                    >
                      @{githubProfile.handle}
                      <ExternalLink className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {githubProfile.metrics.map((m) => (
                    <div key={m.label} className="glass rounded-2xl px-4 py-3 text-center">
                      <p className="text-2xl font-extrabold text-white">
                        <Counter value={m.value} />
                      </p>
                      <p className="mt-0.5 flex items-center justify-center gap-1 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                        <Icon name={m.icon} className="h-3 w-3" />
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* contribution graph */}
              <div className="mt-8">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                  Contribution Activity
                </p>
                <ContributionGraph />
                <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-slate-500">
                  <span>Less</span>
                  {levelColor.map((c, i) => (
                    <span key={i} className={`h-2.5 w-2.5 rounded-[3px] ${c}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          </TiltCard>
          </ScrollTilt3D>
        </Reveal>

        {/* Starred repos */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-300" fill="currentColor" />
              <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-slate-300">
                Curated Tech Stack & Bookmarks
              </h3>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {starredRepos.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.05}>
                <ScrollTilt3D rotate={5} z={25} className="h-full preserve-3d">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group glass-card block h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-glow/30 hover:shadow-glow-violet"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm font-semibold text-white group-hover:text-violet-glow">
                      {r.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-amber-300">
                      <Star className="h-3 w-3" fill="currentColor" />
                      {r.stars}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{r.description}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-glow" />
                    {r.lang}
                  </p>
                </a>
                </ScrollTilt3D>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div>
              <span className="eyebrow">Let's Build Something</span>
              <h3 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                Reach out & <span className="text-gradient">Hire Me</span>
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Open to internships, freelance projects, and collaboration on AI, computer vision, and
                full-stack web work. Send a message and I'll get back to you.
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                >
                  <Github className="h-4 w-4 text-cyan-glow" />
                  <span className="text-sm text-slate-200">github.com/mohan-prasad-d</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                >
                  <Linkedin className="h-4 w-4 text-cyan-glow" />
                  <span className="text-sm text-slate-200">linkedin.com/in/mohan-prasad-d</span>
                </a>
                <div className="glass flex items-center gap-3 rounded-xl px-4 py-3">
                  <MapPin className="h-4 w-4 text-cyan-glow" />
                  <span className="text-sm text-slate-200">Coimbatore, Tamil Nadu, India</span>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="glass flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 text-cyan-glow" />
                  <span className="text-sm text-slate-200">{profile.email}</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>

        {/* footer */}
        <div className="mt-24 border-t border-white/5 pt-8 text-center">
          <p className="font-mono text-xs text-slate-500">
            © {new Date().getFullYear()} Mohan Prasad D · Built with React, Vite & Framer Motion
          </p>
        </div>
      </div>
    </div>
  );
}
