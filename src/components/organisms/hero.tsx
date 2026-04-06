import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center px-6 lg:px-16 py-12 overflow-hidden bg-[#F9F9F9]">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Food Image */}
        <div className="relative order-2 lg:order-1 flex justify-center">
          {/* Main Food Image */}
          <div className="relative w-full max-w-[500px] aspect-square">
            <Image
              src="/path-ke-gambar-biryani-kamu.png" // Ganti dengan image path
              alt="Mutton Biryani"
              fill
              className="object-contain drop-shadow-2xl z-10"
              priority
            />
          </div>

          {/* Floating Spices/Accents (Optional Decor) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-60">
            {/* Kamu bisa tambah image kayu manis/cengkeh kecil di sini */}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="space-y-2">
            <h3 className="text-3xl italic font-serif text-[#4A3728]">
              Mutton
            </h3>
            <h1 className="text-7xl lg:text-9xl font-black text-[#4A3728] leading-[0.8]">
              Biryani
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-orange-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="font-bold text-lg">4.5</span>
            <span className="text-sm text-gray-400 underline decoration-dotted">
              521 Reviews
            </span>
          </div>

          {/* Description Card */}
          <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-xl shadow-gray-200/50 max-w-lg border border-white">
            <p className="text-gray-600 leading-relaxed text-lg italic font-medium">
              "Aromatic, soft, and tender chunks of lamb layered with rice
              infused with the flavors of spices. The delicate blend of
              cardamom, cloves, and cinnamon creates a symphony of tastes in
              every bite."
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="bg-[#EAB308] hover:bg-[#CA8A04] text-white px-10 py-7 rounded-full font-bold text-lg shadow-lg shadow-orange-200"
            >
              ORDER NOW
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#EAB308] text-[#EAB308] hover:bg-orange-50 px-10 py-7 rounded-full font-bold text-lg"
            >
              EXPLORE MORE
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Wave at Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 120H1440V50C1200 120 720 0 0 80V120Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};
