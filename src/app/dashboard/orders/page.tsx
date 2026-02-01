"use client";

import { Item } from "@/app/types/items";
import { Order } from "@/app/types/order";
import { useState } from "react";
import OrderCard from "./components/OrderCard";
import OrdersTable from "./components/OrdersTable";

const mockLiveOrders: Order[] = [
  {
    id: "ord_1",
    businessId: "biz_1",
    customerName: "Table 4",
    status: "PENDING",
    totalPrice: 4500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        itemId: "item_1",
        name: "Spicy Ramen",
        quantity: 2,
        priceAtOrder: 1500,
        itemDetails: {
          id: "item_1",
          name: "Spicy Ramen",
          type: "FOOD",
          basePrice: 1500,
          description: "Mock Description",
          categoryId: "mains",
          isAvailable: true,
          ingredients: ["Noodles", "Broth"],
        } as Item,
      },
      {
        itemId: "item_2",
        name: "Gyoza",
        quantity: 1,
        priceAtOrder: 1500,
        itemDetails: {
          id: "item_2",
          name: "Gyoza",
          type: "FOOD",
          basePrice: 1500,
          description: "Mock Description",
          categoryId: "sides",
          isAvailable: true,
          ingredients: ["Pork", "Dough"],
        } as Item,
      },
    ],
  },
  {
    id: "ord_2",
    businessId: "biz_1",
    customerName: "John Doe (Pickup)",
    status: "READY",
    totalPrice: 1200,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        itemId: "item_3",
        name: "Matcha Latte",
        quantity: 2,
        priceAtOrder: 600,
        itemDetails: {
          id: "item_3",
          name: "Matcha Latte",
          type: "FOOD",
          basePrice: 600,
          description: "Mock Description",
          categoryId: "drinks",
          isAvailable: true,
          ingredients: ["Matcha", "Milk"],
        } as Item,
      },
    ],
  },
  {
    id: "ord_3",
    businessId: "biz_1",
    customerName: "Table 2",
    status: "PREPARING",
    totalPrice: 8500,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        itemId: "item_4",
        name: "Sushi Platter",
        quantity: 1,
        priceAtOrder: 8500,
        itemDetails: {
          id: "item_4",
          name: "Sushi Platter",
          type: "FOOD",
          basePrice: 8500,
          description: "Mock Description",
          categoryId: "mains",
          isAvailable: true,
          ingredients: ["Rice", "Fish"],
        } as Item,
      },
    ],
  },
  {
    id: "ord_4",
    businessId: "biz_1",
    customerName: "Table 7",
    status: "PENDING",
    totalPrice: 3200,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        itemId: "item_5",
        name: "Edamame",
        quantity: 1,
        priceAtOrder: 500,
        itemDetails: {
          id: "item_5",
          name: "Edamame",
          type: "FOOD",
          basePrice: 500,
          description: "Mock Description",
          categoryId: "sides",
          isAvailable: true,
          ingredients: ["Edamame", "Salt"],
        } as Item,
      },
      {
        itemId: "item_6",
        name: "Salmon Roll",
        quantity: 2,
        priceAtOrder: 1350,
        itemDetails: {
          id: "item_6",
          name: "Salmon Roll",
          type: "FOOD",
          basePrice: 1350,
          description: "Mock Description",
          categoryId: "mains",
          isAvailable: true,
          ingredients: ["Rice", "Salmon", "Seaweed"],
        } as Item,
      },
    ],
  },
];

const mockHistoryOrders: Order[] = [
  {
    id: "ord_98",
    businessId: "biz_1",
    customerName: "Table 12",
    status: "COMPLETED",
    totalPrice: 12500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        itemId: "item_5",
        name: "Omakase Set",
        quantity: 1,
        priceAtOrder: 12500,
        itemDetails: {
          id: "item_5",
          name: "Omakase Set",
          type: "FOOD",
          basePrice: 12500,
          description: "Mock Description",
          categoryId: "mains",
          isAvailable: true,
          ingredients: ["Chef's Choice"],
        } as Item,
      },
    ],
  },
  {
    id: "ord_99",
    businessId: "biz_1",
    customerName: "Sarah Smith",
    status: "CANCELLED",
    totalPrice: 3200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        itemId: "item_6",
        name: "Tempura Udon",
        quantity: 2,
        priceAtOrder: 1600,
        itemDetails: {
          id: "item_6",
          name: "Tempura Udon",
          type: "FOOD",
          basePrice: 1600,
          description: "Mock Description",
          categoryId: "mains",
          isAvailable: true,
          ingredients: ["Udon", "Tempura Shrimp"],
        } as Item,
      },
    ],
  },
  {
    id: "ord_100",
    businessId: "biz_1",
    customerName: "Table 5",
    status: "COMPLETED",
    totalPrice: 4500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        itemId: "item_1",
        name: "Spicy Ramen",
        quantity: 3,
        priceAtOrder: 1500,
        itemDetails: {
          id: "item_1",
          name: "Spicy Ramen",
          type: "FOOD",
          basePrice: 1500,
          description: "Mock Description",
          categoryId: "mains",
          isAvailable: true,
          ingredients: ["Noodles", "Spicy Broth"],
        } as Item,
      },
    ],
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"live" | "history">("live");
  const [activeSubTab, setActiveSubTab] = useState<
    "ALL" | "PENDING" | "PREPARING" | "READY"
  >("ALL");

  const filteredLiveOrders = mockLiveOrders.filter((order) => {
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
        {activeTab === "live" ? (
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
          <OrdersTable orders={mockHistoryOrders} />
        )}
      </div>
    </div>
  );
}
