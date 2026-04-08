import { Navbar } from "@/components/organisms/navbar";
import { Hero } from "@/components/organisms/hero";
import { Discovery } from "@/components/organisms/discovery";
import { TopIngredient } from "@/components/organisms/topIngredient";
import { FeaturedMeals } from "@/components/organisms/featuredMeals";
import { Footer } from "@/components/organisms/footer";
import { mealService } from "@/services/mealService";

export default async function LandingPage() {
  const allIngredients = await mealService.getAllIngredients();
  const featured = allIngredients[0];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-5 lg:pt-20">
        <Hero />
        <TopIngredient />
        <Discovery />
        <FeaturedMeals />
      </main>

      <Footer />
    </div>
  );
}
