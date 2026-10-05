import Link from 'next/link';
import { Home, Search, UtensilsCrossed } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl mx-auto text-center relative">
        {/* Декор */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative">
          {/* Иконка */}
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-food-primary to-food-accent flex items-center justify-center mb-8 shadow-2xl shadow-food-primary/30 rotate-6">
            <UtensilsCrossed className="w-12 h-12 text-white -rotate-6" />
          </div>

          {/* 404 */}
          <div className="text-[120px] md:text-[160px] font-extrabold leading-none gradient-text mb-4">
            404
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold mb-4">
            Такой страницы нет
          </h1>

          <p className="text-food-muted mb-10 max-w-md mx-auto">
            Кажется, вы забрели не туда. Возможно, страница была удалена
            или вы ошиблись в адресе.
          </p>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-food-primary text-white font-semibold hover:bg-food-primary-hover transition-all shadow-lg shadow-food-primary/30 hover:scale-105"
            >
              <Home className="w-5 h-5" />
              На главную
            </Link>
            <Link
              href="/restaurants"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-food-border bg-food-surface font-semibold hover:border-food-primary transition-colors"
            >
              <Search className="w-5 h-5" />
              К ресторанам
            </Link>
          </div>

          {/* Терминальная подпись */}
          <div className="mt-12 text-xs text-food-muted font-mono">
            <span className="opacity-60">$</span> error 404: page_not_found
          </div>
        </div>
      </div>
    </main>
  );
}