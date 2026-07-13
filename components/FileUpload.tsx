"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, Loader2, Image as ImageIcon, Video } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  bucket?: string;
  accept?: string;
  label?: string;
}

export default function FileUpload({ 
  onUploadComplete, 
  bucket = "media", 
  accept = "image/*", 
  label = "Subir archivo" 
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
      setUploadedUrl("");
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al subir archivo");
      }

      setUploadedUrl(data.url);
      onUploadComplete(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setUploadedUrl("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4 font-nunito">
      <div className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all ${
        uploadedUrl ? "border-green-500/30 bg-green-500/5 text-green-400" : 
        error ? "border-red-500/30 bg-red-500/5 text-red-400" : 
        "border-[#b48c50]/20 bg-[#1a1510]/40 hover:border-[#b48c50]/40"
      }`}>
        {!file && !uploadedUrl ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center cursor-pointer space-y-3 py-6"
          >
            <div className="w-14 h-14 rounded-full bg-[#b48c50]/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Upload className="text-[#b48c50]" size={24} />
            </div>
            <span className="text-sm font-bold text-[#f0e6d3]/80">{label}</span>
            <span className="text-[10px] uppercase tracking-widest text-[#b48c50]/40">Haz clic para buscar archivo</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5 overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#b48c50]/10 flex items-center justify-center flex-shrink-0">
                {accept.includes("image") ? (
                  <ImageIcon className="text-[#b48c50]" size={20} />
                ) : (
                  <Video className="text-[#b48c50]" size={20} />
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-[#f0e6d3] truncate">
                  {file?.name || "Archivo listo"}
                </span>
                {uploadedUrl && (
                  <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                    <CheckCircle size={10} /> Subido con éxito
                  </span>
                )}
              </div>
            </div>
            
            <button 
              type="button"
              onClick={clearFile}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#f0e6d3]/20 hover:text-red-400 hover:bg-red-400/10 transition-all shadow-sm"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
      </div>

      {file && !uploadedUrl && !uploading && (
        <button
          type="button"
          onClick={uploadFile}
          className="w-full bg-[#b48c50] text-[#1a1510] py-4 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#8a6d3b] transition-all shadow-xl"
        >
          Confirmar y Subir
        </button>
      )}

      {uploading && (
        <div className="flex items-center justify-center gap-3 py-4 text-[#b48c50] text-xs font-bold uppercase tracking-widest">
          <Loader2 className="animate-spin" size={20} />
          <span>Subiendo archivo...</span>
        </div>
      )}

      {error && (
        <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-400/5 p-4 rounded-xl border border-red-400/20 text-center">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
