'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ScrubReveal } from '@/components/ui/ScrubReveal'
import { useLocale } from '@/components/providers/LocaleProvider'



/**
 * The bridge between the hero and the work grid.
 *
 * A short, oversized statement that assembles word-by-word as you scroll and
 * then hands off to the projects. It exists to give the eye one beat of rest
 * before the density of the grid — the same structural role a headline plays
 * on Apple's product pages.
 */
export function StatementBridge() {
  const { t } = useLocale()
  const words = t.principle.text.split(' ')
  const ref = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 35%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 36, restDelta: 0.001 })

  return (
    <section ref={ref} aria-label={t.principle.label} className="relative border-t border-[var(--hairline)] py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
          {/* A pull quote, set as type: the section exists to give the eye one
              beat of rest between the work grid and the film. */}
          <blockquote>
            <p className="max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)] font-medium leading-[1.04] tracking-[-0.045em] text-balance">
              {words.map((word, index) => (
                <Word
                  key={`${word}-${index}`}
                  progress={progress}
                  index={index}
                  total={words.length}
                  reduced={Boolean(reduced)}
                  accent={index >= Math.ceil(words.length * 0.55)}
                >
                  {word}
                </Word>
              ))}
            </p>
            <footer className="mt-8 flex items-center gap-3">
              <span className="h-px w-10" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden />
              <span className="font-mono text-[10px] tracking-[0.18em] text-muted">{t.principle.label}</span>
            </footer>
          </blockquote>

          <ScrubReveal className="lg:pb-2" offset={['start 90%', 'start 60%']}>
            <p
              className="border-s-2 ps-4 text-[13.5px] leading-[1.85] text-[var(--fg)]/78"
              style={{ borderColor: 'var(--color-tide)' }}
            >
              {t.principle.annotation}
            </p>
          </ScrubReveal>
        </div>
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  index,
  total,
  reduced,
  accent,
}: {
  children: string
  progress: ReturnType<typeof useSpring>
  index: number
  total: number
  reduced: boolean
  accent: boolean
}) {
  // Each word lights up in sequence as the section crosses the viewport.
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.16, 1])
  const blur = useTransform(progress, [start, end], ['blur(4px)', 'blur(0px)'])

  return (
    <motion.span
      style={reduced ? undefined : { opacity, filter: blur }}
      className={accent ? 'serif-accent text-accent' : 'text-[var(--fg)]'}
    >
      {children}{' '}
    </motion.span>
  )
}
