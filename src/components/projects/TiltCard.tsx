'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Pointer-reactive 3D tilt with a moving specular highlight.
 *
 * The rotation is clamped to ~6° so it reads as depth rather than a gimmick,
 * and the highlight follows the pointer inside the card so the surface feels
 * physical. Disabled entirely for touch and reduced-motion visitors.
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
  glare = true,
}: {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 160, damping: 22, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 160, damping: 22, mass: 0.4 })

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity])
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity])
  const glareX = useTransform(sx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(sy, [0, 1], ['0%', '100%'])
  const glareOpacity = useTransform(sy, [0, 1], [0.32, 0])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.5), transparent 60%)`,
  )

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      className={cn('relative [backface-visibility:hidden]', className)}
    >
      {children}
      {glare ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{
            opacity: glareOpacity,
            background: glareBackground,
          }}
        />
      ) : null}
    </motion.div>
  )
}
