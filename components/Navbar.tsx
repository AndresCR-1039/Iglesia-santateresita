"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 bg-[#1a1510]/95 backdrop-blur-xl shadow-2xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
            <rect x="15" y="4" width="6" height="28" rx="1" fill="#b48c50" />
            <rect x="8" y="12" width="20" height="6" rx="1" fill="#b48c50" />
            <circle cx="18" cy="15" r="3" fill="none" stroke="#f0e6d3" strokeWidth="1" />
          </svg>
          <span className="font-display font-bold text-xl tracking-tight text-[#b48c50] group-hover:text-[#f0e6d3] transition-colors">
            Santa Teresita
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm tracking-[0.1em] uppercase">
          <Link href="#inicio" className="nav-link text-[#f0e6d3]">Inicio</Link>
          <Link href="#horarios" className="nav-link text-[#f0e6d3]">Horarios</Link>
          <Link href="#comunidad" className="nav-link text-[#f0e6d3]">Comunidad</Link>
          <Link href="#contacto" className="nav-link text-[#f0e6d3]">Contacto</Link>
          
          <Link
            href="/admin"
            className="text-[#b48c50] hover:text-[#f0e6d3] transition-colors p-2"
            title="Administración"
          >
            <User size={18} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#b48c50]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1a1510] border-t border-[#b48c50]/20 p-6 flex flex-col gap-6 text-sm tracking-widest uppercase items-center animate-in fade-in slide-in-from-top-4 shadow-2xl">
          <Link href="#inicio" onClick={() => setIsMenuOpen(false)} className="text-[#f0e6d3] hover:text-[#b48c50]">Inicio</Link>
          <Link href="#horarios" onClick={() => setIsMenuOpen(false)} className="text-[#f0e6d3] hover:text-[#b48c50]">Horarios</Link>
          <Link href="#comunidad" onClick={() => setIsMenuOpen(false)} className="text-[#f0e6d3] hover:text-[#b48c50]">Comunidad</Link>
          <Link href="#contacto" onClick={() => setIsMenuOpen(false)} className="text-[#f0e6d3] hover:text-[#b48c50]">Contacto</Link>
          <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#b48c50]">Panel de Control</Link>
        </div>
      )}
    </nav>
  );
}
