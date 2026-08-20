import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { getSupabaseBrowser } from '../lib/supabase-browser'

export const Route = createFileRoute('/signup')({ component: Signup })

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('')
    try {
      const supabase = getSupabaseBrowser()
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
      if (error) throw error
      if (!data.session) { setNotice('Check your email to confirm the account, then sign in.'); return }
      await navigate({ to: '/dashboard' })
    } catch (e) { setError(e instanceof Error ? e.message : 'Sign up failed') }
    finally { setBusy(false) }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-5 py-8">
      <div className="mx-auto flex min-h-[85vh] max-w-md flex-col justify-center">
        <a href="/" className="text-xs font-semibold tracking-[0.28em]">VOXA</a>
        <div className="mt-12"><p className="text-[10px] uppercase tracking-[0.28em] text-white/30">Start creating</p><h1 className="mt-3 text-4xl tracking-[-0.04em]">Build your space.</h1></div>
        <form onSubmit={submit} className="mt-10 space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" required className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" minLength={8} placeholder="Password (8+ characters)" required className="w-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none placeholder:text-white/20 focus:border-white/30" />
          {error && <p className="text-xs text-red-300">{error}</p>}
          {notice && <p className="text-xs text-white/55">{notice}</p>}
          <button disabled={busy} className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black disabled:opacity-50">{busy ? 'Creating…' : 'Create portfolio'}</button>
        </form>
        <p className="mt-6 text-xs text-white/30">Already have an account? <a href="/login" className="text-white/65 hover:text-white">Sign in</a></p>
      </div>
    </main>
  )
}
