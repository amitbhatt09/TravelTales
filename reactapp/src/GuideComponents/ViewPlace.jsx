import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GuideNavbar from './GuideNavbar';
import baseUrl from '../apiConfig';
import { motion } from 'framer-motion';
import { Funnel, SlidersHorizontal } from 'lucide-react';
import Skeleton from '../ui/Skeleton';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';
import SearchBar from '../ui/SearchBar';
import DestinationCard from '../ui/DestinationCard';
import EmptyState from '../ui/EmptyState';
import Modal from '../ui/Modal';
import { buildPlaceInsights } from '../ui/utils';
import { toast } from 'react-toastify';

const ViewPlace = () => {
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedID, setselectedPlaceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [minRating, setMinRating] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [popularity, setPopularity] = useState('all');

  const username = localStorage.getItem('username') || 'Guest';
  const role = localStorage.getItem('role') || 'Traveller';

  /* 🔹 FETCH DATA */
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/api/Place`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaces(response.data);
      } catch (err) {
        setErrors('Failed to load places');
        toast.error('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const getWikiLink = (place) => {
    const text = place.Name || place.Location;
    const formatted = text.trim().replace(/\s+/g, "_");
    return `https://en.wikipedia.org/wiki/${formatted}`;
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

    const matchesRating = minRating === 'all' ? true : Number(insights.rating) >= Number(minRating);
    const matchesBudget = budgetFilter === 'all' ? true : insights.budget.toLowerCase() === budgetFilter;
    const matchesPopularity = popularity === 'all' ? true : insights.popularity.toLowerCase() === popularity;

    return matchesQuery && matchesCategory && matchesRating && matchesBudget && matchesPopularity;
  });

  const categories = Array.from(
    new Set((places || []).map((p) => (p.Category || '').trim()).filter(Boolean))
  );

  const handleEdit = (place) => navigate(`/editplace/${place.PlaceId}`);

  const openDeleteModal = (id) => {
    setselectedPlaceId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setselectedPlaceId(null);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/api/Place/${selectedID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaces((prev) => prev.filter((p) => p.PlaceId !== selectedID));
      toast.success('Destination deleted');
    } catch {
      toast.error('Delete failed');
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <GuideNavbar username={username} role={role} />
      <main className="section-shell space-y-6 pt-32">
        <SectionHeader
          eyebrow="Guide catalog"
          title="Manage and refine your destination portfolio"
          description="Search by location and category, then tune advanced filters for rating, budget tier, and popularity signals."
        />

        <SearchBar
          sticky
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search destinations, category or location..."
          suggestions={places.map((p) => p.Name)}
          onSelectSuggestion={setSearchQuery}
        />

        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 rounded-[24px] border border-slate-200/80 bg-white/75 p-4 shadow-panel backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/55 sm:grid-cols-2 xl:grid-cols-5">
          <div className="col-span-full flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <Funnel className="h-4 w-4" /> Filters
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
          <select className="field-input" value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)}>
            <option value="all">Any budget</option>
            <option value="budget">Budget</option>
            <option value="comfort">Comfort</option>
            <option value="premium">Premium</option>
          </select>
          <select className="field-input" value={popularity} onChange={(e) => setPopularity(e.target.value)}>
            <option value="all">Any popularity</option>
            <option value="rising">Rising</option>
            <option value="trending">Trending</option>
            <option value="popular">Popular</option>
          </select>
          <Button variant="outline" onClick={() => { setCategory('all'); setMinRating('all'); setBudgetFilter('all'); setPopularity('all'); setSearchQuery(''); }}>
            <SlidersHorizontal className="h-4 w-4" /> Reset
          </Button>
        </motion.section>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-[430px] w-full" />
              </div>
            ))}
          </div>
        ) : null}

        {errors ? <p className="text-sm text-rose-500">{errors}</p> : null}

        {!loading && filteredPlaces.length === 0 ? (
          <EmptyState
            title="No destinations found"
            description="Try adjusting filters or add a new destination to grow your catalog."
            actionLabel="Add destination"
            onAction={() => navigate('/placeform')}
            icon="map"
          />
        ) : null}

        {!loading ? (
          <section className="columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
            {filteredPlaces.map((place, index) => (
              <div key={place.PlaceId} className="break-inside-avoid">
                <DestinationCard
                  place={place}
                  index={index}
                  actionLabel="Edit"
                  onAction={() => handleEdit(place)}
                  secondaryLabel="Delete"
                  secondaryAction={() => openDeleteModal(place.PlaceId)}
                  onCardClick={() => window.open(getWikiLink(place), '_blank')}
                />
              </div>
            ))}
          </section>
        ) : null}
      </main>

      <Modal open={showDeleteModal} onOpenChange={setShowDeleteModal} title="Delete destination" description="This action removes the selected destination from your catalog.">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ViewPlace;
