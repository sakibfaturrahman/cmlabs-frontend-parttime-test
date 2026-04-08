"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const SwiperIngredient = ({ ing }: { ing: any }) => {
  const router = useRouter();

  return (
    <motion.div
      onTap={() => router.push(`/ingredients/${ing.strIngredient}`)}
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 30px -10px rgb(220 38 38 / 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      className="min-w-[170px] h-[220px] bg-white border border-gray-100 rounded-[2.5rem] p-6 flex flex-col items-center justify-between transition-all cursor-pointer group shrink-0 shadow-sm"
    >
      <div className="relative w-24 h-24 transition-transform group-hover:rotate-6 duration-500 pointer-events-none">
        <Image
          src={`https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`}
          alt={ing.strIngredient}
          fill
          className="object-contain"
          sizes="96px"
        />
      </div>

      <div className="text-center space-y-1 pointer-events-none">
        <span className="block text-sm font-bold text-gray-900 leading-tight">
          {ing.strIngredient.toLowerCase()}
        </span>
        <div className="flex items-center justify-center gap-1">
          <span className="block text-[9px] text-red-500 tracking-widest">
            rekommendation
          </span>
        </div>
      </div>
    </motion.div>
  );
};
