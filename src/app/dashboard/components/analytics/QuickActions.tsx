"use client";
import { motion } from "framer-motion";

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-surface border border-primary-dark/20 rounded-2xl p-6 h-full"
    >
      <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Add Item", icon: "+" },
          { label: "New Discount", icon: "%" },
          { label: "View Orders", icon: "→" },
          { label: "Settings", icon: "⚙" },
        ].map((action, i) => (
          <button
            key={i}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all flex flex-col items-center gap-2 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform text-primary">
              {action.icon}
            </span>
            <span className="text-xs text-zinc-300">{action.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
