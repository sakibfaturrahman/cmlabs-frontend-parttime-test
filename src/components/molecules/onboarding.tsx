"use client";
import { motion } from "framer-motion";

export const Onboarding = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="relative flex flex-col items-center">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
            className="text-3xl font-black text-gray-900 tracking-tighter"
          >
            mealio<span className="text-red-600">.</span>
          </motion.h1>
        </div>

        <div className="mt-4 w-32 h-[2px] bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="w-full h-full bg-red-600"
          />
        </div>
      </div>
    </motion.div>
  );
};
