import React from 'react';
import { cn } from './utils';

export default function Skeleton({ className = '' }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/40 bg-[linear-gradient(110deg,rgba(255,255,255,0.2),rgba(255,255,255,0.45),rgba(255,255,255,0.2))] bg-[length:200%_100%] animate-shimmer dark:border-white/10 dark:bg-[linear-gradient(110deg,rgba(30,41,59,0.5),rgba(51,65,85,0.75),rgba(30,41,59,0.5))]',
        className,
      )}
    />
  );
}

