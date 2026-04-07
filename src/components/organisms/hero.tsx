"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-[120px] -z-10" />

      {/* Container dengan Margin Samping yang Luas (Max-w-6xl untuk kesan ke tengah) */}
      <div className="container mx-auto max-w-6xl px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { staggerChildren: 0.1, duration: 0.6 },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight"
          >
            pure <span className="text-red-600">{title.toLowerCase()}</span>
          </motion.h1>

          {/* Deskripsi Terbatas (Truncated) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <p className="text-gray-500 text-lg leading-relaxed mb-4 max-w-sm line-clamp-2">
              {description}
            </p>
            <button className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:gap-2 transition-all mb-10">
              Read details <ChevronRight size={16} />
            </button>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex items-center gap-4"
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 h-14 rounded-2xl font-medium shadow-xl shadow-red-100 transition-all group"
            >
              Explore recipes
              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: Floating Image */}
        <motion.div
          style={{ y: y1 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-[420px] aspect-square"
          >
            {/* Ambient Shadow */}
            <div className="absolute inset-0 bg-gray-100/60 rounded-full blur-[80px] -z-10 transform translate-y-12 scale-90" />

            <Image
              src={
                image ||
                "https://www.themealdb.com/images/ingredients/chicken.png"
              }
              alt={title}
              fill
              className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.08)]"
              priority
            />

            {/* Floating Molecule Badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -left-4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-gray-50 hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-gray-800 tracking-tight">
                  100% Organic
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
