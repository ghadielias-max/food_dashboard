import { Order, OrderStatus } from "@/app/types/order";

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-warning/10 text-warning border-warning/20",
  PREPARING: "bg-info/10 text-info border-info/20",
  READY: "bg-success/10 text-success border-success/20",
  COMPLETED: "bg-primary/10 text-primary border-primary/20",
  CANCELLED: "bg-error/10 text-error border-error/20",
};

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-primary-dark/20 bg-surface shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-primary-dark/10 border-b border-primary-dark/20">
              <th className="px-6 py-4 font-semibold text-zinc-300">
                Order ID
              </th>
              <th className="px-6 py-4 font-semibold text-zinc-300">
                Customer & Type
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
          <tbody className="divide-y divide-primary-dark/10">
            {orders.map((order) => {
              const isDineIn = !!order.tableId;
              return (
                <tr
                  key={order.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-zinc-300">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {order.customerName}
                      </span>
                      {isDineIn ? (
                        <span className="text-xs text-purple-400">
                          🍽️ Table {order.tableId}
                        </span>
                      ) : (
                        <span
                          className="text-xs text-blue-400 truncate max-w-[200px]"
                          title={order.customerAddress}
                        >
                          📍 {order.customerAddress || "Takeout"}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                    <span className="text-zinc-600 ml-2">
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    <div className="flex flex-col">
                      {order.items.slice(0, 2).map((item, i) => (
                        <span key={i} className="text-xs">
                          {item.quantity}x {item.name}
                        </span>
                      ))}
                      {order.items.length > 2 && (
                        <span className="text-[10px] italic">
                          +{order.items.length - 2} more
                        </span>
                      )}
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
                    <button className="text-muted hover:text-purple-400 transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-primary-dark/20 bg-surface flex justify-between items-center text-xs text-muted">
        <span>Showing {orders.length} orders</span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border border-primary-dark/20 hover:bg-white/5 disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1 rounded border border-primary-dark/20 hover:bg-white/5">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
