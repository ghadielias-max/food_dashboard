import { useState } from "react";

export const PREDEFINED_CATEGORIES = [
  { id: "burgers", label: "Burgers" },
  { id: "drinks", label: "Drinks" },
  { id: "sides", label: "Sides" },
  { id: "merch", label: "Merchandise" },
];

interface Props {
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
}

export default function CategorySelector({ value, onChange, error }: Props) {
  const [isCustom, setIsCustom] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label
          className={`text-xs font-medium ${error ? "text-red-400" : "text-zinc-400"}`}
        >
          Category {error && "*"}
        </label>
        <button
          type="button"
          onClick={() => {
            setIsCustom(!isCustom);
            onChange("");
          }}
          className="text-[10px] text-purple-400 hover:text-purple-300 underline"
        >
          {isCustom ? "Select existing category" : "+ Add custom category"}
        </button>
      </div>

      {isCustom ? (
        <input
          type="text"
          className={`w-full bg-[#05050A] border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
            error
              ? "border-red-500/50 focus:border-red-500"
              : "border-purple-900/20 focus:border-purple-500"
          }`}
          placeholder="Type new category name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <select
          className={`w-full bg-[#05050A] border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none ${
            error
              ? "border-red-500/50 focus:border-red-500 text-red-400"
              : "border-purple-900/20 focus:border-purple-500"
          }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select Category</option>
          {PREDEFINED_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
