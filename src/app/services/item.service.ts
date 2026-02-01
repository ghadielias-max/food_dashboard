import { ItemSubmissionData } from "@/app/dashboard/items/components/CreateItemModal";
import { FoodItem, Item, ProductItem } from "../types/items";

// Initial Mock Data
const MOCK_DB: Item[] = [
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
];

export const ItemService = {
  // Simulate GET /api/items
  getAll: async (): Promise<Item[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Fake network delay
    return [...MOCK_DB];
  },

  // Simulate POST /api/items
  create: async (data: ItemSubmissionData): Promise<Item> => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Fake network delay

    const baseItem = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      categoryId: data.category,
      image: data.image || undefined,
      basePrice: parseFloat(data.price) * 100, // Convert to cents
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
      } as FoodItem;
    } else {
      newItem = {
        ...baseItem,
        type: "PRODUCT",
        stock: parseInt(data.stock) || 0,
        sku: data.sku,
        variants: data.variants,
      } as ProductItem;
    }

    // Update local mock DB
    MOCK_DB.push(newItem);
    return newItem;
  },
};
