"use client";

import { useEffect, useState, useMemo } from "react";
import { useMeals } from "@/hooks/useMeals"; // Import Custom Hook
import { CategoryLayout } from "@/components/templates/categoryLayout";
import { IngredientCard } from "@/components/molecules/ingredientCard";
import { SearchBar } from "@/components/molecules/searchBar";
import { Loader2, ListFilter, Search, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const LIMIT_OPTIONS = [12, 48, 96, "all"];

export default function AllIngredientsPage() {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number | string>(12);

  // Menggunakan hooks useMeals
  const { getAllIngredients, loading, error } = useMeals();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllIngredients();
      setIngredients(data || []);
    };
    fetchData();
  }, [getAllIngredients]);

  const displayIngredients = useMemo(() => {
    const filtered = ingredients.filter((ing) =>
      ing.strIngredient.toLowerCase().includes(search.toLowerCase()),
    );

    if (limit === "all") return filtered;
    return filtered.slice(0, Number(limit));
  }, [ingredients, search, limit]);

  return (
    <CategoryLayout
      title="All Ingredients"
      description="discover the best ingredients for your kitchen experiments today."
      searchSlot={
        <div className="max-w-xl mx-auto">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients (e.g. chicken, beef, salmon)..."
            variant="default"
          />
        </div>
      }
    >
      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center py-20 text-red-500 gap-2">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && ingredients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
          <p className="text-gray-400 font-medium text-sm tracking-tight italic">
            gathering fresh ingredients...
          </p>
        </div>
      ) : (
        <>
          {/* Controls Section */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg text-red-600">
                <ListFilter size={18} />
              </div>
              <p className="text-gray-400 text-sm font-medium">
                showing{" "}
                <span className="text-gray-900 font-bold">
                  {displayIngredients.length}
                </span>{" "}
                of {ingredients.length} items
              </p>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 px-3 uppercase tracking-widest">
                Show:
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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {displayIngredients.map((ing) => (
              <IngredientCard key={ing.idIngredient} ing={ing} />
            ))}
          </div>

          {/* Empty State */}
          {!loading && displayIngredients.length === 0 && (
            <div className="text-center py-32 bg-gray-50/20 rounded-[3rem] border border-dashed border-gray-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-50">
                <Search className="text-gray-200" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                no ingredients found
              </h3>
              <p className="text-gray-400 mt-2 font-medium">
                try using different keywords or clear your search.
              </p>
            </div>
          )}
        </>
      )}
    </CategoryLayout>
  );
}
