// src/components/templates/DetailTemplate.tsx
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";

interface DetailTemplateProps {
  backButton: React.ReactNode;
  mediaSlot: React.ReactNode;
  contentSlot: React.ReactNode;
  bottomSlot?: React.ReactNode;
}

export const DetailTemplate = ({
  backButton,
  mediaSlot,
  contentSlot,
  bottomSlot,
}: DetailTemplateProps) => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="container mx-auto px-6 pt-10 pb-20">
      {backButton}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-6">
        <div>{mediaSlot}</div>
        <div>{contentSlot}</div>
      </div>
      {bottomSlot}
    </main>
    <Footer />
  </div>
);
