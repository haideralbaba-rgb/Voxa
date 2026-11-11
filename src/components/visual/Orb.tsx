'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Orb — the site's 3D object.
 *
 * The reference catalogue is full of glass orbs, plasma spheres and crystal
 * cubes rendered in WebGL. This is the same idea reduced to what actually
 * survives a portfolio page: a sphere shaded by four stacked gradients (body,
 * inner caustic, rim, specular) that reads as glass at any size, lit from the
 * top-left, with a pointer-following specular highlight.
 *
 * No canvas, no library, ~0.5ms of paint. `reduced` freezes the rotation and
 * keeps the object still and lit.
 */

export type OrbTone = 'ember' | 'chromatic' | 'cobalt' | 'frost'

const TONES: Record<OrbTone, { core: string; rim: string; halo: string; specular: string }> = {
  ember: {
    core: 'radial-gradient(circle at 34% 28%, #ffd9c4 0%, #f0b79b 14%, #e08a5f 32%, #a8502c 58%, #4a1d0d 88%)',
    rim: 'rgba(240,183,155,0.55)',
    halo: 'rgba(224,138,95,0.42)',
    specular: 'rgba(255,245,238,0.9)',
  },
  chromatic: {
    core: 'radial-gradient(circle at 32% 26%, #ffffff 0%, #7dd3fc 18%, #a78bfa 40%, #f472b6 62%, #7c2d6b 88%)',
    rim: 'rgba(196,181,253,0.6)',
    halo: 'rgba(167,139,250,0.4)',
    specular: 'rgba(255,255,255,0.95)',
  },
  cobalt: {
    core: 'radial-gradient(circle at 34% 26%, #dbeafe 0%, #93c5fd 16%, #3b82f6 38%, #1d4ed8 60%, #0b1e4a 90%)',
    rim: 'rgba(147,197,253,0.5)',
    halo: 'rgba(59,130,246,0.38)',
    specular: 'rgba(240,249,255,0.92)',
  },
  frost: {
    core: 'radial-gradient(circle at 34% 26%, #ffffff 0%, #e8eaef 20%, #c9c9d0 44%, #71717c 72%, #27272d 92%)',
    rim: 'rgba(255,255,255,0.45)',
    halo: 'rgba(154,154,164,0.32)',
    specular: 'rgba(255,255,255,0.95)',
  },
}

interface OrbProps {
  tone?: OrbTone
  size?: number
  className?: string
  /** Enables the pointer-tracked highlight + parallax tilt. */
  interactive?: boolean
  /** Ambient slow rotation of the internal caustic band. */
  spin?: boolean
}

export function Orb({
  tone = 'chromatic',
  size = 220,
  className,
  interactive = true,
  spin = true,
}: OrbProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const palette = TONES[tone]

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.7 })
  const sy = useSpring(my, { stiffness: 120, damping: 22, mass: 0.7 })

  // The specular highlight slides a little further than the tilt so the glass
  // reads as thick rather than as a sticker.
  const lightX = useTransform(sx, [0, 1], ['26%', '58%'])
  const lightY = useTransform(sy, [0, 1], ['22%', '46%'])
  const tiltX = useTransform(sy, [0, 1], [6, -6])
  const tiltY = useTransform(sx, [0, 1], [-7, 7])

  // Hooks above this line, guard below it — never the other way round.
  const enabled = interactive && !reduced

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width)
    my.set((event.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={
        enabled
          ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900, transformStyle: 'preserve-3d' }
          : undefined
      }
      className={cn('relative', className)}
      aria-hidden
    >
      {/* Halo: the light the object throws on its surroundings */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          background: `radial-gradient(circle, ${palette.halo} 0%, transparent 62%)`,
        }}
      />

      {/* Body */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: size,
          height: size,
          background: palette.core,
          boxShadow: `inset -18px -22px 48px rgba(0,0,0,0.55), inset 12px 14px 38px rgba(255,255,255,0.18), 0 40px 90px -40px ${palette.halo}`,
        }}
      >
        {/* Internal caustic band — the thing that makes it read as glass */}
        {spin && !reduced ? (
          <motion.div
            className="absolute inset-[-25%] opacity-45 mix-blend-screen"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, ${palette.specular} 42deg, transparent 96deg, transparent 200deg, ${palette.rim} 250deg, transparent 300deg)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        ) : null}

        {/* Rim light */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `inset 0 0 0 1px ${palette.rim}, inset 0 0 26px ${palette.rim}` }}
        />

        {/* Specular highlight — tracks the pointer when interactive */}
        {enabled ? (
          <motion.div
            className="absolute size-[38%] rounded-full blur-md"
            style={{
              left: lightX,
              top: lightY,
              background: `radial-gradient(circle, ${palette.specular} 0%, transparent 70%)`,
            }}
          />
        ) : (
          <div
            className="absolute left-[26%] top-[20%] size-[34%] rounded-full blur-md"
            style={{ background: `radial-gradient(circle, ${palette.specular} 0%, transparent 70%)` }}
          />
        )}
      </div>
    </motion.div>
  )
}
