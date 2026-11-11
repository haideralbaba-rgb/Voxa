'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

/**
 * The page's ground.
 *
 * Every section used to bring its own decoration, which is why the site read as
 * a stack of blocks rather than one surface. This paints the whole document
 * once, behind everything, and lets the sections sit *on* it:
 *
 *   1. a printed base — warm paper in light, oxidised ink in dark
 *   2. a horizon: light falling from the top of the page
 *   3. a warm wash (accent) and a cool wash (tide) on opposite corners
 *   4. a hairline grid, masked so it only exists near the top
 *   5. a scroll-linked parallax so the washes move slower than the content
 *
 * All five read from the theme tokens in globals.css, so switching theme
 * repaints the ground instead of swapping two unrelated palettes.
 */
export function CanvasBackdrop() {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 })

  const warmY = useTransform(progress, [0, 1], ['0%', '18%'])
  const coolY = useTransform(progress, [0, 1], ['0%', '-12%'])
  const gridOpacity = useTransform(progress, [0, 0.35], [1, 0.25])

  useEffect(() => {
    // The ground is fixed; the document itself must stay transparent so this
    // shows through. Set on <html> so overscroll rubber-banding matches too.
    document.documentElement.style.backgroundColor = 'transparent'
    return () => {
      document.documentElement.style.backgroundColor = ''
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
      style={{ backgroundColor: 'var(--backdrop-base)' }}
    >
      {/* Horizon — light from the top of the document */}
      <div className="absolute inset-0" style={{ background: 'var(--backdrop-horizon)' }} />

      {/* Warm wash, upper right: the accent's presence before any content */}
      <motion.div
        className="absolute -right-[18%] -top-[12%] h-[62vh] w-[62vw] rounded-full blur-[120px]"
        style={{
          background: 'var(--backdrop-wash)',
          y: reduced ? undefined : warmY,
        }}
      />

      {/* Cool wash, mid left: the counterweight */}
      <motion.div
        className="absolute -left-[14%] top-[26%] h-[58vh] w-[52vw] rounded-full blur-[130px]"
        style={{
          background: 'var(--backdrop-tide)',
          y: reduced ? undefined : coolY,
        }}
      />

      {/* Hairline grid — only where the horizon is, so it reads as structure */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[70vh] canvas-grid"
        style={{ opacity: reduced ? 1 : gridOpacity }}
      />

      {/* Vignette: keeps the corners from floating */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(140% 100% at 50% 0%, transparent 40%, rgb(0 0 0 / 0.06) 100%)',
        }}
      />

      {/* Paper texture: one repeating conic weave, cheaper than an image */}
      <div className="canvas-weave absolute inset-0" />
    </div>
  )
}
