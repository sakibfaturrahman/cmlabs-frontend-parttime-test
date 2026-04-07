// src/components/templates/CategoryLayout.tsx
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";
import { motion } from "framer-motion";

interface CategoryLayoutProps {
  title: string;
  description: string;
  searchSlot: React.ReactNode;
  children: React.ReactNode;
}

export const CategoryLayout = ({
  title,
  description,
  searchSlot,
  children,
}: CategoryLayoutProps) => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <header className="pt-32 pb-16 bg-white">
      <div className="container mx-auto max-w-6xl px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            {title.toLowerCase()}
            <span className="text-red-600">.</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto mb-10 font-medium">
            {description}
          </p>
          <div className="max-w-xl mx-auto">{searchSlot}</div>
        </motion.div>
      </div>
    </header>
    <main className="container mx-auto max-w-6xl px-8 lg:px-12 pb-24">
      {children}
    </main>
    <Footer />
  </div>
);
