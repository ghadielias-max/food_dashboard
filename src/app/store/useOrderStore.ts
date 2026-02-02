import { create } from "zustand";
import {
  Order,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from "@/app/types/order";
import { OrderService } from "@/app/services/order.service";
import toast from "react-hot-toast";

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updatePaymentStatus: (
    orderId: string,
    status: PaymentStatus,
  ) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,

  fetchOrders: async () => {
    set({ isLoading: true });
    try {
      const data = await OrderService.getAll();
      // Ensure legacy data has payment fields
      const upgradedData = data.map((o) => ({
        ...o,
        paymentStatus: (o.paymentStatus || "UNPAID") as PaymentStatus,
        paymentMethod: (o.paymentMethod || "CASH") as PaymentMethod,
      }));
      set({ orders: upgradedData });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      set({ isLoading: false });
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    const currentOrders = get().orders;
    set({
      orders: currentOrders.map((o) =>
        o.id === orderId ? { ...o, status } : o,
      ),
    });

    try {
      await OrderService.updateStatus(orderId, status);
      toast.success(`Order updated to ${status}`);
    } catch (error) {
      console.error(error);
      set({ orders: currentOrders });
      toast.error("Failed to update status");
    }
  },

  updatePaymentStatus: async (orderId: string, status: PaymentStatus) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, paymentStatus: status } : o,
      ),
    }));
    toast.success(`Payment status updated to ${status}`);
  },

  addOrder: async (newOrder: Order) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    set((state) => ({
      orders: [newOrder, ...state.orders],
      isLoading: false,
    }));
  },
}));
