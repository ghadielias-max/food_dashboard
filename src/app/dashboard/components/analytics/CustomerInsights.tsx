"use client";
import { motion } from "framer-motion";

export default function CustomerInsights({ rate }: { rate: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-surface border border-primary-dark/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center text-muted"
    >
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
        <span className="text-2xl">👤</span>
      </div>
      <h4 className="text-white font-medium">Customer Insights</h4>
      <p className="text-sm mt-1">
        Returning customer rate is up {rate}% this week.
      </p>
    </motion.div>
  );
}
