'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from 'motion/react'

interface Spotlight {
  /** Attach to the element that should receive the pointer tracking. */
  ref: React.RefObject<HTMLDivElement | null>
  /** Smoothed pointer position in pixels, relative to the element. */
  x: MotionValue<number>
  y: MotionValue<number>
  /** Normalised -0.5…0.5 position, handy for parallax and tilt. */
  nx: MotionValue<number>
  ny: MotionValue<number>
  /** 0 → 1 presence, fades in on first pointer move and out on leave. */
  opacity: MotionValue<number>
}

/**
 * Tracks the pointer inside an element and exposes spring-smoothed values.
 * Listens only to pointer events that actually originate from a fine pointer,
 * so touch devices never pay for the work.
 */
export function useSpotlight(): Spotlight {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rawNx = useMotionValue(0)
  const rawNy = useMotionValue(0)
  const rawOpacity = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 190, damping: 28, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 190, damping: 28, mass: 0.5 })
  const nx = useSpring(rawNx, { stiffness: 140, damping: 24, mass: 0.6 })
  const ny = useSpring(rawNy, { stiffness: 140, damping: 24, mass: 0.6 })
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const element = ref.current
    if (!element || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const px = event.clientX - rect.left
      const py = event.clientY - rect.top
      rawX.set(px)
      rawY.set(py)
      rawNx.set(px / rect.width - 0.5)
      rawNy.set(py / rect.height - 0.5)
      rawOpacity.set(1)
    }
    const onLeave = () => rawOpacity.set(0)

    element.addEventListener('pointermove', onMove, { passive: true })
    element.addEventListener('pointerleave', onLeave)
    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [rawX, rawY, rawNx, rawNy, rawOpacity, reduced])

  return { ref, x, y, nx, ny, opacity }
}
