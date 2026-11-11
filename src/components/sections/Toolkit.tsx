'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { toolEntries, toolKinds, type ToolKind } from '@/lib/data/toolkit'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useSound } from '@/components/providers/SoundProvider'

const KIND_LABEL: Record<ToolKind, string> = {
  tool: 'Tool',
  shader: 'Shader',
  sound: 'Sound',
  model: '3D',
  icons: 'Icons',
  template: 'Site',
}

const KIND_COLOR: Record<ToolKind, string> = {
  tool: '#e08a5f',
  shader: '#7dd3fc',
  sound: '#a78bfa',
  model: '#fbbf24',
  icons: '#9a9aa4',
  template: '#f472b6',
}

/**
 * The shelf.
 *
 * A reference catalogue only earns a place on a portfolio if it shows *what was
 * done with it* — so every row is a technique plus the decision it changed.
 * Each row links out (attribution) and the list is filterable by kind, because
 * the interesting question is "which shaders" not "show me everything".
 */
export function Toolkit() {
  const [kind, setKind] = useState<ToolKind | 'all'>('all')
  const reduced = useReducedMotion()
  const { play } = useSound()

  const visible = useMemo(
    () => (kind === 'all' ? toolEntries : toolEntries.filter((entry) => entry.kind === kind)),
    [kind],
  )

  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-heading"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeading
          index="06"
          eyebrow="Reference shelf"
          title={
            <span id="toolkit-heading">
              Techniques, <span className="serif-accent text-accent">not</span> takeaways.
            </span>
          }
          description="Every mechanic on this page has a source. This is where each one came from, and what it changed here — the library as a working notebook rather than a mood board."
          action={
            <a
              href="https://horizonx.so/tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--hairline-strong)] px-4 text-[13px] font-medium transition-colors hover:border-accent/50"
            >
              <Sparkles size={14} aria-hidden />
              HorizonX library
              <ArrowUpRight size={14} aria-hidden />
            </a>
          }
        />

        {/* Filter */}
        <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter the shelf by kind">
          {toolKinds.map((item) => {
            const active = kind === item.id
            const count =
              item.id === 'all'
                ? toolEntries.length
                : toolEntries.filter((entry) => entry.kind === item.id).length
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setKind(item.id)
                  play('click')
                }}
                className={cn(
                  'relative inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-medium transition-colors duration-300',
                  active ? 'text-[var(--bg)]' : 'text-[var(--fg)]/60 hover:text-[var(--fg)]',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="toolkit-pill"
                    className="absolute inset-0 rounded-full bg-[var(--fg)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full border border-[var(--hairline)]" aria-hidden />
                )}
                <span className="relative">{item.label}</span>
                <span className={cn('relative font-mono text-[10px]', active ? 'text-[var(--bg)]/55' : 'text-muted')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Rows */}
        <ul className="mt-8 border-t border-[var(--hairline)]">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((entry, index) => (
              <motion.li
                key={entry.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.015, 0.12) }}
                className="border-b border-[var(--hairline)]"
              >
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerEnter={() => play('hover')}
                  className="group grid cursor-pointer gap-3 py-5 transition-colors duration-300 hover:bg-[var(--card)]/50 md:grid-cols-[10rem_1fr_1.15fr_auto] md:items-baseline md:gap-6 md:px-3"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="size-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: KIND_COLOR[entry.kind] }}
                      aria-hidden
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      {KIND_LABEL[entry.kind]}
                    </span>
                  </span>

                  <span className="text-[15px] font-medium tracking-[-0.02em] text-[var(--fg)] md:text-[15.5px]">
                    {entry.name}
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[12.5px] leading-[1.6] text-muted">{entry.technique}</span>
                    <span className="mt-1 flex items-start gap-1.5 text-[12px] leading-[1.6] text-[var(--fg)]/72">
                      <span className="mt-[2px] font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                        here
                      </span>
                      {entry.borrowed}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="hidden shrink-0 text-[var(--fg)]/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)] md:block"
                    aria-hidden
                  />
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <p className="mt-6 max-w-2xl font-mono text-[10.5px] leading-[1.8] uppercase tracking-[0.1em] text-[var(--fg)]/35">
          Referenced for technique only. No catalogue assets are bundled or
          redistributed here — the sound cues are synthesised in-browser and every
          visual is CSS or locally drawn SVG.
        </p>
      </div>
    </section>
  )
}
