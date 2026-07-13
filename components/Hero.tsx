"use client";

import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="relative hero-pattern flex items-center justify-center text-center px-6 min-h-[85vh] pt-[100px] pb-[60px] overflow-hidden">
      {/* Stained Glass Effect Overlay */}
      <div className="stained-glass absolute inset-0 opacity-50"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Religious Ornament */}
        <div className="fade-up fade-up-d1 mb-8">
          <svg width="80" height="80" viewBox="0 0 64 64" fill="none" className="mx-auto opacity-60">
            <rect x="28" y="6" width="8" height="52" rx="2" fill="#b48c50" />
            <rect x="14" y="22" width="36" height="8" rx="2" fill="#b48c50" />
            <circle cx="32" cy="26" r="6" fill="none" stroke="#b48c50" strokeWidth="2" />
          </svg>
        </div>

        <p className="fade-up fade-up-d1 text-sm tracking-[0.4em] uppercase mb-6 text-[#b48c50]">
          Parroquia
        </p>
        
        <h1 className="fade-up fade-up-d2 font-display font-bold leading-tight mb-8 text-[clamp(2.5rem,8vw,4.5rem)] text-[#f0e6d3]">
          Santa Teresita<br />
          <span className="italic font-light opacity-90">del Niño Jesús</span>
        </h1>
        
        <p className="fade-up fade-up-d3 text-lg md:text-xl opacity-70 max-w-xl mx-auto mb-10 leading-relaxed italic">
          "Mi vocación es el amor... En el corazón de la Iglesia, yo seré el amor."
        </p>

        <div className="fade-up fade-up-d4 flex flex-wrap justify-center gap-6">
          <a 
            href="#horarios" 
            className="px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 bg-[#b48c50] text-[#1a1510]"
          >
            Ver Horarios de Misa
          </a>
          <a 
            href="#contacto" 
            className="px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase border-2 border-[#b48c50] text-[#b48c50] transition-all duration-300 hover:scale-105 hover:bg-[#b48c50]/10"
          >
            Contáctanos
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown size={32} className="text-[#b48c50]" />
      </div>
    </section>
  );
}
