'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { restaurants, cuisineLabels } from '@/lib/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import type { Cuisine } from '@/types';

function RestaurantsContent() {
  const searchParams = useSearchParams();
  const cuisineFromUrl = searchParams.get('cuisine');

  const [search, setSearch] = useState('');
  const [activeCuisine, setActiveCuisine] = useState<'all' | Cuisine>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'deliveryTime' | 'minOrder'>('rating');

  useEffect(() => {
    if (cuisineFromUrl && cuisineFromUrl in cuisineLabels) {
      setActiveCuisine(cuisineFromUrl as Cuisine);
    }
  }, [cuisineFromUrl]);

  const cuisines: Array<'all' | Cuisine> = [
    'all', 'pizza', 'sushi', 'burger', 'asian', 'georgian', 'coffee',
  ];

  const filtered = useMemo(() => {
    let result = [...restaurants];
    if (activeCuisine !== 'all') {
      result = result.filter((r) => r.cuisine === activeCuisine);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.address.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'deliveryTime') result.sort((a, b) => a.deliveryTime - b.deliveryTime);
    else if (sortBy === 'minOrder') result.sort((a, b) => a.minOrder - b.minOrder);
    return result;
  }, [search, activeCuisine, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
      <div className="mb-10">
        <div className="eyebrow mb-4">Доставка из ресторанов</div>
        <h1 className="text-5xl md:text-7xl leading-none mb-4">
          {activeCuisine === 'all' ? 'Рестораны' : cuisineLabels[activeCuisine]}
        </h1>
        <p className="text-food-muted">
          {filtered.length}{' '}
          {filtered.length === 1 ? 'заведение' : filtered.length < 5 ? 'заведения' : 'заведений'}{' '}
          с доставкой по вашему адресу
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-food-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Найти ресторан или кухню..."
            className="w-full pl-12 pr-4 py-3.5 rounded-md bg-food-surface border border-food-border focus:border-food-primary focus:outline-none focus:ring-4 focus:ring-food-primary/15 transition-all"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-food-muted pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="pl-10 pr-8 py-3.5 rounded-md bg-food-surface border border-food-border focus:border-food-primary focus:outline-none appearance-none cursor-pointer font-medium w-full md:w-auto"
          >
            <option value="rating">По рейтингу</option>
            <option value="deliveryTime">Быстрая доставка</option>
            <option value="minOrder">Низкий мин. заказ</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {cuisines.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCuisine(c)}
            className={`px-5 h-10 rounded-md font-display uppercase tracking-[0.12em] text-[13px] whitespace-nowrap transition-all ${
              activeCuisine === c
                ? 'bg-food-primary text-white'
                : 'border border-food-border text-food-text/85 hover:border-food-primary'
            }`}
          >
            {cuisineLabels[c]}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
          <p className="text-food-muted">Попробуйте изменить фильтры или поисковый запрос</p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCuisine('all');
            }}
            className="mt-6 px-6 py-3 rounded-md bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </main>
  );
}

export default function RestaurantsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 md:px-8 py-8">Загрузка...</div>}>
      <RestaurantsContent />
    </Suspense>
  );
}