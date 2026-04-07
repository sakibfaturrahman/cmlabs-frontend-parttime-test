// src/components/molecules/VideoPlayer.tsx
import { Play } from "lucide-react";

export const VideoPlayer = ({ url, title }: { url: string; title: string }) => {
  const videoId = url.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="mt-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-[#4A3728] uppercase tracking-tighter flex items-center justify-center gap-4">
          <Play className="fill-orange-600 text-orange-600" /> Video Tutorial
        </h2>
        <p className="text-gray-400 mt-2 font-medium">
          Watch the step-by-step guide to master this dish
        </p>
      </div>
      <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-gray-50">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedUrl}
          title={title}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
