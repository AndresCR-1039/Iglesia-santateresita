import { supabase } from '@/lib/supabase'

export interface Noticia {
  id: string
  titulo: string
  resumen: string
  contenido: string
  imagen_url: string
  created_at: string
}

export const getNews = async (limit?: number) => {
  if (!supabase) return [];
  let query = supabase
    .from('noticias')
    .select('*')
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) throw error
  return data as Noticia[]
}

export const getNewsById = async (id: string) => {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Noticia
}
