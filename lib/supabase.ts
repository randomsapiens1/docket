import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  // During Next.js build/prerendering, env vars might be missing.
  // We use fallbacks to prevent @supabase/ssr from throwing fatal errors.
  const url = supabaseUrl && supabaseUrl !== '' ? supabaseUrl : 'https://tpmjbnuwokenwxfblkmf.supabase.co'
  const key = supabaseAnonKey && supabaseAnonKey !== '' ? supabaseAnonKey : 'dummy-key'

  return createBrowserClient(url, key)
}
