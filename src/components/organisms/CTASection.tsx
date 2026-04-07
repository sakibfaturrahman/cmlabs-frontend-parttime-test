"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils } from "lucide-react";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-20 px-6 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto relative overflow-hidden bg-gradient-to-br from-[#EAB308] to-orange-600 rounded-[3rem] p-12 lg:p-20 text-center text-white shadow-2xl shadow-orange-200"
      >
        {/* Dekorasi Abstrak */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -mr-32 -mb-32" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl mb-8 backdrop-blur-md">
            <Utensils className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            Siap Menghidangkan <br /> Masakan Spesial?
          </h2>

          <p className="text-white/80 text-lg md:text-xl mb-12 font-medium max-w-xl mx-auto italic">
            "Start exploring recipes now and turn your simple ingredients into
            extraordinary meals."
          </p>

          <Link href="/ingredients">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-8 rounded-full font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto uppercase tracking-wider"
            >
              Explore Ingredients
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
