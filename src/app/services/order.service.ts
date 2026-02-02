import { Order, OrderStatus } from "@/app/types/order";
import { Item } from "../types/items";

const MOCK_ORDERS: Order[] = [
  {
    id: "ord_1",
    businessId: "biz_1",
    customerName: "Table 4",
    tableId: "4",
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
    customerName: "John Doe",
    customerPhone: "+1 (555) 019-2834",
    customerAddress: " abou 3azra, Beirut, Lebanon",
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
    tableId: "2",
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
    tableId: "7",
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
  {
    id: "ord_99",
    businessId: "biz_1",
    customerName: "Sarah Smith",
    customerPhone: "+1 (555) 999-8888",
    customerAddress: "123 Maple Street, Apt 4B, New York, NY",
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
];

export const OrderService = {
  getAll: async (): Promise<Order[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...MOCK_ORDERS];
  },
  updateStatus: async (orderId: string, status: OrderStatus): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const index = MOCK_ORDERS.findIndex((o) => o.id === orderId);
    if (index !== -1) {
      MOCK_ORDERS[index].status = status;
      MOCK_ORDERS[index].updatedAt = new Date().toISOString();
    }
  },
};
