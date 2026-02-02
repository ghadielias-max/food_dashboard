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
    <div className="pt-4 border-t border-primary-dark/20">
      <h4 className="text-sm font-semibold text-white mb-2">
        Add-ons (Optional)
      </h4>
      <p className="text-[10px] text-muted mb-3">
        e.g. Extra Cheese, Spicy Sauce, No Onions
      </p>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Add-on Name"
          className="flex-1 bg-background border border-primary-dark/20 rounded-lg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none transition-colors"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="+ Price"
          className="w-24 bg-background border border-primary-dark/20 rounded-lg px-3 py-2 text-sm text-white focus:border-primary focus:outline-none transition-colors"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button
          type="button"
          onClick={add}
          className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm border border-primary/30 hover:bg-primary hover:text-white transition-colors"
        >
          Add
        </button>
      </div>

      {options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((opt, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-xs text-zinc-200 flex items-center gap-2"
            >
              {opt.name}
              {opt.price > 0 && (
                <span className="opacity-70 border-l border-primary/30 pl-2">
                  +${(opt.price / 100).toFixed(2)}
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="hover:text-error ml-1 text-muted transition-colors"
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
