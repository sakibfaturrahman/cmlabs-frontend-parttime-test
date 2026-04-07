// src/components/molecules/ValueCard.tsx
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export const ValueCard = ({
  icon,
  title,
  description,
  index,
}: ValueCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-8 bg-white rounded-[2.5rem] shadow-sm border border-orange-100 hover:shadow-xl transition-shadow duration-500 group"
    >
      {/* Floating Icon Animation */}
      <motion.div
        className="mb-6 p-4 rounded-2xl bg-orange-50 group-hover:bg-orange-100 transition-colors"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>

      <h4 className="text-2xl font-black text-[#4A3728] mb-3 uppercase tracking-tighter">
        {title}
      </h4>

      <p className="text-gray-500 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
};
