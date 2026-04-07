// src/components/molecules/MealCard.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MealCardProps {
  meal: any;
  index: number;
}

export const MealCard = ({ meal, index }: MealCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link href={`/ingredients/chicken_breast/${meal.idMeal}`}>
        <div className="relative h-[300px] w-full rounded-[2rem] overflow-hidden shadow-lg mb-4">
          {/* Overlay Gradasi */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
            <span className="text-white font-bold text-sm underline underline-offset-4">
              Lihat Resep Lengkap
            </span>
          </div>

          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <h4 className="text-xl font-bold text-[#4A3728] group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
          {meal.strMeal}
        </h4>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mt-1">
          Chicken Base
        </p>
      </Link>
    </motion.div>
  );
};
