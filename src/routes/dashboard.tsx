import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServer } from '../server/supabase'

const requireUser = createServerFn({ method: 'GET' }).handler(async () => {
  const supabase = getSupabaseServer()
  const { data } = await supabase.auth.getUser()
  if (!data.user) throw redirect({ to: '/login' })
  return { id: data.user.id, email: data.user.email ?? '' }
})

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => requireUser(),
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xs font-semibold tracking-[0.28em]">VOXA</a>
          <span className="text-xs text-white/35">Creator Studio</span>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-8 lg:grid-cols-[220px_1fr] sm:px-8">
        <aside className="flex gap-2 lg:flex-col">
          <a className="rounded-full bg-white px-4 py-2 text-xs text-black" href="/dashboard">Overview</a>
          <a className="rounded-full px-4 py-2 text-xs text-white/45 hover:text-white" href="/dashboard/projects">Projects</a>
          <a className="rounded-full px-4 py-2 text-xs text-white/45 hover:text-white" href="/dashboard/settings">Settings</a>
        </aside>
        <main><Outlet /></main>
      </div>
    </div>
  )
}
