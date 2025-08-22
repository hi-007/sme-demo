// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL หรือ ANON KEY ไม่ถูกต้อง')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


//test

// // src/supabaseClient.ts
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Supabase URL หรือ ANON KEY ไม่ถูกต้อง")
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)
