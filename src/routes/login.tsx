import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getSupabaseBrowser } from '../lib/supabase-browser'

export const Route = createFileRoute('/login')({ component: Login })

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setBusy(true); setError('')
    try {
      const supabase = getSupabaseBrowser()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      await navigate({ to: '/dashboard' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed')
    } finally { setBusy(false) }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-5 py-8">
      <div className="mx-auto flex min-h-[85vh] max-w-md flex-col justify-center">
        <a href="/" className="text-xs font-semibold tracking-[0.28em]">VOXA</a>
        <div className="mt-12">
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">Creator Studio</p>
          <h1 className="mt-3 text-4xl tracking-[-0.04em]">Welcome back.</h1>
        </div>
        <form onSubmit={submit} className="mt-10 space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30" />
          {error && <p className="text-xs text-red-300">{error}</p>}
          <button disabled={busy} className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black disabled:opacity-50">{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </div>
    </main>
  )
}
