"use client";

import { useEffect, useState } from "react";
import { Noticia, getNews } from "@/services/newsService";
import Link from "next/link";
import { Plus, Edit2, Trash2, Newspaper } from "lucide-react";

export default function AdminNoticiasPage() {
  const [news, setNews] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta noticia?")) return;
    
    try {
      const res = await fetch(`/api/admin/noticias/${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      load();
    } catch (e: any) {
      alert("Error al eliminar: " + e.message);
    }
  };

  return (
    <div className="p-8 md:p-14 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <h1 className="font-display font-bold text-4xl text-[#f0e6d3] flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#b48c50]/10 flex items-center justify-center">
                 <Newspaper className="text-[#b48c50]" size={24} />
               </div>
               Gestión de Noticias
            </h1>
          </div>
          <Link 
            href="/admin/noticias/new"
            className="group bg-[#b48c50] text-[#1a1510] px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#8a6d3b] shadow-2xl transition-all hover:scale-105"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            <span className="uppercase tracking-[0.1em] text-sm">Crear Noticia</span>
          </Link>
        </header>

        <div className="bg-[#1f1a14] rounded-[3rem] border border-[#b48c50]/5 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#b48c50]/5 border-b border-[#b48c50]/10">
              <tr>
                <th className="px-10 py-8 text-xs font-bold text-[#b48c50] uppercase tracking-[0.3em]">Noticia</th>
                <th className="px-10 py-8 text-xs font-bold text-[#b48c50] uppercase tracking-[0.3em]">Fecha</th>
                <th className="px-10 py-8 text-right text-xs font-bold text-[#b48c50] uppercase tracking-[0.3em]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#b48c50]/5">
              {news.map((n) => (
                <tr key={n.id} className="hover:bg-[#b48c50]/5 transition-colors group">
                  <td className="px-10 py-8">
                    <p className="font-bold text-lg text-[#f0e6d3] group-hover:text-[#b48c50] transition-colors">{n.titulo}</p>
                    <p className="text-[#f0e6d3]/30 text-xs mt-1 font-mono tracking-tighter">ID: {n.id}</p>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-2 rounded-lg bg-[#b48c50]/10 text-[#b48c50] text-xs font-bold uppercase tracking-widest">
                      {new Date(n.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/noticias/${n.id}`}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-[#b48c50] hover:bg-[#b48c50] hover:text-[#1a1510] transition-all"
                        title="Editar"
                      >
                        <Edit2 size={20} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(n.id)}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-400 hover:text-white transition-all"
                        title="Eliminar"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {news.length === 0 && !loading && (
            <div className="p-32 text-center text-[#f0e6d3]/20 italic flex flex-col items-center gap-6">
              <Newspaper size={64} className="opacity-5" />
              <p className="text-xl">Aún no hay noticias creadas.</p>
              <Link href="/admin/noticias/new" className="text-[#b48c50] font-bold underline">Crea la primera noticia ahora</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
