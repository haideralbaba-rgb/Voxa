'use client'

import { motion, useReducedMotion, useTransform } from 'motion/react'
import { useSpotlight } from '@/hooks/useSpotlight'

/**
 * The ambient layer behind the hero: a grid, two barely-there colour fields,
 * and a slow spotlight that follows the pointer. Everything is driven by
 * motion values, so no React re-render happens on pointer move.
 */
export function HeroBackdrop({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof import('motion/react').useScroll>['scrollYProgress']
}) {
  const reduced = useReducedMotion()
  const { ref, x, y, opacity, nx, ny } = useSpotlight()

  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.15])
  const glowX = useTransform(nx, (value) => `${value * -48}px`)
  const glowY = useTransform(ny, (value) => `${value * -34}px`)
  // The second field drifts the opposite way for depth.
  const counterX = useTransform(glowX, (value) => value.replace('-', ''))

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0 grid-lines"
        style={reduced ? undefined : { opacity: gridOpacity }}
      />

      {/* Pointer spotlight */}
      {!reduced ? (
        <motion.div
          className="absolute size-[38rem] rounded-full"
          style={{
            x,
            y,
            opacity,
            translateX: '-50%',
            translateY: '-50%',
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--color-accent) 22%, transparent) 0%, transparent 62%)',
            filter: 'blur(28px)',
          }}
        />
      ) : null}

      {/* Two slow colour fields, drifting opposite the pointer */}
      <motion.div
        style={reduced ? undefined : { x: glowX, y: glowY }}
        className="absolute left-1/2 top-[-18rem] h-[34rem] w-[62rem] -translate-x-1/2 rounded-full bg-accent/14 blur-[120px]"
      />
      <motion.div
        style={reduced ? undefined : { x: counterX, y: glowY }}
        className="absolute left-[8%] top-[22rem] size-[24rem] rounded-full bg-[#4c7d92]/10 blur-[110px]"
      />

      {/* Vignette to seat the content */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
    </div>
  )
}
