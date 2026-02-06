"use client";

import { PlatformSettings } from "@/app/types/admin";
import { useState } from "react";
import { useAdminStore } from "@/app/store/useAdminStore";

export default function GlobalSettings({ settings }: { settings: PlatformSettings }) {
  const { updateSettings, isSettingsLoading } = useAdminStore();
  const [form, setForm] = useState(settings);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(settings);

  const handleSave = () => {
    updateSettings(form);
  };

  return (
    <div className="bg-surface border border-primary-dark/20 rounded-2xl p-8 space-y-8">
      <div>
        <h3 className="text-xl font-bold text-white">Global Configuration</h3>
        <p className="text-sm text-muted mt-1">Manage system-wide parameters and access control.</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
          <div>
            <p className="font-medium text-white">Maintenance Mode</p>
            <p className="text-xs text-muted">Disable access for all non-admin users</p>
          </div>
          <button 
            onClick={() => setForm({ ...form, maintenanceMode: !form.maintenanceMode })}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              form.maintenanceMode ? 'bg-primary' : 'bg-white/10'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
              form.maintenanceMode ? 'left-7' : 'left-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
          <div>
            <p className="font-medium text-white">Allow New Registrations</p>
            <p className="text-xs text-muted">If disabled, only admins can create accounts</p>
          </div>
          <button 
            onClick={() => setForm({ ...form, allowNewRegistrations: !form.allowNewRegistrations })}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              form.allowNewRegistrations ? 'bg-primary' : 'bg-white/10'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
              form.allowNewRegistrations ? 'left-7' : 'left-1'
            }`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Platform Fee (%)</label>
            <input 
              type="number"
              step="0.1"
              value={form.platformFeePercentage}
              onChange={(e) => setForm({ ...form, platformFeePercentage: parseFloat(e.target.value) })}
              className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Support Email</label>
            <input 
              type="email"
              value={form.supportEmail}
              onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
              className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-white/5">
        <button
          onClick={handleSave}
          disabled={!hasChanges || isSettingsLoading}
          className="px-6 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium shadow-lg shadow-primary/20 transition-all"
        >
          {isSettingsLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}