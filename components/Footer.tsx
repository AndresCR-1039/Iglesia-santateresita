"use client";

import { Facebook, Instagram, Youtube, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1510] py-20 px-6 border-t border-[#b48c50]/20 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-12">
          <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center bg-[#b48c50]/10 text-[#b48c50] hover:bg-[#b48c50] hover:text-[#1a1510] transition-all duration-300 transform hover:scale-110">
            <Facebook size={22} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center bg-[#b48c50]/10 text-[#b48c50] hover:bg-[#b48c50] hover:text-[#1a1510] transition-all duration-300 transform hover:scale-110">
            <Instagram size={22} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center bg-[#b48c50]/10 text-[#b48c50] hover:bg-[#b48c50] hover:text-[#1a1510] transition-all duration-300 transform hover:scale-110">
            <Youtube size={22} />
          </a>
        </div>

        {/* Branding */}
        <div className="mb-10">
          <h2 className="font-display font-bold text-3xl text-[#b48c50] mb-2">Santa Teresita del Niño Jesús</h2>
          <p className="text-[#f0e6d3]/40 text-sm tracking-[0.2em] uppercase italic">"Pasaré mi cielo haciendo el bien sobre la tierra"</p>
        </div>

        {/* Credits */}
        <div className="pt-10 border-t border-[#b48c50]/10">
          <p className="text-[#f0e6d3]/30 text-xs mb-4">
            © {new Date().getFullYear()} Parroquia Santa Teresita del Niño Jesús. Todos los derechos reservados.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#f0e6d3]/20 text-[10px] uppercase tracking-widest">
            Desarrollado con <Heart size={10} className="text-red-900/40" /> para la gloria de Dios
          </div>
        </div>
      </div>
    </footer>
  );
}
