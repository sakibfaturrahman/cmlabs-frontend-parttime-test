"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home, Salad, Menu, Loader2, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/molecules/searchBar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { mealService } from "@/services/mealService";
import Image from "next/image";

const NAV_ITEMS = [
  { id: "home", label: "home", href: "/", icon: <Home size={16} /> },
  {
    id: "ingredients",
    label: "ingredients",
    href: "/ingredients",
    icon: <Salad size={16} />,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  // Search States
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Real-time Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchValue.trim().length > 2) {
        setIsSearching(true);
        setShowDropdown(true);
        try {
          const res = await mealService.searchMealByName(searchValue);
          setResults(res ? res.slice(0, 5) : []); // Limit 5 hasil agar tetap minimalis
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300); // Debounce 300ms agar tidak membebani API

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm"
          : "bg-white border-transparent py-6",
      )}
    >
      <div className="container mx-auto max-w-6xl px-8 lg:px-12 flex items-center justify-between gap-8">
        {/* LEFT: Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 group cursor-pointer"
        >
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            mealio
          </span>
        </Link>

        {/* CENTER: Search Bar with Dropdown */}
        <div
          className="flex-1 max-w-sm hidden md:block relative"
          ref={dropdownRef}
        >
          <SearchBar
            variant="navbar"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="search recipes by name..."
          />

          {/* Results Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden p-2"
              >
                {isSearching ? (
                  <div className="p-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <Loader2 size={16} className="animate-spin" />
                    searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="flex flex-col">
                    {results.map((meal) => (
                      <button
                        key={meal.idMeal}
                        onClick={() => {
                          router.push(`/recipe/${meal.idMeal}`);
                          setShowDropdown(false);
                          setSearchValue("");
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {meal.strMeal.toLowerCase()}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium">
                            {meal.strCategory} • {meal.strArea}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400 text-sm">
                    no recipes found for "{searchValue}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors flex items-center gap-2",
                  isActive
                    ? "text-red-600"
                    : "text-gray-500 hover:text-gray-900",
                )}
              >
                {item.icon} {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-red-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
