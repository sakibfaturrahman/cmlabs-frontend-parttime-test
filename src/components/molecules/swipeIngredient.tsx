// src/components/molecules/SwiperIngredient.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SwiperIngredientProps {
  ing: any;
  color: string;
}

export const SwiperIngredient = ({ ing, color }: SwiperIngredientProps) => {
  return (
    <motion.div className="min-w-[320px] md:min-w-[380px] pt-16">
      <div
        className={`${color} rounded-[2.5rem] p-8 pt-20 text-white relative h-[450px] flex flex-col shadow-xl transition-all duration-300 hover:rotate-2`}
      >
        {/* Image dengan Animasi Floating */}
        <motion.div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 drop-shadow-2xl z-20"
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <Image
            src={ing.strThumb}
            alt={ing.strIngredient}
            fill
            className="object-contain"
            draggable={false}
          />
        </motion.div>

        <div className="relative z-10 mt-4">
          <h3 className="text-3xl font-black mb-2 tracking-tight">
            {ing.strIngredient}
          </h3>
          <div className="flex text-yellow-300 mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg">
                ★
              </span>
            ))}
          </div>
          <p className="text-white/90 text-sm line-clamp-4 italic font-medium leading-relaxed mb-8">
            {ing.strDescription ||
              "Pilihan bahan masakan terbaik untuk hidangan istimewa keluarga anda."}
          </p>
        </div>

        <Link
          href={`/ingredients/${ing.strIngredient}`}
          className="mt-auto relative z-10"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Button className="bg-black/20 hover:bg-black/40 text-white border border-white/30 rounded-full w-full py-7 font-bold uppercase tracking-widest shadow-lg">
            Explore Recipes
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
