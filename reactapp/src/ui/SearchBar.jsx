import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';

export default function SearchBar({
  value,
  onChange,
  placeholder,
  suggestions = [],
  onSelectSuggestion,
  className = '',
  sticky = false,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  const visibleSuggestions = useMemo(
    () => suggestions.filter(Boolean).slice(0, 5),
    [suggestions],
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div ref={wrapperRef} className={cn(sticky ? 'sticky top-20 z-20' : '', className)}>
      <div className="glass-panel relative overflow-hidden p-3">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sky-500/10 to-transparent" />
        <div className="relative flex items-center gap-3 rounded-[20px] border border-white/40 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-950/80">
          <div className="rounded-full bg-sky-100 p-2 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
            <Search className="h-4 w-4" />
          </div>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="h-10 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            aria-label={placeholder}
          />
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300 sm:flex">
            <Sparkles className="h-3.5 w-3.5" />
            Smart search
          </div>
        </div>
        <AnimatePresence>
          {isFocused && value && visibleSuggestions.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="relative z-10 mt-3 space-y-2"
            >
              {visibleSuggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onSelectSuggestion?.(item);
                    setIsFocused(false);
                  }}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/40 bg-white/75 px-4 py-3 text-left text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-sky-500/30 dark:hover:bg-slate-900"
                >
                  <span>{item}</span>
                  <span className="text-xs font-medium text-slate-400">suggestion</span>
                </button>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}