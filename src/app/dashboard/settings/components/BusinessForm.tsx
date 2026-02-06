"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Business, BusinessType } from "@/app/types/business";

const BUSINESS_TYPES: BusinessType[] = [
  "RESTAURANT",
  "SUPERMARKET",
  "VEGETABLES",
  "TOBACCO",
  "HYGIENE",
  "CUSTOM",
];

export default function BusinessForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Business>>({
    name: "My Awesome Store",
    type: "RESTAURANT",
    address: "123 Innovation Blvd, Tech City",
    phone: "+1 (555) 000-0000",
    logoUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Business information updated");
    setIsLoading(false);
  };

  return (
    <div className="bg-surface border border-primary-dark/20 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Business Information
          </h3>
          <p className="text-sm text-muted mt-1">
            Update your public store details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-6 items-start">
          <div className="w-24 h-24 rounded-2xl bg-background border border-primary-dark/20 flex items-center justify-center flex-shrink-0 overflow-hidden relative group">
            {formData.logoUrl ? (
              <img
                src={formData.logoUrl}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-2">
                <span className="text-2xl">🏪</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <span className="text-xs text-white font-medium">Change</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted">
                  Business Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as BusinessType,
                    })
                  }
                  className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                >
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0) + type.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, logoUrl: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={2}
                className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-primary-dark/20">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_-3px_var(--color-primary)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
