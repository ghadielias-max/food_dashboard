import { Item } from "./items";

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus = "PAID" | "UNPAID" | "REFUNDED";
export type PaymentMethod = "CASH" | "CARD" | "ONLINE";

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

  // NEW: Snapshot of Business Info
  businessName: string;
  businessAddress: string;
  businessPhone: string;

  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  tableId?: string;

  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;

  totalPrice: number;
  items: OrderItem[];

  createdAt: string;
  updatedAt: string;
}
