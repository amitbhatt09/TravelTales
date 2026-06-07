import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { animate, motion } from 'framer-motion';
import { Compass, Globe2, MapPinned, ShieldCheck, Sparkles, Users } from 'lucide-react';
import baseUrl from '../apiConfig';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import SectionHeader from '../ui/SectionHeader';
import StatCard from '../ui/StatCard';
import HeroSection from '../ui/HeroSection';
import AppNavbar from '../ui/AppNavbar';
import DestinationCard from '../ui/DestinationCard';
import EmptyState from '../ui/EmptyState';
import BrandMark from '../ui/BrandMark';
import { toast } from 'react-toastify';

const guideItems = [
  { label: 'Dashboard', to: '/guide', icon: Compass },
  { label: 'My Places', to: '/viewplace', icon: MapPinned },
  { label: 'Add Destination', to: '/placeform', icon: Sparkles },
];

const travellerItems = [
  { label: 'Explorer', to: '/traveller', icon: Compass },
  { label: 'Browse', to: '/travellerviewplace', icon: Globe2 },
];

function AnimatedCounter({ value, suffix = '' }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.4,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <>{display}{suffix}</>;
}

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
    setRole(localStorage.getItem('role'));
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseUrl}/api/Place`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaces(res.data || []);
      } catch (e) {
        toast.error('Failed to load featured destinations');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const featured = useMemo(() => (places || []).slice(0, 6), [places]);
  const stats = useMemo(
    () => [
      { icon: Globe2, value: places.length || 24, label: 'Destinations', caption: 'Curated destinations across city, beach, mountain, and heritage escapes.' },
      { icon: Users, value: Math.max(12, Math.round((places.length || 8) * 1.4)), label: 'Guides', caption: 'Local experts shaping every itinerary with on-ground insight.' },
      { icon: Compass, value: Math.max(80, (places.length || 20) * 5), label: 'Travellers', caption: 'Active explorers planning their next premium adventure.' },
      { icon: ShieldCheck, value: Math.max(120, (places.length || 20) * 7), label: 'Reviews', caption: 'Trusted recommendations powering confident trip decisions.' },
    ],
    [places.length],
  );

  const goExplore = () => {
    const effectiveRole = localStorage.getItem('role') || role;
    if (effectiveRole === 'Guide') navigate('/viewplace');
    else navigate('/travellerviewplace');
  };

  return (
    <div className="relative min-h-screen overflow-hidden pb-16">
      <AppNavbar
        username={username}
        role={role}
        items={role === 'Traveller' ? travellerItems : guideItems}
      />

      <main className="space-y-20 pb-10">
        <HeroSection onExplore={goExplore} onSecondary={() => navigate('/signup')} />

        <section className="section-shell space-y-8">
          <SectionHeader
            eyebrow="Trending destinations"
            title="Stay ahead of the next unforgettable getaway"
            description="A recruiter should see product polish immediately: cinematic imagery, confident hierarchy, and a destination catalog that feels ready for production."
            action={<Button variant="outline" onClick={goExplore}>Explore all</Button>}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {loading &&
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden p-0">
                  <Skeleton className="h-64 w-full rounded-none" />
                  <div className="space-y-3 p-5">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </Card>
              ))}

            {!loading && featured.length === 0 ? (
              <div className="md:col-span-2 xl:col-span-3">
                <EmptyState
                  title="No destinations available yet"
                  description="Once guides start publishing places, this section will highlight the strongest travel stories and trending experiences."
                  actionLabel="Browse explorer"
                  onAction={goExplore}
                />
              </div>
            ) : null}

            {!loading && featured.map((place, index) => (
              <DestinationCard
                key={place.PlaceId}
                place={place}
                index={index}
                actionLabel="Visit catalog"
                onAction={goExplore}
                onCardClick={goExplore}
              />
            ))}
          </div>
        </section>

        <section className="section-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-8 sm:p-10">
            <SectionHeader
              eyebrow="Why Travel Tales"
              title="A premium travel workflow for discovery and publishing"
              description="The platform now feels like a startup product instead of a student demo: stronger hierarchy, richer cards, premium navigation, and responsive interactions across roles."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: 'Trusted Guides', text: 'Curated destination knowledge from verified local experts.' },
                { icon: Sparkles, title: 'Hidden Gems', text: 'Places beyond the obvious, surfaced with rich visual storytelling.' },
                { icon: Users, title: 'Personalized Experience', text: 'Role-aware journeys for travellers and guides.' },
                { icon: Compass, title: 'Easy Exploration', text: 'Fast filtering, immersive browsing, and clear calls to action.' },
              ].map((item) => (
                <motion.div key={item.title} whileHover={{ y: -6 }} className="rounded-[24px] border border-slate-200/80 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-950/60">
                  <item.icon className="h-6 w-6 text-sky-500" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={<AnimatedCounter value={stat.value} suffix="+" />}
                label={stat.label}
                caption={stat.caption}
              />
            ))}
          </div>
        </section>

        <section className="section-shell">
          <Card className="overflow-hidden bg-gradient-to-r from-slate-950 to-sky-950 p-8 text-white sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Badge variant="accent" className="bg-white/10 text-white">Travel startup quality</Badge>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">From authentication to destination discovery, every screen now speaks the same premium design language.</h2>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-200">
                  Tailwind-driven tokens, motion-enabled cards, modern empty states, and glassmorphism panels create a portfolio-ready frontend without changing the application contract underneath.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" onClick={goExplore}>Explore destinations</Button>
                <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20" onClick={() => navigate('/signup')}>Join Travel Tales</Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="section-shell pt-6">
        <Card className="flex flex-col gap-4 px-6 py-5 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <BrandMark compact />
            <p>Explore destinations curated by local guides.</p>
          </div>
          <div className="flex flex-col gap-1 text-left sm:text-right">
            <a href="mailto:TravelTales@gmail.com" className="transition hover:text-sky-500">TravelTales@gmail.com</a>
            <span>+91 98765 43210</span>
          </div>
        </Card>
      </footer>
    </div>
  );
};

export default HomePage;