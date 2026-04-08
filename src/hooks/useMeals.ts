import { useState, useCallback } from "react";
import { mealService } from "@/services/mealService";

export const useMeals = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //helper logic untuk get angka unik berdasarkan tanggal untuk mengocok data secara konsisten setiap harinya

  const getDailySeed = () => {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  };

  // get daily masak
  const getDailyHeroMeal = useCallback(async () => {
    setLoading(true);
    try {
      // get data dasar untuk featured meals, lalu pilih satu secara acak berdasarkan seed tanggal
      const meals = await mealService.getFeaturedMeals();
      const seed = getDailySeed();
      const dailyMeal = meals[seed % meals.length];

      // get detail buat link ke halaman detail
      return await mealService.getMealById(dailyMeal.idMeal);
    } catch (err) {
      setError("Failed to fetch daily hero meal");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  //  logic untuk daily top ingredients
  const getDailyTopIngredients = useCallback(async (limit = 12) => {
    setLoading(true);
    try {
      const allIng = await mealService.getAllIngredients();
      const seed = getDailySeed();

      // aacak list secara konsisten berdasarkan seed tanggal
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

  // logic untuk daily featured meals
  const getDailyFeaturedMeals = useCallback(async (limit = 8) => {
    setLoading(true);
    try {
      // get data dasar, lalu acak dengan seed tanggal
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

  // get all ingredients
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

  // get meals by ingredient
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

  // get recipe by id
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

  // search meals by name
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

  return {
    loading,
    error,
    getDailyHeroMeal,
    getDailyTopIngredients,
    getDailyFeaturedMeals,
    getAllIngredients,
    getMealsByIngredient,
    getRecipeById,
    searchMeals,
  };
};
