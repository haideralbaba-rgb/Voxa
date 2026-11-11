'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { SPRING } from '@/lib/motion'

/**
 * Hairline reading indicator pinned under the header.
 * `useScroll()` with no target tracks the whole document; the spring keeps it
 * from twitching on trackpad inertia.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, SPRING.scroll)
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent/70 via-accent to-accent-soft"
      style={{ scaleX: progress }}
    />
  )
}
