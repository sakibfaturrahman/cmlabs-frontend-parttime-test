import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => (
  <div className="max-w-xl mx-auto relative group">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
    <Input
      type="text"
      placeholder={placeholder}
      className="pl-12 py-7 rounded-full border-2 border-orange-100 focus:border-orange-500 shadow-xl transition-all text-lg"
      value={value}
      onChange={onChange}
    />
  </div>
);
