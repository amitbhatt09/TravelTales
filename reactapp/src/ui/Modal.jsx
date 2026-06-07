import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from './utils';

export default function Modal({ open, onOpenChange, title, description, children, className = '' }) {
  if (!open) {
    return null;
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm"
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.24 }}
              className={cn(
                'w-full max-w-3xl rounded-[28px] border border-white/20 bg-white/95 p-6 shadow-2xl outline-none backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 sm:p-8',
                className,
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  {title ? <Dialog.Title className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</Dialog.Title> : null}
                  {description ? <Dialog.Description className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</Dialog.Description> : null}
                </div>
                <Dialog.Close className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white" aria-label="Close dialog">
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>
              <div className="mt-6">{children}</div>
            </motion.div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}