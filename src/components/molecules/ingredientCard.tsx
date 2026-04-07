// src/components/molecules/IngredientCard.tsx
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const IngredientCard = ({ ing }: { ing: any }) => (
  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
    <Link href={`/ingredients/${ing.strIngredient}`}>
      <div className="group bg-white border border-gray-100 rounded-[2.5rem] p-6 transition-all hover:shadow-2xl hover:shadow-red-50 cursor-pointer h-full flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-6 transition-transform duration-500 group-hover:scale-110">
          <Image
            src={`https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`}
            alt={ing.strIngredient}
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
              {ing.strIngredient.toLowerCase()}
            </h3>
            <ArrowUpRight
              size={14}
              className="text-red-600 opacity-0 group-hover:opacity-100 transition-all"
            />
          </div>
          <p className="text-gray-400 text-xs line-clamp-2 font-medium">
            {ing.strDescription ||
              "tap to explore delicious recipes using this ingredient."}
          </p>
        </div>
      </div>
    </Link>
  </motion.div>
);
