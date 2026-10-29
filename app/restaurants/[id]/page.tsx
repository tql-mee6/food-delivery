'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, Star, Clock, Bike, MapPin, Heart, Navigation, ExternalLink
} from 'lucide-react';
import { restaurants } from '@/lib/restaurants';
import { getMenuByRestaurant, getCategoriesForRestaurant } from '@/lib/menu';
import { yandexRouteUrl, googleRouteUrl, dvGisUrl, osmEmbedUrl } from '@/lib/maps';
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
    <main>
      {/* Обложка ресторана */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          priority
          sizes="100vw"
          className="object-cover -z-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-food-bg via-black/70 to-black/40" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-10 md:pb-14 min-h-[360px] md:min-h-[440px] flex flex-col">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-white/75 hover:text-white transition-colors text-sm font-semibold w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Все рестораны
          </Link>

          <div className="mt-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="eyebrow mb-4">Меню ресторана</div>
              <h1 className="text-5xl md:text-7xl leading-none text-white mb-4">{restaurant.name}</h1>
              <p className="text-white/75 text-lg max-w-xl mb-6">{restaurant.description}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/50 backdrop-blur text-white">
                  <Star className="w-4 h-4 fill-food-accent text-food-accent" />
                  <b>{restaurant.rating}</b>
                  <span className="text-white/60">({restaurant.reviewsCount})</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/50 backdrop-blur text-white">
                  <Clock className="w-4 h-4 text-food-primary" />
                  {restaurant.deliveryTime} мин
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/50 backdrop-blur text-white">
                  <Bike className="w-4 h-4 text-food-primary" />
                  {restaurant.deliveryFee === 0 ? 'Бесплатная доставка' : `Доставка ${restaurant.deliveryFee} ₽`}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/50 backdrop-blur text-white">
                  <MapPin className="w-4 h-4 text-food-primary" />
                  Мин. заказ {restaurant.minOrder} ₽
                </span>
              </div>
            </div>

            <button
              onClick={() => setLiked(!liked)}
              className="self-start md:self-end flex items-center gap-2 h-11 px-4 rounded-md border border-white/25 text-white hover:border-white/60 transition-colors text-sm font-semibold"
              aria-label="В избранное"
              aria-pressed={liked}
            >
              <Heart className={`w-5 h-5 transition-colors ${liked ? 'fill-food-primary text-food-primary' : ''}`} />
              {liked ? 'В избранном' : 'В избранное'}
            </button>
          </div>
        </div>
      </section>

      {/* Адрес и маршрут */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-4 md:gap-5">
          <div className="rounded-xl bg-food-surface ring-1 ring-white/5 p-6 md:p-7 flex flex-col">
            <div className="eyebrow mb-4">Где нас найти</div>
            <div className="flex items-start gap-3 mb-6">
              <span className="w-10 h-10 rounded-full bg-food-primary/15 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-food-primary" />
              </span>
              <div>
                <div className="font-display text-xl leading-snug">{restaurant.address}</div>
                <div className="text-food-muted text-sm mt-1">
                  Доставка {restaurant.deliveryTime} мин · сами заберёте быстрее
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <a
                href={yandexRouteUrl(restaurant.lat, restaurant.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-5 rounded-md bg-food-primary text-white font-semibold text-sm hover:bg-food-primary-hover transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Проложить маршрут
              </a>
              <div className="flex gap-3">
                <a
                  href={googleRouteUrl(restaurant.lat, restaurant.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-12 px-4 rounded-md border border-food-border hover:border-food-primary transition-colors text-sm font-semibold"
                  aria-label="Открыть адрес в Google Maps"
                >
                  Google Maps
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a
                  href={dvGisUrl(restaurant.lat, restaurant.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-12 px-4 rounded-md border border-food-border hover:border-food-primary transition-colors text-sm font-semibold"
                  aria-label="Открыть адрес в 2ГИС"
                >
                  2ГИС
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden ring-1 ring-white/5 min-h-[260px] bg-food-surface-2">
            <iframe
              src={osmEmbedUrl(restaurant.lat, restaurant.lng)}
              title={`Карта: ${restaurant.address}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full grayscale-[0.25] contrast-[1.05]"
              style={{ border: 0 }}
            />
            {/* Лёгкое затемнение, чтобы карта не спорила с остальным интерфейсом */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/20" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        {/* Категории меню */}
        {categories.length > 1 && (
          <div className="flex gap-2 overflow-x-auto py-4 mb-6 no-scrollbar sticky top-16 md:top-[72px] bg-food-bg/90 backdrop-blur z-30 -mx-4 px-4 md:mx-0 md:px-0 border-b border-food-border">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 h-10 rounded-md font-display uppercase tracking-[0.12em] text-[13px] whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-food-primary text-white'
                    : 'border border-food-border text-food-text/85 hover:border-food-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Меню */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredMenu.map((item) => (
            <MenuItemCard key={item.id} item={item} restaurantName={restaurant.name} />
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-20 text-food-muted">В этой категории пока нет блюд</div>
        )}
      </div>
    </main>
  );
}
