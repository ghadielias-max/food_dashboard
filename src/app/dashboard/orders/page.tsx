"use client";

import { useEffect, useState } from "react";
import OrderCard from "./components/OrderCard";
import OrdersTable from "./components/OrdersTable";
import { useOrderStore } from "@/app/store/useOrderStore";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"live" | "history">("live");
  const [activeSubTab, setActiveSubTab] = useState<
    "ALL" | "PENDING" | "PREPARING" | "READY"
  >("ALL");

  const { orders, isLoading, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const liveOrders = orders.filter(
    (o) =>
      o.status === "PENDING" ||
      o.status === "PREPARING" ||
      o.status === "READY",
  );

  const historyOrders = orders.filter(
    (o) => o.status === "COMPLETED" || o.status === "CANCELLED",
  );

  const filteredLiveOrders = liveOrders.filter((order) => {
    if (activeSubTab === "ALL") return true;
    return order.status === activeSubTab;
  });

  return (
    <div className="space-y-8 bg-[#05050A] min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Orders
            </h2>
            <p className="text-zinc-400 mt-1">
              Manage incoming orders and view history
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_-3px_rgba(147,51,234,0.5)] flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Manual Order
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-purple-900/20">
          <div className="flex items-center gap-6">
            {(["live", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-all duration-200 relative capitalize ${
                  activeTab === tab
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab === "live" ? "Live Orders" : "Order History"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 shadow-[0_-2px_10px_rgba(168,85,247,0.5)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "live" && (
          <div className="flex gap-2">
            {(["ALL", "PENDING", "PREPARING", "READY"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  activeSubTab === tab
                    ? "bg-purple-600/20 text-purple-300 border-purple-500/50"
                    : "bg-[#0A0A12] text-zinc-500 border-transparent hover:border-purple-500/20 hover:text-zinc-300"
                }`}
              >
                {tab === "ALL"
                  ? "All Orders"
                  : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="min-h-[500px]">
        {isLoading && orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p>Loading orders...</p>
          </div>
        ) : activeTab === "live" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLiveOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
            {filteredLiveOrders.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-500 border border-dashed border-purple-900/20 rounded-2xl">
                <p>No orders found in this category.</p>
              </div>
            )}
          </div>
        ) : (
          <OrdersTable orders={historyOrders} />
        )}
      </div>
    </div>
  );
}
