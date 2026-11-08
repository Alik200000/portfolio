import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function EditorialPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timer = setTimeout(() => {
      setVisible(false);
    }, prefersReduced ? 150 : 950);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          onClick={() => setVisible(false)}
          role="status"
          aria-label="Загрузка портфолио Alim.Dev"
          className="fixed inset-0 z-[90] bg-[#060709] flex flex-col items-center justify-center cursor-pointer select-none"
        >
          {/* Organic Morphing Contour Ring (00:00-00:01 video reference) */}
          <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
            <div className="absolute inset-0 border border-white/65 editorial-blob-ring" />
            <div
              className="absolute inset-3 border border-white/20 editorial-blob-ring"
              style={{ animationDelay: '-2.5s' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="text-center px-4"
            >
              <div className="font-display font-black tracking-[0.28em] text-xl sm:text-2xl text-white uppercase">
                ALIM.DEV
              </div>
              <div className="mt-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                B2B • 1С • KASPI • AI
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
