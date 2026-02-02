import { Order } from "@/app/types/order";

export default function PrintableReceipt({ order }: { order: Order | null }) {
  if (!order) return null;

  return (
    <div id="printable-receipt" className="hidden print:block">
      <div className="w-[80mm] p-4 bg-white text-black font-mono text-xs leading-tight mx-auto">
        <div className="text-center mb-6">
          <h1 className="font-bold text-xl mb-2 uppercase">
            {order.businessName}
          </h1>
          <p className="whitespace-pre-wrap">{order.businessAddress}</p>
          <p className="mt-1">Tel: {order.businessPhone}</p>
        </div>

        <div className="border-b-2 border-black border-dashed pb-3 mb-3">
          <div className="flex justify-between">
            <span>Order #:</span>
            <span className="font-bold">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>
              {new Date(order.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="border-b-2 border-black border-dashed pb-3 mb-3">
          <p className="font-bold mb-1">Customer:</p>
          <p>{order.customerName}</p>
          {order.customerPhone && <p>{order.customerPhone}</p>}

          <div className="mt-2 font-bold uppercase">
            {order.tableId
              ? `Dine-in (Table ${order.tableId})`
              : "Delivery / Pickup"}
          </div>
          {!order.tableId && order.customerAddress && (
            <p className="mt-1">{order.customerAddress}</p>
          )}
        </div>

        {/* ... Rest of your items and totals logic remains the same ... */}

        <div className="flex justify-between font-bold border-b border-black mb-2 pb-1">
          <span className="w-8">Qty</span>
          <span className="flex-1">Item</span>
          <span className="w-12 text-right">Amt</span>
        </div>

        <div className="mb-4 space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-start">
              <span className="w-8 font-bold">{item.quantity}</span>
              <div className="flex-1">
                <p>{item.name}</p>
              </div>
              <span className="w-12 text-right">
                {((item.quantity * item.priceAtOrder) / 100).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-black border-dashed pt-3 mb-6">
          <div className="flex justify-between mb-1">
            <span>Subtotal:</span>
            <span>${(order.totalPrice / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Tax (0%):</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>TOTAL:</span>
            <span>${(order.totalPrice / 100).toFixed(2)}</span>
          </div>
        </div>

        <div className="border border-black p-2 text-center font-bold mb-6 uppercase">
          {order.paymentStatus} - {order.paymentMethod}
        </div>

        <div className="text-center text-[10px] space-y-1">
          <p>*** THANK YOU ***</p>
          <p>Please keep this receipt for your records.</p>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          - - - - - - - - - - - -
        </div>
      </div>
    </div>
  );
}
