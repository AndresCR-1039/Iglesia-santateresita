"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Video, Loader2 } from "lucide-react";
import Link from "next/link";
import FileUpload from "@/components/FileUpload";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditSermonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const { getSermonById } = await import("@/services/sermonService");
        const data = await getSermonById(id);
        
        setTitulo(data.titulo);
        setDescripcion(data.descripcion);
        setVideoUrl(data.video_url);
        setFecha(data.fecha);
      } catch (e: any) {
        console.error(e);
        alert("Error al cargar el sermón");
      } finally {
        setFetching(false);
      }
    }
    loadData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/sermones/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          titulo, 
          descripcion, 
          video_url: videoUrl, 
          fecha 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al actualizar");
      }

      router.push("/admin/sermones");
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-[#b48c50] gap-4 min-h-[60vh]">
        <Loader2 className="animate-spin" size={48} />
        <span className="text-xs font-bold uppercase tracking-[0.3em]">Cargando sermón...</span>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-14 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <Link 
              href="/admin/sermones" 
              className="group flex items-center gap-2 text-xs text-[#b48c50] font-bold uppercase tracking-[0.2em] mb-4 transition-all hover:gap-4"
            >
              <X size={14} /> 
              <span>Cancelar Edición</span>
            </Link>
            <h1 className="font-display font-bold text-4xl text-[#f0e6d3]">Editar Sermón</h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="bg-[#1f1a14] p-10 md:p-14 rounded-[3rem] border border-[#b48c50]/5 shadow-2xl space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.3em] mb-4">Título del Sermón</label>
                <input 
                  type="text" 
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full px-8 py-5 bg-[#1a1510] border border-[#b48c50]/20 rounded-2xl focus:border-[#b48c50] transition-all outline-none text-lg text-[#f0e6d3]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.3em] mb-4">Fecha</label>
                <input 
                  type="date" 
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-8 py-5 bg-[#1a1510] border border-[#b48c50]/20 rounded-2xl focus:border-[#b48c50] transition-all outline-none text-[#f0e6d3] [color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.3em] mb-4">Contenido Multimedia</label>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <FileUpload 
                  onUploadComplete={(url) => setVideoUrl(url)} 
                  bucket="sermones"
                  accept="video/*"
                  label="Cambiar video"
                />
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-[#b48c50]/40">
                    <Video size={20} />
                  </div>
                  <input 
                    type="url" 
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 bg-[#1a1510] border border-[#b48c50]/20 rounded-2xl focus:border-[#b48c50] transition-all outline-none text-sm text-[#f0e6d3]/60"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.3em] mb-4">Mensaje / Frase Detallada (Formato visual)</label>
              <RichTextEditor 
                value={descripcion}
                onChange={setDescripcion}
                placeholder="Escribe el mensaje central del sermón..."
              />
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button 
              type="submit"
              disabled={loading}
              className="group relative w-full max-w-md overflow-hidden bg-[#b48c50] text-[#1a1510] py-6 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    <Save size={24} />
                    Guardar Cambios
                  </>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
