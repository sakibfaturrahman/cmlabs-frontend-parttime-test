import { useState, useCallback } from "react";
import { mealService } from "@/services/mealService";

export const useMeals = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Helper Logic: Mendapatkan angka unik berdasarkan tanggal (YYYYMMDD)
   * Digunakan untuk mengocok data secara konsisten setiap harinya.
   */
  const getDailySeed = () => {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  };

  /**
   * 1. Logic untuk Hero: Rekomendasi Meal Harian (Refresh Harian)
   */
  const getDailyHeroMeal = useCallback(async () => {
    setLoading(true);
    try {
      // Kita ambil dari featured atau search umum, lalu pilih berdasarkan seed tanggal
      const meals = await mealService.getFeaturedMeals();
      const seed = getDailySeed();
      const dailyMeal = meals[seed % meals.length];

      // Ambil detail lengkapnya agar Hero punya deskripsi/instruksi
      return await mealService.getMealById(dailyMeal.idMeal);
    } catch (err) {
      setError("Failed to fetch daily hero meal");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 2. Logic untuk Top Ingredients: Rekomendasi Harian
   */
  const getDailyTopIngredients = useCallback(async (limit = 12) => {
    setLoading(true);
    try {
      const allIng = await mealService.getAllIngredients();
      const seed = getDailySeed();

      // Mengacak list secara konsisten berdasarkan seed tanggal
      const shuffled = [...allIng].sort(() => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x) - 0.5;
      });

      return shuffled.slice(0, limit);
    } catch (err) {
      setError("Failed to fetch daily ingredients");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 3. Logic untuk Featured Meals: Rekomendasi Harian
   */
  const getDailyFeaturedMeals = useCallback(async (limit = 8) => {
    setLoading(true);
    try {
      // Kita ambil data dasar, lalu acak dengan seed tanggal
      const meals = await mealService.getFeaturedMeals();
      const seed = getDailySeed();

      const shuffled = [...meals].sort(() => {
        const x = Math.sin(seed + 1) * 10000; // +1 supaya beda dengan ingredient
        return x - Math.floor(x) - 0.5;
      });

      return shuffled.slice(0, limit);
    } catch (err) {
      setError("Failed to fetch daily featured meals");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 4. Fetch All Ingredients (Standard)
   */
  const getAllIngredients = useCallback(async () => {
    setLoading(true);
    try {
      return await mealService.getAllIngredients();
    } catch (err) {
      setError("Failed to fetch ingredients");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 5. Fetch Meals by Ingredient (Untuk Halaman Detail Ingredient)
   */
  const getMealsByIngredient = useCallback(async (name: string) => {
    setLoading(true);
    try {
      return await mealService.getMealsByIngredient(name);
    } catch (err) {
      setError(`Failed to fetch meals for ${name}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 6. Fetch Recipe Detail by Meal ID
   */
  const getRecipeById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      return await mealService.getMealById(id);
    } catch (err) {
      setError("Failed to fetch recipe details");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 7. Search Meals by Name (Pencarian Global)
   */
  const searchMeals = useCallback(async (query: string) => {
    if (!query) return [];
    setLoading(true);
    try {
      return await mealService.searchMealByName(query);
    } catch (err) {
      setError("Failed to search meals");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // JANGAN LUPA: Tambahkan searchMeals ke dalam return di bawah ini
  return {
    loading,
    error,
    getDailyHeroMeal,
    getDailyTopIngredients,
    getDailyFeaturedMeals,
    getAllIngredients,
    getMealsByIngredient,
    getRecipeById,
    searchMeals, // <-- WAJIB ADA DI SINI
  };
};
