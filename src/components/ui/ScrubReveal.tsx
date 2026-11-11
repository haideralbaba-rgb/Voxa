'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { SPRING } from '@/lib/motion'

interface ScrubRevealProps {
  children: ReactNode
  className?: string
  /**
   * Where the reveal starts and ends relative to the viewport.
   * Defaults to "element top hits 88% of the viewport" → "…hits 45%".
   */
  offset?: readonly [`${string} ${string}`, `${string} ${string}`]
  /** Direction the mask travels. */
  from?: 'bottom' | 'top'
  /** Feather, in percent of the box, for the soft edge of the mask. */
  overhang?: number
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'figure'
}

/**
 * The Apple-style "curtain" reveal: content is unmasked by a hard gradient
 * driven by scroll position rather than a fixed duration, so the visitor
 * controls the pace. Scroll-linked values run on the browser's native
 * ScrollTimeline where supported (see motion.dev scroll docs), keeping this
 * off the main thread.
 */
export function ScrubReveal({
  children,
  className,
  offset = ['start 88%', 'start 45%'],
  from = 'bottom',
  overhang = 16,
  as = 'div',
}: ScrubRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    // Template literal types keep the tuple readable while satisfying Motion's
    // string-literal union for offsets.
    offset: [offset[0], offset[1]] as unknown as ['start 88%', 'start 45%'],
  })
  const progress = useSpring(scrollYProgress, SPRING.scroll)

  const gradient = useTransform(progress, (value) => {
    // 0 → fully clipped at the leading edge, 1 → fully revealed.
    const revealed = Math.max(0, Math.min(100 + overhang, value * (100 + overhang)))
    const feather = Math.min(100, revealed + overhang)
    return from === 'bottom'
      ? `linear-gradient(to bottom, #000 0%, #000 ${revealed}%, transparent ${feather}%)`
      : `linear-gradient(to top, #000 0%, #000 ${revealed}%, transparent ${feather}%)`
  })

  const y = useTransform(progress, [0, 1], [16, 0])
  const MotionTag = motion[as]

  // Reduced motion: no mask, no travel. The content is simply there.
  if (reduced) {
    return (
      <MotionTag ref={ref} className={className}>
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      ref={ref}
      className={cn('[will-change:mask-image]', className)}
      style={{ maskImage: gradient, WebkitMaskImage: gradient, y }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Single-line mask reveal: the text slides up out of a clipped box as it
 * enters the viewport. Cheaper than ScrubReveal and the right choice for
 * headings.
 */
export function LineReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <span className={cn('inline-block overflow-hidden pb-[0.08em] align-bottom', className)}>
      <motion.span
        className="inline-block"
        initial={reduced ? false : { y: '110%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}
