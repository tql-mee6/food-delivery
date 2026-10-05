'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Clock, Bike } from 'lucide-react';
import type { Restaurant } from '@/types';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link
        href={`/restaurants/${restaurant.id}`}
        className="group block rounded-3xl overflow-hidden bg-food-surface border border-food-border hover:border-food-primary transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-food-primary/15"
      >
        {/* Фото */}
        <div className="relative h-52 overflow-hidden bg-food-surface-2">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Рейтинг */}
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/95 backdrop-blur rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-3.5 h-3.5 fill-food-primary text-food-primary" />
            {restaurant.rating}
            <span className="text-food-muted font-normal text-xs">
              ({restaurant.reviewsCount})
            </span>
          </div>

          {/* Бесплатная доставка */}
          {restaurant.deliveryFee === 0 && restaurant.isOpen && (
            <div className="absolute top-3 left-3 px-3 py-1.5 bg-food-success text-white rounded-full text-xs font-bold shadow-lg">
              Бесплатная доставка
            </div>
          )}

          {/* Закрыт */}
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <span className="px-4 py-2 bg-white text-food-text rounded-full text-sm font-bold">
                Закрыт
              </span>
            </div>
          )}
        </div>

        {/* Инфо */}
        <div className="p-5">
          <h3 className="font-extrabold text-lg mb-1 group-hover:text-food-primary transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-food-muted text-sm mb-4 line-clamp-2 min-h-[40px]">
            {restaurant.description}
          </p>

          <div className="flex items-center gap-4 pt-4 border-t border-food-border text-sm">
            <div className="flex items-center gap-1.5 text-food-muted">
              <Clock className="w-4 h-4 text-food-primary" />
              <span>{restaurant.deliveryTime} мин</span>
            </div>
            <div className="flex items-center gap-1.5 text-food-muted">
              <Bike className="w-4 h-4 text-food-primary" />
              <span>
                {restaurant.deliveryFee === 0
                  ? 'Бесплатно'
                  : `${restaurant.deliveryFee} ₽`}
              </span>
            </div>
          </div>

          <div className="mt-2 text-xs text-food-muted">
            Мин. заказ:{' '}
            <span className="font-semibold text-food-text">
              {restaurant.minOrder} ₽
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}