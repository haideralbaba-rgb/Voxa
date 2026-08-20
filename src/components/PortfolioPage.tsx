import { useMemo } from 'react'
import { ArrowUpRight, Instagram, Linkedin, Mail } from 'lucide-react'
import type { PortfolioViewModel } from '../types'
import { SmartGrid } from './SmartGrid'

export function PortfolioPage({ data }: { data: PortfolioViewModel }) {
  const links = useMemo(() => Object.entries(data.profile.socialLinks ?? {}), [data.profile.socialLinks])
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto w-full max-w-[1600px] px-5 pb-20 pt-7 sm:px-8 lg:px-12">
        <nav className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="text-xs font-semibold tracking-[0.28em] text-white/80">VOXA</div>
          <div className="flex items-center gap-4 text-xs text-white/45">
            {links.map(([key, href]) => (
              <a key={key} href={href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                {key === 'instagram' ? <Instagram size={15} /> : key === 'linkedin' ? <Linkedin size={15} /> : key === 'email' ? <Mail size={15} /> : <ArrowUpRight size={15} />}
                <span className="sr-only">{key}</span>
              </a>
            ))}
          </div>
        </nav>

        <header className="grid gap-10 pb-8 pt-20 lg:grid-cols-[1.5fr_0.7fr] lg:items-end lg:pt-28">
          <div>
            <div className="mb-7 text-[11px] uppercase tracking-[0.28em] text-white/35">{data.profile.profession ?? 'Independent Creative'}</div>
            <h1 className="max-w-5xl text-[clamp(3.5rem,10vw,9rem)] font-medium leading-[0.86] tracking-[-0.055em]">
              {data.profile.displayName}
            </h1>
          </div>
          <div className="max-w-md pb-2 text-sm leading-7 text-white/48 lg:justify-self-end">
            {data.portfolio.description ?? data.profile.bio ?? 'Selected work, visual experiments, and commercial stories.'}
          </div>
        </header>

        <SmartGrid projects={data.projects} categories={data.categories.map((item) => item.name)} />

        {!data.capabilities.hideWatermark && (
          <footer className="pt-20 text-center text-[10px] uppercase tracking-[0.28em] text-white/25">Made with VOXA</footer>
        )}
      </div>
    </div>
  )
}
