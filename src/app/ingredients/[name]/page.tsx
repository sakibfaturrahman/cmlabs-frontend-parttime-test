"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useMeals } from "@/hooks/useMeals";
import { CategoryLayout } from "@/components/templates/categoryLayout";
import { MealCard } from "@/components/molecules/mealCard";
import { SearchBar } from "@/components/molecules/searchBar";
import { ChefHat, Loader2, ListFilter, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const LIMIT_OPTIONS = [12, 24, "all"];

export default function IngredientDetailPage() {
  const params = useParams();
  const ingredientName = (params.name as string).replace(/_/g, " ");

  const [meals, setMeals] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number | string>(12);

  const { getMealsByIngredient, loading, error } = useMeals();

  useEffect(() => {
    const fetchInitialData = async () => {
      if (ingredientName) {
        const data = await getMealsByIngredient(ingredientName);
        setMeals(data || []);
      }
    };
    fetchInitialData();
  }, [ingredientName, getMealsByIngredient]);

  const displayMeals = useMemo(() => {
    const filtered = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(search.toLowerCase()),
    );
    if (limit === "all") return filtered;
    return filtered.slice(0, Number(limit));
  }, [meals, search, limit]);

  return (
    <CategoryLayout
      title={ingredientName}
      description={`discover various ways to serve ${ingredientName.toLowerCase()} with our curated recipes.`}
      searchSlot={
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${ingredientName.toLowerCase()} recipes...`}
            variant="default"
          />
        </div>
      }
    >
      {error && (
        <div className="flex items-center justify-center py-20 text-red-500 gap-2">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {loading && meals.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/5] w-full bg-gray-100 animate-pulse rounded-[2.5rem]" />
              <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-3 w-1/2 bg-gray-50 animate-pulse rounded-md" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg text-red-600 shadow-sm shadow-red-100/50">
                <ChefHat size={18} />
              </div>
              <p className="text-gray-400 text-sm font-medium">
                showing{" "}
                <span className="text-gray-900 font-bold">
                  {displayMeals.length}
                </span>{" "}
                recipes
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 px-3 uppercase tracking-widest">
                limit:
              </span>
              {LIMIT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setLimit(opt)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                    limit === opt
                      ? "bg-white text-red-600 shadow-sm ring-1 ring-black/5"
                      : "text-gray-400 hover:text-gray-600",
                  )}
                >
                  {opt === "all" ? "All" : opt}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {displayMeals.map((meal, index) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                index={index}
                ingredientName={ingredientName}
              />
            ))}
          </div>

          {!loading && displayMeals.length === 0 && (
            <div className="text-center py-32 bg-gray-50/20 rounded-[3rem] border border-dashed border-gray-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-50">
                <ChefHat className="text-gray-200" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                no recipes found
              </h3>
              <p className="text-gray-400 mt-2 font-medium max-w-xs mx-auto">
                we couldn't find any recipes for "{search}" using{" "}
                {ingredientName.toLowerCase()}.
              </p>
            </div>
          )}
        </>
      )}
    </CategoryLayout>
  );
}
