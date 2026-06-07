import React from 'react';
import { MoonStar, SunMedium } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { cn } from './utils';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-11 items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur-md transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-100',
        className,
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
    </motion.button>
  );
}