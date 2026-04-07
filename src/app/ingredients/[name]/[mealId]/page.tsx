"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mealService } from "@/services/mealService";
import { DetailTemplate } from "@/components/templates/detailTemplate";
import { IngredientList } from "@/components/molecules/ingredientList";
import { VideoPlayer } from "@/components/molecules/videoPlayer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Tag } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mealService.getMealById(params.mealId as string).then((data) => {
      setMeal(data);
      setLoading(false);
    });
  }, [params.mealId]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-bold text-orange-600 animate-bounce text-2xl uppercase tracking-tighter">
        Preparing Recipe...
      </div>
    );
  if (!meal) return <div className="text-center py-20">Recipe not found.</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      });
    }
  }

  return (
    <DetailTemplate
      backButton={
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-600 transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={18} /> Back to Meals List
        </button>
      }
      mediaSlot={
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-orange-50">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Badge className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full border-none flex gap-2">
              <Globe size={14} /> {meal.strArea}
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full border-none flex gap-2">
              <Tag size={14} /> {meal.strCategory}
            </Badge>
          </div>
        </motion.div>
      }
      contentSlot={
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-[#4A3728] leading-tight tracking-tighter uppercase">
              {meal.strMeal}
            </h1>
            <div className="w-20 h-2 bg-orange-500 mt-4 rounded-full" />
          </div>
          <IngredientList ingredients={ingredients} />
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-[#4A3728] uppercase tracking-tighter">
              Instructions
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line font-medium italic">
              {meal.strInstructions}
            </p>
          </div>
        </motion.div>
      }
      bottomSlot={
        meal.strYoutube && (
          <VideoPlayer url={meal.strYoutube} title={meal.strMeal} />
        )
      }
    />
  );
}
