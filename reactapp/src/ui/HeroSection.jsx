import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import Badge from './Badge';

export default function HeroSection({ onExplore, onSecondary }) {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
      <div className="section-shell relative">
        <div className="absolute inset-x-8 top-8 -z-10 h-[520px] rounded-[40px] bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center shadow-glow" />
        <div className="absolute inset-x-8 top-8 -z-10 h-[520px] rounded-[40px] bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-sky-950/55" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl px-6 py-12 text-white sm:px-10 lg:py-16"
        >
          <Badge variant="accent" className="bg-white/15 text-white backdrop-blur-md dark:bg-white/10">
            Premium journeys by local experts
          </Badge>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
            Discover Hidden Wonders Around The World
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100/90 sm:text-lg">
            Explore destinations curated by local guides. Build smarter itineraries, uncover hidden gems, and browse travel stories through a premium startup experience.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" onClick={onExplore}>
              Explore Destinations
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={onSecondary}>
              Become a Guide
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}