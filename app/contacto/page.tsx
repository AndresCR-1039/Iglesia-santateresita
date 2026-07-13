"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulando envío
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-outfit text-blue-900 mb-4">Contáctanos</h1>
        <p className="text-gray-600 max-w-2xl mx-auto italic">
          "Estamos aquí para escucharte y caminar contigo en la fe."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Info */}
        <div className="space-y-12">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-2xl font-bold font-outfit text-blue-900 mb-6">Información de Contacto</h3>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Ubicación</p>
                <p className="text-gray-600">Calle Ficticia #123, Barrio El Prado</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl">
                <Phone size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Teléfonos</p>
                <p className="text-gray-600">+57 (123) 456-7890 / 098-765-4321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl">
                <Mail size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Email</p>
                <p className="text-gray-600">atencion@parroquiasantateresita.org</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 p-8 rounded-3xl text-white">
            <h4 className="text-xl font-bold font-outfit mb-4">¿Necesitas una cita?</h4>
            <p className="text-blue-100 mb-6 text-sm">
              Si deseas hablar con un sacerdote o programar un bautizo/boda, por favor visítanos 
              personalmente en horario de oficina o envíanos un mensaje.
            </p>
            <div className="h-px bg-blue-800 w-full mb-6"></div>
            <p className="text-xs text-blue-200">Respuesta estimada: 24-48 horas hábiles.</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-50">
          <h3 className="text-2xl font-bold font-outfit text-blue-900 mb-8 text-center">Déjanos tu mensaje</h3>
          
          {status === "success" ? (
            <div className="bg-green-50 text-green-700 p-8 rounded-3xl text-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto">
                <Send size={24} />
              </div>
              <h4 className="text-xl font-bold">¡Mensaje Enviado!</h4>
              <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="text-green-800 font-bold underline"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-900 transition-all outline-none"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-900 transition-all outline-none"
                  placeholder="juan@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-900 transition-all outline-none resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button 
                disabled={status === "sending"}
                type="submit"
                className="w-full bg-blue-900 text-white py-5 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === "sending" ? "Enviando..." : (
                  <>
                    <Send size={20} />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
