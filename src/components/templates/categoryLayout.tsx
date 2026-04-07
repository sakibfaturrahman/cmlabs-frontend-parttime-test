import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";

interface CategoryLayoutProps {
  title: string;
  description: string;
  searchSlot: React.ReactNode;
  children: React.ReactNode;
  headerBg?: string; // Untuk membedakan warna header All Ingredients vs Detail
}

export const CategoryLayout = ({
  title,
  description,
  searchSlot,
  children,
  headerBg = "bg-orange-50",
}: CategoryLayoutProps) => (
  <div className="min-h-screen bg-[#FDFDFD]">
    <Navbar />
    <header className={`py-16 bg-gradient-to-b ${headerBg} to-transparent`}>
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-[#4A3728] mb-4 tracking-tighter uppercase leading-none">
          {title}
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto mb-10 font-medium italic">
          {description}
        </p>
        {searchSlot}
      </div>
    </header>
    <main className="container mx-auto px-6 pb-24">{children}</main>
    <Footer />
  </div>
);
