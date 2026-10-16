'use client';

import { Sparkles } from 'lucide-react';

export default function MarqueeBanner() {
  // Дублируем текст, чтобы анимация была бесконечной
  const items = Array(6).fill(null);

  return (
    <section className="relative py-5 md:py-6 border-y border-food-border bg-food-surface overflow-hidden">
      {/* Виньетки по краям */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-food-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-food-surface to-transparent z-10 pointer-events-none" />

      {/* Бегущая строка */}
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(2)].map((_, dupIdx) => (
          <div key={dupIdx} className="flex shrink-0">
            {items.map((_, i) => (
              <div key={i} className="flex items-center gap-6 md:gap-10 px-6 md:px-10">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-food-primary flex-shrink-0" />

                <span className="text-base md:text-xl font-bold tracking-wide">
                  Сайт разработала{' '}
                  <span className="text-food-primary">Проничева Маргарита</span>
                </span>

                <span className="text-food-muted text-sm md:text-base font-mono">
                  ИС1-25
                </span>

                <span className="w-2 h-2 rounded-full bg-food-primary flex-shrink-0" />

                <span className="text-base md:text-xl font-bold tracking-wide">
                  Учебный проект
                </span>

                <span className="text-food-muted text-sm md:text-base">
                  Сервис доставки еды
                </span>

                <span className="w-2 h-2 rounded-full bg-food-primary flex-shrink-0" />

                <span className="text-base md:text-xl font-bold tracking-wide">
                  Food<span className="text-food-primary">Express</span>
                </span>

                <span className="w-2 h-2 rounded-full bg-food-primary flex-shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}