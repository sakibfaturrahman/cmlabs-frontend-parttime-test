const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const mealService = {
  async getAllIngredients() {
    const res = await fetch(`${BASE_URL}/list.php?i=list`);
    if (!res.ok) throw new Error("Failed to fetch ingredients");
    const data = await res.json();
    return data.meals || [];
  },

  async getMealsByIngredient(ingredient: string) {
    const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    if (!res.ok) throw new Error("Failed to fetch meals");
    const data = await res.json();
    return data.meals || [];
  },

  async getMealById(id: string) {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!res.ok) throw new Error("Failed to fetch meal details");
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  },
};
