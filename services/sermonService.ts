import { supabase } from '@/lib/supabase'

export interface Sermon {
  id: string
  titulo: string
  descripcion: string
  video_url: string
  fecha: string
}

export const getTodaySermon = async () => {
  if (!supabase) return null;
  const today = new Date().toISOString().split('T')[0]
  const { data, error } = await supabase
    .from('sermones')
    .select('*')
    .eq('fecha', today)
    .maybeSingle()

  if (error) throw error
  if (!data) {
    // Si no hay hoy, traer el último
    const { data: last, error: lastError } = await supabase
      .from('sermones')
      .select('*')
      .order('fecha', { ascending: false })
      .limit(1)
      .maybeSingle()
    
    if (lastError) throw lastError
    return last as Sermon
  }
  return data as Sermon
}

export const getSermonById = async (id: string) => {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from('sermones')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Sermon
}
