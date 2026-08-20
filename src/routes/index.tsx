import { createFileRoute } from '@tanstack/react-router'
import { getPublicPortfolio } from '../server/data'
import { PortfolioPage } from '../components/PortfolioPage'

export const Route = createFileRoute('/')({
  loader: () => getPublicPortfolio(),
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()
  if (!data) return <PlatformLanding />
  return <PortfolioPage data={data} />
}

function PlatformLanding() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="mx-auto flex min-h-screen max-w-[1500px] flex-col justify-between px-6 py-7 sm:px-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="text-xs font-semibold tracking-[0.28em]">VOXA</div>
          <a href="/dashboard" className="text-xs text-white/45 transition hover:text-white">Creator studio</a>
        </div>
        <div className="max-w-6xl py-20">
          <p className="mb-7 text-[11px] uppercase tracking-[0.3em] text-white/35">Portfolio platform for digital creators</p>
          <h1 className="text-[clamp(4rem,12vw,11rem)] font-medium leading-[0.84] tracking-[-0.06em]">Make the work<br />feel <em className="font-serif not-italic text-white/45">expensive.</em></h1>
          <p className="mt-10 max-w-xl text-base leading-8 text-white/45">A cinematic home for editors, designers, motion artists and visual storytellers. Your work first. Everything else disappears.</p>
        </div>
        <div className="grid gap-3 border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.25em] text-white/30 sm:grid-cols-3">
          <span>Media-first</span><span>Multi-tenant</span><span>Built for creators</span>
        </div>
      </section>
    </main>
  )
}
