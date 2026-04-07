"use client";
import { useEffect, useState } from "react";
import { mealService } from "@/services/mealService";
import { UtensilsCrossed, ArrowRight } from "lucide-react";
import { MealCard } from "@/components/molecules/mealCard";
import { Button } from "@/components/ui/button";

export const FeaturedMeals = () => {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    mealService.getFeaturedMeals().then((data) => {
      setMeals(data.slice(0, 8));
    });
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-8 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-red-600 font-semibold mb-4">
              <UtensilsCrossed size={18} />
              <span className="text-xs tracking-wider">
                Chef's Recommendation
              </span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              daily inspiration <br />
              <span className="text-red-600">for your table.</span>
            </h2>
          </div>

          <div className="hidden md:block">
            <p className="text-gray-400 max-w-[200px] text-sm leading-relaxed border-l-2 border-red-100 pl-4 py-1">
              "A simple ingredient can turn into thousands of extraordinary
              dishes."
            </p>
          </div>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {meals.map((meal, index) => (
            <MealCard key={meal.idMeal} meal={meal} index={index} />
          ))}
        </div>

        {/* Bottom CTA (Optional) */}
        <div className="mt-20 flex justify-center">
          <Button
            variant="outline"
            className="rounded-2xl border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-100 hover:bg-red-50/50 px-8 h-12 transition-all"
          >
            View more recipes
          </Button>
        </div>
      </div>
    </section>
  );
};
