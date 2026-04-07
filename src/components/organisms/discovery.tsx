"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const Discovery = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-50/30 rounded-[100%] blur-[120px] -z-10" />

      <div className="container mx-auto max-w-6xl px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight max-w-3xl">
            find your ideal menu based on <br className="hidden md:block" />
            <span className="text-red-600">your favorite ingredients.</span>
          </h2>

          {/* Description */}
          <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg leading-relaxed font-medium">
            Confused about what to cook today? Just pick the ingredients you
            have in your kitchen, and we'll find the best global recipes for
            you.
          </p>

          {/* Action Button */}
          <div className="flex justify-center">
            <Link href="/ingredients">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-10 h-14 rounded-2xl font-medium shadow-xl shadow-red-100 transition-all group flex items-center gap-2"
              >
                See all ingredients
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
