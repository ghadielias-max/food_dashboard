"use client";

import { useState } from "react";
import { Order, OrderItem, PaymentMethod } from "@/app/types/order";
import { useOrderStore } from "@/app/store/useOrderStore";
import { Item } from "@/app/types/items";
import toast from "react-hot-toast";

const MENU_ITEMS: Item[] = [
  {
    id: "m1",
    name: "Spicy Ramen",
    basePrice: 1500,
    type: "FOOD",
    categoryId: "mains",
    isAvailable: true,
    description: "",
    ingredients: [],
  },
  {
    id: "m2",
    name: "Gyoza",
    basePrice: 600,
    type: "FOOD",
    categoryId: "sides",
    isAvailable: true,
    description: "",
    ingredients: [],
  },
  {
    id: "m3",
    name: "Coke Zero",
    basePrice: 300,
    type: "FOOD",
    categoryId: "drinks",
    isAvailable: true,
    description: "",
    ingredients: [],
  },
  {
    id: "m4",
    name: "Sushi Platter",
    basePrice: 2500,
    type: "FOOD",
    categoryId: "mains",
    isAvailable: true,
    description: "",
    ingredients: [],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateOrderModal({ isOpen, onClose }: Props) {
  const { addOrder } = useOrderStore();

  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState<"DINE_IN" | "DELIVERY">("DINE_IN");
  const [tableId, setTableId] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");

  const [cart, setCart] = useState<OrderItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState(MENU_ITEMS[0].id);

  if (!isOpen) return null;

  const handleAddItem = () => {
    const item = MENU_ITEMS.find((i) => i.id === selectedItemId);
    if (!item) return;

    const existing = cart.find((i) => i.itemId === item.id);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          itemId: item.id,
          name: item.name,
          quantity: 1,
          priceAtOrder: item.basePrice,
          itemDetails: item,
        },
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.priceAtOrder * item.quantity,
    0,
  );

  const handleSubmit = async () => {
    if (!customerName || cart.length === 0) {
      toast.error("Please fill in customer name and add items.");
      return;
    }

    const newOrder: Order = {
      id: `ord_${Math.floor(Math.random() * 10000)}`,
      businessId: "biz_1",
      businessName: "Urban Bites Kitchen",
      businessAddress: "123 Bliss Street, Hamra, Beirut",
      businessPhone: "+961 01 555 999",
      customerName,
      tableId: orderType === "DINE_IN" ? tableId : undefined,
      customerAddress: orderType === "DELIVERY" ? address : undefined,
      status: "PENDING",
      paymentStatus: "UNPAID",
      paymentMethod,
      items: cart,
      totalPrice: total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addOrder(newOrder);
    toast.success("Order created successfully!");

    setCustomerName("");
    setCart([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-surface border border-primary-dark/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-primary-dark/20 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Create Manual Order</h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
              Customer Details
            </h4>

            <input
              type="text"
              placeholder="Customer Name"
              className="w-full bg-background border border-primary-dark/20 rounded-xl px-4 py-2 text-white focus:border-primary focus:outline-none"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={() => setOrderType("DINE_IN")}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border ${orderType === "DINE_IN" ? "bg-primary/20 border-primary text-white" : "bg-background border-primary-dark/20 text-muted"}`}
              >
                Dine-in
              </button>
              <button
                onClick={() => setOrderType("DELIVERY")}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border ${orderType === "DELIVERY" ? "bg-primary/20 border-primary text-white" : "bg-background border-primary-dark/20 text-muted"}`}
              >
                Delivery/Pickup
              </button>
            </div>

            {orderType === "DINE_IN" ? (
              <input
                type="text"
                placeholder="Table Number"
                className="w-full bg-background border border-primary-dark/20 rounded-xl px-4 py-2 text-white focus:border-primary focus:outline-none"
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
              />
            ) : (
              <textarea
                placeholder="Delivery Address"
                rows={2}
                className="w-full bg-background border border-primary-dark/20 rounded-xl px-4 py-2 text-white focus:border-primary focus:outline-none resize-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            )}

            <div>
              <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 mt-4">
                Payment
              </h4>
              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as PaymentMethod)
                }
                className="w-full bg-background border border-primary-dark/20 rounded-xl px-4 py-2 text-white focus:border-primary focus:outline-none"
              >
                <option value="CASH">Cash</option>
                <option value="CARD">Card Terminal</option>
                <option value="ONLINE">Online/Transfer</option>
              </select>
            </div>
          </div>

          <div className="bg-background rounded-xl p-4 border border-primary-dark/10 flex flex-col h-full">
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Order Items
            </h4>

            <div className="flex gap-2 mb-4">
              <select
                className="flex-1 bg-surface border border-primary-dark/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
              >
                {MENU_ITEMS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - ${(item.basePrice / 100).toFixed(2)}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddItem}
                className="px-3 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {cart.length === 0 ? (
                <div className="text-center text-muted text-xs py-8 italic">
                  No items added
                </div>
              ) : (
                cart.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-surface p-2 rounded-lg border border-white/5"
                  >
                    <div className="text-sm">
                      <span className="text-primary font-bold mr-2">
                        {item.quantity}x
                      </span>
                      <span className="text-zinc-200">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400">
                        $
                        {((item.priceAtOrder * item.quantity) / 100).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(i)}
                        className="text-muted hover:text-error transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-white/10 pt-3 flex justify-between items-center">
              <span className="text-sm text-muted">Total Amount</span>
              <span className="text-xl font-bold text-white">
                ${(total / 100).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-primary-dark/20 bg-surface-highlight flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-muted hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 transition-all"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}
