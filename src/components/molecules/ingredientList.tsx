// src/components/molecules/IngredientList.tsx
import { UtensilsCrossed, Scale } from "lucide-react";

export const IngredientList = ({ ingredients }: { ingredients: any[] }) => (
  <div className="space-y-8">
    {/* Section Header */}
    <div className="flex items-center justify-between border-b border-gray-100 pb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
          <UtensilsCrossed size={18} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            required ingredients
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">
            composition for this serving
          </p>
        </div>
      </div>
    </div>

    {/* Elegant Grid Layout */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {ingredients.map((item, idx) => (
        <div
          key={idx}
          className="group relative bg-gray-50/50 hover:bg-white border border-transparent hover:border-red-100 hover:shadow-xl hover:shadow-red-900/5 rounded-[2rem] p-5 transition-all duration-300"
        >
          {/* Index Number - Subtle Backdrop */}
          <span className="absolute top-4 right-5 text-[40px] font-bold text-gray-100 group-hover:text-red-50 transition-colors z-0 select-none">
            {String(idx + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest opacity-60">
                measure
              </p>
              <p className="text-sm font-bold text-gray-900 leading-none">
                {item.measure.toLowerCase()}
              </p>
            </div>

            <div className="w-8 h-[2px] bg-gray-200 group-hover:bg-red-200 transition-colors" />

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                ingredient
              </p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors leading-snug capitalize">
                {item.ingredient.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Aesthetic Tip */}
    <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100/50 flex gap-3 items-start">
      <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 animate-pulse" />
      <p className="text-xs text-red-800/80 font-medium leading-relaxed">
        Make sure to prepare all ingredients in the correct measurements for the
        best flavor balance.
      </p>
    </div>
  </div>
);
