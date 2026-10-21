'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { useCart } from '@/lib/cartStore';
import type { MenuItem } from '@/types';

/* Блюдо «на тарелке» — круглое фото на деревянном фоне, цена и быстрый заказ */
export default function DishTile({
  item,
  restaurantName,
}: {
  item: MenuItem;
  restaurantName: string;
}) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      weight: item.weight,
      restaurantId: item.restaurantId,
      restaurantName,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative w-[78%] aspect-square mb-6">
        {/* Тень «тарелки» на столе */}
        <div className="absolute inset-[6%] translate-y-[10%] rounded-full bg-black/70 blur-2xl" />
        <div className="relative w-full h-full rounded-full overflow-hidden ring-[6px] ring-[#2a1d16] shadow-2xl shadow-black/60 group-hover:-rotate-6 group-hover:scale-[1.04] transition-transform duration-700 ease-out">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 45vw, 240px"
            className="object-cover"
          />
        </div>
      </div>

      <Link
        href={`/restaurants/${item.restaurantId}`}
        className="text-[11px] uppercase tracking-[0.2em] text-food-accent/90 hover:text-food-accent mb-1.5"
      >
        {restaurantName}
      </Link>
      <h3 className="font-display text-xl md:text-[22px] leading-tight text-white mb-1">
        {item.name}
      </h3>
      <p className="text-white/55 text-[13px] line-clamp-1 mb-4 max-w-[240px]">{item.description}</p>

      <div className="flex items-center gap-3">
        <span className="font-display text-2xl text-white">{item.price} ₽</span>
        <button
          onClick={handleAdd}
          aria-label={`Добавить «${item.name}» в корзину`}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
            added
              ? 'bg-food-success text-[#0f0d0c] scale-110'
              : 'bg-food-primary text-white hover:bg-food-primary-hover hover:scale-110 active:scale-95 shadow-lg shadow-food-primary/30'
          }`}
        >
          {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
