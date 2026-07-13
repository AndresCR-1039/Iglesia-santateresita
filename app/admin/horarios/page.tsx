"use client";

import { useEffect, useState } from "react";
import { Horario, getSchedules } from "@/services/scheduleService";
import Link from "next/link";
import { Plus, Trash2, Clock, Edit2, Save, X as XIcon, LayoutDashboard, Calendar } from "lucide-react";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function AdminHorariosPage() {
  const [schedules, setSchedules] = useState<Horario[]>([]);
  const [newDia, setNewDia] = useState("Lunes");
  const [newHora, setNewHora] = useState("08:00");
  const [newTipo, setNewTipo] = useState("Misa");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const data = await getSchedules();
      setSchedules(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setNewDia("Lunes");
    setNewHora("08:00");
    setNewTipo("Misa");
    setEditingId(null);
  };

  const handleStartEdit = (h: Horario) => {
    setEditingId(h.id);
    setNewDia(h.dia);
    setNewHora(h.hora);
    setNewTipo(h.tipo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingId ? `/api/admin/horarios/${editingId}` : "/api/admin/horarios";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dia: newDia, hora: newHora, tipo: newTipo })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al procesar");
      }

      load();
      resetForm();
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este horario?")) return;
    
    try {
      const res = await fetch(`/api/admin/horarios/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al eliminar");
      }

      load();
      if (editingId === id) resetForm();
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
                 <Clock className="text-[#b48c50]" size={24} />
               </div>
               Gestión de Horarios
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form Content */}
          <div className="lg:col-span-5">
            <div className="bg-[#1f1a14] p-10 rounded-[3rem] border border-[#b48c50]/10 shadow-2xl sticky top-28">
              <h3 className="font-display font-bold text-2xl text-[#b48c50] mb-8 flex items-center gap-3">
                {editingId ? <Edit2 size={24} /> : <Plus size={24} />}
                {editingId ? "Editar Horario" : "Añadir Horario"}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.2em] mb-3">Día de la semana</label>
                  <select 
                    value={newDia} 
                    onChange={e => setNewDia(e.target.value)}
                    className="w-full bg-[#1a1510] border border-[#b48c50]/20 rounded-2xl px-6 py-4 outline-none focus:border-[#b48c50] transition-colors appearance-none"
                  >
                    {days.map(d => <option key={d} value={d} className="bg-[#1a1510]">{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.2em] mb-3">Hora</label>
                  <input 
                    type="time" 
                    value={newHora} 
                    onChange={e => setNewHora(e.target.value)}
                    className="w-full bg-[#1a1510] border border-[#b48c50]/20 rounded-2xl px-6 py-4 outline-none focus:border-[#b48c50] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.2em] mb-3">Actividad / Celebración</label>
                  <input 
                    type="text" 
                    value={newTipo} 
                    onChange={e => setNewTipo(e.target.value)}
                    className="w-full bg-[#1a1510] border border-[#b48c50]/20 rounded-2xl px-6 py-4 outline-none focus:border-[#b48c50] transition-colors"
                    placeholder="Ej: Misa comunitaria"
                    required
                  />
                </div>
                
                <div className="pt-4 flex flex-col gap-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#b48c50] text-[#1a1510] py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#8a6d3b] transition-all flex items-center justify-center gap-3 shadow-xl"
                  >
                    {editingId ? <><Save size={20} /> Guardar Cambios</> : <><Plus size={20} /> Guardar Horario</>}
                  </button>
                  {editingId && (
                    <button 
                      type="button"
                      onClick={resetForm}
                      className="w-full border border-[#b48c50]/20 text-[#b48c50] py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#b48c50]/5 transition-all flex items-center justify-center gap-3"
                    >
                      <XIcon size={18} /> Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List Content */}
          <div className="lg:col-span-7 space-y-8">
            {days.map(day => {
              const daySchedules = schedules.filter(s => s.dia === day);
              if (daySchedules.length === 0) return null;

              return (
                <div key={day} className="bg-[#1f1a14]/60 rounded-[2.5rem] border border-[#b48c50]/5 overflow-hidden shadow-sm">
                  <div className="bg-[#b48c50]/10 px-10 py-6 border-b border-[#b48c50]/10 flex items-center justify-between">
                    <h4 className="font-display font-bold text-xl text-[#b48c50] flex items-center gap-3">
                      <Calendar size={18} />
                      {day}
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{daySchedules.length} servicios</span>
                  </div>
                  <div className="p-6">
                    {daySchedules.map(s => (
                      <div key={s.id} className="flex justify-between items-center py-5 px-6 rounded-2xl hover:bg-[#b48c50]/5 transition-all group border border-transparent hover:border-[#b48c50]/10 mb-2 last:mb-0">
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#b48c50]/5 border border-[#b48c50]/10">
                              <Clock size={12} className="text-[#b48c50]" />
                              <span className="text-[#f0e6d3] font-bold text-sm">{s.hora}</span>
                           </div>
                           <span className={`text-lg font-medium ${editingId === s.id ? "text-[#b48c50]" : "text-[#f0e6d3]/80"}`}>
                             {s.tipo}
                           </span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStartEdit(s)} 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#f0e6d3]/40 hover:text-[#b48c50] hover:bg-[#b48c50]/10 transition-all"
                            title="Editar"
                          >
                             <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(s.id)} 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#f0e6d3]/20 hover:text-red-400 hover:bg-red-400/10 transition-all"
                            title="Eliminar"
                          >
                             <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {!loading && schedules.length === 0 && (
              <div className="py-32 text-center text-[#f0e6d3]/20 italic flex flex-col items-center gap-6 bg-[#1f1a14]/60 rounded-[2.5rem] border border-[#b48c50]/5">
                <Clock size={64} className="opacity-5" />
                <p className="text-xl">No hay horarios configurados para la semana.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
