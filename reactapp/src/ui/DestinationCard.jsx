import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Coins, MapPin, Star } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import { buildPlaceInsights, cn } from './utils';

export default function DestinationCard({
  place,
  index = 0,
  actionLabel = 'View destination',
  onAction,
  secondaryAction,
  secondaryLabel,
  onCardClick,
  className = '',
}) {
  const insights = buildPlaceInsights(place);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      whileHover={{ y: -10 }}
      className={className}
    >
      <Card className="group h-full p-0">
        <button type="button" onClick={onCardClick} className="block w-full text-left">
          <div className="relative h-64 overflow-hidden">
            <img
              src={place.PlaceImage || 'https://via.placeholder.com/800x600?text=Destination'}
              alt={place.Name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <Badge variant="primary">{place.Category || 'Destination'}</Badge>
              <Badge variant="accent">{insights.popularity}</Badge>
            </div>
            <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg dark:bg-slate-950/85 dark:text-white">
              <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
              {insights.rating}
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">Travel Tales pick</p>
              <h3 className="mt-2 text-2xl font-bold text-white">{place.Name}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/85">
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{place.Location || 'Location available on request'}</span>
                <span className="inline-flex items-center gap-1.5"><Coins className="h-4 w-4" />{insights.budget}</span>
              </div>
            </div>
          </div>
        </button>

        <div className="space-y-4 p-5">
          <p className="line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {place.Description || `${place.Name} is ideal for travellers seeking ${place.Category?.toLowerCase() || 'immersive'} experiences, local stories, and a memorable best season in ${insights.season.toLowerCase()}.`}
          </p>
          <div className="flex flex-wrap gap-2">
            {insights.tags.map((tag) => (
              <Badge key={tag} variant="neutral">{tag}</Badge>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-800">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Verified local guide</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{insights.reviews} recent traveller reviews</p>
            </div>
            <div className="flex items-center gap-2">
              {secondaryAction && secondaryLabel ? (
                <Button variant="outline" size="sm" onClick={secondaryAction}>
                  {secondaryLabel}
                </Button>
              ) : null}
              <Button size="sm" onClick={onAction} className={cn(onCardClick && 'pl-4 pr-3')}>
                {actionLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}