import { create } from "zustand";
import { DashboardStats, TimeRange } from "@/app/types/analytics";
import { AnalyticsService } from "@/app/services/analytics.service";
import toast from "react-hot-toast";

interface AnalyticsState {
  data: DashboardStats | null;
  isLoading: boolean;
  timeRange: TimeRange;

  fetchStats: (range: TimeRange) => Promise<void>;
  setTimeRange: (range: TimeRange) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  data: null,
  isLoading: false,
  timeRange: "This Week",

  fetchStats: async (range: TimeRange) => {
    set({ isLoading: true });
    try {
      const stats = await AnalyticsService.getDashboardStats(range);
      set({ data: stats, isLoading: false });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load analytics");
      set({ isLoading: false });
    }
  },

  setTimeRange: (range: TimeRange) => {
    set({ timeRange: range });
    const store = useAnalyticsStore.getState();
    store.fetchStats(range);
  },
}));
