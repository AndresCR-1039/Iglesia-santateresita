"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Noticia, getNews } from "@/services/newsService";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default function NewsCarousel() {
  const [news, setNews] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getNews();
        setNews(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.slice(0, 3).map((item) => (
        <article
          key={item.id}
          className="card-hover group bg-[#1a1510]/40 rounded-[2.5rem] overflow-hidden border border-[#b48c50]/20 flex flex-col"
        >
          {/* Image Container */}
          <div className="relative h-64 w-full overflow-hidden">
            {item.imagen_url ? (
              <Image
                src={item.imagen_url}
                alt={item.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-[#b48c50]/10 flex items-center justify-center">
                <Calendar size={48} className="text-[#b48c50] opacity-20" />
              </div>
            )}
            <div className="absolute top-6 left-6 bg-[#b48c50] text-[#1a1510] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">
              Noticia
            </div>
          </div>

          {/* Content */}
          <div className="p-10 flex flex-col flex-grow">
            <div className="flex items-center gap-3 mb-6 text-[#b48c50]/60 text-[10px] font-bold uppercase tracking-widest">
              <Calendar size={12} />
              {new Date(item.created_at).toLocaleDateString()}
            </div>
            
            <h3 className="font-display font-bold text-2xl mb-6 text-[#f0e6d3] group-hover:text-[#b48c50] transition-colors leading-tight">
              {item.titulo}
            </h3>
            
            <p className="text-[#f0e6d3]/60 text-sm leading-relaxed mb-10 line-clamp-3 italic">
              {item.resumen}
            </p>

            <Link 
              href={`/noticias/${item.id}`}
              className="mt-auto flex items-center gap-3 text-[#b48c50] font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-6 transition-all"
            >
              Leer más <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
