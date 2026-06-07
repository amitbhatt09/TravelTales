import React from 'react';
import { PlaneTakeoff } from 'lucide-react';
import { cn } from './utils';

const WORDMARK_TONES = {
  elegant: {
    label: 'font-medium tracking-[0.32em] text-slate-500 dark:text-slate-400',
    subtitle: 'font-semibold italic from-slate-900 via-cyan-700 to-teal-700 dark:from-white dark:via-cyan-300 dark:to-teal-300',
  },
  bold: {
    label: 'font-extrabold tracking-[0.24em] text-slate-600 dark:text-slate-300',
    subtitle: 'font-extrabold from-slate-950 via-sky-700 to-cyan-700 dark:from-white dark:via-sky-300 dark:to-cyan-300',
  },
  'tech-premium': {
    label: 'font-bold tracking-[0.34em] text-slate-500 dark:text-slate-400',
    subtitle: 'font-semibold from-slate-900 via-sky-600 to-teal-600 dark:from-white dark:via-sky-200 dark:to-teal-200',
  },
};

export default function BrandMark({
  compact = false,
  showSubtitle = true,
  tone = 'tech-premium',
  subtitleClassName = '',
  className = '',
}) {
  const selectedTone = WORDMARK_TONES[tone] ?? WORDMARK_TONES['tech-premium'];

  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <div className="relative rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 p-2.5 text-white shadow-lg shadow-sky-500/30 ring-1 ring-white/40 dark:ring-white/15">
        <PlaneTakeoff className="h-4.5 w-4.5" />
        <span className="absolute -inset-1 -z-10 rounded-2xl bg-sky-500/25 blur-md" aria-hidden="true" />
      </div>

      <div className="leading-tight">
        <p className={cn('uppercase', selectedTone.label, compact ? 'text-xs' : 'text-sm')}>
          Travel Tales
        </p>
        {showSubtitle ? (
          <p className={cn('bg-gradient-to-r bg-clip-text text-transparent', selectedTone.subtitle, compact ? 'text-base' : 'text-lg', subtitleClassName)}>
            Curated travel platform
          </p>
        ) : null}
      </div>
    </div>
  );
}