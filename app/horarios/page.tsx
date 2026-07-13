import { getSchedules } from "@/services/scheduleService";
import { Clock, Calendar, Church } from "lucide-react";

export default async function HorariosPage() {
  const activeSchedules = await getSchedules();

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-outfit text-blue-900 mb-4">Horarios de Santa Misa</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Únete a nosotros en la celebración de la Eucaristía y otros sacramentos. 
          Nuestra comunidad te espera con los brazos abiertos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {days.map((day) => {
          const daySchedules = activeSchedules.filter(s => s.dia === day);
          
          return (
            <div key={day} className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-blue-900 px-6 py-4">
                <h3 className="text-white font-bold font-outfit flex items-center gap-3">
                  <Calendar size={18} />
                  {day}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {daySchedules.length > 0 ? (
                  daySchedules.map((s) => (
                    <div key={s.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
                          <Church size={16} />
                        </div>
                        <span className="font-medium text-gray-800">{s.tipo}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                        <Clock size={14} />
                        {s.hora}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic py-4 text-center">No hay servicios programados</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
