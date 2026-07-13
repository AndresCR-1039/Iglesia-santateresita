import Hero from "@/components/Hero";
import NewsCarousel from "@/components/NewsCarousel";
import SermonSection from "@/components/SermonSection";
import ScheduleSection from "@/components/ScheduleSection";
import { Music, BookOpen, Heart, MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#1a1510]">
      <Hero />
      
      {/* Quote Section */}
      <section className="py-20 px-6 text-center bg-[#b48c50]/5 border-y border-[#b48c50]/10">
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-display italic text-2xl md:text-4xl leading-relaxed text-[#f0e6d3] opacity-90 transition-all hover:opacity-100">
            "Para mí la oración es un impulso del corazón, una sencilla mirada lanzada al cielo, un grito de gratitud y de amor..."
          </p>
          <footer className="mt-8 text-sm tracking-[0.3em] uppercase text-[#b48c50] opacity-60">
            — Santa Teresita de Lisieux
          </footer>
        </blockquote>
      </section>

      {/* Horarios Dinámicos */}
      <ScheduleSection />

      {/* Sermón Section */}
      <SermonSection />

      {/* Sacramentos Section */}
      <section className="py-24 px-6 bg-[#b48c50]/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[#b48c50]">Fe y Vida</p>
            <h2 className="font-display font-bold text-4xl text-[#f0e6d3]">Sacramentos</h2>
            <div className="w-16 h-0.5 mx-auto mt-4 bg-[#b48c50]"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: "💧", title: "Bautismo", desc: "Sábados 10:00 AM" },
              { emoji: "🕊️", title: "Confirmación", desc: "Grupos Juveniles" },
              { emoji: "💒", title: "Matrimonio", desc: "Cita previa" },
              { emoji: "🙏", title: "Confesión", desc: "Antes de Misa" }
            ].map((sac, i) => (
              <div key={i} className="card-hover rounded-2xl p-8 text-center bg-[#1a1510]/40 border border-[#b48c50]/10">
                <span className="text-4xl mb-4 block">{sac.emoji}</span>
                <h3 className="font-display font-bold text-xl text-[#b48c50]">{sac.title}</h3>
                <p className="text-xs mt-3 opacity-60 uppercase tracking-widest">{sac.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Noticias Section */}
      <section id="noticias" className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[#b48c50]">Actualidad</p>
          <div className="flex justify-between items-end max-w-6xl mx-auto">
            <h2 className="font-display font-bold text-4xl text-[#f0e6d3]">Últimas Noticias</h2>
            <a href="/noticias" className="text-[#b48c50] font-bold text-sm uppercase tracking-widest hover:underline hidden sm:block">
              Ver todas →
            </a>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#b48c50]/30 to-transparent mt-6"></div>
        </div>
        
        <NewsCarousel />
      </section>

      {/* Community Section */}
      <section id="comunidad" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[#b48c50]">Participa</p>
            <h2 className="font-display font-bold text-4xl text-[#f0e6d3]">Nuestra Comunidad</h2>
            <div className="w-16 h-0.5 mx-auto mt-4 bg-[#b48c50]"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover rounded-[2.5rem] p-10 bg-[#1a1510]/40 border border-[#b48c50]/10">
              <Music className="mb-6 text-[#b48c50]" size={32} />
              <h3 className="font-display font-bold text-2xl mb-4 text-[#b48c50]">Coro Parroquial</h3>
              <p className="text-[#f0e6d3]/70 leading-relaxed">Ensayos todos los jueves a las 7:00 PM. Tu voz es bienvenida para alabar al Señor.</p>
            </div>
            <div className="card-hover rounded-[2.5rem] p-10 bg-[#1a1510]/40 border border-[#b48c50]/20 scale-105 shadow-2xl">
              <BookOpen className="mb-6 text-[#b48c50]" size={32} />
              <h3 className="font-display font-bold text-2xl mb-4 text-[#b48c50]">Catequesis</h3>
              <p className="text-[#f0e6d3]/70 leading-relaxed">Formación para niños y jóvenes los sábados de 9:00 a 11:00 AM.</p>
            </div>
            <div className="card-hover rounded-[2.5rem] p-10 bg-[#1a1510]/40 border border-[#b48c50]/10">
              <Heart className="mb-6 text-[#b48c50]" size={32} />
              <h3 className="font-display font-bold text-2xl mb-4 text-[#b48c50]">Pastoral Social</h3>
              <p className="text-[#f0e6d3]/70 leading-relaxed">Ayuda a los más necesitados. Reuniones el primer miércoles de mes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 px-6 bg-[#b48c50]/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[#b48c50]">Encuéntranos</p>
            <h2 className="font-display font-bold text-4xl text-[#f0e6d3]">Contacto</h2>
            <div className="w-16 h-0.5 mx-auto mt-4 bg-[#b48c50]"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#b48c50]/20">
                  <MapPin className="text-[#b48c50]" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#b48c50] mb-2">Dirección</h3>
                  <p className="opacity-70">Calle Principal #123, Centro de la Ciudad</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#b48c50]/20">
                  <Phone className="text-[#b48c50]" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#b48c50] mb-2">Teléfono</h3>
                  <p className="opacity-70">+52 123 456 7890</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#b48c50]/20">
                  <Clock className="text-[#b48c50]" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#b48c50] mb-2">Oficina Parroquial</h3>
                  <p className="opacity-70">Lunes a Viernes: 9am - 1pm / 4pm - 7pm</p>
                </div>
              </div>
            </div>

            <form className="space-y-6 bg-[#1a1510] p-10 rounded-[2.5rem] border border-[#b48c50]/20">
              <input 
                type="text" 
                placeholder="Nombre completo" 
                className="w-full bg-[#b48c50]/5 border border-[#b48c50]/20 rounded-xl px-6 py-4 outline-none focus:border-[#b48c50] transition-colors"
                required
              />
              <input 
                type="email" 
                placeholder="Correo electrónico" 
                className="w-full bg-[#b48c50]/5 border border-[#b48c50]/20 rounded-xl px-6 py-4 outline-none focus:border-[#b48c50] transition-colors"
                required
              />
              <textarea 
                rows={4} 
                placeholder="Tu mensaje..." 
                className="w-full bg-[#b48c50]/5 border border-[#b48c50]/20 rounded-xl px-6 py-4 outline-none focus:border-[#b48c50] transition-colors resize-none"
                required
              ></textarea>
              <button className="w-full bg-[#b48c50] text-[#1a1510] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#8a6d3b] transition-all">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
