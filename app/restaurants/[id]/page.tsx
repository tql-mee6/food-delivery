'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Star, Clock, Bike, MapPin, Heart
} from 'lucide-react';
import { restaurants } from '@/lib/restaurants';
import { getMenuByRestaurant, getCategoriesForRestaurant } from '@/lib/menu';
import MenuItemCard from '../../components/MenuItemCard';

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    notFound();
  }

  const menu = getMenuByRestaurant(restaurant.id);
  const categories = getCategoriesForRestaurant(restaurant.id);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] ?? '');
  const [liked, setLiked] = useState(false);

  const filteredMenu = useMemo(() => {
    if (!activeCategory) return menu;
    return menu.filter((item) => item.category === activeCategory);
  }, [menu, activeCategory]);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Назад */}
      <Link
        href="/restaurants"
        className="inline-flex items-center gap-2 text-food-muted hover:text-food-primary transition-colors mb-6 text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Все рестораны
      </Link>

      {/* Шапка ресторана */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-food-surface-2 to-food-border mb-8">
        <div className="p-6 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Иконка/фото */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-food-surface flex items-center justify-center text-5xl md:text-6xl flex-shrink-0 shadow-lg">
            🍽️
          </div>

          {/* Инфо */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
              {restaurant.name}
            </h1>
            <p className="text-food-muted mb-5 max-w-2xl">
              {restaurant.description}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-food-surface rounded-full">
                <Star className="w-4 h-4 fill-food-primary text-food-primary" />
                <span className="font-bold">{restaurant.rating}</span>
                <span className="text-food-muted">
                  ({restaurant.reviewsCount})
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-food-surface rounded-full">
                <Clock className="w-4 h-4 text-food-primary" />
                <span>{restaurant.deliveryTime} мин</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-food-surface rounded-full">
                <Bike className="w-4 h-4 text-food-primary" />
                <span>
                  {restaurant.deliveryFee === 0
                    ? 'Бесплатно'
                    : `${restaurant.deliveryFee} ₽`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-food-surface rounded-full">
                <MapPin className="w-4 h-4 text-food-primary" />
                <span>Мин. {restaurant.minOrder} ₽</span>
              </div>
            </div>
          </div>

          {/* Лайк */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-4 right-4 md:static w-12 h-12 rounded-full bg-food-surface flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            aria-label="В избранное"
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                liked ? 'fill-food-accent text-food-accent' : 'text-food-text'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Категории меню */}
      {categories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar sticky top-[72px] bg-food-bg/90 backdrop-blur z-30 pt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-food-primary text-white shadow-lg shadow-food-primary/30'
                  : 'bg-food-surface border border-food-border text-food-text hover:border-food-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Меню */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredMenu.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            restaurantName={restaurant.name}
          />
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <div className="text-center py-20 text-food-muted">
          В этой категории пока нет блюд
        </div>
      )}
    </main>
  );
}