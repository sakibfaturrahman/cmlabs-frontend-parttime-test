"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home, Salad, Menu, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/molecules/searchBar";
import { useMeals } from "@/hooks/useMeals"; // Import Custom Hook
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

  // States
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Gunakan Search logic dari custom hooks
  const { searchMeals, loading: isSearching } = useMeals();

  // Close dropdown on click outside
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

  // Handle Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debounced Search Logic menggunakan Hook
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchValue.trim().length > 2) {
        setShowDropdown(true);
        const data = await searchMeals(searchValue);
        setResults(data ? data.slice(0, 5) : []);
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, searchMeals]);

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
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
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

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden p-2 z-[60]"
              >
                {isSearching ? (
                  <div className="p-6 flex items-center justify-center gap-3 text-gray-400 text-sm italic">
                    <Loader2 size={18} className="animate-spin text-red-600" />
                    finding recipes...
                  </div>
                ) : results.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {results.map((meal) => (
                      <button
                        key={meal.idMeal}
                        onClick={() => {
                          // Navigasi ke detail resep
                          router.push(
                            `/ingredients/${meal.strCategory}/${meal.idMeal}`,
                          );
                          setShowDropdown(false);
                          setSearchValue("");
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-red-50/50 rounded-xl transition-all text-left group"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                          <Image
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate group-hover:text-red-600 transition-colors">
                            {meal.strMeal.toLowerCase()}
                          </p>
                          <p className="text-[10px] text-gray-400 font-semibold tracking-wider">
                            {meal.strCategory} • {meal.strArea}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-400 text-sm">
                    no recipes found for{" "}
                    <span className="text-gray-900 font-bold">
                      "{searchValue}"
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            // LOGIKA ACTIVE LINK:
            // Jika link adalah "/", harus sama persis.
            // Jika link adalah "/ingredients", cek apakah pathname diawali dengan "/ingredients"
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

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

        {/* Action: Mobile Menu */}
        <button className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};
