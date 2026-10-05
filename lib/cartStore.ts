import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getCount: () => number;
  getRestaurantId: () => string | null;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const items = get().items;
        const existing = items.find((i) => i.menuItemId === newItem.menuItemId);

        // Если добавляем из другого ресторана — очищаем корзину
        const currentRestaurant = get().getRestaurantId();
        if (currentRestaurant && currentRestaurant !== newItem.restaurantId) {
          const confirmed = window.confirm(
            'В корзине уже есть блюда из другого ресторана. Очистить корзину и добавить новое?'
          );
          if (!confirmed) return;
          set({ items: [{ ...newItem, quantity: 1 }] });
          return;
        }

        if (existing) {
          set({
            items: items.map((i) =>
              i.menuItemId === newItem.menuItemId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...newItem, quantity: 1 }] });
        }
      },

      removeItem: (menuItemId) =>
        set({ items: get().items.filter((i) => i.menuItemId !== menuItemId) }),

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.menuItemId === menuItemId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getRestaurantId: () => get().items[0]?.restaurantId ?? null,
    }),
    { name: 'food-cart' }
  )
);