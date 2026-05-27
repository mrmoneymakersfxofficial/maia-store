'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Rows3, LayoutGrid } from 'lucide-react';

type ViewMode = 'single' | 'double';

interface GridToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function GridToggle({ value, onChange }: GridToggleProps) {
  return (
    <div className="relative flex items-center gap-1 p-1 rounded-full bg-zinc-100">
      <motion.div
        layoutId="grid-toggle-indicator"
        className="absolute top-1 bottom-1 rounded-full bg-primary shadow-sm"
        style={{
          left: value === 'single' ? 4 : '50%',
          width: 'calc(50% - 4px)',
          transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      <button
        onClick={() => onChange('single')}
        className="relative z-10 flex items-center justify-center w-9 h-8 rounded-full transition-colors duration-200"
        title="Vista 1 columna"
      >
        <Rows3
          className={`w-4 h-4 transition-colors duration-200 ${
            value === 'single' ? 'text-white' : 'text-foreground/40'
          }`}
        />
      </button>
      <button
        onClick={() => onChange('double')}
        className="relative z-10 flex items-center justify-center w-9 h-8 rounded-full transition-colors duration-200"
        title="Vista 2 columnas"
      >
        <LayoutGrid
          className={`w-4 h-4 transition-colors duration-200 ${
            value === 'double' ? 'text-white' : 'text-foreground/40'
          }`}
        />
      </button>
    </div>
  );
}

// ─── Hook for persisted grid view ─────────────────────────────

const STORAGE_KEY = 'maia_grid_view';

export function useGridView(defaultMode: ViewMode = 'single'): {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isReady: boolean;
} {
  const [viewMode, setViewModeState] = useState<ViewMode>(defaultMode);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'single' || stored === 'double') {
        setViewModeState(stored);
      }
    } catch {
      // ignore
    }
    setIsReady(true);
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, []);

  return { viewMode, setViewMode, isReady };
}
