"use client";

import React, { useState, useEffect } from "react";
import { Search, Home, Salad, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: <Home size={18} /> },
  { id: "ingredients", label: "Ingredients", icon: <Salad size={18} /> },
];

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm"
          : "bg-white border-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-10">
        {/* 1. Brand: Mealio */}
        <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            mealio
          </span>
        </div>

        {/* 2. Search Bar (Center-Left Expansion) */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300"
              size={17}
            />
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full bg-gray-50/50 border border-gray-100 focus:border-red-200 focus:bg-white focus:ring-4 focus:ring-red-500/5 rounded-xl py-2 pl-11 pr-4 text-sm transition-all outline-none"
            />
          </div>
        </div>

        {/* 3. Navigation: Underline Style */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "relative py-1 text-sm font-medium transition-colors duration-300 flex items-center gap-2",
                activeTab === item.id
                  ? "text-red-600"
                  : "text-gray-500 hover:text-gray-900",
              )}
            >
              {item.icon}
              {item.label}

              {activeTab === item.id && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-red-600 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Action: Mobile Menu */}
        <button className="md:hidden ml-auto p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};
