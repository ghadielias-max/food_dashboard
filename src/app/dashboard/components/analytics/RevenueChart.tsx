"use client";
import { motion } from "framer-motion";
import { DailyRevenue } from "@/app/types/analytics";

export default function RevenueChart({ sales }: { sales: DailyRevenue[] }) {
  const maxRevenue = Math.max(...sales.map((d) => d.revenue)) || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2 bg-surface border border-primary-dark/20 rounded-2xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Revenue Trend</h3>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[10px] text-muted">
            <span className="w-2 h-2 rounded-full bg-primary"></span> Revenue
          </span>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-1 overflow-x-auto custom-scrollbar pb-2">
        {sales.map((day, i) => (
          <div
            key={i}
            className="flex-1 h-full flex flex-col items-center justify-end gap-2 group min-w-[30px]"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(day.revenue / maxRevenue) * 80}%` }}
              transition={{
                duration: 0.8,
                delay: i * 0.01,
                type: "spring",
                damping: 15,
              }}
              className="w-full bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-lg relative group-hover:from-primary/40 group-hover:to-primary/80 transition-colors"
              style={{ minHeight: "4px" }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-xl">
                ${day.revenue.toLocaleString()}
                <div className="text-gray-400 text-[9px]">
                  {day.orders} orders
                </div>
              </div>
            </motion.div>
            <span className="text-[10px] text-muted font-medium truncate w-full text-center">
              {day.date}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
