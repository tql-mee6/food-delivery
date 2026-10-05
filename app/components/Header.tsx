'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, UtensilsCrossed } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/cartStore';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCart((state) => state.getCount());

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const links = [
    { href: '/restaurants', label: 'Рестораны' },
    { href: '/orders', label: 'Мои заказы' },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 bg-food-bg/90 backdrop-blur-lg border-b border-food-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-food-primary to-food-accent flex items-center justify-center group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            Food<span className="text-food-primary">Express</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors relative py-1 ${
                isActive(link.href)
                  ? 'text-food-primary'
                  : 'text-food-text hover:text-food-primary'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-food-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-food-surface border border-food-border hover:border-food-primary transition-colors"
            aria-label="Корзина"
          >
            <ShoppingBag className="w-5 h-5 text-food-text" />
            <span className="hidden md:inline text-sm font-semibold">Корзина</span>
            {mounted && count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-food-primary text-white text-xs font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-food-surface border border-food-border flex items-center justify-center"
            aria-label="Меню"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-food-border bg-food-bg">
          <nav className="px-4 py-4 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'bg-food-primary text-white'
                    : 'hover:bg-food-surface-2'
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