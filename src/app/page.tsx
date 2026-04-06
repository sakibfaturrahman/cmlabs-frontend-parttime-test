// src/app/page.tsx
import { Navbar } from "@/components/organisms/navbar";
import { Hero } from "@/components/organisms/hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      {/* Nanti list ingredient-nya bisa taruh di bawah sini */}
    </div>
  );
}
