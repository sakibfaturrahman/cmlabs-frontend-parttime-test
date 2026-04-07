import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroContentProps {
  title: string;
  description: string;
}

export const HeroContent = ({ title, description }: HeroContentProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-3xl italic font-serif text-[#4A3728]">
          Featured Ingredient
        </h3>
        <h1 className="text-7xl lg:text-9xl font-black text-[#4A3728] leading-[0.8] uppercase tracking-tighter">
          {title}
        </h1>
      </div>

      {/* Description */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-xl shadow-gray-200/50 max-w-lg border border-white">
        <p className="text-gray-600 leading-relaxed text-sm italic font-medium line-clamp-4">
          "{description}"
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 pt-4">
        <Link href={`/ingredients/${title}`}>
          <Button
            size="lg"
            className="bg-[#EAB308] hover:bg-[#CA8A04] text-white px-10 py-7 rounded-full font-bold text-lg shadow-lg shadow-orange-200"
          >
            EXPLORE RECIPES
          </Button>
        </Link>
      </div>
    </div>
  );
};
