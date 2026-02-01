import { ItemOption } from "@/app/types/items";
import { useState } from "react";

interface Props {
  options: ItemOption[];
  setOptions: (vals: ItemOption[]) => void;
}

export default function OptionsForm({ options, setOptions }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const add = () => {
    if (!name) return;
    setOptions([
      ...options,
      {
        name,
        price: price ? parseFloat(price) * 100 : 0,
      },
    ]);
    setName("");
    setPrice("");
  };

  const remove = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  return (
    <div className="pt-4 border-t border-purple-900/20">
      <h4 className="text-sm font-semibold text-white mb-2">
        Add-ons (Optional)
      </h4>
      <p className="text-[10px] text-zinc-500 mb-3">
        e.g. Extra Cheese, Spicy Sauce, No Onions
      </p>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Add-on Name"
          className="flex-1 bg-[#05050A] border border-purple-900/20 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="+ Price"
          className="w-24 bg-[#05050A] border border-purple-900/20 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          type="button"
          onClick={add}
          className="px-4 py-2 bg-indigo-600/20 text-indigo-400 rounded-lg text-sm border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-colors"
        >
          Add
        </button>
      </div>

      {options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((opt, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-indigo-900/20 border border-indigo-500/20 rounded-lg text-xs text-indigo-200 flex items-center gap-2"
            >
              {opt.name}
              {opt.price > 0 && (
                <span className="opacity-70 border-l border-indigo-500/30 pl-2">
                  +${(opt.price / 100).toFixed(2)}
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="hover:text-red-400 ml-1 text-zinc-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
