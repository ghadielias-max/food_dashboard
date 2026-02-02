import { useState } from "react";
import { Order, OrderStatus } from "@/app/types/order";
import { useOrderStore } from "@/app/store/useOrderStore";
import ConfirmationModal from "@/app/components/ConfirmationModal";

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-warning/10 text-warning border-warning/20",
  PREPARING: "bg-info/10 text-info border-info/20",
  READY: "bg-success/10 text-success border-success/20",
  COMPLETED: "bg-primary/10 text-primary border-primary/20",
  CANCELLED: "bg-error/10 text-error border-error/20",
};

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

export default function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const { updateOrderStatus } = useOrderStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [nextStatus, setNextStatus] = useState<OrderStatus | null>(null);

  const isDineIn = !!order.tableId;

  const handleNextStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    let next: OrderStatus | null = null;
    if (order.status === "PENDING") next = "PREPARING";
    else if (order.status === "PREPARING") next = "READY";
    else if (order.status === "READY") next = "COMPLETED";

    if (next) {
      setNextStatus(next);
      setShowConfirm(true);
    }
  };

  const confirmStatusChange = () => {
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
    }
    setShowConfirm(false);
  };

  return (
    <>
      <div
        onClick={() => onViewDetails(order)}
        className="group relative bg-surface border border-primary-dark/20 rounded-2xl flex flex-col hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_-10px_var(--color-primary)] overflow-hidden h-full cursor-pointer"
      >
        <div className="p-6 flex-1 relative">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

          <div className="relative z-10">
            {/* Header: Customer & Type Badge */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-2 items-center">
                {isDineIn ? (
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-[10px] font-bold border border-purple-500/30 flex items-center gap-1">
                    🍽️ Table {order.tableId}
                  </span>
                ) : (
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-[10px] font-bold border border-blue-500/30 flex items-center gap-1">
                    🛵 Delivery
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-medium border ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-white text-lg leading-tight">
                {order.customerName}
              </h3>
              <div className="text-xs text-muted mt-1 flex flex-col">
                <span>#{order.id}</span>
                {!isDineIn && order.customerAddress && (
                  <span
                    className="truncate max-w-[200px] text-zinc-400 mt-0.5"
                    title={order.customerAddress}
                  >
                    📍 {order.customerAddress}
                  </span>
                )}
              </div>
            </div>

            {/* Items Summary */}
            <div className="space-y-3 mb-6">
              {order.items.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <div className="flex gap-2">
                    <span className="text-primary font-bold">
                      {item.quantity}x
                    </span>
                    <span className="text-zinc-300 truncate max-w-[140px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-muted">
                    ${(item.priceAtOrder / 100).toFixed(2)}
                  </span>
                </div>
              ))}
              {order.items.length > 3 && (
                <p className="text-xs text-muted italic pt-1">
                  + {order.items.length - 3} more items...
                </p>
              )}
            </div>

            <div className="w-full h-px bg-primary-dark/20 my-4" />

            {/* Footer Stats */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted">Total</p>
                <p className="text-xl font-bold text-white">
                  ${(order.totalPrice / 100).toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted">Time</p>
                <p className="text-sm text-zinc-300">
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-primary-dark/20 bg-surface-highlight/50 grid grid-cols-2 gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(order);
            }}
            className="py-2.5 text-xs font-semibold bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors border border-transparent hover:border-white/10"
          >
            Details
          </button>

          {order.status !== "COMPLETED" && order.status !== "CANCELLED" ? (
            <button
              onClick={handleNextStatusClick}
              className="py-2.5 text-xs font-semibold bg-primary text-white hover:bg-primary/90 rounded-xl transition-colors shadow-lg shadow-primary/20"
            >
              Next Status
            </button>
          ) : (
            <div className="py-2.5 flex items-center justify-center text-xs text-muted italic">
              {order.status === "COMPLETED" ? "Archived" : "Cancelled"}
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirm}
        title="Update Status"
        message={`Are you sure you want to move this order to ${nextStatus}?`}
        onConfirm={confirmStatusChange}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
}
