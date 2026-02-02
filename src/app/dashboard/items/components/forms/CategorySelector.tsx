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
          className={`text-xs font-medium ${error ? "text-error" : "text-muted"}`}
        >
          Category {error && "*"}
        </label>
        <button
          type="button"
          onClick={() => {
            setIsCustom(!isCustom);
            onChange("");
          }}
          className="text-[10px] text-primary hover:text-primary/80 underline transition-colors"
        >
          {isCustom ? "Select existing category" : "+ Add custom category"}
        </button>
      </div>

      {isCustom ? (
        <input
          type="text"
          className={`w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
            error
              ? "border-error/50 focus:border-error placeholder:text-error/30"
              : "border-primary-dark/20 focus:border-primary"
          }`}
          placeholder="Type new category name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <select
          className={`w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none ${
            error
              ? "border-error/50 focus:border-error text-error"
              : "border-primary-dark/20 focus:border-primary"
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
