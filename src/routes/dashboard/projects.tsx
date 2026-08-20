import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/projects')({ component: Projects })

function Projects() {
  return (
    <section>
      <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div><p className="text-[10px] uppercase tracking-[0.28em] text-white/30">Work</p><h1 className="mt-2 text-3xl tracking-tight">Projects</h1></div>
        <button className="rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black">New project</button>
      </div>
      <div className="py-10 text-sm text-white/35">Projects appear here after they are created through the dashboard data layer.</div>
    </section>
  )
}
