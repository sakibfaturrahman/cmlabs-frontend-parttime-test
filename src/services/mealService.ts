const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const mealService = {
  /**
   * 1. List of Ingredients
   * Mengambil semua daftar bahan makanan.
   */
  async getAllIngredients() {
    try {
      const res = await fetch(`${BASE_URL}/list.php?i=list`);
      if (!res.ok) throw new Error("Gagal mengambil data ingredients");
      const data = await res.json();

      // Kita tambahkan strThumb secara manual karena API list tidak menyediakannya
      return (
        data.meals?.map((ing: any) => ({
          ...ing,
          strThumb: `https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`,
        })) || []
      );
    } catch (error) {
      console.error("Error in getAllIngredients:", error);
      return [];
    }
  },

  /**
   * 2. Filter by Ingredient
   * Mengambil daftar masakan berdasarkan nama bahan (e.g. 'chicken_breast').
   */
  async getMealsByIngredient(ingredientName: string) {
    try {
      const res = await fetch(`${BASE_URL}/filter.php?i=${ingredientName}`);
      if (!res.ok) throw new Error("Gagal memfilter berdasarkan bahan");
      const data = await res.json();
      return data.meals || [];
    } catch (error) {
      console.error(
        `Error in getMealsByIngredient for ${ingredientName}:`,
        error,
      );
      return [];
    }
  },

  /**
   * 3. Detail Meal
   * Mengambil detail lengkap satu masakan berdasarkan ID.
   */
  async getMealById(mealId: string) {
    try {
      const res = await fetch(`${BASE_URL}/lookup.php?i=${mealId}`);
      if (!res.ok) throw new Error("Gagal mengambil detail masakan");
      const data = await res.json();
      // Mengembalikan objek pertama karena API ini mengembalikan array
      return data.meals ? data.meals[0] : null;
    } catch (error) {
      console.error(`Error in getMealById for ${mealId}:`, error);
      return null;
    }
  },

  /**
   * 4. Featured Meals (Custom Helper)
   * Digunakan untuk Landing Page (mengambil data awal masakan ayam).
   */
  async getFeaturedMeals() {
    return this.getMealsByIngredient("chicken_breast");
  },
};
