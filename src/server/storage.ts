import { createClient } from '@supabase/supabase-js'

const BUCKET = 'portfolio-media'

function getServiceClient() {
  const url = process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
}

export async function signMediaUrls(paths: string[]): Promise<Map<string, string>> {
  const clean = [...new Set(paths.filter(Boolean))]
  if (!clean.length) return new Map()
  const supabase = getServiceClient()
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrls(clean, 60 * 60)
  if (error) throw error
  return new Map((data ?? []).flatMap((item, index) => item.signedUrl ? [[clean[index], item.signedUrl] as const] : []))
}
