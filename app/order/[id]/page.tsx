'use client';

import Link from 'next/link';
import { use, useState, useEffect } from 'react';
import {
  ArrowLeft, Check, ChefHat, Bike, Home,
  Clock, MapPin, Phone, Store, AlertCircle
} from 'lucide-react';
import { useOrders } from '@/lib/ordersStore';
import type { OrderStatus } from '@/types';

const STATUS_STEPS: {
  key: OrderStatus;
  label: string;
  icon: typeof Check;
}[] = [
  { key: 'accepted', label: 'Принят', icon: Check },
  { key: 'preparing', label: 'Готовится', icon: ChefHat },
  { key: 'delivering', label: 'В пути', icon: Bike },
  { key: 'delivered', label: 'Доставлен', icon: Home },
];

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [mounted, setMounted] = useState(false);

  const order = useOrders((s) => s.getOrder(id));
  const advanceStatus = useOrders((s) => s.advanceStatus);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Демо: автоматически двигаем статус каждые 15 секунд
  useEffect(() => {
    if (!order || order.status === 'delivered') return;
    const timer = setInterval(() => {
      advanceStatus(order.id);
    }, 15000);
    return () => clearInterval(timer);
  }, [order?.id, order?.status, advanceStatus]);

  if (!mounted) {
    return (
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="h-8 w-40 bg-food-surface-2 rounded animate-pulse mb-8" />
        <div className="h-64 bg-food-surface-2 rounded-3xl animate-pulse" />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-20 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-food-surface-2 flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-food-muted" />
        </div>
        <h1 className="text-3xl font-extrabold mb-3">Заказ не найден</h1>
        <p className="text-food-muted mb-8">
          Возможно, ссылка устарела или заказ был удалён.
        </p>
        <Link
          href="/restaurants"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-all"
        >
          К ресторанам
        </Link>
      </main>
    );
  }

  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);
  const orderDate = new Date(order.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-food-muted hover:text-food-primary transition-colors mb-6 text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Мои заказы
      </Link>

      {/* Заголовок */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-food-muted bg-food-surface-2 px-2 py-1 rounded">
            {order.id}
          </span>
          <span className="text-xs text-food-muted">{orderDate}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          {order.status === 'delivered'
            ? 'Заказ доставлен!'
            : order.status === 'delivering'
            ? 'Курьер уже в пути'
            : order.status === 'preparing'
            ? 'Готовим ваш заказ'
            : 'Заказ принят'}
        </h1>
        <p className="text-food-muted">
          {order.status === 'delivered'
            ? 'Приятного аппетита!'
            : `Примерное время доставки: ${order.status === 'accepted' ? '45–60' : '20–30'} минут`}
        </p>
      </div>

      {/* ТРЕКЕР */}
      <div className="rounded-3xl bg-food-surface border border-food-border p-6 md:p-8 mb-6">
        <div className="relative">
          {/* Полоса прогресса */}
          <div className="absolute top-6 left-6 right-6 h-1 bg-food-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-food-primary to-food-accent rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Шаги */}
          <div className="relative flex justify-between">
            {STATUS_STEPS.map((step, idx) => {
              const isDone = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              const isFuture = idx > currentIndex;
              const Icon = step.icon;

              return (
                <div key={step.key} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isDone
                        ? 'bg-food-primary text-white'
                        : isCurrent
                        ? 'bg-food-primary text-white ring-4 ring-food-primary/20 scale-110'
                        : 'bg-food-surface-2 text-food-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs md:text-sm font-semibold text-center transition-colors ${
                      isFuture ? 'text-food-muted' : 'text-food-text'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Подсказка для демо */}
        {order.status !== 'delivered' && (
          <div className="mt-6 text-xs text-food-muted text-center bg-food-surface-2 rounded-xl py-2 px-4">
            ⏱ Статус обновляется автоматически каждые 15 секунд (демо)
          </div>
        )}
      </div>

      {/* Информация о заказе */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="rounded-3xl bg-food-surface border border-food-border p-6">
          <div className="flex items-center gap-2 text-food-muted text-sm mb-4">
            <Store className="w-4 h-4" />
            Ресторан
          </div>
          <div className="font-bold text-lg mb-1">{order.restaurantName}</div>
          <div className="text-food-muted text-sm">
            {order.items.length} {order.items.length === 1 ? 'позиция' : 'позиции'}
          </div>
        </div>

        <div className="rounded-3xl bg-food-surface border border-food-border p-6">
          <div className="flex items-center gap-2 text-food-muted text-sm mb-4">
            <Clock className="w-4 h-4" />
            Время
          </div>
          <div className="font-bold text-lg mb-1">{orderDate}</div>
          <div className="text-food-muted text-sm">
            {order.status === 'delivered' ? 'Доставлено' : 'Ожидается'}
          </div>
        </div>
      </div>

      {/* Адрес */}
      <div className="rounded-3xl bg-food-surface border border-food-border p-6 mb-6">
        <div className="flex items-center gap-2 text-food-muted text-sm mb-4">
          <MapPin className="w-4 h-4" />
          Доставка
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-food-muted">Получатель: </span>
            <span className="font-semibold">{order.customer.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-food-muted" />
            <span>{order.customer.phone}</span>
          </div>
          <div className="text-food-muted">{order.customer.address}</div>
          {order.customer.comment && (
            <div className="text-food-muted italic pt-1">
              💬 {order.customer.comment}
            </div>
          )}
        </div>
      </div>

      {/* Состав заказа */}
      <div className="rounded-3xl bg-food-surface border border-food-border p-6">
        <h2 className="font-bold text-lg mb-5">Состав заказа</h2>
        <div className="space-y-3 mb-5">
          {order.items.map((item) => (
            <div key={item.menuItemId} className="flex justify-between gap-3 text-sm">
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{item.name}</div>
                <div className="text-food-muted text-xs">
                  {item.quantity} × {item.price} ₽ · {item.weight}
                </div>
              </div>
              <div className="font-bold whitespace-nowrap">
                {item.price * item.quantity} ₽
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5 border-t border-food-border space-y-2">
          <div className="flex justify-between text-sm text-food-muted">
            <span>Товары</span>
            <span>{order.subtotal} ₽</span>
          </div>
          <div className="flex justify-between text-sm text-food-muted">
            <span>Доставка</span>
            <span>
              {order.deliveryFee === 0 ? (
                <span className="text-food-success font-semibold">Бесплатно</span>
              ) : (
                `${order.deliveryFee} ₽`
              )}
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-food-border">
            <span className="font-bold">Итого</span>
            <span className="font-extrabold text-2xl text-food-primary">
              {order.total} ₽
            </span>
          </div>
        </div>
      </div>

      {/* Кнопки */}
      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <Link
          href="/restaurants"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full border-2 border-food-border hover:border-food-primary font-semibold transition-colors"
        >
          Заказать ещё
        </Link>
        <Link
          href="/orders"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-all"
        >
          Мои заказы
        </Link>
      </div>
    </main>
  );
}