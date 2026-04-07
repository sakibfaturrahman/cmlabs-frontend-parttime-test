// src/components/molecules/swipeIngredient.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const SwiperIngredient = ({ ing }: { ing: any }) => {
  const router = useRouter();

  return (
    <motion.div
      // Menggunakan onTap agar tidak bentrok dengan fungsi drag
      onTap={() => router.push(`/ingredients/${ing.strIngredient}`)}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
      whileTap={{ scale: 0.95 }}
      className="min-w-[160px] h-[210px] bg-white border border-gray-100 rounded-3xl p-6 flex flex-col items-center justify-between transition-all cursor-pointer group shrink-0"
    >
      <div className="relative w-20 h-20 transition-transform group-hover:scale-110 duration-300 pointer-events-none">
        <Image
          src={`https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`}
          alt={ing.strIngredient}
          fill
          className="object-contain"
        />
      </div>

      <div className="text-center space-y-1 pointer-events-none">
        <span className="block text-sm font-semibold text-gray-800 leading-tight">
          {ing.strIngredient}
        </span>
        <span className="block text-[10px] text-red-500 font-medium">
          Fresh Product
        </span>
      </div>
    </motion.div>
  );
};
