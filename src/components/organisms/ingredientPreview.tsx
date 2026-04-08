"use client";
import { useEffect, useState, useRef } from "react";
import { useMeals } from "@/hooks/useMeals"; // Import hook
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { SwiperIngredient } from "@/components/molecules/swipeIngredient";

export const IngredientPreview = () => {
  const { getDailyTopIngredients, loading } = useMeals(); // Gunakan fungsi harian
  const [items, setItems] = useState<any[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    // Fetch top ingredients harian (limit 12)
    getDailyTopIngredients(12).then((data) => {
      setItems(data);
    });
  }, [getDailyTopIngredients]);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
      );
    }
  }, [items]);

  const handleScroll = (direction: "left" | "right") => {
    const step = 300;
    const currentX = x.get();
    let newX = direction === "left" ? currentX + step : currentX - step;

    if (newX > 0) newX = 0;
    if (newX < -width) newX = -width;

    animate(x, newX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
          {/* Header Section */}
          <div className="w-full lg:w-1/3 space-y-4 z-10 bg-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Daily Pick
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              top ingredients{" "}
              <span className="text-red-600 text-sm italic font-serif">
                today.
              </span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[240px]">
              Discover fresh, seasonal ingredients handpicked for your daily
              recipes.
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

          {/* Carousel Section */}
          <div className="w-full lg:w-2/3 min-w-0 relative">
            {loading && items.length === 0 ? (
              <div className="flex h-[210px] items-center justify-center">
                <Loader2 className="animate-spin text-red-600" size={32} />
              </div>
            ) : (
              <div className="overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                  ref={carouselRef}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <motion.div
                    drag="x"
                    style={{ x }}
                    dragConstraints={{ right: 0, left: -width }}
                    whileTap={{ cursor: "grabbing" }}
                    className="flex gap-5 py-6 px-2"
                  >
                    {items.map((ing) => (
                      <SwiperIngredient key={ing.idIngredient} ing={ing} />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
