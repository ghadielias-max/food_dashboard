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

  const foodItem = isFood ? (item as FoodItem) : null;
  const productItem = isProduct ? (item as ProductItem) : null;

  const hasVariants = productItem?.variants && productItem.variants.length > 0;
  const hasOptions = foodItem?.options && foodItem.options.length > 0;

  let minPrice = item.basePrice;
  let maxPrice = item.basePrice;

  if (isProduct && hasVariants) {
    const prices = productItem!.variants!.map((v) => item.basePrice + v.price);
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
  }

  const formatPrice = (p: number) => `$${(p / 100).toFixed(2)}`;

  return (
    <div className="group bg-surface border border-primary-dark/20 rounded-2xl flex flex-col h-full hover:border-primary/40 transition-all shadow-lg overflow-hidden">
      <div className="p-4 flex gap-4">
        <div className="h-20 w-20 rounded-xl bg-background border border-primary-dark/10 flex items-center justify-center text-3xl flex-shrink-0 relative overflow-hidden group-hover:border-primary/30 transition-colors">
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
              className={`w-2 h-2 rounded-full ${isFood ? "bg-warning" : "bg-primary"}`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted bg-surface-highlight px-1.5 py-0.5 rounded border border-primary-dark/20">
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
          <p className="text-xs text-muted line-clamp-2 leading-relaxed">
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
                    className="px-2 py-0.5 bg-surface-highlight border border-primary-dark/20 rounded text-[10px] text-muted"
                  >
                    {ing}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-error italic">
                  No ingredients listed
                </span>
              )}
            </div>

            {hasOptions && (
              <div className="flex flex-wrap gap-2">
                {foodItem.options?.map((opt, i) => (
                  <div
                    key={i}
                    className="text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <span>{opt.name}</span>
                    {opt.price > 0 && (
                      <span className="text-primary/70 border-l border-primary/30 pl-1 ml-1">
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
                    className="bg-background border border-primary-dark/10 rounded-lg p-1.5 text-center"
                  >
                    <div className="text-[9px] text-muted uppercase">
                      {n.label}
                    </div>
                    <div className="text-xs font-medium text-zinc-200">
                      {n.val || "-"}
                      {n.val ? (
                        <span className="text-[9px] text-muted ml-0.5">
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
                <div className="flex-1 bg-surface-highlight rounded p-2 flex justify-between items-center border border-primary-dark/20">
                  <span className="text-muted">Stock</span>
                  <span
                    className={`${productItem.stock > 0 ? "text-success" : "text-error"} font-medium`}
                  >
                    {productItem.stock}
                  </span>
                </div>
              </div>
            )}

            {hasVariants && (
              <div className="mt-auto bg-background rounded-xl border border-primary-dark/10 overflow-hidden">
                <div
                  className="flex justify-between items-center p-2 cursor-pointer hover:bg-white/5"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    Variants ({productItem.variants!.length})
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-3 h-3 text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
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
                  <div className="border-t border-primary-dark/10 max-h-48 overflow-y-auto custom-scrollbar">
                    {productItem.variants!.map((v, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-xs p-2 border-b border-white/5 last:border-0 hover:bg-white/5"
                      >
                        <span className="text-zinc-200">{v.name}</span>
                        <div className="flex flex-col items-end">
                          <span className="text-muted">
                            {v.price > 0
                              ? `+$${(v.price / 100).toFixed(2)}`
                              : "-"}
                          </span>
                          <span
                            className={`text-[9px] ${v.stock && v.stock < 5 ? "text-error" : "text-success"}`}
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
