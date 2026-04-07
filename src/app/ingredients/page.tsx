"use client";

import { useEffect, useState } from "react";
import { mealService } from "@/services/mealService";
import { CategoryLayout } from "@/components/templates/categoryLayout";
import { SearchBar } from "@/components/molecules/searchBar";
import { IngredientCard } from "@/components/molecules/ingredientCard";
import { Utensils } from "lucide-react";

export default function AllIngredientsPage() {
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await mealService.getAllIngredients();
        setIngredients(data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Search Logic
  const filteredIngredients = ingredients.filter((ing) =>
    ing.strIngredient.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <CategoryLayout
      title="All Ingredients"
      description="Temukan bahan makanan terbaik untuk eksperimen dapurmu hari ini."
      headerBg="bg-orange-50"
      searchSlot={
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari bahan (Chicken, Beef, Garlic...)"
        />
      }
    >
      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-orange-600 font-bold animate-pulse text-sm uppercase tracking-widest">
            Menyiapkan Bahan...
          </p>
        </div>
      ) : (
        <>
          {/* Result Count */}
          <div className="mb-8">
            <p className="text-gray-400 font-medium italic">
              Showing{" "}
              <span className="text-orange-600 font-bold">
                {filteredIngredients.length}
              </span>{" "}
              ingredients found
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredIngredients.map((ing) => (
              <IngredientCard key={ing.idIngredient} ing={ing} />
            ))}
          </div>

          {/* Empty State */}
          {filteredIngredients.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 mt-10">
              <Utensils className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400">
                Bahan tidak ditemukan
              </h3>
              <p className="text-gray-300 mt-2 font-medium">
                Coba gunakan kata kunci pencarian yang lain.
              </p>
            </div>
          )}
        </>
      )}
    </CategoryLayout>
  );
}
