// src/components/organisms/IngredientPreview.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { mealService } from "@/services/mealService";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SwiperIngredient } from "@/components/molecules/swipeIngredient";

export const IngredientPreview = () => {
  const [items, setItems] = useState<any[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    mealService.getAllIngredients().then((data) => {
      setItems(data.slice(0, 12));
    });
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
      );
    }
  }, [items]);

  return (
    <section className="pb-32 px-6 lg:px-16 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2 text-orange-600 font-bold animate-pulse">
            <ChevronLeft size={20} />
            <span className="text-sm uppercase tracking-widest">
              Geser untuk melihat
            </span>
            <ChevronRight size={20} />
          </div>
        </div>

        <motion.div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {items.map((ing, index) => (
              <SwiperIngredient key={ing.idIngredient} ing={ing} color={""} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
