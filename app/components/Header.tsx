'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartStore';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((state) => state.getCount());
  const subtotal = useCart((state) => state.getSubtotal());

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const links = [
    { href: '/', label: 'Главная' },
    { href: '/restaurants', label: 'Рестораны' },
    { href: '/orders', label: 'Мои заказы' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 bg-food-bg/85 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="FoodExpress — на главную">
          <span className="relative w-9 h-9 rounded-full border border-food-primary/60 flex items-center justify-center group-hover:bg-food-primary transition-colors">
            <Flame className="w-[18px] h-[18px] text-food-primary group-hover:text-white transition-colors" />
          </span>
          <span className="font-display uppercase tracking-[0.18em] text-[15px] md:text-base">
            Food<span className="text-food-primary">Express</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display uppercase tracking-[0.16em] text-[13px] transition-colors relative py-1 ${
                isActive(link.href) ? 'text-food-primary' : 'text-food-text/80 hover:text-food-text'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-food-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/cart"
            className={`relative flex items-center gap-2.5 h-10 md:h-11 px-3.5 md:px-5 rounded-md font-semibold text-sm transition-all ${
              mounted && count > 0
                ? 'bg-food-primary text-white hover:bg-food-primary-hover shadow-lg shadow-food-primary/25'
                : 'border border-food-border hover:border-food-primary text-food-text'
            }`}
            aria-label="Корзина"
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
            <span className="hidden md:inline">
              {mounted && count > 0 ? `${subtotal} ₽` : 'Корзина'}
            </span>
            {mounted && count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-white text-food-bg text-[11px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 rounded-md border border-food-border flex items-center justify-center"
            aria-label="Меню"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-food-border bg-food-bg">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-md font-display uppercase tracking-[0.14em] text-sm transition-colors ${
                  isActive(link.href) ? 'bg-food-primary text-white' : 'hover:bg-food-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
