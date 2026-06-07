import React from 'react';
import { cn } from './utils';

const variants = {
  primary: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-200',
  secondary: 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-200',
  accent: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-200',
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
};

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        variants[variant] || variants.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}