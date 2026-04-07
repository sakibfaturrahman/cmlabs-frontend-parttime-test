const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const mealService = {
  /**
   * Helper untuk fetch agar tidak repetitif
   */
  async fetchData(endpoint: string) {
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        // Cache data selama 1 jam (opsional, tergantung browser/Next.js)
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.meals;
    } catch (error) {
      console.error(`Fetch Error [${endpoint}]:`, error);
      return null;
    }
  },

  // 1. List semua bahan
  async getAllIngredients() {
    const meals = await this.fetchData("list.php?i=list");
    return (
      meals?.map((ing: any) => ({
        ...ing,
        strThumb: `https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`,
      })) || []
    );
  },

  // 2. Filter masakan berdasarkan satu bahan (e.g. 'chicken_breast')
  async getMealsByIngredient(ingredient: string) {
    return (await this.fetchData(`filter.php?i=${ingredient}`)) || [];
  },

  // 3. Detail lengkap masakan berdasarkan ID
  async getMealById(id: string) {
    const meals = await this.fetchData(`lookup.php?i=${id}`);
    return meals ? meals[0] : null;
  },

  // 4. PENCARIAN GLOBAL (Berdasarkan Nama) - Penting untuk Navbar tadi
  async searchMealByName(name: string) {
    return (await this.fetchData(`search.php?s=${name}`)) || [];
  },

  // 5. Mengambil masakan acak (Bagus untuk fitur "Surprise Me")
  async getRandomMeal() {
    const meals = await this.fetchData("random.php");
    return meals ? meals[0] : null;
  },

  // 6. Featured Meals untuk Landing Page
  async getFeaturedMeals() {
    return this.getMealsByIngredient("chicken_breast");
  },
};
