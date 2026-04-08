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
    <main className="container mx-auto max-w-6xl px-6 lg:px-12 pt-28 lg:pt-36 pb-24">
      <div className="mb-8 lg:mb-10">{backButton}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-32 z-0">{mediaSlot}</div>
        <div className="relative z-10 bg-white">{contentSlot}</div>
      </div>
      {bottomSlot && <div className="mt-24 lg:mt-32">{bottomSlot}</div>}
    </main>
    <Footer />
  </div>
);
