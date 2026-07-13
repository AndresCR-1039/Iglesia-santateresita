"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      window.location.href = "/admin/dashboard";
    } catch (e: any) {
      setError(e.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1510] flex flex-col justify-center py-12 px-6 lg:px-8 font-nunito relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 hero-pattern opacity-40"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#b48c50]/5 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#b48c50]/5 rounded-full blur-[100px]"></div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 rounded-[2rem] bg-[#b48c50]/10 border border-[#b48c50]/20 flex items-center justify-center shadow-2xl">
            <svg width="48" height="48" viewBox="0 0 36 36" fill="none">
              <rect x="15" y="4" width="6" height="28" rx="1" fill="#b48c50" />
              <rect x="8" y="12" width="20" height="6" rx="1" fill="#b48c50" />
              <circle cx="18" cy="15" r="3" fill="none" stroke="#f0e6d3" strokeWidth="1" />
            </svg>
          </div>
        </div>
        <h2 className="font-display font-bold text-4xl text-[#f0e6d3] tracking-tight">
          Panel de Gestión
        </h2>
        <p className="mt-4 text-[#f0e6d3]/40 text-xs font-bold uppercase tracking-[0.3em]">
          Santa Teresita del Niño Jesús
        </p>
      </div>

      <div className="mt-12 relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1f1a14] py-12 px-8 shadow-2xl rounded-[3rem] border border-[#b48c50]/10 sm:px-12 backdrop-blur-sm">
          <form className="space-y-8" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-400/10 text-red-400 p-5 rounded-2xl text-xs font-bold border border-red-400/20 text-center uppercase tracking-widest">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.3em] mb-3 ml-1">Email Parroquial</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-[#b48c50]/40 group-focus-within:text-[#b48c50] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-[#1a1510] border border-[#b48c50]/20 rounded-2xl outline-none focus:border-[#b48c50] text-[#f0e6d3] placeholder-[#f0e6d3]/10 transition-all text-sm"
                    placeholder="admin@parroquia.org"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#b48c50] uppercase tracking-[0.3em] mb-3 ml-1">Contraseña</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-[#b48c50]/40 group-focus-within:text-[#b48c50] transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-[#1a1510] border border-[#b48c50]/20 rounded-2xl outline-none focus:border-[#b48c50] text-[#f0e6d3] placeholder-[#f0e6d3]/10 transition-all text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 flex justify-center items-center rounded-2xl shadow-xl text-sm font-bold uppercase tracking-[0.2em] text-[#1a1510] bg-[#b48c50] hover:bg-[#8a6d3b] transition-all transform active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Iniciar Sesión"}
              </button>
            </div>
            
            <div className="text-center">
               <p className="text-[10px] text-[#f0e6d3]/20 font-bold uppercase tracking-widest">
                 Acceso restringido
               </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
