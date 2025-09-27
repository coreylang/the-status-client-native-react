type OrderStatus = "Received" | "Preparing" | "Ready" | "Completed";

export type Order = {
  id: string;
  name: string;
  items: string[];
  status: OrderStatus;
};

let orders: Order[] = [
  { id: "1", name: "Athena L.", items: ["Latte", "Croissant"], status: "Received" },
  { id: "2", name: "Marcus R.", items: ["Espresso"], status: "Received" },
  { id: "3", name: "Jamie S.", items: ["Club Sandwich", "Lemonade"], status: "Received" },
];

export const fetchOrders = (): Promise<Order[]> =>
  new Promise((resolve) => setTimeout(() => resolve(orders), 500));

export const updateOrderStatus = (
  id: string,
  newStatus: OrderStatus
): Promise<Order> =>
  new Promise((resolve) =>
    setTimeout(() => {
      orders = orders.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      );
      resolve(orders.find((o) => o.id === id)!);
    }, 500)
  );
