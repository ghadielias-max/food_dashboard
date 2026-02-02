import { useState } from "react";
import toast from "react-hot-toast";

import CategorySelector from "./forms/CategorySelector";
import VariantsForm from "./forms/VariantsForm";
import OptionsForm from "./forms/OptionsForm";
import NutritionForm from "./forms/NutritionForm";
import ImageField from "./forms/ImageField";
import IngredientsForm from "./forms/IngredientForm";
import { ItemOption, ItemType, ItemVariant } from "@/app/types/items";

export interface ItemSubmissionData {
  name: string;
  price: string;
  description: string;
  image: string;
  stock: string;
  sku: string;
  category: string;
  type: ItemType;
  ingredients: string[];
  options: ItemOption[];
  variants: ItemVariant[];
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface CreateItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ItemSubmissionData) => void;
}

export default function CreateItemModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateItemModalProps) {
  const [type, setType] = useState<ItemType>("FOOD");

  const [variants, setVariants] = useState<ItemVariant[]>([]);
  const [options, setOptions] = useState<ItemOption[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    sku: "",
    category: "",
  });

  const [nutrition, setNutrition] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const isValid = Boolean(
    form.name &&
    form.price &&
    form.category &&
    form.image &&
    (type !== "FOOD" || ingredients.length > 0),
  );

  const updateForm = (key: string, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  if (!isOpen) return null;

  const handleAttemptSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    const missingFields: string[] = [];

    if (!form.name) {
      newErrors.name = true;
      missingFields.push("Name");
    }
    if (!form.price) {
      newErrors.price = true;
      missingFields.push("Price");
    }
    if (!form.category) {
      newErrors.category = true;
      missingFields.push("Category");
    }
    if (!form.image) {
      newErrors.image = true;
      missingFields.push("Image");
    }

    if (type === "FOOD" && ingredients.length === 0) {
      newErrors.ingredients = true;
      missingFields.push("Ingredients");
    }

    setErrors(newErrors);

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    const finalData: ItemSubmissionData = {
      ...form,
      type,
      ingredients: type === "FOOD" ? ingredients : [],
      options: type === "FOOD" ? options : [],
      nutrition: type === "FOOD" ? nutrition : undefined,
      variants: type === "PRODUCT" ? variants : [],
    };

    onSubmit(finalData);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-surface border border-primary-dark/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-primary-dark/20 flex justify-between items-center bg-surface-highlight">
          <h3 className="text-xl font-bold text-white">Create New Item</h3>
          <button
            onClick={onClose}
            className="text-muted hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form
            id="create-item-form"
            onSubmit={handleAttemptSubmit}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setType("FOOD")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                  type === "FOOD"
                    ? "bg-primary/20 border-primary text-white shadow-[0_0_15px_-5px_var(--color-primary)]"
                    : "bg-background border-primary-dark/20 text-muted hover:border-primary/50"
                }`}
              >
                <span className="font-semibold text-sm">Food Item</span>
                <span className="text-[10px] opacity-70">
                  Dishes with Ingredients & Add-ons
                </span>
              </button>
              <button
                type="button"
                onClick={() => setType("PRODUCT")}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                  type === "PRODUCT"
                    ? "bg-primary/20 border-primary text-white shadow-[0_0_15px_-5px_var(--color-primary)]"
                    : "bg-background border-primary-dark/20 text-muted hover:border-primary/50"
                }`}
              >
                <span className="font-semibold text-sm">Product</span>
                <span className="text-[10px] opacity-70">
                  Merch with Variants (Size/Color)
                </span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    className={`text-xs font-medium ${
                      errors.name ? "text-error" : "text-muted"
                    }`}
                  >
                    Name {errors.name && "*"}
                  </label>
                  <input
                    type="text"
                    className={`w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
                      errors.name
                        ? "border-error/50 focus:border-error"
                        : "border-primary-dark/20 focus:border-primary"
                    }`}
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className={`text-xs font-medium ${
                      errors.price ? "text-error" : "text-muted"
                    }`}
                  >
                    Base Price ($) {errors.price && "*"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className={`w-full bg-background border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors ${
                      errors.price
                        ? "border-error/50 focus:border-error"
                        : "border-primary-dark/20 focus:border-primary"
                    }`}
                    value={form.price}
                    onChange={(e) => updateForm("price", e.target.value)}
                  />
                </div>
              </div>

              <CategorySelector
                value={form.category}
                onChange={(val) => updateForm("category", val)}
                error={errors.category}
              />

              <ImageField
                value={form.image}
                onChange={(val) => updateForm("image", val)}
                error={errors.image}
              />

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted">
                  Description
                </label>
                <textarea
                  className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary min-h-[80px] resize-none focus:outline-none"
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                />
              </div>
            </div>

            {type === "FOOD" && (
              <>
                <IngredientsForm
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  error={errors.ingredients}
                />
                <OptionsForm options={options} setOptions={setOptions} />
                <NutritionForm
                  data={nutrition}
                  onChange={(k, v) =>
                    setNutrition((prev) => ({ ...prev, [k]: v }))
                  }
                />
              </>
            )}

            {type === "PRODUCT" && (
              <>
                <VariantsForm variants={variants} setVariants={setVariants} />

                {variants.length === 0 && (
                  <div className="pt-4 border-t border-primary-dark/20">
                    <h4 className="text-sm font-semibold text-white mb-4">
                      Global Inventory
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted">
                          Stock
                        </label>
                        <input
                          type="number"
                          className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary"
                          value={form.stock}
                          onChange={(e) => updateForm("stock", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted">
                          SKU
                        </label>
                        <input
                          type="text"
                          className="w-full bg-background border border-primary-dark/20 rounded-lg px-4 py-2.5 text-sm text-white focus:border-primary"
                          value={form.sku}
                          onChange={(e) => updateForm("sku", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </form>
        </div>

        <div className="p-6 border-t border-primary-dark/20 bg-surface-highlight flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-muted hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>

          <button
            form="create-item-form"
            type="submit"
            className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 
              ${
                isValid
                  ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_-3px_var(--color-primary)] cursor-pointer"
                  : "bg-surface-highlight border border-white/5 text-muted cursor-not-allowed"
              }`}
          >
            Create Item
          </button>
        </div>
      </div>
    </div>
  );
}
