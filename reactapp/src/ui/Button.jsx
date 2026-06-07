import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from './utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 hover:bg-sky-600',
        secondary: 'bg-teal-500 text-white shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 hover:bg-teal-600',
        outline: 'border border-slate-200 bg-white/80 text-slate-800 hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 dark:hover:bg-slate-900',
        ghost: 'bg-transparent text-slate-700 hover:bg-white/70 dark:text-slate-100 dark:hover:bg-white/10',
        accent: 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 hover:bg-orange-600',
        danger: 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:-translate-y-0.5 hover:bg-rose-600',
      },
      size: {
        sm: 'h-10 px-4',
        md: 'h-11 px-5',
        lg: 'h-12 px-6 text-base',
        icon: 'h-11 w-11 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export default function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };

