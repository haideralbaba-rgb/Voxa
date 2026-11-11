'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 26 },
  down: { x: 0, y: -26 },
  left: { x: 26, y: 0 },
  right: { x: -26, y: 0 },
  none: { x: 0, y: 0 },
}

export const EASE = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: Direction
  /** Fraction of the element that must be visible. */
  amount?: number
  once?: boolean
  as?: 'div' | 'li' | 'section' | 'span' | 'p' | 'article' | 'header' | 'footer'
}

/** Scroll-triggered entrance. Honours prefers-reduced-motion by rendering inert. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  amount = 0.25,
  once = true,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotion()
  const offset = offsets[direction]
  const MotionTag = motion[as]

  const variants: Variants = {
    hidden: reduced
      ? { opacity: 1 }
      : { opacity: 0, y: offset.y, x: offset.x, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration, delay, ease: EASE },
    },
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}

/** Staggers direct children with the same reveal language. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  amount?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  direction?: Direction
}) {
  const reduced = useReducedMotion()
  const offset = offsets[direction]
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y: offset.y, filter: 'blur(4px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.65, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
