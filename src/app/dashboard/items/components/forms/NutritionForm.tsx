interface NutritionData {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

interface Props {
  data: NutritionData;
  onChange: (key: keyof NutritionData, val: string) => void;
}

export default function NutritionForm({ data, onChange }: Props) {
  return (
    <div className="pt-4 border-t border-purple-900/20">
      <h4 className="text-sm font-semibold text-white mb-4">
        Nutrition Facts{" "}
        <span className="text-zinc-500 font-normal text-xs ml-2">
          (Optional)
        </span>
      </h4>
      <div className="grid grid-cols-4 gap-3">
        {[
          { key: "calories", label: "Calories" },
          { key: "protein", label: "Protein (g)" },
          { key: "carbs", label: "Carbs (g)" },
          { key: "fat", label: "Fat (g)" },
        ].map((field) => (
          <div key={field.key} className="space-y-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider">
              {field.label}
            </label>
            <input
              type="number"
              className="w-full bg-[#05050A] border border-purple-900/20 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 transition-colors"
              value={data[field.key as keyof NutritionData]}
              onChange={(e) =>
                onChange(field.key as keyof NutritionData, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
