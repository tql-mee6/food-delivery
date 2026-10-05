'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  ArrowLeft, User, Phone, MapPin, MessageSquare,
  Bike, Store, ArrowRight, Shield
} from 'lucide-react';
import { useCart } from '@/lib/cartStore';
import { useOrders } from '@/lib/ordersStore';
import { restaurants } from '@/lib/restaurants';

type FormData = {
  name: string;
  phone: string;
  address: string;
  comment: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const items = useCart((s) => s.items);
  const getSubtotal = useCart((s) => s.getSubtotal);
  const clearCart = useCart((s) => s.clearCart);
  const createOrder = useOrders((s) => s.createOrder);

  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Редирект на /cart только если корзина пуста И заказ ещё не создан
  useEffect(() => {
    if (mounted && items.length === 0 && !orderCreated) {
      router.replace('/cart');
    }
  }, [mounted, items.length, router, orderCreated]);

  if (!mounted || items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="h-8 w-40 bg-food-surface-2 rounded animate-pulse mb-8" />
        <div className="h-40 bg-food-surface-2 rounded-3xl animate-pulse" />
      </main>
    );
  }

  const restaurant = restaurants.find((r) => r.id === items[0].restaurantId);
  const subtotal = getSubtotal();
  const deliveryFee = restaurant?.deliveryFee ?? 0;
  const total = subtotal + deliveryFee;

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Укажите имя';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Имя слишком короткое';
    }

    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      newErrors.phone = 'Укажите телефон';
    } else if (digits.length < 11) {
      newErrors.phone = 'Введите полный номер телефона';
    }

    if (!form.address.trim()) {
      newErrors.address = 'Укажите адрес доставки';
    } else if (form.address.trim().length < 5) {
      newErrors.address = 'Адрес слишком короткий';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
    const orderId = createOrder({
      restaurantId: items[0].restaurantId,
      restaurantName: items[0].restaurantName,
      items: [...items],
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        comment: form.comment.trim() || undefined,
      },
        subtotal,
        deliveryFee,
        total,
    });

setOrderCreated(true);   // ← СНАЧАЛА ставим флаг
clearCart();              // ← потом очищаем
router.push(`/order/${orderId}`);  // ← и переходим
    } catch (err) {
      console.error(err);
      alert('Не удалось оформить заказ. Попробуйте ещё раз.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-food-muted hover:text-food-primary transition-colors mb-6 text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        В корзину
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold mb-8">
        Оформление заказа
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* ЛЕВАЯ КОЛОНКА — форма */}
        <div className="space-y-6">
          {/* Контакты */}
          <section className="rounded-3xl bg-food-surface border border-food-border p-6">
            <h2 className="text-xl font-bold mb-5">Контактные данные</h2>

            <div className="space-y-4">
              {/* Имя */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Имя <span className="text-food-accent">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-food-muted pointer-events-none" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Как к вам обращаться"
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-food-bg border focus:outline-none focus:ring-4 transition-all ${
                      errors.name
                        ? 'border-food-accent focus:border-food-accent focus:ring-food-accent/10'
                        : 'border-food-border focus:border-food-primary focus:ring-food-primary/10'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-food-accent text-xs mt-1.5">{errors.name}</p>
                )}
              </div>

              {/* Телефон */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Телефон <span className="text-food-accent">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-food-muted pointer-events-none" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+7 (___) ___-__-__"
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-food-bg border focus:outline-none focus:ring-4 transition-all ${
                      errors.phone
                        ? 'border-food-accent focus:border-food-accent focus:ring-food-accent/10'
                        : 'border-food-border focus:border-food-primary focus:ring-food-primary/10'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-food-accent text-xs mt-1.5">{errors.phone}</p>
                )}
              </div>
            </div>
          </section>

          {/* Доставка */}
          <section className="rounded-3xl bg-food-surface border border-food-border p-6">
            <h2 className="text-xl font-bold mb-5">Адрес доставки</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Адрес <span className="text-food-accent">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-food-muted pointer-events-none" />
                  <textarea
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    placeholder="Улица, дом, квартира, подъезд, этаж"
                    rows={3}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-food-bg border focus:outline-none focus:ring-4 transition-all resize-none ${
                      errors.address
                        ? 'border-food-accent focus:border-food-accent focus:ring-food-accent/10'
                        : 'border-food-border focus:border-food-primary focus:ring-food-primary/10'
                    }`}
                  />
                </div>
                {errors.address && (
                  <p className="text-food-accent text-xs mt-1.5">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Комментарий к заказу
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-food-muted pointer-events-none" />
                  <textarea
                    value={form.comment}
                    onChange={(e) => update('comment', e.target.value)}
                    placeholder="Например: позвонить за 5 минут до прибытия"
                    rows={2}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-food-bg border border-food-border focus:border-food-primary focus:outline-none focus:ring-4 focus:ring-food-primary/10 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ПРАВАЯ КОЛОНКА — сводка */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
          <div className="rounded-3xl bg-food-surface border border-food-border p-6">
            <div className="flex items-center gap-2 mb-5">
              <Store className="w-4 h-4 text-food-muted" />
              <span className="text-sm text-food-muted">
                {items[0].restaurantName}
              </span>
            </div>

            {/* Товары */}
            <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.menuItemId} className="flex justify-between gap-3 text-sm">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{item.name}</div>
                    <div className="text-food-muted text-xs">
                      {item.quantity} × {item.price} ₽
                    </div>
                  </div>
                  <div className="font-bold whitespace-nowrap">
                    {item.price * item.quantity} ₽
                  </div>
                </div>
              ))}
            </div>

            {/* Итого */}
            <div className="pt-5 border-t border-food-border space-y-2">
              <div className="flex justify-between text-sm text-food-muted">
                <span>Товары ({items.length})</span>
                <span>{subtotal} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-food-muted">
                <span className="flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5" />
                  Доставка
                </span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-food-success font-semibold">Бесплатно</span>
                  ) : (
                    `${deliveryFee} ₽`
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-food-border">
                <span className="font-bold">Итого</span>
                <span className="font-extrabold text-2xl text-food-primary">
                  {total} ₽
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full flex items-center justify-center gap-2 py-4 rounded-full bg-food-primary text-white font-bold text-lg hover:bg-food-primary-hover transition-all shadow-lg shadow-food-primary/30 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                'Оформляем...'
              ) : (
                <>
                  Заказать за {total} ₽
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="mt-4 flex items-center gap-2 text-xs text-food-muted justify-center">
              <Shield className="w-3.5 h-3.5" />
              Оплата при получении
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}