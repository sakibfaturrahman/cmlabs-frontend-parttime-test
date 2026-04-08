"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMeals } from "@/hooks/useMeals";
import Link from "next/link";

export const Hero = () => {
  const { getDailyHeroMeal, loading } = useMeals();
  const [meal, setMeal] = useState<any>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    getDailyHeroMeal().then((data) => setMeal(data));
  }, [getDailyHeroMeal]);

  // pake strCategory sebagai fallback kalo nama bahan spesifik tidak ada maka pake recipes
  const recipeUrl = `/ingredients/${meal?.strCategory || "recipes"}/${meal?.idMeal}`;

  if (loading && !meal) {
    return (
      <section className="min-h-[90vh] flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen lg:min-h-[90vh] flex items-center pt-28 lg:pt-24 pb-12 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-red-50/50 rounded-full blur-[80px] lg:blur-[120px] -z-10" />

      <div className="container mx-auto max-w-6xl px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1 text-center lg:text-left"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { staggerChildren: 0.1, duration: 0.6 },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight lg:leading-[1.1] mb-6 tracking-tight"
          >
            pure{" "}
            <span className="text-red-600">
              {meal?.strMeal?.toLowerCase() || "loading..."}
            </span>
          </motion.h1>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center lg:items-start"
          >
            <p className="text-gray-500 text-base lg:text-lg leading-relaxed mb-4 max-w-sm lg:max-w-md">
              today's menu recommendation is just for you, a combination of
              authentic flavors and easy cooking methods.
            </p>
            <Link href={recipeUrl}>
              <button className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:gap-2 transition-all mb-8 lg:mb-10">
                View Recipe <ChevronRight size={16} />
              </button>
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center justify-center lg:justify-start gap-4"
          >
            <Link href="/ingredients" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 h-14 rounded-2xl font-medium shadow-xl shadow-red-100 transition-all group"
              >
                Explore Ingredients
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: y1 }}
          className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[280px] sm:w-[350px] lg:w-full lg:max-w-[420px] aspect-square flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 border border-gray-100 rounded-full -z-10" />
            <div className="absolute inset-4 border border-gray-100 rounded-full -z-10" />

            <div className="absolute inset-0 bg-red-50/50 rounded-full blur-[40px] lg:blur-[60px] -z-20 transform translate-y-6" />

            <div className="relative w-full h-full">
              <div className="absolute bottom-[-10px] right-[-10px] lg:bottom-[-15px] lg:right-[-15px] w-full h-full border-2 border-red-600 rounded-[2.5rem] lg:rounded-[3rem] -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />

              <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] bg-white border border-gray-100 shadow-xl">
                <Image
                  src={
                    meal?.strMealThumb ||
                    "https://www.themealdb.com/images/ingredients/chicken.png"
                  }
                  alt={meal?.strMeal || "mealio"}
                  fill
                  sizes="(max-width: 768px) 280px, 420px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 bg-white/95 backdrop-blur-md px-4 lg:px-5 py-2 lg:py-3 rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 z-20"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs lg:text-sm font-bold text-gray-800 tracking-tight">
                  {meal?.strCategory || "Chef's Pick"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
