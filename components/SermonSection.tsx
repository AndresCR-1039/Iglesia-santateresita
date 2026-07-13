"use client";

import { useEffect, useState, useRef } from "react";
import { Sermon, getTodaySermon } from "@/services/sermonService";
import { Video, Maximize, User } from "lucide-react";

export default function SermonSection() {
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTodaySermon();
        setSermon(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleFullScreen = () => {
    if (videoContainerRef.current) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
        (videoContainerRef.current as any).webkitRequestFullscreen();
      } else if ((videoContainerRef.current as any).msRequestFullscreen) {
        (videoContainerRef.current as any).msRequestFullscreen();
      }
    }
  };

  if (loading || !sermon) return null;

  const isYouTube = sermon.video_url?.includes("youtube.com") || sermon.video_url?.includes("youtu.be");
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
    }
    return url;
  };

  const videoUrl = sermon.video_url;
  const embedUrl = isYouTube ? getEmbedUrl(videoUrl) : videoUrl;

  return (
    <section id="sermones" className="py-24 px-6 bg-[#b48c50]/5 border-y border-[#b48c50]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Left: Video Player */}
        <div 
          ref={videoContainerRef}
          className="w-full lg:w-3/5 aspect-video bg-[#1a1510] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#b48c50]/20 relative group"
        >
          {videoUrl && videoUrl.trim() !== "" ? (
            isYouTube ? (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                title={sermon.titulo}
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-full object-contain"
              />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#f0e6d3]/20 bg-[#1a1510] italic p-6 text-center">
              <Video size={48} className="mb-4 opacity-20" />
              El video del sermón estará disponible pronto.
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-2/5 text-left">
          <p className="text-sm tracking-[0.4em] uppercase mb-6 text-[#b48c50] font-bold">Palabra de Vida</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-8 text-[#f0e6d3] leading-tight">
            {sermon.titulo}
          </h2>
          
          <div className="flex items-center gap-4 mb-10 opacity-60">
            <div className="w-10 h-10 rounded-full bg-[#b48c50]/20 flex items-center justify-center">
              <User size={18} className="text-[#b48c50]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#f0e6d3]">Párroco</p>
              <p className="text-xs">{sermon.fecha}</p>
            </div>
          </div>

          <p className="text-lg text-[#f0e6d3]/70 mb-12 italic leading-relaxed border-l-4 border-[#b48c50] pl-6">
            "{sermon.descripcion}"
          </p>

          <button 
            onClick={handleFullScreen}
            className="group flex items-center gap-4 text-[#b48c50] font-bold uppercase tracking-widest text-sm hover:text-[#f0e6d3] transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-[#b48c50] flex items-center justify-center group-hover:bg-[#b48c50] group-hover:text-[#1a1510] transition-all">
              <Maximize size={18} />
            </div>
            <span>Pantalla Completa</span>
          </button>
        </div>
      </div>
    </section>
  );
}
