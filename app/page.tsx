'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FAQItem from './components/FAQItem';
import SectionDivider from './components/SectionDivider';
import {
  ArrowRight, Clock, MapPin, Star, Search,
  UtensilsCrossed, Sparkles, TrendingUp, Award
} from 'lucide-react';
import { restaurants, cuisineLabels } from '@/lib/restaurants';
import RestaurantCard from './components/RestaurantCard';

const CUISINE_ICONS: Record<string, string> = {
  pizza: '🍕',
  sushi: '🍣',
  burger: '🍔',
  asian: '🥢',
  georgian: '🥟',
  coffee: '☕',
};

export default function HomePage() {
  const topRestaurants = restaurants.slice(0, 3);
  const cuisines = ['pizza', 'sushi', 'burger', 'asian', 'georgian', 'coffee'];

  return (
    <main className="overflow-hidden relative">
      {/* ==================== ЕДИНЫЙ ФОН ==================== */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute top-[30%] right-[-15%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 65%)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 65%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-[15%] left-[3%] w-40 h-40 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
            maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
          }}
        />
        <div
          className="absolute top-[55%] right-[3%] w-40 h-40 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(220, 38, 38, 0.5) 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
            maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
          }}
        />
        <div className="absolute top-[20%] right-[8%] flex flex-col gap-3 opacity-30">
          <div className="w-24 h-px bg-food-primary" />
          <div className="w-16 h-px bg-food-primary" />
          <div className="w-32 h-px bg-food-primary" />
        </div>
        <div className="absolute bottom-[15%] left-[10%] w-20 h-20 rounded-full border border-food-primary/20 opacity-60" />
        <div className="absolute top-[10%] right-[12%] w-32 h-32 rounded-full border border-food-primary/20 opacity-60" />
      </div>

