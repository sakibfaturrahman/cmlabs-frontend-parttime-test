// src/components/templates/DetailTemplate.tsx
import { Navbar } from "@/components/organisms/navbar";
import { Footer } from "@/components/organisms/footer";

export const DetailTemplate = ({
  backButton,
  mediaSlot,
  contentSlot,
  bottomSlot,
}: any) => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="container mx-auto max-w-6xl px-8 lg:px-12 pt-32 pb-24">
      <div className="mb-10">{backButton}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="sticky top-32">{mediaSlot}</div>
        <div>{contentSlot}</div>
      </div>
      {bottomSlot && <div className="mt-32">{bottomSlot}</div>}
    </main>
    <Footer />
  </div>
);
