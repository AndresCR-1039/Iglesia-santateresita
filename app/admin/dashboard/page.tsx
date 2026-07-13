"use client";

import Link from "next/link";
import { Newspaper, Video, Clock, ChevronRight } from "lucide-react";

const stats = [
  { name: "Noticias", count: "Gestionar", icon: Newspaper, href: "/admin/noticias", color: "bg-[#b48c50]/20" },
  { name: "Sermones", count: "Gestionar", icon: Video, href: "/admin/sermones", color: "bg-[#b48c50]/20" },
  { name: "Horarios", count: "Gestionar", icon: Clock, href: "/admin/horarios", color: "bg-[#b48c50]/20" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 md:p-14">
      <header className="flex justify-between items-center mb-16">
        <div>
          <h1 className="font-display font-bold text-4xl text-[#f0e6d3] mb-3">Paz y Bien, Padre</h1>
          <p className="text-[#f0e6d3]/50 text-base italic">"Mi vocación es el amor"</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            href={stat.href}
            className="group relative bg-[#1f1a14] p-10 rounded-[2.5rem] border border-[#b48c50]/10 hover:border-[#b48c50]/30 transition-all shadow-xl"
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`p-5 rounded-2xl ${stat.color} text-[#b48c50]`}>
                <stat.icon size={28} />
              </div>
              <ChevronRight className="text-[#b48c50]/20 group-hover:text-[#b48c50] group-hover:translate-x-2 transition-all" />
            </div>
            <div>
              <p className="text-[#b48c50] text-xs font-bold uppercase tracking-[0.2em] mb-2">{stat.name}</p>
              <p className="font-display font-bold text-3xl text-[#f0e6d3]">{stat.count}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-[#1f1a14] rounded-[3rem] p-12 border border-[#b48c50]/5 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
          <svg width="200" height="200" viewBox="0 0 36 36" fill="currentColor">
            <rect x="15" y="4" width="6" height="28" rx="1" />
            <rect x="8" y="12" width="20" height="6" rx="1" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-2xl text-[#b48c50] mb-8">Actividad Sugerida</h3>
        <div className="space-y-6">
          <p className="text-[#f0e6d3]/60 leading-relaxed max-w-2xl">
            Bienvenido al sistema de gestión de la parroquia. Aquí puedes actualizar las noticias de la comunidad, 
            compartir tus sermones dominicales y ajustar los horarios de las celebraciones.
          </p>
          <div className="pt-4 flex gap-6">
             <div className="flex items-center gap-2 text-xs font-bold text-[#b48c50]/40 uppercase tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-[#b48c50]"></div>
               Sistema listo
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-[#b48c50]/40 uppercase tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-[#b48c50]"></div>
               Base de datos conectada
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
