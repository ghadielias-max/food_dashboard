// app/dashboard/items/components/forms/VariantsForm.tsx
import { ItemVariant } from "@/app/types/items";
import { useState } from "react";

interface Props {
  variants: ItemVariant[];
  setVariants: (v: ItemVariant[]) => void;
}

export default function VariantsForm({ variants, setVariants }: Props) {
  const [temp, setTemp] = useState({ name: "", price: "", stock: "", sku: "" });

  const add = () => {
    if (!temp.name) return;
    setVariants([
      ...variants,
      {
        name: temp.name,
        price: temp.price ? parseFloat(temp.price) * 100 : 0,
        stock: temp.stock ? parseInt(temp.stock) : 0,
        sku: temp.sku || undefined,
      },
    ]);
    setTemp({ name: "", price: "", stock: "", sku: "" });
  };

  const remove = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="pt-4 border-t border-purple-900/20">
      <h4 className="text-sm font-semibold text-white mb-2">
        Variants (Optional)
      </h4>

      {/* Input Row */}
      <div className="grid grid-cols-12 gap-2 mb-3">
        <div className="col-span-4">
          <input
            type="text"
            placeholder="Name (e.g. XL)"
            className="w-full bg-[#05050A] border border-purple-900/20 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500"
            value={temp.name}
            onChange={(e) => setTemp({ ...temp, name: e.target.value })}
          />
        </div>
        <div className="col-span-2">
          <input
            type="number"
            placeholder="+$"
            className="w-full bg-[#05050A] border border-purple-900/20 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500"
            value={temp.price}
            onChange={(e) => setTemp({ ...temp, price: e.target.value })}
          />
        </div>
        <div className="col-span-2">
          <input
            type="number"
            placeholder="Stock"
            className="w-full bg-[#05050A] border border-purple-900/20 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500"
            value={temp.stock}
            onChange={(e) => setTemp({ ...temp, stock: e.target.value })}
          />
        </div>
        <div className="col-span-3">
          <input
            type="text"
            placeholder="SKU"
            className="w-full bg-[#05050A] border border-purple-900/20 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500"
            value={temp.sku}
            onChange={(e) => setTemp({ ...temp, sku: e.target.value })}
          />
        </div>
        <div className="col-span-1">
          <button
            type="button"
            onClick={add}
            className="w-full h-full bg-purple-600/20 text-purple-400 rounded-lg text-sm border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* List */}
      {variants.length > 0 && (
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 bg-purple-900/10 border border-purple-500/20 rounded-lg text-sm"
            >
              <div className="flex gap-3 items-center">
                <span className="font-medium text-white">{v.name}</span>
                <span className="text-zinc-400 text-xs">
                  {v.price > 0
                    ? `+$${(v.price / 100).toFixed(2)}`
                    : "No extra cost"}
                </span>
                {v.stock !== undefined && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${v.stock > 0 ? "text-emerald-400 bg-emerald-900/20" : "text-red-400 bg-red-900/20"}`}
                  >
                    {v.stock} left
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-zinc-500 hover:text-red-400 px-2"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
