"use client";

import { useEffect, useState } from "react";
import { Horario, getSchedules } from "@/services/scheduleService";
import { Calendar, Star, Sun, Clock } from "lucide-react";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function ScheduleSection() {
  const [schedules, setSchedules] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSchedules();
        setSchedules(data);
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
    <section id="horarios" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[#b48c50]">Celebraciones</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#f0e6d3]">Horarios de Misa</h2>
          <div className="w-20 h-0.5 mx-auto mt-6 bg-[#b48c50]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* We'll group them for a cleaner look or just list those that exist */}
          {days.map(day => {
            const daySchedules = schedules.filter(s => s.dia === day);
            if (daySchedules.length === 0) return null;

            return (
              <div 
                key={day} 
                className="card-hover rounded-[2rem] p-8 text-center bg-[#1a1510]/40 border border-[#b48c50]/20 flex flex-col items-center"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-[#b48c50]/20 flex items-center justify-center">
                  {day === "Domingo" ? (
                    <Sun className="text-[#b48c50]" size={32} />
                  ) : day === "Sábado" ? (
                    <Star className="text-[#b48c50]" size={32} />
                  ) : (
                    <Calendar className="text-[#b48c50]" size={32} />
                  )}
                </div>
                
                <h3 className="font-display font-bold text-2xl mb-6 text-[#b48c50]">{day}</h3>
                
                <div className="space-y-4 w-full">
                  {daySchedules.map(s => (
                    <div key={s.id} className="flex items-center justify-center gap-3 py-2 border-b border-[#b48c50]/10 last:border-0 group">
                      <Clock size={16} className="text-[#b48c50]/40 group-hover:text-[#b48c50] transition-colors" />
                      <span className="text-lg text-[#f0e6d3]/80">{s.hora}</span>
                      <span className="text-sm font-bold uppercase tracking-widest text-[#b48c50]/60 hidden group-hover:block transition-all italic">
                        {s.tipo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
