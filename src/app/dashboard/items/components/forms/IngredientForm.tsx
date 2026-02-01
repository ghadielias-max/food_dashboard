import { useState } from "react";

interface Props {
  ingredients: string[];
  setIngredients: (vals: string[]) => void;
  error?: boolean;
}

export default function IngredientsForm({
  ingredients,
  setIngredients,
  error,
}: Props) {
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    setIngredients([...ingredients, input.trim()]);
    setInput("");
  };

  const remove = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };

  return (
    <div
      className={`pt-4 border-t ${error ? "border-red-500/50" : "border-purple-900/20"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h4
          className={`text-sm font-semibold ${error ? "text-red-400" : "text-white"}`}
        >
          Ingredients <span className="text-red-500">*</span>
        </h4>
        {error && (
          <span className="text-[10px] text-red-400">
            At least one ingredient is required.
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="e.g. Flour, Sugar, Milk"
          className={`flex-1 bg-[#05050A] border rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 ${error ? "border-red-500/50" : "border-purple-900/20"}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={add}
          className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg text-sm border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ingredients.map((ing, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-xs text-zinc-300 flex items-center gap-2"
          >
            {ing}
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
    </div>
  );
}
