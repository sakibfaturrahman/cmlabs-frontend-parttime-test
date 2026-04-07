"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mealService } from "@/services/mealService";
import { DetailTemplate } from "@/components/templates/detailTemplate";
import { IngredientList } from "@/components/molecules/ingredientList";
import { VideoPlayer } from "@/components/molecules/videoPlayer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Hash, Loader2 } from "lucide-react";
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
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
        <p className="text-gray-400 font-medium text-sm">
          refining your recipe...
        </p>
      </div>
    );

  if (!meal)
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 font-medium italic">
        recipe not found.
      </div>
    );

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
          className="group flex items-center gap-3 text-gray-400 hover:text-red-600 transition-all font-semibold text-sm"
        >
          <div className="p-2 rounded-full border border-gray-100 group-hover:border-red-100 group-hover:bg-red-50 transition-all">
            <ArrowLeft size={16} />
          </div>
          back to list
        </button>
      }
      mediaSlot={
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-10"
        >
          <div className="relative aspect-square w-full rounded-[3.5rem] overflow-hidden shadow-2xl shadow-red-900/5 group">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="px-5 py-2 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold flex items-center gap-2">
              <Globe size={14} className="text-red-600" />{" "}
              {meal.strArea.toLowerCase()}
            </div>
            <div className="px-5 py-2 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 text-xs font-bold flex items-center gap-2">
              <Hash size={14} className="text-red-600" />{" "}
              {meal.strCategory.toLowerCase()}
            </div>
          </div>
        </motion.div>
      }
      contentSlot={
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tighter">
              {meal.strMeal.toLowerCase()}
              <span className="text-red-600">.</span>
            </h1>
          </div>

          <IngredientList ingredients={ingredients} />

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                instructions
              </h3>
              <div className="flex-1 h-[1px] bg-gray-100" />
            </div>
            <p className="text-gray-500 leading-loose text-lg font-medium whitespace-pre-line">
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
