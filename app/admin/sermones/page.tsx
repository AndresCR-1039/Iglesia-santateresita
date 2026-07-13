"use client";

import { useEffect, useState } from "react";
import { Sermon } from "@/services/sermonService";
import Link from "next/link";
import { Plus, Trash2, Video, Edit2, LayoutDashboard } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminSermonesPage() {
  const [sermones, setSermones] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("sermones").select("*").order("fecha", { ascending: false });
    setSermones(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este sermón?")) return;
    
    try {
      const res = await fetch(`/api/admin/sermones/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al eliminar");
      }

      load();
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div className="p-8 md:p-14 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <h1 className="font-display font-bold text-4xl text-[#f0e6d3] flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#b48c50]/10 flex items-center justify-center">
                 <Video className="text-[#b48c50]" size={24} />
               </div>
               Gestión de Sermones
            </h1>
          </div>
          <Link 
            href="/admin/sermones/new"
            className="group bg-[#b48c50] text-[#1a1510] px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#8a6d3b] shadow-2xl transition-all hover:scale-105"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            <span className="uppercase tracking-[0.1em] text-sm">Nuevo Sermón</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sermones.map((s) => (
            <div 
              key={s.id} 
              className="bg-[#1f1a14] p-10 rounded-[2.5rem] border border-[#b48c50]/5 shadow-sm flex flex-col sm:flex-row justify-between items-center group transition-all hover:border-[#b48c50]/20"
            >
              <div className="mb-6 sm:mb-0">
                <p className="text-[#b48c50] text-xs font-bold mb-3 uppercase tracking-[0.2em]">{s.fecha}</p>
                <h3 className="font-display font-bold text-2xl text-[#f0e6d3] group-hover:text-[#b48c50] transition-colors line-clamp-1">{s.titulo}</h3>
                <p className="text-[#f0e6d3]/40 text-xs mt-2 italic line-clamp-1">{s.descripcion || "Sin descripción"}</p>
              </div>
              <div className="flex gap-4">
                <Link 
                  href={`/admin/sermones/${s.id}`}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#b48c50]/5 text-[#b48c50] hover:bg-[#b48c50] hover:text-[#1a1510] transition-all"
                  title="Editar"
                >
                  <Edit2 size={22} />
                </Link>
                <button 
                  onClick={() => handleDelete(s.id)}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-900/10 text-red-400 hover:bg-red-400 hover:text-white transition-all"
                  title="Eliminar"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </div>
          ))}
          {sermones.length === 0 && !loading && (
            <div className="col-span-full py-32 text-center text-[#f0e6d3]/20 italic flex flex-col items-center gap-6">
              <Video size={64} className="opacity-5" />
              <p className="text-xl">Aún no hay sermones registrados.</p>
              <Link href="/admin/sermones/new" className="text-[#b48c50] font-bold underline">Sube el primer sermón hoy</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
