import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeOption =
  | "default"
  | "midnight"
  | "forest"
  | "sunset"
  | "light";

interface SettingsState {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "default",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "app-settings",
    },
  ),
);
