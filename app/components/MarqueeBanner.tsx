'use client';

/* Бегущая строка — красная лента, как наклейка на крафт-пакете */
export default function MarqueeBanner() {
  const phrases = [
    'Сайт разработала Проничева Маргарита',
    'ИС1-25',
    'Учебный проект',
    'Горячо — с огня и из печи',
    'Доставка за 35 минут',
    'Промокод FIRST10 — минус 10%',
  ];
  const items = [...phrases, ...phrases];

  return (
    <section
      aria-label="Бегущая строка"
      className="relative py-3.5 md:py-4 bg-food-primary overflow-hidden -rotate-1 scale-[1.02] my-2 shadow-xl shadow-black/40"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {items.map((text, i) => (
              <span key={i} className="flex items-center gap-6 md:gap-8 px-3 md:px-4">
                <span className="font-display uppercase tracking-[0.14em] text-sm md:text-lg text-white">
                  {text}
                </span>
                <span className="text-white/70 text-lg">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
