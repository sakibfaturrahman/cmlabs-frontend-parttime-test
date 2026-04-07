import { Navbar } from "@/components/organisms/navbar";
import { Hero } from "@/components/organisms/hero";
import { Discovery } from "@/components/organisms/discovery";
import { IngredientPreview } from "@/components/organisms/ingredientPreview";
import { FeaturedMeals } from "@/components/organisms/featuredMeals";
import { HowItWorks } from "@/components/organisms/howItWorks";
import { ValueSection } from "@/components/organisms/valueSection";
import { CTASection } from "@/components/organisms/CTASection";
import { Footer } from "@/components/organisms/footer";
import { mealService } from "@/services/mealService";

export default async function LandingPage() {
  // Ambil data untuk Hero di Server Side (Next.js 13+ style)
  const allIngredients = await mealService.getAllIngredients();
  const featured = allIngredients[0]; // Ambil Chicken untuk Hero

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Hero Section (Visual Utama) */}
      <Hero
        title={featured?.strIngredient}
        description={featured?.strDescription}
        image={featured?.strThumb}
      />

      {/* 2. Discovery Section (Temukan Menu Ideal) */}
      <Discovery />

      {/* 3. Value Section (Manfaat) */}
      <ValueSection />

      {/* 3. How It Works Section (Cara Kerja) */}
      <HowItWorks />

      {/* 3. Ingredient Preview (Daftar 10 Bahan) */}
      <IngredientPreview />

      {/* 4. Featured Meals (Resep Populer) */}
      <FeaturedMeals />

      {/* 5. CTA Section (CTA) */}
      <CTASection />

      {/* Footer Sederhana */}
      <Footer />
    </div>
  );
}
