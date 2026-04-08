"use client";

import React, { useState, useEffect, useRef } from "react";
import { Home, Salad, Menu, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/molecules/searchBar";
import { useMeals } from "@/hooks/useMeals";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/", icon: <Home size={16} /> },
  {
    id: "ingredients",
    label: "Ingredients",
    href: "/ingredients",
    icon: <Salad size={16} />,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { searchMeals, loading: isSearching } = useMeals();

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ini debounced search logic menggunakan hook
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 transition-all duration-500 z-[100]",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm"
          : "bg-white border-transparent py-6",
      )}
    >
      <div className="container mx-auto max-w-6xl px-8 lg:px-12 flex items-center justify-between gap-8 relative z-[101]">
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 group cursor-pointer"
        >
          <span className="text-xl font-black text-gray-900 tracking-tight">
            mealio
          </span>
        </Link>

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
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden p-2 z-[102]"
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

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
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

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          className="md:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-xl transition-all relative z-[110]"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[120] md:hidden flex flex-col p-8 pt-24 gap-10"
          >
            <div className="flex justify-between items-center absolute top-6 left-8 right-8">
              <span className="text-xl font-black text-gray-900 tracking-tight">
                mealio
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={28} />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative mt-4"
            >
              <SearchBar
                variant="navbar"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="search recipes..."
              />
              <AnimatePresence>
                {showDropdown && searchValue.trim().length > 2 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden p-2"
                  >
                    {isSearching ? (
                      <div className="p-4 flex justify-center italic text-xs text-gray-400">
                        finding...
                      </div>
                    ) : (
                      results.map((meal) => (
                        <button
                          key={meal.idMeal}
                          onClick={() => {
                            router.push(
                              `/ingredients/${meal.strCategory}/${meal.idMeal}`,
                            );
                            setIsMobileMenuOpen(false);
                            setSearchValue("");
                          }}
                          className="flex items-center gap-3 p-2 w-full text-left active:bg-red-50 rounded-xl transition-colors"
                        >
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={meal.strMealThumb}
                              alt={meal.strMeal}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-xs font-bold text-gray-900 truncate">
                            {meal.strMeal.toLowerCase()}
                          </p>
                        </button>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      delay: 0.2 + index * 0.1,
                      stiffness: 100,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-5 rounded-[2rem] text-xl font-bold transition-all active:scale-95",
                        isActive
                          ? "bg-red-600 text-white shadow-lg shadow-red-200"
                          : "bg-gray-50 text-gray-500 active:bg-gray-100",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        {item.icon}
                        {item.label}
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="active-pill-mobile"
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-auto text-center pb-8"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                mealio • daily recipes
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
