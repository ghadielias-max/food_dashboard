import { create } from "zustand";
import { ItemSubmissionData } from "@/app/dashboard/items/components/CreateItemModal";
import { ItemService } from "@/app/services/item.service";
import toast from "react-hot-toast";
import { Item } from "../types/items";

interface ItemState {
  items: Item[];
  isLoading: boolean;

  // Actions
  fetchItems: () => Promise<void>;
  addItem: (data: ItemSubmissionData) => Promise<boolean>; // Returns success status
}

export const useItemStore = create<ItemState>((set) => ({
  items: [],
  isLoading: false,

  fetchItems: async () => {
    set({ isLoading: true });
    try {
      const data = await ItemService.getAll();
      set({ items: data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load items");
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (data) => {
    set({ isLoading: true });
    try {
      const newItem = await ItemService.create(data);

      set((state) => ({ items: [...state.items, newItem] }));
      toast.success("Item created successfully 💜");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create item");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
