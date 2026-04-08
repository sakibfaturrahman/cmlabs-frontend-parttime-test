"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Onboarding } from "@/components/molecules/onboarding";
import { Navbar } from "@/components/organisms/navbar";
import { Hero } from "@/components/organisms/hero";
import { Discovery } from "@/components/organisms/discovery";
import { TopIngredient } from "@/components/organisms/topIngredient";
import { FeaturedMeals } from "@/components/organisms/featuredMeals";
import { Footer } from "@/components/organisms/footer";

export default function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    // Set onboarding selama 2 detik
    const timer = setTimeout(() => {
      setShowOnboarding(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{showOnboarding && <Onboarding />}</AnimatePresence>

      <div className="min-h-screen bg-white">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: showOnboarding ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="pt-10 lg:pt-5"
        >
          <Hero />
          <TopIngredient />
          <Discovery />
          <FeaturedMeals />
          <Footer />
        </motion.main>
      </div>
    </>
  );
}
