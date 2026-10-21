'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Clock, Bike, ArrowUpRight } from 'lucide-react';
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
        className="group relative block h-[380px] rounded-xl overflow-hidden bg-food-surface ring-1 ring-white/5 hover:ring-food-primary/60 transition-all"
      >
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/0" />

        {/* Верхние бейджи */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
          {restaurant.deliveryFee === 0 ? (
            <span className="px-2.5 py-1 rounded bg-food-success text-[#0f0d0c] text-[11px] font-bold uppercase tracking-wider">
              Бесплатная доставка
            </span>
          ) : (
            <span />
          )}
          <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 backdrop-blur text-sm font-bold text-white">
            <Star className="w-3.5 h-3.5 fill-food-accent text-food-accent" />
            {restaurant.rating}
          </span>
        </div>

        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="px-4 py-2 border border-white/40 text-white rounded font-display uppercase tracking-widest text-sm">
              Закрыт
            </span>
          </div>
        )}

        {/* Нижняя часть */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-display text-2xl md:text-[26px] text-white leading-tight mb-1.5">
            {restaurant.name}
          </h3>
          <p className="text-white/70 text-sm mb-1 line-clamp-2">{restaurant.description}</p>
          <p className="text-white/45 text-xs mb-4">Мин. заказ {restaurant.minOrder} ₽</p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-[13px] text-white/85 whitespace-nowrap">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-food-primary" />
                {restaurant.deliveryTime} мин
              </span>
              <span className="flex items-center gap-1.5">
                <Bike className="w-4 h-4 text-food-primary" />
                {restaurant.deliveryFee === 0 ? 'Бесплатно' : `${restaurant.deliveryFee} ₽`}
              </span>
            </div>
            <span className="w-10 h-10 rounded-full bg-food-primary flex items-center justify-center translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 group-hover:rotate-45 transition-all">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
