"use client";
import { motion } from "framer-motion";
import { PopularItem } from "@/app/types/analytics";

export default function TopItemsList({ items }: { items: PopularItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-surface border border-primary-dark/20 rounded-2xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4">Top Selling</h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold ${
                  i === 0
                    ? "bg-yellow-500/20 text-yellow-500"
                    : i === 1
                      ? "bg-gray-400/20 text-gray-400"
                      : i === 2
                        ? "bg-orange-700/20 text-orange-700"
                        : "bg-primary/10 text-primary"
                }`}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{item.name}</p>
                <p className="text-[10px] text-muted">{item.sales} sold</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-white">
              ${item.revenue.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
