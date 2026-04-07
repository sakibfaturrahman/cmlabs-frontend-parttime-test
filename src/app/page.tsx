import { Navbar } from "@/components/organisms/navbar";
import { Hero } from "@/components/organisms/hero";
import { Discovery } from "@/components/organisms/discovery";
import { IngredientPreview } from "@/components/organisms/ingredientPreview";
import { FeaturedMeals } from "@/components/organisms/featuredMeals";
import { Footer } from "@/components/organisms/footer";
import { mealService } from "@/services/mealService";

export default async function LandingPage() {
  // Ambil data untuk Hero di Server Side (Next.js 13+ style)
  const allIngredients = await mealService.getAllIngredients();
  const featured = allIngredients[0]; // Ambil Chicken untuk Hero

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Hero
        title={featured?.strIngredient}
        description={featured?.strDescription}
        image={featured?.strThumb}
      />
      <IngredientPreview />
      <Discovery />
      <FeaturedMeals />

      <Footer />
    </div>
  );
}
