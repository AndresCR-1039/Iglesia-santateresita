import { supabase } from '@/lib/supabase'

export interface Horario {
  id: string
  dia: string
  hora: string
  tipo: string
}

export const getSchedules = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('horarios')
    .select('*')
    .order('hora', { ascending: true })

  if (error) throw error
  return data as Horario[]
}
