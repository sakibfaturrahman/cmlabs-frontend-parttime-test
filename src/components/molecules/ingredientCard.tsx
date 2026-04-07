import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const IngredientCard = ({ ing }: { ing: any }) => (
  <Link href={`/ingredients/${ing.strIngredient}`}>
    <Card className="group hover:border-orange-500 transition-all duration-300 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl rounded-3xl border-orange-50/50">
      <CardContent className="p-0">
        <div className="bg-gray-50 p-6 flex justify-center relative overflow-hidden">
          <Image
            src={`https://www.themealdb.com/images/ingredients/${ing.strIngredient}.png`}
            alt={ing.strIngredient}
            width={150}
            height={150}
            className="object-contain transition-transform duration-500 group-hover:scale-110 z-10"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-[#4A3728] group-hover:text-orange-600 transition-colors capitalize">
              {ing.strIngredient}
            </h3>
            <ArrowRight
              size={16}
              className="text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <p className="text-gray-400 text-xs line-clamp-2 italic">
            {ing.strDescription ||
              "Explore various recipes using this ingredient."}
          </p>
        </div>
      </CardContent>
    </Card>
  </Link>
);
