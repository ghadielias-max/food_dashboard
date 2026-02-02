"use client";
import { motion } from "framer-motion";
import { DashboardStats } from "@/app/types/analytics";

interface CardProps {
  label: string;
  value: string | number;
  trend: string;
  colorClass: string;
  index: number;
}

const Card = ({ label, value, trend, colorClass, index }: CardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="p-6 rounded-2xl bg-surface border border-primary-dark/20 shadow-lg relative overflow-hidden group"
  >
    <div
      className={`absolute top-0 right-0 w-24 h-24 ${colorClass} rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 opacity-10`}
    />
    <p className="text-sm font-medium text-muted relative z-10">{label}</p>
    <div className="mt-2 flex items-baseline gap-2 relative z-10">
      <span className="text-3xl font-bold text-white">{value}</span>
      <span className="text-xs font-medium text-success">{trend}</span>
    </div>
  </motion.div>
);

export default function StatsCards({ data }: { data: DashboardStats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card
        index={0}
        label="Total Revenue"
        value={`$${data.totalRevenue.toLocaleString()}`}
        trend={`+${data.revenueTrend}%`}
        colorClass="bg-primary"
      />
      <Card
        index={1}
        label="Active Orders"
        value={data.activeOrders}
        trend={`+${data.ordersTrend}%`}
        colorClass="bg-blue-500"
      />
      <Card
        index={2}
        label="Menu Items"
        value={data.totalMenuOptions}
        trend={`+${data.menuTrend} new`}
        colorClass="bg-purple-500"
      />
      <Card
        index={3}
        label="Avg. Order Value"
        value={`$${data.avgOrderValue}`}
        trend={`+${data.avgOrderTrend}%`}
        colorClass="bg-emerald-500"
      />
    </div>
  );
}
