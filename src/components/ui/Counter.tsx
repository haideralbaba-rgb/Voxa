'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface CounterProps {
  /** Display value, e.g. "10+", "2.1s", "40+", "9". */
  value: string
  className?: string
  /** Decimal places to preserve while counting. Inferred when omitted. */
  decimals?: number
}

/**
 * Counts up to a numeric display value once it scrolls into view.
 *
 * The number is parsed out of the string and the surrounding characters are
 * preserved, so "2.1s" keeps its unit and "40+" keeps its plus. The final value
 * is what renders on the server, so there is no layout shift and no wrong
 * reading before hydration; assistive tech gets the settled value only.
 */
export function Counter({ value, className, decimals }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(value)

  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  const prefix = match?.[1] ?? ''
  const target = match?.[2] ? Number(match[2]) : null
  const suffix = match?.[3] ?? ''
  const places = decimals ?? (match?.[2]?.split('.')[1]?.length ?? 0)

  useEffect(() => {
    if (target === null || reduced || !inView) return
    const duration = 1100
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Fast out, settle in — the same curve as the rest of the site.
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(`${prefix}${(target * eased).toFixed(places)}${suffix}`)
      if (t < 1) frame = requestAnimationFrame(tick)
      else setDisplay(value)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, target, prefix, suffix, places, value])

  return (
    <span ref={ref} className={className}>
      {target === null ? value : display}
    </span>
  )
}
