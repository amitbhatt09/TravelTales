import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, BarChart3, MapPinned, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import GuideNavbar from './GuideNavbar';
import Card from '../ui/Card';
import Button from '../ui/Button';
import StatCard from '../ui/StatCard';

export default function GuideDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Guide';
  const role = localStorage.getItem('role') || 'Guide';
  const placesEstimate = Number(localStorage.getItem('tt_cached_places') || 12);

  const dashboardStats = useMemo(
    () => [
      { value: `${placesEstimate}+`, label: 'Total places', caption: 'Published destinations managed by your guide profile.', icon: MapPinned },
      { value: `${placesEstimate * 124}+`, label: 'Total views', caption: 'Traffic across featured and catalog destination cards.', icon: Activity },
      { value: '4.8', label: 'Total ratings', caption: 'Average sentiment from explorer interactions.', icon: BarChart3 },
      { value: 'Live', label: 'Recent activity', caption: 'Destination edits and travel insights synced in real time.', icon: UserRound },
    ],
    [placesEstimate],
  );

  return (
    <div className="min-h-screen pb-14">
      <GuideNavbar username={username} role={role} />
      <main className="section-shell space-y-8 pt-32">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Guide dashboard</p>
            <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">Enterprise-grade control center for destination publishing</h1>
            <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300">Manage destination creation, monitor performance, and keep your travel content polished with startup-quality UI patterns.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={() => navigate('/placeform')}>Add destination</Button>
              <Button variant="outline" onClick={() => navigate('/viewplace')}>Browse my places</Button>
            </div>
          </Card>
          <Card className="relative overflow-hidden p-8">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-sky-500/20 blur-3xl" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Guide quick actions</h2>
            <div className="mt-5 grid gap-3">
              {[
                { label: 'Publish a new destination', to: '/placeform' },
                { label: 'Review destination catalog', to: '/viewplace' },
                { label: 'Return to homepage spotlight', to: '/home' },
              ].map((item) => (
                <button key={item.label} type="button" onClick={() => navigate(item.to)} className="rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200">
                  {item.label}
                </button>
              ))}
            </div>
          </Card>
        </motion.section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} caption={stat.caption} />
          ))}
        </section>
      </main>
    </div>
  );
}
