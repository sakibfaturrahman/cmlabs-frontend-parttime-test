"use client";
import { useEffect, useState, useRef } from "react";
import { mealService } from "@/services/mealService";
import { motion, useMotionValue, animate } from "framer-motion"; // Tambahkan animate
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SwiperIngredient } from "@/components/molecules/swipeIngredient";

export const IngredientPreview = () => {
  const [items, setItems] = useState<any[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Gunakan MotionValue untuk mengontrol posisi X secara manual
  const x = useMotionValue(0);

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

  // Fungsi untuk handle klik navigasi
  const handleScroll = (direction: "left" | "right") => {
    const step = 300; // Jarak geser setiap klik
    const currentX = x.get();
    let newX = direction === "left" ? currentX + step : currentX - step;

    // Boundary check agar tidak geser melebihi batas drag
    if (newX > 0) newX = 0;
    if (newX < -width) newX = -width;

    animate(x, newX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
          <div className="w-full lg:w-1/3 space-y-4 z-10 bg-white">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Top ingredients
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
              Explore our best ingredients picked just for your healthy meal.
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleScroll("left")}
                className="p-3 rounded-xl border border-gray-100 text-gray-400 hover:text-red-600 hover:border-red-100 transition-all active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="p-3 rounded-xl border border-gray-100 text-gray-400 hover:text-red-600 hover:border-red-100 transition-all active:scale-90"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/3 min-w-0 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <motion.div
              ref={carouselRef}
              className="cursor-grab active:cursor-grabbing"
            >
              <motion.div
                drag="x"
                style={{ x }} // Hubungkan motion value x ke elemen
                dragConstraints={{ right: 0, left: -width }}
                whileTap={{ cursor: "grabbing" }}
                className="flex gap-5 py-4"
              >
                {items.map((ing) => (
                  <SwiperIngredient key={ing.idIngredient} ing={ing} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
