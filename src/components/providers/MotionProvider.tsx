'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { DURATION, EASE } from '@/lib/motion'

/**
 * Global motion defaults.
 *
 * `reducedMotion="user"` makes Motion drop transform and layout animations
 * automatically when the visitor asks for reduced motion, while keeping
 * opacity fades so state changes are still legible.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: EASE.out }}
    >
      {children}
    </MotionConfig>
  )
}
