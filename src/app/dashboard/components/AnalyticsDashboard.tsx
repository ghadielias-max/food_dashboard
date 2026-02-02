"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnalyticsStore } from "@/app/store/useAnalyticsStore";
import { TimeRange } from "@/app/types/analytics";

import StatsCards from "./analytics/StatsCards";
import RevenueChart from "./analytics/RevenueChart";
import QuickActions from "./analytics/QuickActions";
import TopItemsList from "./analytics/TopItemsList";
import CustomerInsights from "./analytics/CustomerInsights";
import LowStockAlerts from "./analytics/LowStockAlerts";

export default function AnalyticsDashboard() {
  const { data, isLoading, timeRange, fetchStats, setTimeRange } =
    useAnalyticsStore();
  const [activeTab, setActiveTab] = useState<"overview" | "inventory">(
    "overview",
  );

  useEffect(() => {
    fetchStats(timeRange);
  }, []);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value as TimeRange;
    setTimeRange(range);
  };

  if (isLoading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center pb-4 border-b border-primary-dark/20">
          <div className="w-48 h-10 bg-surface rounded-xl border border-primary-dark/20" />
          <div className="w-32 h-10 bg-surface rounded-lg border border-primary-dark/20" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-surface border border-primary-dark/20 rounded-2xl"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-surface border border-primary-dark/20 rounded-2xl" />
          <div className="h-96 bg-surface border border-primary-dark/20 rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-surface border border-primary-dark/20 rounded-2xl" />
          <div className="h-80 bg-surface border border-primary-dark/20 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary-dark/20 pb-4">
        <div className="flex p-1 bg-surface-highlight rounded-xl">
          {(["overview", "inventory"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-white shadow-lg"
                  : "text-muted hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <select
          value={timeRange}
          onChange={handleRangeChange}
          className="bg-surface border border-primary-dark/20 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none"
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="YTD">YTD</option>
        </select>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <StatsCards data={data} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <RevenueChart sales={data.recentSales} />
              <QuickActions />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopItemsList items={data.topItems} />
              <CustomerInsights rate={data.customerRetention} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LowStockAlerts items={data.lowStockItems} />
              <div className="bg-surface border border-primary-dark/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Stock Value
                </h3>
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted italic">
                    Inventory charts coming soon...
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
