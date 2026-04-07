// src/components/organisms/Footer.tsx
import { FooterLinkGroup } from "@/components/molecules/footerLinkGroup";

export const Footer = () => {
  return (
    // Celah batas 7px di sekeliling footer untuk efek floating card
    <footer className="p-[7px] bg-white">
      <div className="bg-[#4A3728] rounded-[3rem] px-8 py-16 lg:p-20 text-white relative overflow-hidden">
        {/* Dekorasi Abstrak di Pojok */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">
                  KANIGIRI
                </h2>
                <p className="text-orange-500 text-[10px] tracking-[0.3em] font-bold uppercase mt-1">
                  Taste of Andhra
                </p>
              </div>
              <p className="text-white/60 text-sm leading-relaxed italic max-w-xs">
                "Turning simple ingredients into extraordinary culinary
                experiences, one recipe at a time."
              </p>
              {/* Bagian Sosmed dihapus untuk tampilan lebih minimalis */}
            </div>

            {/* Links Section 1 */}
            <FooterLinkGroup
              title="Navigation"
              links={["Home", "Ingredients", "Featured Meals", "Process"]}
            />

            {/* Links Section 2 */}
            <FooterLinkGroup
              title="Legal & Support"
              links={[
                "Help Center",
                "Privacy Policy",
                "Terms of Service",
                "Contact",
              ]}
            />

            {/* Contact Section */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-black uppercase tracking-widest text-sm">
                Our Kitchen
              </h4>
              <p className="text-white/60 text-sm font-medium leading-relaxed">
                Jl. Perjuangan No. 123,
                <br />
                Tasikmalaya, West Java,
                <br />
                Indonesia
              </p>
              <div className="pt-2">
                <span className="text-orange-400 font-bold text-sm underline decoration-dotted cursor-pointer hover:text-orange-300 transition-colors">
                  View on Google Maps
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Area */}
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
              © 2026 KANIGIRI RECIPE • CRAFTED BY SAKIB FATURRAHMAN
            </p>

            <div className="flex gap-6 text-[9px] text-white/20 font-black uppercase tracking-tighter">
              <span className="hover:text-white/40 transition-colors">
                Next.js 14
              </span>
              <span className="hover:text-white/40 transition-colors">
                Tailwind CSS
              </span>
              <span className="hover:text-white/40 transition-colors">
                Framer Motion
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
