import React from 'react';
import { motion } from 'framer-motion';
import Badge from './Badge';

export default function SectionHeader({ eyebrow, title, description, action = null, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} md:flex-row md:items-end md:justify-between`}
    >
      <div className="max-w-2xl space-y-3">
        {eyebrow ? <Badge variant="secondary">{eyebrow}</Badge> : null}
        <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
        {description ? <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p> : null}
      </div>
      {action}
    </motion.div>
  );
}