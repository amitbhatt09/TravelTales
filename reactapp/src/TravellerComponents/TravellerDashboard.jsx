import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import TravellerNavbar from './TravellerNavbar';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function TravellerDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Traveller';
  const role = localStorage.getItem('role') || 'Traveller';

  return (
    <div className="min-h-screen pb-14">
      <TravellerNavbar username={username} role={role} />
      <main className="section-shell pt-32">
        <motion.section initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="overflow-hidden p-0">
            <div className="relative h-full min-h-[360px] p-8 sm:p-10">
              <img src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1400&q=80" alt="Traveller experience" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-sky-950/45 to-teal-950/55" />
              <div className="relative text-white">
                <Badge variant="accent" className="bg-white/15 text-white">Traveller dashboard</Badge>
                <h1 className="mt-4 text-4xl font-bold">Discover immersive trips tailored to your style</h1>
                <p className="mt-4 max-w-xl text-sm leading-8 text-slate-100/85">Search, filter, and preview destinations with premium catalog cards inspired by top travel platforms.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={() => navigate('/travellerviewplace')}>Start exploring</Button>
                  <Button variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20" onClick={() => navigate('/home')}>
                    Back to home
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            {[
              { icon: Sparkles, title: 'Smart recommendations', text: 'Get destination suggestions based on search intent and category interests.' },
              { icon: Heart, title: 'Immersive previews', text: 'Open rich destination modals with travel notes, season guidance, and guide context.' },
              { icon: Star, title: 'Premium discovery', text: 'Consistent card hierarchy, hover motion, and streamlined filters.' },
            ].map((item) => (
              <Card key={item.title} className="p-6">
                <item.icon className="h-6 w-6 text-sky-500" />
                <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
              </Card>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
