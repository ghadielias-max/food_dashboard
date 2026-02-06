"use client";

import { useState } from "react";
import { BusinessType } from "@/app/types/business";
import { useAdminStore } from "@/app/store/useAdminStore";
import { CreateBusinessPayload } from "@/app/types/admin";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BUSINESS_TYPES: BusinessType[] = [
  "RESTAURANT",
  "SUPERMARKET",
  "VEGETABLES",
  "TOBACCO",
  "HYGIENE",
  "CUSTOM",
];

export default function CreateBusinessModal({ isOpen, onClose }: Props) {
  const { createAccount, isLoading } = useAdminStore();
  const [form, setForm] = useState<CreateBusinessPayload>({
    businessName: "",
    type: "RESTAURANT",
    address: "",
    phoneNumber: "",
    ownerName: "",
    ownerEmail: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createAccount(form);
    if (success) onClose();
  };

  const updateField = (key: keyof CreateBusinessPayload, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-surface border border-primary-dark/30 rounded-2xl shadow-2xl flex flex-col">
        <div className="p-6 border-b border-primary-dark/20 flex justify-between items-center bg-surface-highlight">
          <h3 className="text-lg font-bold text-white">Onboard New Business</h3>
          <button onClick={onClose} className="text-muted hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted">Business Name</label>
              <input
                required
                type="text"
                className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                value={form.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted">Type</label>
              <select
                className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                value={form.type}
                onChange={(e) => updateField("type", e.target.value)}
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted">Address</label>
              <input
                required
                type="text"
                className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted">Phone Number</label>
              <input
                required
                type="tel"
                className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                value={form.phoneNumber}
                onChange={(e) => updateField("phoneNumber", e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-primary-dark/20">
            <h4 className="text-sm font-semibold text-primary mb-4">Owner Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted">Full Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  value={form.ownerName}
                  onChange={(e) => updateField("ownerName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted">Email</label>
                <input
                  required
                  type="email"
                  className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  value={form.ownerEmail}
                  onChange={(e) => updateField("ownerEmail", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium shadow-lg shadow-primary/20"
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}