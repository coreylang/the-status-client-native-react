// src/state/ordersStore.ts
import { create } from "zustand";
import { fetchOrders, updateOrderStatus, type Order } from "../api/mockApi";

type OrderStatus = "Received" | "Preparing" | "Ready";

type OrdersState = {
  orders: Order[];
  loading: boolean;
  refreshing: boolean;
  updatingIds: Set<string>;
  // derived
  counts: Record<OrderStatus, number>;
  // actions
  load: () => Promise<void>;
  refresh: () => Promise<void>;
  advance: (id: string) => Promise<void>;
};

const deriveCounts = (orders: Order[]): Record<OrderStatus, number> => ({
  Received: orders.filter(o => o.status === "Received").length,
  Preparing: orders.filter(o => o.status === "Preparing").length,
  Ready: orders.filter(o => o.status === "Ready").length,
});

const STATUS_FLOW: Record<OrderStatus, OrderStatus | null> = {
  Received: "Preparing",
  Preparing: "Ready",
  Ready: null,
};

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  loading: false,
  refreshing: false,
  updatingIds: new Set<string>(),
  counts: { Received: 0, Preparing: 0, Ready: 0 },

  load: async () => {
    set({ loading: true });
    const data = await fetchOrders();
    set({
      orders: data,
      loading: false,
      counts: deriveCounts(data),
    });
  },

  refresh: async () => {
    set({ refreshing: true });
    const data = await fetchOrders();
    set({
      orders: data,
      refreshing: false,
      counts: deriveCounts(data),
    });
  },

  advance: async (id: string) => {
    const { orders, updatingIds } = get();
    const target = orders.find(o => o.id === id);
    if (!target) return;

    const next = STATUS_FLOW[target.status];
    if (!next) return;

    // optimistic update
    const nextSet = new Set(updatingIds);
    nextSet.add(id);

    const optimistic = orders.map(o =>
      o.id === id ? { ...o, status: next } : o
    );

    set({
      orders: optimistic,
      updatingIds: nextSet,
      counts: deriveCounts(optimistic),
    });

    try {
      await updateOrderStatus(id, next);
    } finally {
      nextSet.delete(id);
      set({ updatingIds: nextSet });
    }
  },
}));
