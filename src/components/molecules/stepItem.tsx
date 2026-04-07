"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  color: string;
}

export const StepItem = ({
  icon,
  title,
  description,
  index,
  color,
}: StepItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="text-center flex flex-col items-center group relative z-10"
    >
      {/* Icon Container */}
      <div
        className={`w-20 h-20 ${color} rounded-3xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
      >
        {icon}
      </div>

      {/* Step Number */}
      <div className="text-xs font-black text-gray-300 mb-2 uppercase tracking-tighter">
        Step 0{index + 1}
      </div>

      <h4 className="text-2xl font-bold text-[#4A3728] mb-4">{title}</h4>

      <p className="text-gray-500 leading-relaxed font-medium">{description}</p>
    </motion.div>
  );
};
