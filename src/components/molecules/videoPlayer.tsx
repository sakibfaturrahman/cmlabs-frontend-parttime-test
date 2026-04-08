// src/components/molecules/VideoPlayer.tsx
import { PlayCircle } from "lucide-react";

export const VideoPlayer = ({ url, title }: { url: string; title: string }) => {
  const videoId = url.split("v=")[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="space-y-12">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
          video tutorial.
        </h2>
      </div>
      <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl shadow-red-900/10 border-[12px] border-gray-50">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedUrl}
          title={title}
          allowFullScreen
        />
      </div>
    </div>
  );
};
