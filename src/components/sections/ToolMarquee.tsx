'use client'

import { useRef } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { toolEntries } from '@/lib/data/toolkit'

/**
 * Credits strip.
 *
 * A ticker of the techniques behind the page — the same device film end-credits
 * use to acknowledge craft. Scroll velocity skews the strip (the Reel Flux
 * behaviour) so the ticker reads as part of the page's motion, not a widget on
 * top of it.
 */
export function ToolMarquee() {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()

  const velocity = useSpring(0, { stiffness: 180, damping: 34 })
  useMotionValueEvent(scrollY, 'change', (value) => {
    const previous = scrollY.getPrevious() ?? value
    velocity.set(Math.max(-22, Math.min(22, (value - previous) * 0.9)))
  })

  const skew = useTransform(velocity, (value) => `skewX(${value * 0.16}deg)`)

  const items = toolEntries.filter((entry) => entry.kind !== 'template')

  return (
    <div
      ref={ref}
      aria-label="Techniques referenced from the HorizonX library"
      className="relative overflow-hidden border-y border-[var(--hairline)] bg-[var(--bg-elevated)]/40 py-4"
    >
      <div className="marquee-mask">
        <motion.div
          style={reduced ? undefined : { skewX: skew }}
          className="flex w-max items-center gap-8 will-change-transform"
        >
          {[0, 1].map((pass) => (
            <div
              key={pass}
              className="flex w-max items-center gap-8"
              style={reduced ? undefined : { animation: 'marquee 52s linear infinite' }}
              aria-hidden={pass === 1}
            >
              {items.map((entry) => (
                <span key={`${pass}-${entry.id}`} className="flex items-center gap-2.5 whitespace-nowrap">
                  <span
                    className="size-1 rounded-full"
                    style={{ backgroundColor: KIND_TINT[entry.kind] }}
                    aria-hidden
                  />
                  <span className="text-[12.5px] font-medium tracking-[-0.01em] text-[var(--fg)]/72">
                    {entry.name}
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--fg)]/30">
                    {entry.kind}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const KIND_TINT: Record<string, string> = {
  tool: '#e08a5f',
  shader: '#7dd3fc',
  sound: '#a78bfa',
  model: '#fbbf24',
  icons: '#9a9aa4',
  template: '#f472b6',
}
