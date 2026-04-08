"use client";

import { useEffect, useState } from "react";
import { useMeals } from "@/hooks/useMeals";
import { UtensilsCrossed, Loader2 } from "lucide-react";
import { MealCard } from "@/components/molecules/mealCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const FeaturedMeals = () => {
  const [meals, setMeals] = useState<any[]>([]);
  const { getDailyFeaturedMeals, loading } = useMeals();

  useEffect(() => {
    // get data 8 rekomendasi menu harian
    getDailyFeaturedMeals(8).then((data) => {
      setMeals(data);
    });
  }, [getDailyFeaturedMeals]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-8 lg:px-12">
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

          <div className="hidden md:block text-right">
            <p className="text-gray-400 max-w-[200px] text-sm leading-relaxed border-l-2 border-red-100 pl-4 py-1 italic">
              "A simple ingredient can turn into thousands of extraordinary
              dishes."
            </p>
          </div>
        </div>

        {loading && meals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
            <p className="text-gray-400 font-medium text-sm italic">
              curating your daily menu...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {meals.map((meal, index) => (
              <MealCard key={meal.idMeal} meal={meal} index={index} />
            ))}
          </div>
        )}

        <div className="mt-24 flex justify-center">
          <Link href="/ingredients">
            <Button
              variant="outline"
              className="rounded-2xl border-gray-100 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50/30 px-10 h-14 font-semibold transition-all shadow-sm hover:shadow-md"
            >
              View more recipes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
