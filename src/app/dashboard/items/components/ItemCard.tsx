import { FoodItem, Item, ProductItem } from "@/app/types/items";
import { PREDEFINED_CATEGORIES } from "./forms/CategorySelector";
import { useState } from "react";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryLabel =
    PREDEFINED_CATEGORIES.find((c) => c.id === item.categoryId)?.label ||
    (item.categoryId
      ? item.categoryId.charAt(0).toUpperCase() + item.categoryId.slice(1)
      : "Uncategorized");

  const isFood = item.type === "FOOD";
  const isProduct = item.type === "PRODUCT";

  // Cast types safely
  const foodItem = isFood ? (item as FoodItem) : null;
  const productItem = isProduct ? (item as ProductItem) : null;

  const hasVariants = productItem?.variants && productItem.variants.length > 0;
  const hasOptions = foodItem?.options && foodItem.options.length > 0;

  // Calculate Price Range (Only Products have variable base prices via variants here)
  let minPrice = item.basePrice;
  let maxPrice = item.basePrice;

  if (isProduct && hasVariants) {
    const prices = productItem!.variants!.map((v) => item.basePrice + v.price);
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
  }

  const formatPrice = (p: number) => `$${(p / 100).toFixed(2)}`;

  return (
    <div className="group bg-[#0A0A12] border border-purple-900/20 rounded-2xl flex flex-col h-full hover:border-purple-500/40 transition-all shadow-lg overflow-hidden">
      <div className="p-4 flex gap-4">
        <div className="h-20 w-20 rounded-xl bg-[#05050A] border border-purple-900/10 flex items-center justify-center text-3xl flex-shrink-0 relative overflow-hidden group-hover:border-purple-500/30 transition-colors">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <span className="opacity-50 grayscale group-hover:grayscale-0 transition-all">
              {isFood ? "🍔" : "📦"}
            </span>
          )}
          <div className="absolute top-0 right-0 p-1 bg-black/60 backdrop-blur-sm rounded-bl-lg border-l border-b border-white/10">
            <div
              className={`w-2 h-2 rounded-full ${isFood ? "bg-orange-500" : "bg-purple-500"}`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                {categoryLabel}
              </span>
              <span className="text-sm font-bold text-white">
                {minPrice !== maxPrice
                  ? `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
                  : formatPrice(minPrice)}
              </span>
            </div>
            <h3 className="font-semibold text-white truncate text-lg mt-1">
              {item.name}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 pb-4 gap-4">
        {isFood && foodItem && (
          <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {foodItem.ingredients && foodItem.ingredients.length > 0 ? (
                foodItem.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-zinc-800/40 border border-zinc-700/50 rounded text-[10px] text-zinc-400"
                  >
                    {ing}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-red-400 italic">
                  No ingredients listed
                </span>
              )}
            </div>

            {hasOptions && (
              <div className="flex flex-wrap gap-2">
                {foodItem.options?.map((opt, i) => (
                  <div
                    key={i}
                    className="text-[10px] text-indigo-300 bg-indigo-900/10 border border-indigo-500/20 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <span>{opt.name}</span>
                    {opt.price > 0 && (
                      <span className="text-indigo-400 opacity-70 border-l border-indigo-500/30 pl-1 ml-1">
                        +${(opt.price / 100).toFixed(2)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {foodItem.nutrition && (
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Kcal", val: foodItem.nutrition.calories },
                  { label: "Prot", val: foodItem.nutrition.protein, unit: "g" },
                  { label: "Carb", val: foodItem.nutrition.carbs, unit: "g" },
                  { label: "Fat", val: foodItem.nutrition.fat, unit: "g" },
                ].map((n, i) => (
                  <div
                    key={i}
                    className="bg-[#05050A] border border-purple-900/10 rounded-lg p-1.5 text-center"
                  >
                    <div className="text-[9px] text-zinc-500 uppercase">
                      {n.label}
                    </div>
                    <div className="text-xs font-medium text-zinc-200">
                      {n.val || "-"}
                      {n.val ? (
                        <span className="text-[9px] text-zinc-600 ml-0.5">
                          {n.unit}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isProduct && productItem && (
          <>
            {!hasVariants && (
              <div className="flex items-center gap-4 pt-2 border-t border-white/5 text-xs">
                <div className="flex-1 bg-zinc-900/50 rounded p-2 flex justify-between items-center border border-zinc-800">
                  <span className="text-zinc-500">Stock</span>
                  <span
                    className={`${productItem.stock > 0 ? "text-emerald-400" : "text-red-400"} font-medium`}
                  >
                    {productItem.stock}
                  </span>
                </div>
              </div>
            )}

            {hasVariants && (
              <div className="mt-auto bg-[#05050A] rounded-xl border border-purple-900/10 overflow-hidden">
                <div
                  className="flex justify-between items-center p-2 cursor-pointer hover:bg-white/5"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                    Variants ({productItem.variants!.length})
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-3 h-3 text-zinc-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>

                <div
                  className={`transition-all duration-300 ${isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="border-t border-purple-900/10 max-h-48 overflow-y-auto custom-scrollbar">
                    {productItem.variants!.map((v, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-xs p-2 border-b border-white/5 last:border-0 hover:bg-white/5"
                      >
                        <span className="text-zinc-200">{v.name}</span>
                        <div className="flex flex-col items-end">
                          <span className="text-zinc-400">
                            {v.price > 0
                              ? `+$${(v.price / 100).toFixed(2)}`
                              : "-"}
                          </span>
                          <span
                            className={`text-[9px] ${v.stock && v.stock < 5 ? "text-red-400" : "text-emerald-400"}`}
                          >
                            {v.stock} left
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
