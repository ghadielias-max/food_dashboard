"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/app/store/useSettingsStore";

export default function ThemeController() {
  const { theme } = useSettingsStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "default") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return null;
}
