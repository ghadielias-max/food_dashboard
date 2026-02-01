// app/dashboard/orders/components/OrdersTable.tsx
import { Order, OrderStatus } from "@/app/types/order";

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  PREPARING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  READY: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  COMPLETED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-purple-900/20 bg-[#0A0A12] shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-purple-900/10 border-b border-purple-900/20">
              <th className="px-6 py-4 font-semibold text-zinc-300">
                Order ID
              </th>
              <th className="px-6 py-4 font-semibold text-zinc-300">
                Customer
              </th>
              <th className="px-6 py-4 font-semibold text-zinc-300">
                Date & Time
              </th>
              <th className="px-6 py-4 font-semibold text-zinc-300">Items</th>
              <th className="px-6 py-4 font-semibold text-zinc-300">Total</th>
              <th className="px-6 py-4 font-semibold text-zinc-300">Status</th>
              <th className="px-6 py-4 font-semibold text-zinc-300 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/10">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-6 py-4 font-medium text-zinc-300">
                  #{order.id}
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                  <span className="text-zinc-600 ml-2">
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  <div className="flex flex-col">
                    {order.items.map((item, i) => (
                      <span key={i} className="text-xs">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-white">
                  ${(order.totalPrice / 100).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-zinc-500 hover:text-purple-400 transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-purple-900/20 bg-[#0A0A12] flex justify-between items-center text-xs text-zinc-500">
        <span>Showing {orders.length} orders</span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border border-purple-900/20 hover:bg-white/5 disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1 rounded border border-purple-900/20 hover:bg-white/5">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
