"use client";

import { useState } from "react";
import AppearanceSettings from "./components/AppearanceSettings";
import BusinessForm from "./components/BusinessForm";

type Tab = "business" | "appearance";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("business");

  return (
    <div className="space-y-6 bg-background min-h-screen">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Settings
        </h2>
        <p className="text-muted mt-1">
          Customize your dashboard appearance and business details
        </p>
      </div>

      <div className="border-b border-primary-dark/20">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("business")}
            className={`pb-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "business"
                ? "text-white"
                : "text-muted hover:text-zinc-300"
            }`}
          >
            Business Info
            {activeTab === "business" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_-2px_10px_var(--color-primary)]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("appearance")}
            className={`pb-3 text-sm font-medium transition-all duration-200 relative ${
              activeTab === "appearance"
                ? "text-white"
                : "text-muted hover:text-zinc-300"
            }`}
          >
            Appearance
            {activeTab === "appearance" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_-2px_10px_var(--color-primary)]" />
            )}
          </button>
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === "business" && <BusinessForm />}
        {activeTab === "appearance" && <AppearanceSettings />}
      </div>
    </div>
  );
}
