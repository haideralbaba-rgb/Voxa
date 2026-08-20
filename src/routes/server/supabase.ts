import { createServerClient } from '@supabase/ssr'
import { getCookie, setCookie } from '@tanstack/react-start/server'

export function getSupabaseServer() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
  if (!url || !key) throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY')

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        const token = getCookie('sb-access-token')
        const refresh = getCookie('sb-refresh-token')
        return [
          ...(token ? [{ name: 'sb-access-token', value: token }] : []),
          ...(refresh ? [{ name: 'sb-refresh-token', value: refresh }] : []),
        ]
      },
      setAll(cookies) {
        for (const cookie of cookies) {
          setCookie(cookie.name, cookie.value, cookie.options)
        }
      },
    },
  })
}
