"use client";
import { LowStockItem } from "@/app/types/analytics";

export default function LowStockAlerts({ items }: { items: LowStockItem[] }) {
  return (
    <div className="bg-surface border border-primary-dark/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Low Stock Alerts</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-error/10 text-error border border-error/20">
          {items.length} items
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5"
          >
            <div>
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-[10px] text-muted">
                Stock: {item.stock} / Threshold: {item.limit}
              </p>
            </div>
            <button className="text-xs text-primary hover:underline">
              Restock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
