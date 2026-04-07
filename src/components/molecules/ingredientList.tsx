// src/components/molecules/IngredientList.tsx
import { Utensils } from "lucide-react";

export const IngredientList = ({ ingredients }: { ingredients: any[] }) => (
  <div className="bg-[#F9F9F9] p-8 rounded-[2.5rem] border border-gray-100">
    <h3 className="text-2xl font-bold text-[#4A3728] mb-6 flex items-center gap-2">
      <Utensils className="text-orange-600" size={24} /> Recipes & Ingredients
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
      {ingredients.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center border-b border-gray-200 pb-2"
        >
          <span className="font-medium text-gray-700">{item.ingredient}</span>
          <span className="text-orange-600 font-black text-sm italic">
            {item.measure}
          </span>
        </div>
      ))}
    </div>
  </div>
);
