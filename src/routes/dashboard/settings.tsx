import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings')({ component: Settings })

function Settings() {
  return (
    <section>
      <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">Portfolio</p>
      <h1 className="mt-2 text-3xl tracking-tight">Settings</h1>
      <div className="mt-8 border border-white/10 p-6 text-sm text-white/45">Portfolio settings are wired to the server-side update function. Add your Lovable Cloud project credentials to activate persistence.</div>
    </section>
  )
}
