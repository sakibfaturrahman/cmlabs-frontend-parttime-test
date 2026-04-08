import { FooterLinkGroup } from "@/components/molecules/footerLinkGroup";
import { Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12">
      <div className="container mx-auto max-w-6xl px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                mealio
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              turning simple ingredients into extraordinary culinary
              experiences, one recipe at a time.
            </p>
          </div>

          <FooterLinkGroup title="Navigation" links={["Home", "Ingredients"]} />

          <FooterLinkGroup
            title="Support"
            links={["Help Center", "Privacy Policy", "Terms of Service"]}
          />

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-900 tracking-tight">
              Our Kitchen
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-500 text-sm leading-relaxed">
                <MapPin size={18} className="text-red-600 shrink-0" />
                <span>Tasikmalaya, West Java, Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Mail size={18} className="text-red-600 shrink-0" />
                <span>mealio@.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-gray-400 text-xs font-medium">
              © 2026 mealio. crafted by{" "}
              <span className="text-gray-900">sakib faturrahman</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
