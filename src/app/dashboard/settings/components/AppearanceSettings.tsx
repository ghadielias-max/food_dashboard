"use client";

import { useSettingsStore, ThemeOption } from "@/app/store/useSettingsStore";

const THEMES: { id: ThemeOption; label: string; color: string; bg: string }[] =
  [
    { id: "default", label: "Royal Purple", color: "#9333ea", bg: "#05050A" },
    { id: "midnight", label: "Midnight Blue", color: "#3b82f6", bg: "#020617" },
    { id: "forest", label: "Emerald Forest", color: "#10b981", bg: "#020402" },
    { id: "sunset", label: "Sunset Orange", color: "#f97316", bg: "#0c0402" },
    { id: "light", label: "Clean Light", color: "#7c3aed", bg: "#ffffff" },
  ];

export default function AppearanceSettings() {
  const { theme, setTheme } = useSettingsStore();

  return (
    <div className="bg-surface border border-primary-dark/20 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>

      <div className="space-y-4">
        <label className="text-sm font-medium text-muted">
          Theme Preference
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`group relative flex flex-col overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                theme === t.id
                  ? "border-primary shadow-[0_0_20px_-5px_var(--color-primary)] scale-[1.02]"
                  : "border-primary-dark/20 hover:border-primary/50 opacity-80 hover:opacity-100"
              }`}
            >
              <div
                className="h-24 w-full relative"
                style={{ backgroundColor: t.bg }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-10 rounded-lg bg-surface border border-white/10 shadow-sm flex items-center px-2 gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                    <div className="h-1.5 w-8 rounded-full bg-white/20" />
                  </div>
                </div>

                {theme === t.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-3 bg-surface-highlight flex justify-between items-center">
                <span className="text-xs font-medium text-white">
                  {t.label}
                </span>
                <div
                  className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: t.color, color: t.color }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
