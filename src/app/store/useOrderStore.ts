import { create } from "zustand";
import { Order } from "@/app/types/order";
import { OrderService } from "@/app/services/order.service";
import toast from "react-hot-toast";

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
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
}));
