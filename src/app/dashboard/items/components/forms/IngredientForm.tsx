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
      className={`pt-4 border-t ${error ? "border-error/50" : "border-primary-dark/20"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h4
          className={`text-sm font-semibold ${error ? "text-error" : "text-white"}`}
        >
          Ingredients <span className="text-error">*</span>
        </h4>
        {error && (
          <span className="text-[10px] text-error">
            At least one ingredient is required.
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="e.g. Flour, Sugar, Milk"
          className={`flex-1 bg-background border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors ${
            error ? "border-error/50" : "border-primary-dark/20"
          }`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={add}
          className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm border border-primary/30 hover:bg-primary hover:text-white transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {ingredients.map((ing, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-surface-highlight border border-white/10 rounded-lg text-xs text-zinc-300 flex items-center gap-2"
          >
            {ing}
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
    </div>
  );
}
