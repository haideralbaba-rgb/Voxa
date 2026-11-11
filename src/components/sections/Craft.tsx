'use client'

import { useLocale } from '@/components/providers/LocaleProvider'
import { motion, useReducedMotion } from 'motion/react'
import { Feather, Gauge, Layers, Waves } from 'lucide-react'

/**
 * Craft.
 *
 * The section that answers "so what?" for all the technique above: four
 * commitments, each with the number that backs it. Numbers come from the build
 * itself (budget, motion tokens, contrast ratio) rather than from a marketing
 * deck, so they can be re-checked with `npm run audit`.
 */
const pillars = [
  {
    id: 'speed',
    icon: Gauge,
    title: 'Fast before it is fancy',
    metric: '0 kB',
    metricLabel: 'of WebGL runtime',
    body: 'Every visual on this page is CSS or a locally drawn SVG. The hero backdrop, the orbs and the storyboard all composite on the GPU without shipping a renderer.',
    points: ['No canvas libraries', 'No font requests at runtime', 'Motion values, not timers'],
  },
  {
    id: 'motion',
    icon: Waves,
    title: 'One motion vocabulary',
    metric: '4',
    metricLabel: 'easing curves, site-wide',
    body: 'Every transition pulls its curve, duration and spring from a single module. That is why the page reads as one hand rather than a collection of effects.',
    points: ['EASE.out for entrances', 'Springs for anything the pointer touches', 'Scroll-linked, never scroll-jacked'],
  },
  {
    id: 'access',
    icon: Feather,
    title: 'Accessible by construction',
    metric: 'AA',
    metricLabel: 'contrast on every token',
    body: 'Muted text sits at 5.3:1 on light and 7.2:1 on dark. Focus rings are visible on every control, and nothing depends on colour alone.',
    points: ['Reduced-motion path for every scene', 'Full keyboard path via ⌘K', 'Sound off until asked'],
  },
  {
    id: 'systems',
    icon: Layers,
    title: 'Systems over screens',
    metric: '1',
    metricLabel: 'source of truth per layer',
    body: 'Content, timing and tokens each live in one place. Swapping the mock data for a CMS or the accent for a client brand is a one-file change.',
    points: ['Typed content model', 'Token-driven theming', 'Server components by default'],
  },
] as const

export function Craft() {
  const { t } = useLocale()
  const reduced = useReducedMotion()

  return (
    <section
      id="craft"
      aria-labelledby="craft-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--hairline)] py-20 md:py-28"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 border-t border-[var(--hairline)] pt-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.16em] text-accent">{t.craft.index}</span>
              <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden />
              <span className="eyebrow">{t.craft.eyebrow}</span>
            </div>
            <h2 id="craft-heading" className="text-display-md font-semibold">
              The craft is the <span className="serif-accent text-accent">budget</span>.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted md:text-base">
              Technique is only worth showing if it survives a slow connection, a
              screen reader and a person who does not want animation. Four
              commitments hold this page together.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.article
                key={pillar.id}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                className="group relative flex flex-col bg-[var(--bg)] p-6 transition-colors duration-500 hover:bg-[var(--card)] md:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-[var(--hairline)] bg-[var(--card)] text-[var(--fg)]/70 transition-colors duration-500 group-hover:border-accent/30 group-hover:text-accent">
                    <Icon size={17} strokeWidth={1.7} aria-hidden />
                  </span>
                  <div className="text-end">
                    <p className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-[var(--fg)]">
                      {pillar.metric}
                    </p>
                    <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">
                      {pillar.metricLabel}
                    </p>
                  </div>
                </div>

                <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.025em]">{pillar.title}</h3>
                <p className="mt-2.5 max-w-md text-[13.5px] leading-[1.72] text-muted">{pillar.body}</p>

                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--hairline)] pt-4">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--fg)]/45"
                    >
                      <span className="size-1 rounded-full bg-accent/60" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>

    </section>
  )
}
