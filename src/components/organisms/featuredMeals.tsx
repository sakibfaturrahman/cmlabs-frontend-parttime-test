// src/components/organisms/FeaturedMeals.tsx
"use client";
import { useEffect, useState } from "react";
import { mealService } from "@/services/mealService";
import { Utensils } from "lucide-react";
import { MealCard } from "@/components/molecules/mealCard";

export const FeaturedMeals = () => {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    mealService.getFeaturedMeals().then((data) => {
      setMeals(data.slice(0, 8));
    });
  }, []);

  return (
    <section className="py-24 bg-[#FDFDFD]">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-orange-600 font-bold mb-4">
              <Utensils size={20} />
              <span className="uppercase tracking-[0.3em] text-sm">
                Chef's Recommendation
              </span>
            </div>
            <h2 className="text-5xl font-black text-[#4A3728] leading-tight">
              Inspirasi Menu <br /> Hari Ini
            </h2>
          </div>
          <p className="text-gray-500 md:max-w-xs italic border-l-4 border-orange-200 pl-4">
            "Satu bahan sederhana bisa berubah menjadi ribuan hidangan luar
            biasa."
          </p>
        </div>

        {/* Meals Grid menggunakan Molecule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {meals.map((meal, index) => (
            <MealCard key={meal.idMeal} meal={meal} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
