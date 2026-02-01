"use client";

import { useEffect, useState } from "react";
import CreateItemModal, {
  ItemSubmissionData,
} from "./components/CreateItemModal";
import ItemCard from "./components/ItemCard";
import { useItemStore } from "@/app/store/useItemStore";

export default function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items, isLoading, fetchItems, addItem } = useItemStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreate = async (data: ItemSubmissionData) => {
    const success = await addItem(data);
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 bg-[#05050A] min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Items
          </h2>
          <p className="text-zinc-400 mt-1">
            Manage your menu and product inventory
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_-3px_rgba(147,51,234,0.5)] flex items-center gap-2"
        >
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
          {isLoading ? "Processing..." : "Create Item"}
        </button>
      </div>

      {isLoading && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p>Loading your inventory...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <CreateItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
