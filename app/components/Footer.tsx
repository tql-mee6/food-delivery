import Link from 'next/link';
import { Flame, Send, Mail, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-0 bg-[#0a0908] border-t border-white/5 texture-slate">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded-full border border-food-primary/60 flex items-center justify-center">
                <Flame className="w-[18px] h-[18px] text-food-primary" />
              </span>
              <span className="font-display uppercase tracking-[0.18em]">
                Food<span className="text-food-primary">Express</span>
              </span>
            </Link>
            <p className="text-food-muted text-sm max-w-sm leading-relaxed">
              Горячая еда из лучших ресторанов города — с огня,
              из печи и с вока прямо к вашей двери.
            </p>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-[0.18em] text-xs text-food-muted mb-5">Навигация</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/restaurants', label: 'Рестораны' },
                { href: '/cart', label: 'Корзина' },
                { href: '/orders', label: 'Мои заказы' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-food-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-[0.18em] text-xs text-food-muted mb-5">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-food-primary" />
                <span>+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-food-primary" />
                <span>hello@foodexpress.ru</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-food-primary" />
                <span>@foodexpress</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-food-primary" />
                <span>Ежедневно 10:00 – 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-food-muted">
          <div>© {new Date().getFullYear()} FoodExpress. Учебный проект.</div>
          <div>Сайт разработала Проничева Маргарита · ИС1-25</div>
        </div>
      </div>
    </footer>
  );
}
