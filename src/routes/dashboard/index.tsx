import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({ component: DashboardHome })

function DashboardHome() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">Creator Studio</p>
        <h1 className="mt-3 text-4xl tracking-[-0.04em]">Your portfolio, without the clutter.</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Projects" value="—" />
        <Metric label="Published" value="—" />
        <Metric label="Plan" value="Free" />
      </div>
      <div className="mt-8 border border-white/10 p-6 text-sm text-white/45">Connect Lovable Cloud and create your first project to populate this studio.</div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="border border-white/10 p-6"><div className="text-[10px] uppercase tracking-[0.2em] text-white/25">{label}</div><div className="mt-5 text-3xl tracking-tight">{value}</div></div>
}
