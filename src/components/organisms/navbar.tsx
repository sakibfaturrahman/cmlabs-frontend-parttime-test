import { Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 lg:px-16 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      {/* Logo Area */}
      <div className="flex flex-col leading-tight">
        <span className="text-2xl font-black text-[#4A3728] tracking-tighter">
          KANIGIRI
        </span>
        <span className="text-[10px] tracking-[0.2em] font-medium text-orange-600 uppercase">
          Taste of Andhra
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 lg:gap-8">
        {/* Call Info - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-2 border border-orange-200 bg-orange-50/50 px-4 py-2 rounded-full">
          <div className="bg-orange-500 p-1.5 rounded-full text-white">
            <Phone size={14} fill="currentColor" />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            CALL: +91 90007 90007
          </span>
        </div>

        {/* Login Button */}
        <Button className="bg-[#EAB308] hover:bg-[#CA8A04] text-white rounded-full px-8 font-bold">
          LOGIN
        </Button>

        {/* Menu Icon */}
        <button className="text-orange-600">
          <Menu size={32} />
        </button>
      </div>
    </nav>
  );
};
