import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function buildPlaceInsights(place = {}) {
  const seed = Number(place.PlaceId || place.placeId || 1);
  const rating = (4.2 + (seed % 7) * 0.1).toFixed(1);
  const reviews = 36 + seed * 7;
  const popularity = ['Rising', 'Trending', 'Popular'][seed % 3];
  const budget = ['Budget', 'Comfort', 'Premium'][seed % 3];
  const season = place.BestTimeToVisit || 'Year round';
  const tags = [place.Category, season, popularity].filter(Boolean);
  return { rating, reviews, popularity, budget, season, tags };
}

export function splitLocation(location = '') {
  const [state = '', country = ''] = location.split(',').map((item) => item.trim());
  return { state, country: country || state };
}

export function joinLocation(state = '', country = '') {
  return [state, country].filter(Boolean).join(', ');
}