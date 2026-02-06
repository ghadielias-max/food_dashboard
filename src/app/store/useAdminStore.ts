import { create } from "zustand";
import { AdminService, BusinessAccount } from "@/app/services/admin.service";
import { PlatformAnalytics, PlatformSettings, CreateBusinessPayload } from "@/app/types/admin";
import toast from "react-hot-toast";

interface AdminState {
  accounts: BusinessAccount[];
  analytics: PlatformAnalytics | null;
  settings: PlatformSettings | null;
  isLoading: boolean;
  isSettingsLoading: boolean;

  fetchAccounts: () => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  
  createAccount: (data: CreateBusinessPayload) => Promise<boolean>;
  updateSettings: (data: PlatformSettings) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  accounts: [],
  analytics: null,
  settings: null,
  isLoading: false,
  isSettingsLoading: false,

  fetchAccounts: async () => {
    set({ isLoading: true });
    try {
      const data = await AdminService.getAllAccounts();
      set({ accounts: data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isLoading: false });
    }
  },

  fetchAnalytics: async () => {
    try {
      const data = await AdminService.getPlatformAnalytics();
      set({ analytics: data });
    } catch (err) {
      console.error(err);
    }
  },

  fetchSettings: async () => {
    try {
      const data = await AdminService.getPlatformSettings();
      set({ settings: data });
    } catch (err) {
      console.error(err);
    }
  },

  createAccount: async (data) => {
    set({ isLoading: true });
    try {
      const newAccount = await AdminService.createBusinessAccount(data);
      set((state) => ({
        accounts: [...state.accounts, newAccount],
        isLoading: false,
      }));
      toast.success("Business account created successfully");
      return true;
    } catch (err) {
      toast.error("Failed to create account");
      set({ isLoading: false });
      return false;
    }
  },

  updateSettings: async (data) => {
    set({ isSettingsLoading: true });
    try {
      const updated = await AdminService.updatePlatformSettings(data);
      set({ settings: updated, isSettingsLoading: false });
      toast.success("Platform settings updated");
    } catch (err) {
      toast.error("Failed to update settings");
      set({ isSettingsLoading: false });
    }
  },
}));