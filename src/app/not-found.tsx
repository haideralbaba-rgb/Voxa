import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projects } from '@/lib/data/projects'

export default function NotFound() {
  return (
    <main className="container-page flex min-h-dvh flex-col justify-center py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">404 — Off the grid</p>
      <h1 className="mt-5 max-w-3xl text-display-lg font-semibold leading-[0.98] tracking-[-0.045em]">
        This page never made it past <span className="serif-accent text-accent">review</span>.
      </h1>
      <p className="mt-5 max-w-md text-[15px] leading-7 text-muted">
        The link may be old, or the case study may have moved. Here is where I would start.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--fg)] px-5 text-[14px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
        >
          <ArrowLeft size={15} aria-hidden />
          Back to the portfolio
        </Link>
      </div>

      <div className="mt-14 border-t border-[var(--hairline)] pt-6">
        <p className="eyebrow">Try a case study</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {projects.slice(0, 4).map((project) => (
            <li key={project.id}>
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center rounded-full border border-[var(--hairline)] px-3.5 py-2 text-[12.5px] font-medium text-[var(--fg)]/72 transition-colors hover:border-[var(--hairline-strong)] hover:text-[var(--fg)]"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
