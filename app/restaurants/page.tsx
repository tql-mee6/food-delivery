'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { restaurants, cuisineLabels } from '@/lib/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import type { Cuisine } from '@/types';

export default function RestaurantsPage() {
  const [search, setSearch] = useState('');
  const [activeCuisine, setActiveCuisine] = useState<'all' | Cuisine>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'deliveryTime' | 'minOrder'>('rating');

  const cuisines: Array<'all' | Cuisine> = [
    'all',
    'pizza',
    'sushi',
    'burger',
    'asian',
    'georgian',
    'coffee',
  ];

  const filtered = useMemo(() => {
    let result = [...restaurants];

    // Фильтр по кухне
    if (activeCuisine !== 'all') {
      result = result.filter((r) => r.cuisine === activeCuisine);
    }

    // Поиск
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      );
    }

    // Сортировка
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTime') {
      result.sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else if (sortBy === 'minOrder') {
      result.sort((a, b) => a.minOrder - b.minOrder);
    }

    return result;
  }, [search, activeCuisine, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Рестораны
        </h1>
        <p className="text-food-muted">
          {restaurants.length} заведений с доставкой по вашему адресу
        </p>
      </div>

      {/* Поиск + сортировка */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-food-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Найти ресторан или кухню..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-food-surface border border-food-border focus:border-food-primary focus:outline-none focus:ring-4 focus:ring-food-primary/10 transition-all"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-food-muted pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="pl-10 pr-8 py-3.5 rounded-2xl bg-food-surface border border-food-border focus:border-food-primary focus:outline-none appearance-none cursor-pointer font-medium w-full md:w-auto"
          >
            <option value="rating">По рейтингу</option>
            <option value="deliveryTime">Быстрая доставка</option>
            <option value="minOrder">Низкий мин. заказ</option>
          </select>
        </div>
      </div>

      {/* Фильтр по кухне */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {cuisines.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCuisine(c)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
              activeCuisine === c
                ? 'bg-food-primary text-white shadow-lg shadow-food-primary/30'
                : 'bg-food-surface border border-food-border text-food-text hover:border-food-primary'
            }`}
          >
            {cuisineLabels[c]}
          </button>
        ))}
      </div>

      {/* Сетка ресторанов */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
          <p className="text-food-muted">
            Попробуйте изменить фильтры или поисковый запрос
          </p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCuisine('all');
            }}
            className="mt-6 px-6 py-3 rounded-full bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </main>
  );
}