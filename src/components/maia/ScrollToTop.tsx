'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-200/60 shadow-lg shadow-zinc-300/20 flex items-center justify-center"
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-4 h-4 text-foreground/50" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}