"use client";

import { useEffect, useState } from "react";
import OrderCard from "./components/OrderCard";
import OrdersTable from "./components/OrdersTable";
import OrderDetailsModal from "./components/OrderDetailsModal";
import { useOrderStore } from "@/app/store/useOrderStore";
import { Order } from "@/app/types/order";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"live" | "history">("live");

  const [orderType, setOrderType] = useState<"ALL" | "DINE_IN" | "DELIVERY">(
    "ALL",
  );

  const [activeSubTab, setActiveSubTab] = useState<
    "ALL" | "PENDING" | "PREPARING" | "READY"
  >("ALL");

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { orders, isLoading, fetchOrders } = useOrderStore();

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrderId(order.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedOrderId(null), 300);
  };

  const step1Orders = orders.filter((o) => {
    if (activeTab === "live") {
      return ["PENDING", "PREPARING", "READY"].includes(o.status);
    }
    return ["COMPLETED", "CANCELLED"].includes(o.status);
  });

  const step2Orders = step1Orders.filter((o) => {
    if (orderType === "ALL") return true;
    if (orderType === "DINE_IN") return !!o.tableId; // Has Table ID
    if (orderType === "DELIVERY") return !o.tableId; // No Table ID (Delivery/Pickup)
    return true;
  });

  const finalOrders = step2Orders.filter((order) => {
    if (activeSubTab === "ALL") return true;
    return order.status === activeSubTab;
  });

  return (
    <div className="space-y-8 bg-background min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Orders
            </h2>
            <p className="text-muted mt-1">
              Manage incoming orders and view history
            </p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_-3px_var(--color-primary)] flex items-center gap-2">
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

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-primary-dark/20 pb-1">
          {/* Live / History Tabs */}
          <div className="flex items-center gap-6">
            {(["live", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-all duration-200 relative capitalize ${
                  activeTab === tab
                    ? "text-white"
                    : "text-muted hover:text-zinc-300"
                }`}
              >
                {tab === "live" ? "Live Orders" : "Order History"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_-2px_10px_rgba(147,51,234,0.5)]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex bg-surface-highlight p-1 rounded-lg self-start md:self-auto mb-2 md:mb-0">
            {(["ALL", "DINE_IN", "DELIVERY"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  orderType === type
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-white"
                }`}
              >
                {type === "ALL"
                  ? "All"
                  : type === "DINE_IN"
                    ? "🍽️ Dine-in"
                    : "🛵 Delivery"}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "live" && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(["ALL", "PENDING", "PREPARING", "READY"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border whitespace-nowrap ${
                  activeSubTab === tab
                    ? "bg-primary/20 text-primary border-primary/50"
                    : "bg-surface text-muted border-transparent hover:border-primary/20 hover:text-zinc-300"
                }`}
              >
                {tab === "ALL"
                  ? "All Statuses"
                  : tab.charAt(0) + tab.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="min-h-[500px]">
        {isLoading && orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p>Loading orders...</p>
          </div>
        ) : activeTab === "live" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finalOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
              />
            ))}
            {finalOrders.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted border border-dashed border-primary-dark/20 rounded-2xl">
                <p>No orders found in this category.</p>
              </div>
            )}
          </div>
        ) : (
          <OrdersTable orders={finalOrders} />
        )}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
