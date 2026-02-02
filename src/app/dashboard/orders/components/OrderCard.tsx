import { Order, OrderStatus } from "@/app/types/order";

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-warning/10 text-warning border-warning/20",
  PREPARING: "bg-info/10 text-info border-info/20",
  READY: "bg-success/10 text-success border-success/20",
  COMPLETED: "bg-primary/10 text-primary border-primary/20",
  CANCELLED: "bg-error/10 text-error border-error/20",
};

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="group relative bg-surface border border-primary-dark/20 rounded-2xl flex flex-col hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_-10px_rgba(147,51,234,0.3)] overflow-hidden h-full">
      <div className="p-6 flex-1 relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-white text-lg">
                {order.customerName}
              </h3>
              <span className="text-xs text-muted">#{order.id}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                statusColors[order.status]
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <div className="flex gap-2">
                  <span className="text-primary font-bold">
                    {item.quantity}x
                  </span>
                  <span className="text-zinc-300">{item.name}</span>
                </div>
                <span className="text-muted">
                  ${(item.priceAtOrder / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-primary-dark/20 my-4" />

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

      <div className="p-4 border-t border-primary-dark/20 bg-surface-highlight/50 grid grid-cols-2 gap-3">
        <button className="py-2.5 text-xs font-semibold bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors border border-transparent hover:border-white/10">
          Details
        </button>
        <button className="py-2.5 text-xs font-semibold bg-primary text-white hover:bg-primary/90 rounded-xl transition-colors shadow-lg shadow-primary/20">
          Next Status
        </button>
      </div>
    </div>
  );
}
