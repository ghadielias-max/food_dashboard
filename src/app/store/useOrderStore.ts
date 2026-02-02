import { create } from "zustand";
import { Order, OrderStatus } from "@/app/types/order";
import { OrderService } from "@/app/services/order.service";
import toast from "react-hot-toast";

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,

  fetchOrders: async () => {
    set({ isLoading: true });
    try {
      const data = await OrderService.getAll();
      set({ orders: data });
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
}));
