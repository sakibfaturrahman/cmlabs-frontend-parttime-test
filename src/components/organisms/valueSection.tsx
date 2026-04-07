// src/components/organisms/ValueSection.tsx
import { Zap, BookOpen, HeartPulse } from "lucide-react";
import { ValueCard } from "@/components/molecules/valueItem";

const values = [
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Fast Search",
    description:
      "Cari bahan dan resep secara instan tanpa menunggu lama. Efisiensi adalah prioritas kami.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-orange-500" />,
    title: "Hundreds of Recipes",
    description:
      "Akses ke ratusan database resep dari TheMealDB yang terus diperbarui setiap hari.",
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-red-500" />,
    title: "Easy to Cook",
    description:
      "Instruksi yang jelas dan sederhana, dirancang agar siapapun bisa memasak dengan nikmat.",
  },
];

export const ValueSection = () => {
  return (
    <section className="py-20 bg-orange-50/30">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((val, index) => (
            <ValueCard
              key={index}
              index={index}
              icon={val.icon}
              title={val.title}
              description={val.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
