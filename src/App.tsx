import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import Navigation, { type PageId } from '@/components/Navigation';
import HomePage from '@/pages/HomePage';
import ProjectsPage from '@/pages/ProjectsPage';
import ActivityPage from '@/pages/ActivityPage';

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const mainRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  const depthScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  const navigate = (p: PageId) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // keep document title in sync
  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: 'Mohan Prasad D — Full-Stack Developer & AI Systems Engineer',
      projects: 'Projects — Mohan Prasad D',
      activity: 'Activity & Contact — Mohan Prasad D',
    };
    document.title = titles[page];
  }, [page]);

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />
      <Navigation active={page} onNavigate={navigate} />

      <main ref={mainRef} className="relative z-10">
        <motion.div style={{ scale: depthScale }} className="origin-top">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {page === 'home' && <HomePage onNavigate={navigate} />}
            {page === 'projects' && <ProjectsPage />}
            {page === 'activity' && <ActivityPage />}
          </motion.div>
        </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