{/* ==================== HERO ==================== */}
<section className="relative pt-6 md:pt-10 pb-16 md:pb-20">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-stretch min-h-[600px] md:min-h-[680px]">

      {/* ЛЕВАЯ ЧАСТЬ — визуальная панель */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative rounded-[36px] overflow-hidden h-[400px] md:h-auto"
      >
        {/* Фон — оранжевый градиент */}
        <div className="absolute inset-0 bg-gradient-to-br from-food-primary via-food-accent to-food-primary-hover" />

        {/* Точечный паттерн */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 2px, transparent 2px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Тонкие круги декора */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-white/20" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border border-white/15" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full border border-white/20" />
        </div>

        {/* Центральный текст — вместо эмодзи */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-[80px] md:text-[120px] lg:text-[140px] font-extrabold leading-none tracking-tight">
              Food
            </div>
            <div className="text-[40px] md:text-[60px] lg:text-[70px] font-extrabold leading-none tracking-tight opacity-90 italic">
              Express
            </div>
          </div>
        </div>

        {/* Верхняя плашка — статус */}
        <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-75" />
            <span className="relative rounded-full w-2 h-2 bg-green-300" />
          </span>
          Доставим за 30–60 минут
        </div>

        {/* Нижняя плашка — статистика */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white font-bold">
              👥
            </div>
            <div className="text-white">
              <div className="text-xs opacity-80">Клиентов</div>
              <div className="font-bold text-sm">2500+</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            <div>
              <div className="text-xs opacity-80">Рейтинг</div>
              <div className="font-bold text-sm">4.9 / 5</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ПРАВАЯ ЧАСТЬ — текст */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col justify-center py-6 md:py-10 lg:py-12"
      >
        {/* Верхняя метка */}
        <div className="inline-flex items-center gap-2 text-food-primary text-sm font-semibold mb-6 tracking-wider uppercase w-fit">
          <span className="w-8 h-px bg-food-primary" />
          Сервис доставки
        </div>

        {/* Заголовок */}
        <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-extrabold leading-[1] tracking-tight mb-6">
          Вкусная еда
          <br />
          <span className="gradient-text">у вашей двери</span>
        </h1>

        {/* Подзаголовок */}
        <p className="text-food-muted text-base md:text-lg leading-relaxed mb-10 max-w-md">
          Более 50 ресторанов и 1000 блюд на выбор. Закажите за минуту,
          оплата при получении, отслеживание заказа в реальном времени.
        </p>

        {/* Мини-преимущества */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-md">
          {[
            { num: '35', unit: 'мин', label: 'доставка' },
            { num: '12', unit: '', label: 'ресторанов' },
            { num: '4.9', unit: '/5', label: 'рейтинг' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-extrabold text-food-primary">
                  {stat.num}
                </span>
                {stat.unit && (
                  <span className="text-lg font-bold text-food-primary">
                    {stat.unit}
                  </span>
                )}
              </div>
              <div className="text-food-muted text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Кнопки */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/restaurants"
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-all shadow-lg shadow-food-primary/30 hover:shadow-food-primary/50 hover:scale-[1.03]"
          >
            <Search className="w-5 h-5" />
            Выбрать ресторан
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-food-border bg-food-surface font-semibold hover:border-food-primary transition-colors"
          >
            Мои заказы
          </Link>
        </div>

        {/* Нижняя подпись */}
        <div className="flex items-center gap-3 mt-10 text-sm text-food-muted">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-food-primary text-food-primary" />
            ))}
          </div>
          <span>Более 2500 довольных клиентов</span>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      <SectionDivider variant="line-dot" />

      {/* ==================== КАТЕГОРИИ КУХНИ ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <div className="flex items-center gap-3 text-food-primary text-sm font-semibold mb-3 tracking-wider uppercase">
                <span className="w-8 h-px bg-food-primary" />
                Категории
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-3">
                Выберите кухню
              </h2>
              <p className="text-food-muted max-w-lg">
                От итальянской пиццы до японских суши — найдите то, что по вкусу
              </p>
            </div>
            <Link
              href="/restaurants"
              className="hidden md:inline-flex items-center gap-1 text-food-primary font-semibold hover:gap-2 transition-all"
            >
              Все рестораны <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              { id: 'pizza', name: 'Пицца', count: 2, color: '#f97316', bg: 'from-orange-50 to-orange-100' },
              { id: 'sushi', name: 'Суши', count: 2, color: '#e11d48', bg: 'from-rose-50 to-rose-100' },
              { id: 'burger', name: 'Бургеры', count: 2, color: '#dc2626', bg: 'from-red-50 to-red-100' },
              { id: 'asian', name: 'Азиатская', count: 2, color: '#16a34a', bg: 'from-emerald-50 to-emerald-100' },
              { id: 'georgian', name: 'Грузинская', count: 2, color: '#9333ea', bg: 'from-purple-50 to-purple-100' },
              { id: 'coffee', name: 'Кофе и десерты', count: 2, color: '#92400e', bg: 'from-amber-50 to-amber-100' },
            ].map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/restaurants?cuisine=${cat.id}`}
                  className="group relative flex flex-col justify-between h-52 md:h-60 lg:h-64 p-5 md:p-6 rounded-3xl bg-food-surface border border-food-border hover:border-food-primary transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-food-primary/10 overflow-hidden"
                >
                  <div
                    className="absolute top-3 right-3 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${cat.color} 1px, transparent 1px)`,
                      backgroundSize: '6px 6px',
                    }}
                  />
                  <div
                    className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t ${cat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ backgroundColor: cat.color }}
                  />

                  <div className="relative flex items-start justify-between">
                    <span
                      className="text-6xl md:text-7xl font-extrabold leading-none opacity-20 group-hover:opacity-40 transition-opacity"
                      style={{ color: cat.color }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 relative"
                      style={{ backgroundColor: cat.color }}
                    >
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-40"
                        style={{ backgroundColor: cat.color }}
                      />
                    </span>
                  </div>

                  <div className="relative">
                    <div className="text-xs text-food-muted mb-2">
                      {cat.count} ресторана
                    </div>
                    <h3 className="font-extrabold text-lg md:text-xl leading-tight mb-3 group-hover:text-food-primary transition-colors">
                      {cat.name}
                    </h3>
                    <div
                      className="inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                      style={{ color: cat.color }}
                    >
                      Смотреть
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* ==================== ПРЕИМУЩЕСТВА ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-4 md:gap-6 bg-food-surface border border-food-border rounded-[32px] p-6 md:p-8"
          >
            {[
              { icon: Clock, num: '35', unit: 'мин', title: 'Среднее время доставки', text: 'От ресторана до вашей двери', color: 'text-food-primary', bg: 'bg-food-primary/10' },
              { icon: MapPin, num: '12', unit: '', title: 'Ресторанов в Москве', text: 'Работаем во всех районах города', color: 'text-food-accent', bg: 'bg-food-accent/10' },
              { icon: Award, num: '4.9', unit: '/ 5', title: 'Средняя оценка', text: 'Более 2500 положительных отзывов', color: 'text-food-success', bg: 'bg-food-success/10' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-5 p-2"
              >
                <div className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center flex-shrink-0`}>
                  <f.icon className={`w-7 h-7 ${f.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-4xl md:text-5xl font-extrabold ${f.color}`}>{f.num}</span>
                    {f.unit && <span className={`text-xl md:text-2xl font-bold ${f.color}`}>{f.unit}</span>}
                  </div>
                  <div className="font-semibold text-base mb-1">{f.title}</div>
                  <div className="text-food-muted text-sm leading-snug">{f.text}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="triple" />

      {/* ==================== КАК ЭТО РАБОТАЕТ ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-food-primary text-sm font-semibold mb-2 tracking-wider uppercase">
              Просто и быстро
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3">Как это работает</h2>
            <p className="text-food-muted max-w-xl mx-auto">Заказать еду — проще, чем кажется</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-20 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-food-primary/30 via-food-primary/50 to-food-primary/30" />
            {[
              { num: '01', title: 'Выберите ресторан', text: 'Найдите любимую кухню и откройте меню', icon: UtensilsCrossed },
              { num: '02', title: 'Соберите заказ', text: 'Добавьте блюда в корзину и оформите доставку', icon: Sparkles },
              { num: '03', title: 'Получите заказ', text: 'Курьер привезёт еду прямо к вашей двери', icon: TrendingUp },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-3xl bg-food-surface border border-food-border text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-food-primary text-white text-xs font-bold rounded-full">
                  ШАГ {step.num}
                </div>
                <div className="w-20 h-20 mx-auto rounded-3xl bg-food-primary/10 flex items-center justify-center mb-5">
                  <step.icon className="w-9 h-9 text-food-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-food-muted text-sm">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="diamond" />

      {/* ==================== ТОП-РЕСТОРАНЫ ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <div className="text-food-primary text-sm font-semibold mb-2 tracking-wider uppercase">
                Выбор гостей
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold">Топ рестораны</h2>
            </div>
            <Link
              href="/restaurants"
              className="hidden md:inline-flex items-center gap-1 text-food-primary font-semibold hover:gap-2 transition-all"
            >
              Все рестораны <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="line-dot" />

      {/* ==================== ПРОМО-БАННЕР ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[32px] border border-food-border bg-food-surface p-8 md:p-14"
          >
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            <div
              className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <div className="relative z-10 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-food-primary/10 text-food-primary text-xs font-bold uppercase tracking-wider mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Первый заказ
                </div>
                <h3 className="text-4xl md:text-6xl font-extrabold mb-5 leading-[1.05] tracking-tight">
                  Скидка <span className="text-food-primary">10%</span>
                  <br />
                  на первый заказ
                </h3>
                <p className="text-food-muted mb-8 max-w-lg text-lg leading-relaxed">
                  Используйте промокод{' '}
                  <span className="inline-block font-mono font-bold text-food-text bg-food-surface-2 border border-dashed border-food-primary/40 px-3 py-1 rounded-lg">
                    FIRST10
                  </span>{' '}
                  при оформлении — и получите скидку на всю корзину.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/restaurants"
                    className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-all shadow-lg shadow-food-primary/30 hover:shadow-food-primary/50 hover:scale-[1.03]"
                  >
                    Заказать сейчас
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center relative">
                <div className="relative">
                  <div className="text-[220px] font-extrabold leading-none gradient-text select-none">
                    10
                  </div>
                  <div className="absolute -top-4 -right-8 text-6xl font-extrabold text-food-primary select-none">
                    %
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-food-muted tracking-widest uppercase">
                    на всю корзину
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 pt-8 border-t border-food-border grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {[
                { label: 'Срок действия', value: 'до конца месяца' },
                { label: 'Минимальный заказ', value: 'от 700 ₽' },
                { label: 'Применяется', value: 'ко всей корзине' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-food-muted text-xs uppercase tracking-wider mb-1">
                    {item.label}
                  </span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* ==================== ОТЗЫВЫ ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-food-primary text-sm font-semibold mb-2 tracking-wider uppercase">
              Отзывы
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3">
              Что говорят клиенты
            </h2>
            <p className="text-food-muted max-w-xl mx-auto">
              Более 2500 довольных покупателей по всей Москве
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Анна', city: 'Москва', text: 'Заказываю каждую неделю — всегда быстро и вкусно. Курьеры вежливые, еда горячая.', emoji: '🍕' },
              { name: 'Дмитрий', city: 'Санкт-Петербург', text: 'Суши-сет пришёл в идеальном состоянии. Рыба свежая, всё аккуратно упаковано.', emoji: '🍣' },
              { name: 'Екатерина', city: 'Москва', text: 'Обожаю Coffee Lab. Капучино и круассан — идеальный завтрак. Доставка за 20 минут!', emoji: '☕' },
              { name: 'Игорь', city: 'Москва', text: 'Бургеры из Burger House — лучшие в городе. Сочные, большие, доставка быстрая.', emoji: '🍔' },
              { name: 'Ольга', city: 'Московская область', text: 'Заказывали хинкали из Тбилиси на праздник. Всё приехало горячим и очень вкусным!', emoji: '🥟' },
              { name: 'Сергей', city: 'Москва', text: 'Удобный сайт, быстрое оформление. Отслеживание заказа — очень круто, видно каждый этап.', emoji: '🚀' },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-3xl bg-food-surface border border-food-border"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-food-primary text-food-primary" />
                  ))}
                </div>
                <p className="text-food-muted text-sm leading-relaxed mb-6">
                  «{review.text}»
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-food-border">
                  <div className="w-10 h-10 rounded-full bg-food-primary/10 flex items-center justify-center text-xl">
                    {review.emoji}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{review.name}</div>
                    <div className="text-xs text-food-muted">{review.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="triple" />

      {/* ==================== FAQ ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-food-primary text-sm font-semibold mb-2 tracking-wider uppercase">
              Вопросы и ответы
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-3">
              Часто спрашивают
            </h2>
            <p className="text-food-muted">
              Если не нашли ответ — напишите нам в Telegram
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              { q: 'Сколько ждать доставку?', a: 'В среднем 30–60 минут. Точное время зависит от ресторана и вашего района. Отслеживать заказ можно на странице «Мои заказы».' },
              { q: 'Сколько стоит доставка?', a: 'От 0 до 199 ₽ — зависит от ресторана. У некоторых заведений доставка бесплатная. Итоговая стоимость видна в корзине.' },
              { q: 'Как можно оплатить?', a: 'Оплата при получении — наличными или картой курьеру. Онлайн-оплата появится в ближайшее время.' },
              { q: 'Можно ли отменить заказ?', a: 'Да, до момента передачи заказа курьеру. Свяжитесь с нами через Telegram — оперативно решим вопрос.' },
              { q: 'Есть ли минимальная сумма заказа?', a: 'Да, у каждого ресторана своя минимальная сумма — от 400 до 1500 ₽. Она указана на карточке ресторана.' },
              { q: 'Работаете ли вы ночью?', a: 'Сейчас сервис работает ежедневно с 10:00 до 23:00. В планах — расширение до круглосуточного режима.' },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="diamond" />

      {/* ==================== CTA ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[32px] bg-[#1c1917] text-white p-8 md:p-16"
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div
                className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(249, 115, 22, 0.6) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(220, 38, 38, 0.5) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-full text-xs font-semibold mb-6 !text-white">
                  ⚡ Быстро и удобно
                </div>
                <h2
                  className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight !text-white"
                  style={{ color: '#ffffff' }}
                >
                  Заказывайте еду
                  <br />
                  <span className="!text-food-primary" style={{ color: '#f97316' }}>
                    в один клик
                  </span>
                </h2>
                <p
                  className="mb-8 text-lg leading-relaxed max-w-lg !text-white/70"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  Сохраняйте любимые рестораны, повторяйте заказы в один клик
                  и следите за доставкой в реальном времени.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/restaurants"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-all"
                  >
                    Начать заказ
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/orders"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/20 text-white font-semibold hover:border-white/40 transition-colors"
                  >
                    Мои заказы
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: '2500+', label: 'Довольных клиентов' },
                  { num: '12', label: 'Ресторанов-партнёров' },
                  { num: '35', label: 'Минут среднее время' },
                  { num: '4.9', label: 'Средняя оценка' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                  >
                    <div
                      className="text-3xl md:text-4xl font-extrabold mb-1"
                      style={{ color: '#ffffff' }}
                    >
                      {stat.num}
                    </div>
                    <div
                      className="text-xs leading-tight"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider variant="line-dot" />

      {/* ==================== ГЕОГРАФИЯ ==================== */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-food-primary text-sm font-semibold mb-2 tracking-wider uppercase">
                География
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
                Доставляем по всей Москве и области
              </h2>
              <p className="text-food-muted mb-8 leading-relaxed">
                Работаем с 12 ресторанами в разных районах города.
                Среднее время доставки — 35 минут. В отдалённые районы — до 60 минут.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Центр', 'Север', 'Юг', 'Запад', 'Восток', 'Московская область'].map((area) => (
                  <div key={area} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-food-primary" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-gradient-to-br from-food-primary to-food-accent h-64 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🏙️</div>
                    <div className="text-sm uppercase tracking-wider opacity-80">Москва</div>
                  </div>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-food-accent to-food-primary h-64 mt-8 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🚚</div>
                    <div className="text-sm uppercase tracking-wider opacity-80">Доставка</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}