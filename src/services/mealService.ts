const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const mealService = {
  async fetchData(endpoint: string) {
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        // caching data selama 1 jam untuk mengurangi beban API dan mempercepat response
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

  // get list all bahan
  async getAllIngredients() {
    const meals = await this.fetchData("list.php?i=list");
    return (
      meals?.map((ing: any) => ({
        ...ing,
        strThumb: `https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`,
      })) || []
    );
  },

  // get data meals by ingredient
  async getMealsByIngredient(ingredient: string) {
    return (await this.fetchData(`filter.php?i=${ingredient}`)) || [];
  },

  // get detail lengkap masakan berdasarkan id
  async getMealById(id: string) {
    const meals = await this.fetchData(`lookup.php?i=${id}`);
    return meals ? meals[0] : null;
  },

  //logic search global
  async searchMealByName(name: string) {
    return (await this.fetchData(`search.php?s=${name}`)) || [];
  },

  // get random meal untuk fitur surprise me
  async getRandomMeal() {
    const meals = await this.fetchData("random.php");
    return meals ? meals[0] : null;
  },

  // get rekomendasi masakan
  async getFeaturedMeals() {
    return this.getMealsByIngredient("chicken_breast");
  },
};
