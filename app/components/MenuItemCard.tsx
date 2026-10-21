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

/* Карточка блюда: крупное фото, цена и кнопка «в корзину» на первом плане */
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
      className="group flex flex-col rounded-xl overflow-hidden bg-food-surface ring-1 ring-white/5 hover:ring-food-primary/50 transition-all"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-food-surface-2">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.07] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-food-surface via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur text-[11px] text-white/85">
          {item.weight}
        </span>
      </div>

      <div className="flex-1 flex flex-col p-5 pt-3">
        <h3 className="font-display text-xl leading-tight mb-1.5">{item.name}</h3>
        <p className="text-food-muted text-sm line-clamp-2 mb-5 flex-1">{item.description}</p>

        <div className="flex items-center justify-between gap-3">
          <div className="font-display text-2xl">
            {item.price} <span className="text-food-primary">₽</span>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 h-11 px-4 rounded-md font-semibold text-sm transition-all ${
              added
                ? 'bg-food-success text-[#0f0d0c]'
                : 'bg-food-primary text-white hover:bg-food-primary-hover active:scale-95'
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
