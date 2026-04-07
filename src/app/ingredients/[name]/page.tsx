"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mealService } from "@/services/mealService";
import { CategoryLayout } from "@/components/templates/categoryLayout";
import { SearchBar } from "@/components/molecules/searchBar";
import { MealCard } from "@/components/molecules/mealCard";
import { ChefHat } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function IngredientDetailPage() {
  const params = useParams();
  const ingredientName = params.name as string;

  const [meals, setMeals] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const data = await mealService.getMealsByIngredient(ingredientName);
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };
    if (ingredientName) fetchMeals();
  }, [ingredientName]);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <CategoryLayout
      title={ingredientName.replace(/_/g, " ")}
      description={`Showing all recipes made with ${ingredientName.replace(/_/g, " ")}`}
      headerBg="bg-[#4A3728]" // Kita pakai warna gelap untuk header detail
      searchSlot={
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${ingredientName.replace(/_/g, " ")} recipes...`}
        />
      }
    >
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[350px] bg-gray-100 animate-pulse rounded-[2.5rem]"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredMeals.map((meal, index) => (
                <MealCard key={meal.idMeal} meal={meal} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {filteredMeals.length === 0 && (
            <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-[3rem] mt-10">
              <ChefHat className="w-20 h-20 text-gray-200 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400">
                Recipe not found
              </h3>
              <p className="text-gray-300">
                Try another keyword or ingredient.
              </p>
            </div>
          )}
        </>
      )}
    </CategoryLayout>
  );
}
