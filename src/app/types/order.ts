// types/order.ts

import { Item } from "./items";

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  priceAtOrder: number;
  itemDetails: Item;
}

export interface Order {
  id: string;
  businessId: string;
  customerName: string;
  tableId?: string;
  status: OrderStatus;

  totalPrice: number;
  items: OrderItem[];

  createdAt: string;
  updatedAt: string;
}
