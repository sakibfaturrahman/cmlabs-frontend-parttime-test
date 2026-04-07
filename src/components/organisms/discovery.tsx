import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Discovery = () => {
  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-sm font-bold text-orange-600 uppercase tracking-[0.3em] mb-4">
          Cari Inspirasi Masak
        </h2>
        <h3 className="text-4xl md:text-5xl font-black text-[#4A3728] mb-6 leading-tight">
          Temukan Menu Ideal <br /> Berdasarkan Bahan Pilihanmu
        </h3>
        <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-lg">
          Bingung mau masak apa hari ini? Pilih bahan makanan yang kamu miliki
          di dapur, dan kami akan carikan resep terbaik dari seluruh dunia
          untukmu.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/ingredients">
            <Button
              size="lg"
              className="bg-[#EAB308] hover:bg-[#CA8A04] text-white px-8 py-6 rounded-full font-bold"
            >
              LIHAT SEMUA BAHAN
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
