import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Verificación básica para evitar fallos en tiempo de ejecución si faltan las llaves
const isConfigured = supabaseUrl.startsWith('http') && supabaseAnonKey.length > 0

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as any) // Retornamos null si no está configurado (los servicios deben manejarlo)

if (!isConfigured) {
  console.warn('⚠️ Supabase no está configurado. Por favor, añade las variables de entorno en .env.local')
}
if (isConfigured) {
  console.warn('supabase está configurado.')
}