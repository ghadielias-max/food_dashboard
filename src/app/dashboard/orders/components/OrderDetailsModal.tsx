import { useState } from "react";
import { Order, OrderStatus, PaymentStatus } from "@/app/types/order";
import { useOrderStore } from "@/app/store/useOrderStore";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import PrintableReceipt from "./PrintableReceipt";

interface Props {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const ORDER_STATUSES: OrderStatus[] = [
  "PENDING",
  "PREPARING",
  "READY",
  "COMPLETED",
  "CANCELLED",
];

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "🕒 Pending",
  PREPARING: "👨‍🍳 Preparing",
  READY: "✅ Ready",
  COMPLETED: "🎉 Completed",
  CANCELLED: "❌ Cancelled",
};

export default function OrderDetailsModal({ order, isOpen, onClose }: Props) {
  const { updateOrderStatus, updatePaymentStatus } = useOrderStore();
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);

  if (!isOpen || !order) return null;

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as OrderStatus;
    if (status !== order.status) {
      setPendingStatus(status);
    }
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      updateOrderStatus(order.id, pendingStatus);
      setPendingStatus(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const togglePayment = () => {
    const newStatus: PaymentStatus =
      order.paymentStatus === "PAID" ? "UNPAID" : "PAID";
    updatePaymentStatus(order.id, newStatus);
  };

  return (
    <>
      <PrintableReceipt order={order} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden">
        <div className="w-full max-w-lg bg-surface border border-primary-dark/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <div className="p-6 border-b border-primary-dark/20 bg-surface-highlight flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">Order Details</h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary border border-primary/20 font-mono">
                  #{order.id}
                </span>
              </div>
              <p className="text-sm text-muted mt-1">{order.customerName}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                title="Print Receipt"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                  />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="text-muted hover:text-white transition-colors text-2xl leading-none px-2"
              >
                &times;
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
            <div
              className={`p-3 rounded-xl border flex justify-between items-center ${order.paymentStatus === "PAID" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${order.paymentStatus === "PAID" ? "bg-emerald-500/20 text-emerald-500" : "bg-red-500/20 text-red-500"}`}
                >
                  $
                </div>
                <div>
                  <p
                    className={`text-xs font-bold ${order.paymentStatus === "PAID" ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {order.paymentStatus} via {order.paymentMethod}
                  </p>
                  <p className="text-[10px] text-muted">
                    Click button to toggle status
                  </p>
                </div>
              </div>
              <button
                onClick={togglePayment}
                className="text-xs underline text-muted hover:text-white"
              >
                Mark as {order.paymentStatus === "PAID" ? "Unpaid" : "Paid"}
              </button>
            </div>

            {(order.customerPhone ||
              order.customerAddress ||
              order.tableId) && (
              <div className="bg-background border border-primary-dark/10 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Contact & Destination
                </h4>
                <div className="space-y-4 text-sm">
                  {order.customerPhone && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-highlight flex items-center justify-center text-primary/80">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted">Phone</p>
                        <p className="text-zinc-200">{order.customerPhone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-highlight flex items-center justify-center text-primary/80 flex-shrink-0">
                      {order.tableId ? (
                        <span>🍽️</span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.003.002.001.003.001a.75.75 0 01-.01.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-muted">Destination</p>
                      {order.tableId ? (
                        <p className="text-zinc-200 font-medium">
                          Table {order.tableId} (Dine-in)
                        </p>
                      ) : (
                        <p className="text-zinc-200 leading-snug">
                          {order.customerAddress ||
                            "Pickup / No Address Provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Items</h4>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start text-sm pb-3 border-b border-white/5 last:border-0"
                  >
                    <div className="flex gap-3">
                      <span className="font-bold text-primary min-w-[20px]">
                        {item.quantity}x
                      </span>
                      <div>
                        <p className="text-zinc-200">{item.name}</p>
                        {item.itemDetails?.ingredients && (
                          <p className="text-xs text-muted mt-1">
                            {item.itemDetails.ingredients.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-zinc-300">
                      ${((item.priceAtOrder * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-primary-dark/20 space-y-2">
              <div className="flex justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span>${(order.totalPrice / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2">
                <span>Total</span>
                <span>${(order.totalPrice / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-muted pt-4">
              <div>
                <p className="font-medium text-zinc-500">Created At</p>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-zinc-500">Last Update</p>
                <p>{new Date(order.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-primary-dark/20 bg-surface-highlight flex items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-muted mb-1.5">
                Update Status
              </label>
              <div className="relative">
                <select
                  value={order.status}
                  onChange={handleStatusSelect}
                  className="w-full appearance-none bg-surface border border-primary-dark/30 hover:border-primary/50 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
                >
                  {ORDER_STATUSES.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-surface text-white"
                    >
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-end h-full">
              <button
                onClick={onClose}
                className="h-[42px] px-6 rounded-xl text-sm font-medium text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={!!pendingStatus}
        title="Change Order Status"
        message={`Are you sure you want to change the status from ${order.status} to ${pendingStatus}?`}
        onConfirm={confirmStatusChange}
        onClose={() => setPendingStatus(null)}
        isDanger={pendingStatus === "CANCELLED"}
        confirmText={
          pendingStatus === "CANCELLED" ? "Yes, Cancel Order" : "Confirm Update"
        }
      />
    </>
  );
}
