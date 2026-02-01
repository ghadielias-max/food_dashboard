// app/dashboard/orders/components/OrderCard.tsx
import { Order, OrderStatus } from "@/app/types/order";

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  PREPARING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  READY: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  COMPLETED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="group relative bg-[#0A0A12] border border-purple-900/20 rounded-2xl flex flex-col hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_-10px_rgba(147,51,234,0.3)] overflow-hidden h-full">
      <div className="p-6 flex-1 relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-white text-lg">
                {order.customerName}
              </h3>
              <span className="text-xs text-zinc-500">#{order.id}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}
            >
              {order.status}
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <div className="flex gap-2">
                  <span className="text-purple-400 font-bold">
                    {item.quantity}x
                  </span>
                  <span className="text-zinc-300">{item.name}</span>
                </div>
                <span className="text-zinc-500">
                  ${(item.priceAtOrder / 100).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-purple-900/20 my-4" />

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-zinc-500">Total</p>
              <p className="text-xl font-bold text-white">
                ${(order.totalPrice / 100).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500">Time</p>
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

      <div className="p-4 border-t border-purple-900/20 bg-[#0F0F1A]/50 grid grid-cols-2 gap-3">
        <button className="py-2.5 text-xs font-semibold bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white rounded-xl transition-colors border border-transparent hover:border-white/10">
          Details
        </button>
        <button className="py-2.5 text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 rounded-xl transition-colors shadow-lg shadow-purple-900/20">
          Next Status
        </button>
      </div>
    </div>
  );
}
