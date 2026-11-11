/**
 * Motion system — one source of truth for timing.
 *
 * Everything animated on this site pulls its curve from here so the whole
 * page feels like it was choreographed by one hand. Values follow the
 * conventions used by Apple's marketing surfaces and the motion.dev guides:
 * short, decisive entrances; long, soft settles; springs for anything the
 * pointer touches.
 */
import type { Transition, Variants } from 'motion/react'

/** Decelerating curves — used for anything entering the screen. */
export const EASE = {
  /** The house curve. Fast out of the gate, long settle. */
  out: [0.22, 1, 0.36, 1],
  /** Slightly snappier; used for pointer feedback. */
  snap: [0.32, 0.72, 0, 1],
  /** Symmetric; used for things that travel both ways. */
  inOut: [0.65, 0, 0.35, 1],
  /** Very soft; used for large surfaces like sheets and overlays. */
  soft: [0.16, 1, 0.3, 1],
} as const

export type EaseName = keyof typeof EASE

export const DURATION = {
  instant: 0.12,
  fast: 0.24,
  base: 0.42,
  slow: 0.72,
  crawl: 1.1,
} as const

export const SPRING = {
  /** Pointer-tracking and small UI state. */
  pointer: { type: 'spring', stiffness: 340, damping: 32, mass: 0.6 },
  /** Panels, sheets, card stacks. */
  surface: { type: 'spring', stiffness: 190, damping: 26, mass: 1 },
  /** Large layout moves (shared elements, grid reflow). */
  layout: { type: 'spring', stiffness: 260, damping: 34, mass: 0.9 },
  /** Smoothed scroll-linked values — enough lag to feel weighty, not sloppy. */
  scroll: { stiffness: 220, damping: 40, restDelta: 0.001 },
} satisfies Record<string, Transition>

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.out } },
}

export const maskUp: Variants = {
  hidden: { y: '105%' },
  visible: { y: '0%', transition: { duration: DURATION.slow, ease: EASE.out } },
}

/** Container that staggers its children. */
export function stagger(staggerChildren = 0.06, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }
}

/** Reduced-motion-safe variants: no travel, no scale, just a fade. */
export const safeFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.out } },
}

/** Shared-element transition used by cards morphing into case studies. */
export const sharedElement: Transition = {
  duration: 0.62,
  ease: EASE.snap,
}
