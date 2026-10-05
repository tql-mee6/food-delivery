import Link from 'next/link';
import { UtensilsCrossed, Send, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-food-border bg-food-surface-2/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-food-primary to-food-accent flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl">
                Food<span className="text-food-primary">Express</span>
              </span>
            </Link>
            <p className="text-food-muted text-sm max-w-md leading-relaxed">
              Доставка еды из лучших ресторанов города.
              Быстро, удобно, вкусно — прямо к вашей двери.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/restaurants" className="text-food-muted hover:text-food-primary transition-colors">
                  Рестораны
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-food-muted hover:text-food-primary transition-colors">
                  Корзина
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-food-muted hover:text-food-primary transition-colors">
                  Мои заказы
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-food-muted">
                <Phone className="w-4 h-4" />
                <span>+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2 text-food-muted">
                <Mail className="w-4 h-4" />
                <span>hello@foodexpress.ru</span>
              </li>
              <li className="flex items-center gap-2 text-food-muted">
                <Send className="w-4 h-4" />
                <span>@foodexpress</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-food-border flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-food-muted">
          <div>© {new Date().getFullYear()} FoodExpress. Учебный проект.</div>
          <div>Доставка работает ежедневно с 10:00 до 23:00</div>
        </div>
      </div>
    </footer>
  );
}