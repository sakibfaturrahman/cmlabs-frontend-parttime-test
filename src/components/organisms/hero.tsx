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

  // Logic URL: /ingredients/[strCategory]/[idMeal]
  // Kita gunakan strCategory sebagai fallback jika nama bahan spesifik tidak ada
  const recipeUrl = `/ingredients/${meal?.strCategory || "all"}/${meal?.idMeal}`;

  if (loading && !meal) {
    return (
      <section className="min-h-[90vh] flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-6xl px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <motion.div
          initial="hidden"
          animate="visible"
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
            className="text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight"
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
          >
            <p className="text-gray-500 text-lg leading-relaxed mb-4 max-w-sm">
              rekomendasi menu hari ini khusus untukmu, perpaduan rasa yang
              autentik dan cara masak yang mudah.
            </p>
            {/* LINK DISESUAIKAN: /ingredients/nama/id */}
            <Link href={recipeUrl}>
              <button className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:gap-2 transition-all mb-10">
                Lihat resep <ChevronRight size={16} />
              </button>
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center gap-4"
          >
            <Link href="/ingredients">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 h-14 rounded-2xl font-medium shadow-xl shadow-red-100 transition-all group"
              >
                Explore recipes
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Image with Abstract Borders */}
        <motion.div
          style={{ y: y1 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
          >
            {/* Abstract Borders / Decorative Elements */}
            <div className="absolute inset-0 border-[2px] border-dashed border-red-200 rounded-[4rem] rotate-6 scale-105 -z-10 opacity-60" />
            <div className="absolute inset-0 border-[1px] border-solid border-red-100 rounded-[3.5rem] -rotate-3 scale-110 -z-10 opacity-40" />

            {/* Ambient Shadow */}
            <div className="absolute inset-0 bg-red-100/30 rounded-full blur-[80px] -z-20 transform translate-y-12 scale-75" />

            <div className="relative w-[90%] h-[90%] overflow-hidden rounded-[3rem] border-[8px] border-white shadow-2xl">
              <Image
                src={
                  meal?.strMealThumb ||
                  "https://www.themealdb.com/images/ingredients/chicken.png"
                }
                alt={meal?.strMeal || "mealio"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                priority
              />
            </div>

            {/* Floating Molecule Badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-gray-100 hidden sm:block z-20"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-gray-800 tracking-tight">
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
