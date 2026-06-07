import React from 'react';
import { Compass, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import Card from './Card';

export default function EmptyState({ title, description, actionLabel, onAction, icon = 'compass' }) {
  const Icon = icon === 'map' ? MapPinned : Compass;

  return (
    <Card className="p-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-md flex-col items-center gap-4"
      >
        <div className="rounded-full bg-sky-100 p-4 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        {actionLabel && onAction ? (
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </motion.div>
    </Card>
  );
}