// src/components/molecules/SearchBar.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  variant?: "navbar" | "default";
}

export const SearchBar = ({
  value,
  onChange,
  placeholder,
  className,
  variant = "default",
}: SearchBarProps) => (
  <div className={cn("relative group w-full", className)}>
    <Search
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300",
        variant === "navbar" ? "w-4 h-4" : "w-5 h-5",
      )}
    />
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn(
        "w-full transition-all duration-300 outline-none",
        "bg-gray-50/50 border-gray-100 focus:bg-white focus:border-red-200 focus:ring-4 focus:ring-red-500/5",
        variant === "navbar"
          ? "h-10 pl-11 pr-4 rounded-xl text-sm"
          : "h-14 pl-12 pr-4 rounded-2xl text-base shadow-sm",
      )}
    />
  </div>
);
