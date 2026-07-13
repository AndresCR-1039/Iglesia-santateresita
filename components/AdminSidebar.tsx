"use client";

import Link from "next/link";
import { Newspaper, Video, Clock, Power, LayoutDashboard, ExternalLink } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-72 bg-[#14100c] border-r border-[#b48c50]/10 p-8 flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0 shadow-2xl z-50">
      <div className="flex items-center gap-3 border-b border-[#b48c50]/10 pb-8 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#b48c50]/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
            <rect x="15" y="4" width="6" height="28" rx="1" fill="#b48c50" />
            <rect x="8" y="12" width="20" height="6" rx="1" fill="#b48c50" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-display font-bold text-[#b48c50] leading-none">Panel Admin</h2>
          <span className="text-[10px] text-[#f0e6d3]/30 uppercase tracking-[0.2em] mt-1 font-bold">Santa Teresita</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2">
        <p className="text-[10px] text-[#b48c50]/40 font-bold uppercase tracking-[0.2em] mb-4 ml-4">Navegación</p>
        
        <Link 
          href="/admin/dashboard" 
          className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${
            isActive("/admin/dashboard") 
              ? "bg-[#b48c50] text-[#1a1510] shadow-lg shadow-[#b48c50]/10" 
              : "text-[#f0e6d3]/60 hover:bg-[#b48c50]/5 hover:text-[#f0e6d3]"
          }`}
        >
          <LayoutDashboard size={20} className={isActive("/admin/dashboard") ? "text-[#1a1510]" : "text-[#b48c50]/60 group-hover:text-[#b48c50]"} /> 
          <span className="text-sm font-bold tracking-wide">Dashboard</span>
        </Link>

        <Link 
          href="/admin/noticias" 
          className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${
            isActive("/admin/noticias") || pathname.startsWith("/admin/noticias/")
              ? "bg-[#b48c50] text-[#1a1510] shadow-lg shadow-[#b48c50]/10" 
              : "text-[#f0e6d3]/60 hover:bg-[#b48c50]/5 hover:text-[#f0e6d3]"
          }`}
        >
          <Newspaper size={20} className={isActive("/admin/noticias") || pathname.startsWith("/admin/noticias/") ? "text-[#1a1510]" : "text-[#b48c50]/60 group-hover:text-[#b48c50]"} /> 
          <span className="text-sm font-bold tracking-wide">Noticias</span>
        </Link>

        <Link 
          href="/admin/sermones" 
          className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${
            isActive("/admin/sermones") || pathname.startsWith("/admin/sermones/")
              ? "bg-[#b48c50] text-[#1a1510] shadow-lg shadow-[#b48c50]/10" 
              : "text-[#f0e6d3]/60 hover:bg-[#b48c50]/5 hover:text-[#f0e6d3]"
          }`}
        >
          <Video size={20} className={isActive("/admin/sermones") || pathname.startsWith("/admin/sermones/") ? "text-[#1a1510]" : "text-[#b48c50]/60 group-hover:text-[#b48c50]"} /> 
          <span className="text-sm font-bold tracking-wide">Sermones</span>
        </Link>

        <Link 
          href="/admin/horarios" 
          className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${
            isActive("/admin/horarios") 
              ? "bg-[#b48c50] text-[#1a1510] shadow-lg shadow-[#b48c50]/10" 
              : "text-[#f0e6d3]/60 hover:bg-[#b48c50]/5 hover:text-[#f0e6d3]"
          }`}
        >
          <Clock size={20} className={isActive("/admin/horarios") ? "text-[#1a1510]" : "text-[#b48c50]/60 group-hover:text-[#b48c50]"} /> 
          <span className="text-sm font-bold tracking-wide">Horarios</span>
        </Link>
        
        <div className="pt-8 mb-2">
          <p className="text-[10px] text-[#b48c50]/40 font-bold uppercase tracking-[0.2em] mb-4 ml-4">Sitio Externo</p>
          <a 
            href="/" 
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[#b48c50] hover:bg-[#b48c50]/10 transition-all group border border-[#b48c50]/10"
          >
            <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            <span className="text-sm font-bold tracking-wide">Ver Sitio Público</span>
          </a>
        </div>
      </nav>

      <div className="pt-10 border-t border-[#b48c50]/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all w-full text-left group"
        >
          <Power size={20} className="group-hover:rotate-12 transition-transform" /> 
          <span className="text-sm font-bold uppercase tracking-widest">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
