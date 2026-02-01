"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import CreateItemModal, {
  ItemSubmissionData,
} from "./components/CreateItemModal";
import ItemCard from "./components/ItemCard";
import { Item } from "@/app/types/items";

const mockItems: Item[] = [
  {
    id: "1",
    type: "FOOD",
    name: "Classic Cheeseburger",
    description: "Double patty, american cheese, pickles, and house sauce.",
    basePrice: 1299,
    categoryId: "burgers",
    isAvailable: true,
    ingredients: [
      "Beef Patty",
      "American Cheese",
      "Pickles",
      "Bun",
      "House Sauce",
    ],
    nutrition: { calories: 850, protein: 45, carbs: 50, fat: 40 },
    options: [],
  },
  {
    id: "2",
    type: "PRODUCT",
    name: "Brand Hoodie",
    description: "Black oversized hoodie with purple logo print.",
    basePrice: 4500,
    categoryId: "merch",
    isAvailable: true,
    stock: 24,
    sku: "HOOD-BLK-L",
    variants: [],
  },
  {
    id: "3",
    type: "FOOD",
    name: "Truffle Fries",
    description: "Crispy fries tossed in truffle oil and parmesan.",
    basePrice: 650,
    categoryId: "sides",
    isAvailable: true,
    ingredients: ["Potatoes", "Truffle Oil", "Parmesan Cheese", "Parsley"],
    nutrition: { calories: 420, protein: 8, carbs: 65, fat: 22 },
    options: [],
  },
];

export default function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<Item[]>(mockItems);

  const handleCreate = (data: ItemSubmissionData) => {
    const baseItem = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      categoryId: data.category,
      image: data.image || undefined,
      basePrice: parseFloat(data.price) * 100,
      isAvailable: true,
    };

    let newItem: Item;

    if (data.type === "FOOD") {
      newItem = {
        ...baseItem,
        type: "FOOD",
        ingredients: data.ingredients,
        options: data.options,
        nutrition: {
          calories: parseInt(data.nutrition?.calories || "0"),
          protein: parseInt(data.nutrition?.protein || "0"),
          carbs: parseInt(data.nutrition?.carbs || "0"),
          fat: parseInt(data.nutrition?.fat || "0"),
        },
      };
    } else {
      newItem = {
        ...baseItem,
        type: "PRODUCT",
        stock: parseInt(data.stock) || 0,
        sku: data.sku,
        variants: data.variants,
      };
    }

    setItems([...items, newItem]);
    toast.success("Item created successfully 💜");
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
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-colors shadow-[0_0_15px_-3px_rgba(147,51,234,0.5)] flex items-center gap-2"
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
          Create Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      <CreateItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
