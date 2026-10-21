'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Star, Plus, Check, Copy, Clock, Wallet, MapPin,
} from 'lucide-react';
import MarqueeBanner from './components/MarqueeBanner';
import FAQItem from './components/FAQItem';
import RestaurantCard from './components/RestaurantCard';
import DishTile from './components/DishTile';
import { BrushWord, TornEdge, Embers, Leaf } from './components/Decor';
import FallingSkewers from './components/FallingSkewers';
import { restaurants } from '@/lib/restaurants';
import { menuItems } from '@/lib/menu';
import { useCart } from '@/lib/cartStore';

const PAPER = '#f1eadf';
const WOOD = '#1d1410';
const COAL = '#0f0d0c';

const HIT_IDS = [
  'tb-shashlik', 'bh-double', 'pm-pepperoni', 'sz-philadelphia',
  'tb-khachapuri', 'ws-wok-shrimp', 'kh-khinkali', 'cl-cheesecake',
];

const restaurantName = (id: string) => restaurants.find((r) => r.id === id)?.name ?? '';

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as const },
};

export default function HomePage() {
  const hits = HIT_IDS.map((id) => menuItems.find((m) => m.id === id)!).filter(Boolean);
  const heroDish = menuItems.find((m) => m.id === 'tb-shashlik')!;
  const topRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <main className="overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative texture-slate bg-food-bg">
        {/* Свечение углей */}
        <div className="absolute right-[-10%] top-[5%] w-[900px] h-[900px] ember-glow opacity-70 pointer-events-none" />
        <Embers />
        {/* Дальний слой шашлыка — за текстом и тарелкой */}
        <FallingSkewers layer="back" />

        {/* Огромное слово на фоне, как в меню ресторана */}
        <div
          aria-hidden
          className="absolute left-[-2%] bottom-[6%] font-display uppercase text-[22vw] leading-none text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
        >
          Гриль
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-16 md:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-6 items-center min-h-[calc(100vh-72px)]">
          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-10 order-2 lg:order-1"
          >
            <div className="eyebrow mb-6">Доставка горячей еды</div>

            <h1 className="text-[46px] sm:text-[60px] lg:text-[78px] leading-[1.02] mb-6">
              Хочется чего-то
              <br />
              <BrushWord>горячего</BrushWord>?
            </h1>

            <p className="text-food-muted text-lg md:text-xl leading-relaxed mb-9 max-w-[30rem]">
              Шашлык с углей, пицца из дровяной печи и вок с огня —
              из 12 ресторанов. Привезём за&nbsp;35&nbsp;минут, пока не остыло.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/restaurants"
                className="group inline-flex items-center gap-2.5 h-14 px-8 rounded-md bg-food-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-food-primary-hover transition-all shadow-xl shadow-food-primary/30 hover:shadow-food-primary/50"
              >
                Заказать доставку
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#hits"
                className="inline-flex items-center gap-2 h-14 px-7 rounded-md border border-white/20 font-bold uppercase tracking-wider text-sm hover:border-white/60 transition-colors"
              >
                Хиты недели
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-food-muted">
              <span className="flex items-center gap-2">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-food-accent text-food-accent" />
                  ))}
                </span>
                <span><b className="text-food-text">4.9</b> · 2500+ отзывов</span>
              </span>
              <span className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-food-primary" />
                Оплата при получении
              </span>
            </div>
          </motion.div>

          {/* Блюдо */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative order-1 lg:order-2 mx-auto w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[560px]"
          >
            <div className="relative aspect-square">
              {/* Вращающаяся подпись по кругу */}
              <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="absolute inset-[-7%] w-[114%] h-[114%] animate-spin-slow"
              >
                <defs>
                  <path id="ring" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
                </defs>
                <text fill="#e8432e" fontSize="7.2" letterSpacing="4.2" fontFamily="var(--font-oswald)">
                  <textPath href="#ring">ГОРЯЧО · С ОГНЯ · ЗА 35 МИНУТ · ГОРЯЧО · С ОГНЯ · ЗА 35 МИНУТ ·</textPath>
                </text>
              </svg>

              <div className="absolute inset-[4%] rounded-full bg-black/80 blur-3xl translate-y-[6%]" />
              <div className="relative w-full h-full rounded-full overflow-hidden ring-1 ring-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
                <Image
                  src="/images/dishes/shashlik.jpg"
                  alt="Шашлык из свинины на углях"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover scale-110"
                />
              </div>

              {/* Маленькие тарелки-спутники */}
              <div className="absolute -left-[6%] bottom-[2%] w-[30%] aspect-square rounded-full overflow-hidden ring-4 ring-food-bg shadow-2xl animate-float">
                <Image src="/images/dishes/khachapuri.jpg" alt="" fill sizes="170px" className="object-cover" />
              </div>
              <div
                className="absolute -right-[2%] top-[4%] w-[22%] aspect-square rounded-full overflow-hidden ring-4 ring-food-bg shadow-2xl animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <Image src="/images/dishes/lobio.jpg" alt="" fill sizes="130px" className="object-cover" />
              </div>

              {/* Карточка быстрого заказа */}
              <HeroOrderCard
                className="absolute right-[-2%] sm:right-[-6%] bottom-[10%]"
                item={heroDish}
              />
            </div>
          </motion.div>
        </div>

        {/* Ближний слой — крупные шампуры пролетают перед тарелкой */}
        <FallingSkewers layer="front" />
      </section>

      <MarqueeBanner />

      {/* ==================== ЦИФРЫ (бумага) ==================== */}
      <TornEdge color={PAPER} className="-mt-6 relative z-10" />
      <section className="texture-paper relative -mt-px">
        <Leaf className="absolute right-[6%] top-8 w-16 h-16 rotate-[30deg] opacity-80 hidden md:block" />
        <Leaf className="absolute left-[4%] bottom-10 w-12 h-12 -rotate-[40deg] opacity-70 hidden md:block" color="#5b8f3c" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl leading-tight font-normal">
              Доставляем еду, которая
              <br className="hidden md:block" /> приезжает <BrushWord>горячей</BrushWord>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6">
            {[
              { num: '35', unit: 'мин', text: 'среднее время доставки' },
              { num: '12', unit: '', text: 'ресторанов-партнёров' },
              { num: '1000', unit: '+', text: 'блюд в меню' },
              { num: '97', unit: '%', text: 'заказов приезжают вовремя' },
              { num: '4.9', unit: '', text: 'средняя оценка гостей' },
            ].map((s, i) => (
              <motion.div
                key={s.text}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className={`${i === 4 ? 'col-span-2 md:col-span-1' : ''} text-center md:text-left`}
              >
                <div className="font-display font-light text-6xl md:text-7xl text-ink leading-none">
                  {s.num}
                  <span className="text-food-primary text-3xl md:text-4xl align-top ml-1">{s.unit}</span>
                </div>
                <div className="w-10 h-px bg-ink/40 my-4 mx-auto md:mx-0" />
                <div className="text-ink-muted text-sm leading-snug max-w-[11rem] mx-auto md:mx-0">{s.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <TornEdge color={WOOD} className="-mt-px relative z-10 bg-paper" />

      {/* ==================== ХИТЫ (дерево) ==================== */}
      <section id="hits" className="texture-wood -mt-px scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow mb-4">Хиты недели</div>
              <h2 className="text-4xl md:text-6xl leading-[1.05] text-white">
                Заказывают <BrushWord>чаще всего</BrushWord>
              </h2>
            </div>
            <p className="text-white/60 max-w-sm">
              Добавляйте прямо отсюда — корзина запомнит выбор,
              а оформление займёт меньше минуты.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-14">
            {hits.map((item, i) => (
              <motion.div
                key={item.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: (i % 4) * 0.08 }}
              >
                <DishTile item={item} restaurantName={restaurantName(item.restaurantId)} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/restaurants"
              className="group inline-flex items-center gap-2.5 h-14 px-8 rounded-md border border-white/25 text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-ink transition-colors"
            >
              Смотреть всё меню
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== ИСТОРИЯ: ОГОНЬ ==================== */}
      <section className="texture-wood -mt-px">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-20 md:space-y-28">
          {[
            {
              img: '/images/restaurants/steak-house.jpg',
              title: <>Мясо — только <BrushWord>на углях</BrushWord></>,
              text: 'Шашлык и стейки готовят на открытом огне прямо перед отправкой. Курьер забирает заказ, пока мясо ещё шипит.',
              tag: 'Тбилиси · Хинкальная №1',
              href: '/restaurants?cuisine=georgian',
            },
            {
              img: '/images/restaurants/pizza-mario.jpg',
              title: <>Пицца из <BrushWord>дровяной</BrushWord> печи</>,
              text: 'Тонкое тесто, 90 секунд при 400°C и термосумка, которая держит хруст до самой двери.',
              tag: 'Pizza Mario · Pasta Bar',
              href: '/restaurants?cuisine=pizza',
            },
            {
              img: '/images/restaurants/wok-street.jpg',
              title: <>Вок — на <BrushWord>живом огне</BrushWord></>,
              text: 'Лапша и креветки обжариваются за пару минут на сильном пламени — поэтому приезжают с тем самым ароматом дымка.',
              tag: 'Wok Street · Noodle House',
              href: '/restaurants?cuisine=asian',
            },
          ].map((s, i) => (
            <div
              key={s.tag}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <motion.div {...fadeUp} className="relative">
                <div className="absolute -inset-6 ember-glow opacity-50" />
                <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-xl overflow-hidden shadow-2xl shadow-black/70">
                  <Image src={s.img} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
              </motion.div>
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
                <div className="font-display text-food-primary/80 text-sm tracking-[0.2em] mb-4">0{i + 1}</div>
                <h3 className="text-4xl md:text-5xl leading-[1.08] text-white mb-6">{s.title}</h3>
                <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-md">{s.text}</p>
                <Link
                  href={s.href}
                  className="group inline-flex items-center gap-2 text-white font-semibold border-b border-food-primary pb-1 hover:text-food-primary transition-colors"
                >
                  {s.tag}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== КАТЕГОРИИ ==================== */}
      <section className="texture-slate bg-food-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div {...fadeUp} className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="eyebrow mb-4">Кухни</div>
              <h2 className="text-4xl md:text-6xl leading-[1.05]">Чего хочется сегодня?</h2>
            </div>
            <Link
              href="/restaurants"
              className="hidden md:inline-flex items-center gap-1.5 text-food-primary font-semibold hover:gap-2.5 transition-all"
            >
              Все рестораны <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 snap-x">
            {[
              { id: 'georgian', name: 'Грузинская', image: '/images/categories/georgian.jpg' },
              { id: 'burger', name: 'Бургеры', image: '/images/categories/burger.jpg' },
              { id: 'pizza', name: 'Пицца', image: '/images/categories/pizza.jpg' },
              { id: 'sushi', name: 'Суши', image: '/images/categories/sushi.jpg' },
              { id: 'asian', name: 'Азиатская', image: '/images/categories/asian.jpg' },
              { id: 'coffee', name: 'Кофе и десерты', image: '/images/categories/coffee.jpg' },
            ].map((cat, i) => (
              <motion.div
                key={cat.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="snap-start shrink-0 w-[46%] sm:w-[32%] md:w-auto"
              >
                <Link
                  href={`/restaurants?cuisine=${cat.id}`}
                  className="group relative flex items-end h-64 md:h-80 rounded-xl overflow-hidden ring-1 ring-white/5 hover:ring-food-primary/60 transition-all"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="relative p-4 md:p-5 w-full flex items-end justify-between gap-2">
                    <h3 className="font-display text-xl md:text-2xl leading-tight text-white">{cat.name}</h3>
                    <ArrowRight className="w-5 h-5 text-food-primary shrink-0 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ПРОМО ==================== */}
      <PromoBanner />

      {/* ==================== ТОП-РЕСТОРАНЫ ==================== */}
      <section className="texture-slate bg-food-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div {...fadeUp} className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="eyebrow mb-4">Выбор гостей</div>
              <h2 className="text-4xl md:text-6xl leading-[1.05]">Лучшие рестораны</h2>
            </div>
            <Link
              href="/restaurants"
              className="hidden md:inline-flex items-center gap-1.5 text-food-primary font-semibold hover:gap-2.5 transition-all"
            >
              Все {restaurants.length} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>

          {/* Как это работает — коротко */}
          <div className="grid md:grid-cols-3 gap-px mt-16 rounded-xl overflow-hidden bg-food-border">
            {[
              { icon: MapPin, title: 'Выберите блюда', text: '12 ресторанов и сотни позиций — от хинкали до чизкейка' },
              { icon: Clock, title: 'Оформите за минуту', text: 'Имя, телефон и адрес — без регистрации и звонков' },
              { icon: Wallet, title: 'Платите при получении', text: 'Наличными или картой курьеру, когда еда уже у вас' },
            ].map((s, i) => (
              <div key={s.title} className="bg-food-surface p-7 md:p-8 flex gap-5">
                <div className="font-display font-light text-5xl text-food-primary/80 leading-none">{i + 1}</div>
                <div>
                  <div className="font-display text-xl mb-1.5 flex items-center gap-2">
                    {s.title}
                  </div>
                  <p className="text-food-muted text-sm leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ОТЗЫВЫ (бумага) ==================== */}
      <TornEdge color={PAPER} className="relative z-10 bg-food-bg" />
      <section className="texture-paper -mt-px">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="eyebrow mb-4">Отзывы</div>
            <h2 className="text-4xl md:text-6xl leading-[1.05]">
              Говорят, <BrushWord>очень вкусно</BrushWord>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Анна', where: 'Москва, Хамовники', text: 'Заказываю каждую неделю — всегда быстро и вкусно. Курьеры вежливые, еда горячая.', img: '/images/dishes/margherita.jpg', rot: '-rotate-1' },
              { name: 'Ольга', where: 'Люберцы', text: 'Заказывали хинкали из «Тбилиси» на праздник. Всё приехало горячим, гости просили добавки!', img: '/images/dishes/khinkali.jpg', rot: 'rotate-1' },
              { name: 'Игорь', where: 'Москва, Сокол', text: 'Бургеры из Burger House — лучшие в городе. Сочные, большие, доставка за 25 минут.', img: '/images/dishes/double-burger.jpg', rot: '-rotate-[0.5deg]' },
            ].map((r, i) => (
              <motion.figure
                key={r.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className={`bg-white/70 p-6 md:p-7 shadow-[0_18px_40px_-18px_rgba(60,40,20,0.45)] ${r.rot}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-food-primary text-food-primary" />
                  ))}
                </div>
                <blockquote className="text-ink text-lg leading-relaxed mb-6">«{r.text}»</blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={r.img} alt="" fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="font-display text-lg text-ink leading-none mb-1">{r.name}</div>
                    <div className="text-xs text-ink-muted">{r.where}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
      <TornEdge color={COAL} className="-mt-px relative z-10 bg-paper" />

      {/* ==================== FAQ ==================== */}
      <section className="texture-slate bg-food-bg -mt-px">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
          <motion.div {...fadeUp}>
            <div className="eyebrow mb-4">Вопросы</div>
            <h2 className="text-4xl md:text-5xl leading-[1.05] mb-5">Часто спрашивают</h2>
            <p className="text-food-muted mb-8 max-w-sm">
              Не нашли ответ? Напишите нам в Telegram <span className="text-food-text">@foodexpress</span> — ответим за пару минут.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="border-t border-food-border">
            {[
              { q: 'Сколько ждать доставку?', a: 'В среднем 30–60 минут. Точное время зависит от ресторана и вашего района. Отслеживать заказ можно на странице «Мои заказы».' },
              { q: 'Сколько стоит доставка?', a: 'От 0 до 199 ₽ — зависит от ресторана. У некоторых заведений доставка бесплатная. Итоговая стоимость видна в корзине.' },
              { q: 'Как можно оплатить?', a: 'Оплата при получении — наличными или картой курьеру. Онлайн-оплата появится в ближайшее время.' },
              { q: 'Можно ли отменить заказ?', a: 'Да, до момента передачи заказа курьеру. Свяжитесь с нами через Telegram — оперативно решим вопрос.' },
              { q: 'Есть ли минимальная сумма заказа?', a: 'Да, у каждого ресторана своя минимальная сумма — от 400 до 1500 ₽. Она указана на карточке ресторана.' },
              { q: 'Работаете ли вы ночью?', a: 'Сейчас сервис работает ежедневно с 10:00 до 23:00. В планах — расширение до круглосуточного режима.' },
            ].map((item, i) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} defaultOpen={i === 0} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== ФИНАЛЬНЫЙ CTA ==================== */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/categories/burger.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover -z-20"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <Embers className="-z-10" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-36">
          <motion.div {...fadeUp} className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-7xl leading-[1.02] text-white mb-6">
              Пока вы читали,
              <br />
              курьер уже <BrushWord>мог бы ехать</BrushWord>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-md">
              Выберите ресторан — и через 35 минут ужин будет на столе.
            </p>
            <Link
              href="/restaurants"
              className="group inline-flex items-center gap-2.5 h-14 px-9 rounded-md bg-food-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-food-primary-hover transition-all shadow-xl shadow-food-primary/40"
            >
              Выбрать ресторан
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* Плавающая карточка «закажи прямо сейчас» в первом экране */
function HeroOrderCard({
  item,
  className = '',
}: {
  item: (typeof menuItems)[number];
  className?: string;
}) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className={`flex items-center gap-3 p-2.5 pr-3 rounded-xl bg-[#1a1614]/90 backdrop-blur-md ring-1 ring-white/10 shadow-2xl shadow-black/60 ${className}`}
    >
      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
        <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.18em] text-food-accent">Хит · Тбилиси</div>
        <div className="font-display text-[15px] leading-tight truncate max-w-[9rem]">{item.name}</div>
        <div className="text-sm font-bold">{item.price} ₽</div>
      </div>
      <button
        onClick={() => {
          addItem({
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            weight: item.weight,
            restaurantId: item.restaurantId,
            restaurantName: restaurantName(item.restaurantId),
          });
          setAdded(true);
          setTimeout(() => setAdded(false), 1200);
        }}
        aria-label={`Добавить «${item.name}» в корзину`}
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
          added ? 'bg-food-success text-[#0f0d0c]' : 'bg-food-primary text-white hover:bg-food-primary-hover hover:scale-110'
        }`}
      >
        {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
    </motion.div>
  );
}

/* Промо-баннер с копированием промокода */
function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('FIRST10');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* буфер обмена может быть недоступен — просто ничего не делаем */
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-food-primary">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, #ffb36b 0%, transparent 45%), radial-gradient(circle at 90% 80%, #7a120a 0%, transparent 50%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-20 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <motion.div {...fadeUp}>
          <div className="font-display uppercase tracking-[0.22em] text-sm text-white/80 mb-4">Первый заказ</div>
          <h2 className="text-white text-5xl md:text-7xl leading-[0.98] mb-6">
            −10% на всю
            <br />
            корзину
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-md">
            Введите промокод при оформлении. Действует до конца месяца при заказе от 700 ₽.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={copy}
              className="inline-flex items-center gap-3 h-14 px-6 rounded-md border-2 border-dashed border-white/70 text-white font-display text-xl tracking-[0.2em] hover:bg-white/10 transition-colors"
              aria-label="Скопировать промокод FIRST10"
            >
              FIRST10
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5 opacity-80" />}
            </button>
            <Link
              href="/restaurants"
              className="group inline-flex items-center gap-2.5 h-14 px-8 rounded-md bg-[#0f0d0c] text-white font-bold uppercase tracking-wider text-sm hover:bg-black transition-colors"
            >
              Использовать
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="relative hidden md:block">
          <div className="relative mx-auto w-[85%] aspect-square rounded-full overflow-hidden ring-[10px] ring-white/15 shadow-2xl shadow-black/40 rotate-12">
            <Image src="/images/dishes/pepperoni.jpg" alt="" fill sizes="420px" className="object-cover" />
          </div>
          <div className="absolute top-[6%] left-[2%] w-28 h-28 rounded-full bg-[#0f0d0c] flex flex-col items-center justify-center text-white -rotate-12 shadow-xl">
            <span className="font-display text-4xl leading-none">10%</span>
            <span className="text-[10px] uppercase tracking-widest text-white/70 mt-1">скидка</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
