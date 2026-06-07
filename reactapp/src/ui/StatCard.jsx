import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

export default function StatCard({ icon: Icon, value, label, caption }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.24 }}>
      <Card className="h-full p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{label}</p>
            {caption ? <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{caption}</p> : null}
          </div>
          {Icon ? (
            <div className="rounded-2xl bg-sky-100 p-3 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
              <Icon className="h-6 w-6" />
            </div>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}