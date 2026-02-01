import { create } from "zustand";
import { Business } from "../types/business";

interface BusinessState {
  businesses: Business[];
  activeBusinessId: string | null;
  addBusiness: (b: Business) => void;
  setActiveBusiness: (id: string) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  businesses: [],
  activeBusinessId: null,
  addBusiness: (b) => set((s) => ({ businesses: [...s.businesses, b] })),
  setActiveBusiness: (id) => set({ activeBusinessId: id }),
}));
