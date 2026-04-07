import Image from "next/image";
import { HeroContent } from "@/components/molecules/heroContent";

interface HeroProps {
  title: string;
  description: string;
  image: string;
}

export const Hero = ({ title, description, image }: HeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center px-6 lg:px-16 py-12 overflow-hidden bg-[#F9F9F9]">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Side: Food Image */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          <div className="relative w-full max-w-[500px] aspect-square">
            <Image
              src={
                image ||
                "https://www.themealdb.com/images/ingredients/chicken.png"
              }
              alt={title || "Featured Ingredient"}
              fill
              className="object-contain drop-shadow-2xl z-10"
              priority
            />
          </div>
        </div>

        {/* Right Side: Hero Content (Molecule) */}
        <div className="order-1 lg:order-2">
          <HeroContent title={title} description={description} />
        </div>
      </div>

      {/* Gelombang Bawah */}
      <div className="absolute bottom-0 left-0 w-full rotate-180">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="h-[100px] w-full"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};
