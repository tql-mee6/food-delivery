'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  ArrowLeft, Plus, Minus, Trash2, ShoppingBag,
  Bike, ArrowRight, Store
} from 'lucide-react';
import { useCart } from '@/lib/cartStore';

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const clearCart = useCart((s) => s.clearCart);
  const getSubtotal = useCart((s) => s.getSubtotal);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Пока не смонтировалось — не рендерим содержимое (избегаем hydration mismatch)
  if (!mounted) {
    return (
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="h-8 w-40 bg-food-surface-2 rounded animate-pulse mb-8" />
        <div className="h-40 bg-food-surface-2 rounded-3xl animate-pulse" />
      </main>
    );
  }

  // Пустая корзина
  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-20 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-food-surface-2 flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-food-muted" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Корзина пуста
        </h1>
        <p className="text-food-muted mb-8 max-w-md mx-auto">
          Добавьте блюда из любимых ресторанов — и они появятся здесь.
        </p>
        <Link
          href="/restaurants"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-all shadow-lg shadow-food-primary/30 hover:scale-105"
        >
          <Store className="w-5 h-5" />
          Выбрать ресторан
        </Link>
      </main>
    );
  }

  const subtotal = getSubtotal();
  const restaurantName = items[0].restaurantName;
  const restaurantId = items[0].restaurantId;

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      {/* Назад */}
      <Link
        href={`/restaurants/${restaurantId}`}
        className="inline-flex items-center gap-2 text-food-muted hover:text-food-primary transition-colors mb-6 text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Вернуться в ресторан
      </Link>

      {/* Заголовок */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Корзина
          </h1>
          <p className="text-food-muted flex items-center gap-2">
            <Store className="w-4 h-4" />
            {restaurantName}
          </p>
        </div>
        <button
          onClick={() => {
            if (confirm('Очистить корзину?')) clearCart();
          }}
          className="flex items-center gap-1.5 text-sm text-food-muted hover:text-food-accent transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden md:inline">Очистить</span>
        </button>
      </div>

      {/* Список товаров */}
      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <div
            key={item.menuItemId}
            className="flex gap-4 p-4 rounded-2xl bg-food-surface border border-food-border"
          >
            {/* Фото */}
            <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-food-surface-2 to-food-border flex items-center justify-center">
              <span className="text-3xl">🍽️</span>
            </div>

            {/* Инфо */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-base line-clamp-2">{item.name}</h3>
                <button
                  onClick={() => removeItem(item.menuItemId)}
                  className="text-food-muted hover:text-food-accent transition-colors flex-shrink-0"
                  aria-label="Удалить"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-food-muted mb-3">{item.weight}</div>

              <div className="flex items-center justify-between gap-3 mt-auto">
                {/* Количество */}
                <div className="flex items-center gap-2 bg-food-surface-2 rounded-full p-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.menuItemId, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded-full bg-food-bg flex items-center justify-center hover:bg-food-primary hover:text-white transition-colors"
                    aria-label="Уменьшить"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-6 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.menuItemId, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded-full bg-food-bg flex items-center justify-center hover:bg-food-primary hover:text-white transition-colors"
                    aria-label="Увеличить"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Цена */}
                <div className="font-extrabold text-lg whitespace-nowrap">
                  {item.price * item.quantity} ₽
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Итого */}
      <div className="rounded-3xl bg-food-surface border border-food-border p-6 sticky bottom-4 shadow-xl shadow-food-primary/5">
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-food-muted">
            <span>Товары ({items.length})</span>
            <span>{subtotal} ₽</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-food-border">
            <span className="font-bold text-lg">Итого</span>
            <span className="font-extrabold text-2xl text-food-primary">
              {subtotal} ₽
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-food-muted pt-1">
            <Bike className="w-3.5 h-3.5" />
            Стоимость доставки рассчитаем на следующем шаге
          </div>
        </div>

        <button
          onClick={() => router.push('/checkout')}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-food-primary text-white font-bold text-lg hover:bg-food-primary-hover transition-all shadow-lg shadow-food-primary/30 hover:scale-[1.02]"
        >
          Оформить заказ
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </main>
  );
}