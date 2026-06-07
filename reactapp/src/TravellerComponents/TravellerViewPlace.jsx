import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../apiConfig';
import TravellerNavbar from './TravellerNavbar';
import { motion } from 'framer-motion';
import { Coins, Funnel, Sparkles, Star } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';
import SearchBar from '../ui/SearchBar';
import DestinationCard from '../ui/DestinationCard';
import EmptyState from '../ui/EmptyState';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { buildPlaceInsights } from '../ui/utils';
import { toast } from 'react-toastify';

const TravellerViewPlace = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [maxBudget, setMaxBudget] = useState('all');
  const [minRating, setMinRating] = useState('all');

  const username = localStorage.getItem('username') || 'Traveller';
  const role = localStorage.getItem('role') || 'Traveller';

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${baseUrl}/api/Place`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaces(res.data);
      } catch (err) {
        setErrors('Failed to fetch places');
        toast.error('Failed to fetch destinations');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const getWikiLink = (place) => {
    const text = place.Name || place.Location;
    if (!text) return 'https://en.wikipedia.org';
    return `https://en.wikipedia.org/wiki/${text.trim().replace(/\s+/g, '_')}`;
  };

  const filteredPlaces = places.filter((place) => {
    const q = searchQuery.trim().toLowerCase();
    const insights = buildPlaceInsights(place);
    const matchesQuery =
      place.Name.toLowerCase().includes(q) ||
      place.Category.toLowerCase().includes(q) ||
      place.Location.toLowerCase().includes(q);

    const matchesCategory =
      category === 'all' ? true : (place.Category || '').toLowerCase() === category;

    const maxBudgetMatch =
      maxBudget === 'all' ? true : ['budget', 'comfort', 'premium'].indexOf(insights.budget.toLowerCase()) <= ['budget', 'comfort', 'premium'].indexOf(maxBudget);

    const minRatingMatch = minRating === 'all' ? true : Number(insights.rating) >= Number(minRating);

    return matchesQuery && matchesCategory && maxBudgetMatch && minRatingMatch;
  });

  const categories = Array.from(
    new Set((places || []).map((p) => (p.Category || '').trim()).filter(Boolean))
  );

  return (
    <div className="min-h-screen pb-16">
      <TravellerNavbar username={username} role={role} />
      <main className="section-shell space-y-6 pt-32">
        <SectionHeader
          eyebrow="Traveller explorer"
          title="Browse destinations with an immersive, Airbnb-inspired catalog"
          description="Sticky search, instant filtering, and cinematic destination cards designed for premium travel discovery."
        />

        <SearchBar
          sticky
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search destinations, guide tags, location..."
          suggestions={places.map((p) => p.Name)}
          onSelectSuggestion={setSearchQuery}
        />

        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 rounded-[24px] border border-slate-200/80 bg-white/75 p-4 shadow-panel backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/55 sm:grid-cols-2 xl:grid-cols-4">
          <div className="col-span-full flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Funnel className="h-4 w-4" /> Refine search
          </div>
          <select className="field-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c.toLowerCase()}>{c}</option>
            ))}
          </select>
          <select className="field-input" value={minRating} onChange={(e) => setMinRating(e.target.value)}>
            <option value="all">Any rating</option>
            <option value="4.0">4.0+</option>
            <option value="4.5">4.5+</option>
          </select>
          <select className="field-input" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)}>
            <option value="all">Any budget</option>
            <option value="budget">Budget</option>
            <option value="comfort">Comfort</option>
            <option value="premium">Premium</option>
          </select>
          <Button variant="outline" onClick={() => { setCategory('all'); setMinRating('all'); setMaxBudget('all'); setSearchQuery(''); }}>
            Reset filters
          </Button>
        </motion.section>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[430px] w-full" />
            ))}
          </div>
        ) : null}

        {errors ? <p className="text-sm text-rose-500">{errors}</p> : null}

        {!loading && filteredPlaces.length === 0 ? (
          <EmptyState
            title="No destinations found"
            description="Try different filters or search terms to discover destinations curated by local guides."
            actionLabel="Clear filters"
            onAction={() => { setCategory('all'); setMinRating('all'); setMaxBudget('all'); setSearchQuery(''); }}
          />
        ) : null}

        {!loading ? (
          <section className="columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
            {filteredPlaces.map((place, index) => {
              const insights = buildPlaceInsights(place);
              return (
                <div key={place.PlaceId} className="break-inside-avoid">
                  <DestinationCard
                    place={place}
                    index={index}
                    actionLabel="Open details"
                    onAction={() => setSelectedPlace(place)}
                    secondaryLabel="Visit wiki"
                    secondaryAction={() => window.open(getWikiLink(place), '_blank')}
                    onCardClick={() => setSelectedPlace(place)}
                    className="relative"
                  />
                  <div className="mt-3 flex flex-wrap gap-2 px-1">
                    <Badge variant="primary"><Star className="mr-1 h-3.5 w-3.5 fill-current" /> {insights.rating}</Badge>
                    <Badge variant="secondary"><Coins className="mr-1 h-3.5 w-3.5" /> {insights.budget}</Badge>
                    <Badge variant="accent"><Sparkles className="mr-1 h-3.5 w-3.5" /> {insights.season}</Badge>
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}
      </main>

      <Modal
        open={Boolean(selectedPlace)}
        onOpenChange={(open) => {
          if (!open) setSelectedPlace(null);
        }}
        title={selectedPlace?.Name || 'Destination details'}
        description={selectedPlace?.Location || 'Curated by local guides'}
      >
        {selectedPlace ? (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <img src={selectedPlace.PlaceImage || 'https://via.placeholder.com/800x600'} alt={selectedPlace.Name} className="h-60 w-full rounded-2xl object-cover" />
              <div className="space-y-3">
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {selectedPlace.Description || `${selectedPlace.Name} is a carefully curated destination with seasonal highlights, local guide support, and travel-friendly planning details.`}
                </p>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                  <p><strong>Best season:</strong> {selectedPlace.BestTimeToVisit || 'Any time'}</p>
                  <p className="mt-2"><strong>Guide info:</strong> Verified local travel contributor</p>
                  <p className="mt-2"><strong>Travel tip:</strong> Plan early mornings for the best local experience.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {buildPlaceInsights(selectedPlace).tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[selectedPlace.PlaceImage, selectedPlace.PlaceImage, selectedPlace.PlaceImage].map((image, idx) => (
                <img key={`${image}-${idx}`} src={image || 'https://via.placeholder.com/500x350'} alt={`${selectedPlace.Name} gallery ${idx + 1}`} className="h-28 w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => window.open(getWikiLink(selectedPlace), '_blank')}>Open destination guide</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default TravellerViewPlace;
