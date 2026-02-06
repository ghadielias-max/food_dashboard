"use client";

import { PlatformAnalytics } from "@/app/types/admin";
import { motion } from "framer-motion";

export default function PlatformAnalyticsView({ data }: { data: PlatformAnalytics }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-primary-dark/20 p-6 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4" />
          <p className="text-sm text-muted">Total Platform Revenue</p>
          <p className="text-3xl font-bold mt-2 text-white">${data.totalRevenue.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-primary-dark/20 p-6 rounded-2xl"
        >
          <p className="text-sm text-muted">Total Orders Processed</p>
          <p className="text-3xl font-bold mt-2 text-white">{data.totalOrders.toLocaleString()}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-primary-dark/20 p-6 rounded-2xl"
        >
          <p className="text-sm text-muted">Active Businesses</p>
          <p className="text-3xl font-bold mt-2 text-white">{data.activeBusinesses}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-primary-dark/20 p-6 rounded-2xl"
        >
          <p className="text-sm text-muted">Server Health</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`w-3 h-3 rounded-full animate-pulse ${
              data.serverHealth === 'OPERATIONAL' ? 'bg-success' : 'bg-error'
            }`} />
            <span className="text-xl font-bold text-white">{data.serverHealth}</span>
          </div>
        </motion.div>
      </div>

      {/* Simple Bar Chart Visualization */}
      <div className="bg-surface border border-primary-dark/20 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-6">Revenue Growth</h3>
        <div className="h-48 flex items-end justify-between gap-4">
          {data.revenueByMonth.map((item, i) => (
             <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / 200000) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary/40 transition-colors relative"
                >
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     ${item.value.toLocaleString()}
                   </div>
                </motion.div>
                <span className="text-xs text-muted">{item.month}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}