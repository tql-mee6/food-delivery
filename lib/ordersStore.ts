import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, OrderStatus } from '@/types';

type OrdersStore = {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status' | 'statusHistory'>) => string;
  getOrder: (id: string) => Order | undefined;
  updateStatus: (id: string, status: OrderStatus) => void;
  advanceStatus: (id: string) => void;
};

const statusOrder: OrderStatus[] = ['accepted', 'preparing', 'delivering', 'delivered'];

export const useOrders = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (data) => {
        const id = `ORD-${Date.now().toString(36).toUpperCase()}`;
        const order: Order = {
          ...data,
          id,
          status: 'accepted',
          statusHistory: [{ status: 'accepted', timestamp: Date.now() }],
          createdAt: Date.now(),
        };
        set({ orders: [order, ...get().orders] });
        return id;
      },

      getOrder: (id) => get().orders.find((o) => o.id === id),

      updateStatus: (id, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status,
                  statusHistory: [...o.statusHistory, { status, timestamp: Date.now() }],
                }
              : o
          ),
        });
      },

      advanceStatus: (id) => {
        const order = get().getOrder(id);
        if (!order) return;
        const currentIdx = statusOrder.indexOf(order.status);
        if (currentIdx < statusOrder.length - 1) {
          get().updateStatus(id, statusOrder[currentIdx + 1]);
        }
      },
    }),
    { name: 'food-orders' }
  )
);