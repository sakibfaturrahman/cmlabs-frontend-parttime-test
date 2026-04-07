"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface MealCardProps {
  meal: any;
  index: number;
  ingredientName?: string;
}

export const MealCard = ({ meal, index, ingredientName }: MealCardProps) => {
  const linkPath = ingredientName
    ? `/ingredients/${encodeURIComponent(ingredientName)}/${meal.idMeal}`
    : `/ingredients/${meal.strCategory}/${meal.idMeal}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={linkPath} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 shadow-sm group-hover:shadow-2xl group-hover:shadow-red-100 transition-all duration-500">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1 px-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 leading-snug">
              {meal.strMeal.toLowerCase()}
            </h4>
          </div>
          <p className="text-xs font-medium text-gray-400">
            recipe by mealio chef
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
