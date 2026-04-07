// src/components/organisms/HowItWorks.tsx
import { MousePointerClick, Search, UtensilsCrossed } from "lucide-react";
import { StepItem } from "@/components/molecules/stepItem";

const steps = [
  {
    icon: <MousePointerClick className="w-8 h-8 text-orange-500" />,
    title: "Choose Ingredient",
    description:
      "Pilih bahan utama yang tersedia di dapurmu, mulai dari daging hingga sayuran segar.",
    color: "bg-orange-50",
  },
  {
    icon: <Search className="w-8 h-8 text-blue-500" />,
    title: "Explore Meals",
    description:
      "Kami akan mencarikan berbagai resep lezat yang bisa dibuat dengan bahan pilihanmu.",
    color: "bg-blue-50",
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8 text-green-500" />,
    title: "Cook & Enjoy",
    description:
      "Ikuti instruksi memasak yang lengkap dan nikmati hidangan spesial buatanmu sendiri.",
    color: "bg-green-50",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-bold uppercase tracking-[0.3em] text-sm mb-4">
            Simple Process
          </h2>
          <h3 className="text-4xl font-black text-[#4A3728]">
            Bagaimana Cara Kerjanya?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <StepItem
                index={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                color={step.color}
              />

              {/* Arrow Connector Logic tetap di level Organism karena menghubungkan antar item */}
              {index < 2 && (
                <div className="hidden lg:block absolute top-[25%] left-[75%] w-full text-gray-100 z-0">
                  <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                    <path
                      d="M0 10H90M90 10L80 1M90 10L80 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
