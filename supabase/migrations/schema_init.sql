-- Script de Inicialización de Base de Datos - Parroquia Santa Teresita

-- 1. Tabla de Noticias
CREATE TABLE IF NOT EXISTS public.noticias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    resumen TEXT,
    contenido TEXT NOT NULL,
    imagen_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Sermones
CREATE TABLE IF NOT EXISTS public.sermones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    video_url TEXT NOT NULL,
    fecha DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE
);

-- 3. Tabla de Horarios
CREATE TABLE IF NOT EXISTS public.horarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    dia TEXT NOT NULL, -- 'Lunes', 'Martes', etc.
    hora TIME NOT NULL,
    tipo TEXT NOT NULL -- 'Misa', 'Confesión', 'Bautizo'
);

-- POLITICAS DE SEGURIDAD (RLS)

-- Noticias: Lectura pública, Escritura autenticada
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública noticias" ON public.noticias FOR SELECT USING (true);
CREATE POLICY "Admin CRUD noticias" ON public.noticias FOR ALL USING (auth.role() = 'authenticated');

-- Sermones: Lectura pública, Escritura autenticada
ALTER TABLE public.sermones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública sermones" ON public.sermones FOR SELECT USING (true);
CREATE POLICY "Admin CRUD sermones" ON public.sermones FOR ALL USING (auth.role() = 'authenticated');

-- Horarios: Lectura pública, Escritura autenticada
ALTER TABLE public.horarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública horarios" ON public.horarios FOR SELECT USING (true);
CREATE POLICY "Admin CRUD horarios" ON public.horarios FOR ALL USING (auth.role() = 'authenticated');

-- 4. Storage Bucket Policies
-- (Estas se configuran usualmente en la UI de Supabase, pero aquí están las reglas lógicas)
-- Bucket: imagenes_parroquia
-- Public Read: true
-- Auth Write: true
