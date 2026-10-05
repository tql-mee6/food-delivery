'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cartStore';
import type { MenuItem } from '@/types';

type Props = {
  item: MenuItem;
  restaurantName: string;
};

export default function MenuItemCard({ item, restaurantName }: Props) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="group flex gap-4 p-3 md:p-4 rounded-2xl bg-food-surface border border-food-border hover:border-food-primary transition-all hover:shadow-xl hover:shadow-food-primary/5"
    >
      {/* Фото */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-food-surface-2">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100px, 128px"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Инфо */}
      <div className="flex-1 min-w-0 flex flex-col">
        <h3 className="font-bold text-base md:text-lg mb-1 pr-2 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-food-muted text-sm line-clamp-2 mb-2 flex-1">
          {item.description}
        </p>
        <div className="text-xs text-food-muted mb-3">{item.weight}</div>

        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="font-extrabold text-lg md:text-xl">
            {item.price} ₽
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-semibold text-sm transition-all ${
              added
                ? 'bg-food-success text-white'
                : 'bg-food-primary text-white hover:bg-food-primary-hover hover:scale-105'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Добавлено
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                В корзину
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}