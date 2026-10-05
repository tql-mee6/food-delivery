'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ShoppingBag, ArrowRight, Check, ChefHat, Bike, Home,
  Clock, Store, AlertCircle, Trash2
} from 'lucide-react';
import { useOrders } from '@/lib/ordersStore';
import type { OrderStatus } from '@/types';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: typeof Check; color: string }
> = {
  accepted: { label: 'Принят', icon: Check, color: 'text-blue-600 bg-blue-50' },
  preparing: { label: 'Готовится', icon: ChefHat, color: 'text-amber-600 bg-amber-50' },
  delivering: { label: 'В пути', icon: Bike, color: 'text-purple-600 bg-purple-50' },
  delivered: { label: 'Доставлен', icon: Home, color: 'text-green-600 bg-green-50' },
};

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrders((s) => s.orders);
  const updateStatus = useOrders((s) => s.updateStatus);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="h-8 w-40 bg-food-surface-2 rounded animate-pulse mb-8" />
        <div className="space-y-4">
          <div className="h-32 bg-food-surface-2 rounded-3xl animate-pulse" />
          <div className="h-32 bg-food-surface-2 rounded-3xl animate-pulse" />
        </div>
      </main>
    );
  }

  // Пустая история
  if (orders.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-20 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-food-surface-2 flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-food-muted" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Заказов пока нет
        </h1>
        <p className="text-food-muted mb-8 max-w-md mx-auto">
          Здесь появится история ваших заказов. Оформите первый — и он отобразится тут.
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

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Мои заказы
        </h1>
        <p className="text-food-muted">
          {orders.length} {orders.length === 1 ? 'заказ' : orders.length < 5 ? 'заказа' : 'заказов'}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const config = STATUS_CONFIG[order.status];
          const Icon = config.icon;
          const orderDate = new Date(order.createdAt).toLocaleString('ru-RU', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit',
          });
          const itemsCount = order.items.reduce((s, i) => s + i.quantity, 0);

          return (
            <div
              key={order.id}
              className="rounded-3xl bg-food-surface border border-food-border p-5 md:p-6 hover:border-food-primary transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Основное */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-food-muted bg-food-surface-2 px-2 py-1 rounded">
                      {order.id}
                    </span>
                    <div
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {config.label}
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-1 truncate">
                    {order.restaurantName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-food-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {orderDate}
                    </span>
                    <span>·</span>
                    <span>
                      {itemsCount} {itemsCount === 1 ? 'товар' : itemsCount < 5 ? 'товара' : 'товаров'}
                    </span>
                  </div>

                  {/* Позиции в миниатюре */}
                  <div className="text-sm text-food-muted mt-2 line-clamp-1">
                    {order.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}
                  </div>
                </div>

                {/* Цена + кнопки */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2 flex-shrink-0">
                  <div className="font-extrabold text-2xl text-food-primary">
                    {order.total} ₽
                  </div>
                  <Link
                    href={`/order/${order.id}`}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-food-primary text-white font-semibold text-sm hover:bg-food-primary-hover transition-all whitespace-nowrap"
                  >
                    Подробнее
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Мини-прогресс для активных заказов */}
              {order.status !== 'delivered' && (
                <div className="mt-5 pt-5 border-t border-food-border">
                  <div className="flex items-center justify-between text-xs text-food-muted mb-2">
                    <span>Прогресс заказа</span>
                    <span>
                      {order.status === 'accepted' && 'Ожидает подтверждения рестораном'}
                      {order.status === 'preparing' && 'Готовится на кухне'}
                      {order.status === 'delivering' && 'Курьер везёт заказ'}
                    </span>
                  </div>
                  <div className="h-1.5 bg-food-surface-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-food-primary to-food-accent rounded-full transition-all duration-1000"
                      style={{
                        width: `${
                          order.status === 'accepted'
                            ? 25
                            : order.status === 'preparing'
                            ? 50
                            : order.status === 'delivering'
                            ? 75
                            : 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}