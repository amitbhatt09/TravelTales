import React from 'react';
import { cn } from './utils';

export default function Card({ className = '', children }) {
  return (
    <div
      className={cn(
        'glass-panel overflow-hidden border border-white/50 bg-white/75 text-slate-900 shadow-panel dark:text-slate-50',
        className,
      )}
    >
      {children}
    </div>
  );
}

