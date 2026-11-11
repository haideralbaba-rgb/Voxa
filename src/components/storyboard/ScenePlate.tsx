'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import { Art } from '@/components/ui/Art'
import type { StoryboardScene } from '@/lib/types'

/**
 * Scene plates.
 *
 * Every scene is driven by two numbers only:
 *  - `p`      — progress through this scene (0 → 1), scroll-linked
 *  - `global` — progress through the whole film (0 → 1), for HUD readouts
 *
 * That means nothing here owns a timer, nothing fights the browser's scroll
 * thread, and scrubbing backwards is free. Each plate borrows a mechanic from
 * the HorizonX tools catalogue (grid, tunnel, bloom, orbit, ribbon, assistant,
 * glyph sphere, gravity well) and renders it with CSS transforms.
 */

interface PlateProps {
  scene: StoryboardScene
  /** Progress through this scene, 0 → 1. Scroll-linked, so it runs both ways. */
  p: MotionValue<number>
}

/** The carrier: the same "one card" object that appears in scenes 1, 2 and 10. */
function HeroCard({ scale = 1, glow = 0.6 }: { scale?: number; glow?: number }) {
  return (
    <div
      className="relative h-[58%] w-[46%] max-w-[19rem] rounded-[26px] border border-[#f0b79b]/40 bg-[#0f0f13] shadow-[0_40px_120px_-40px_rgba(224,138,95,0.65)]"
      style={{ transform: `scale(${scale})` }}
    >
      <div
        className="absolute inset-0 rounded-[26px]"
        style={{
          background: `radial-gradient(120% 90% at 50% 60%, rgba(224,138,95,${glow * 0.35}) 0%, transparent 62%)`,
        }}
      />
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">Voxa</span>
        <span className="size-2 rounded-full bg-[#e08a5f]" />
      </div>
      <div className="absolute left-6 top-6 h-px w-10 bg-white/20" />
    </div>
  )
}

export function ScenePlate({ scene, p }: PlateProps) {
  switch (scene.id) {
    case 'title':
      return <TitlePlate />
    case 'grid':
      return <GridPlate p={p} />
    case 'tunnel':
      return <TunnelPlate p={p} />
    case 'bloom':
      return <BloomPlate p={p} />
    case 'orbit':
      return <OrbitPlate p={p} />
    case 'wave':
      return <WavePlate p={p} />
    case 'axiom':
      return <AxiomPlate p={p} />
    case 'glyphs':
      return <GlyphPlate p={p} />
    case 'gravity':
      return <GravityPlate p={p} />
    case 'resolution':
      return <ResolutionPlate />
    default:
      return null
  }
}

/* 01 — one card, held. The camera lives here: it pushes in forever. */
function TitlePlate() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        animate={{ scale: [1, 1.035, 1], rotate: [0, 0.6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="grid h-full w-full place-items-center"
      >
        <HeroCard scale={1} glow={0.9} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_55%,rgba(224,138,95,0.18),transparent_70%)]" />
    </div>
  )
}

/* 02 — the grid assembles out of the hero card. Same object, now with a room. */
function GridPlate({ p }: { p: MotionValue<number> }) {
  const tiles = Array.from({ length: 12 })
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        style={{ opacity: p, scale: 0.96 }}
        className="grid grid-cols-3 gap-2.5"
      >
        {tiles.map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            className="size-16 rounded-lg border border-white/12 bg-white/[0.035] sm:size-20"
            animate={{ opacity: [0.25, 0.7, 0.35], scale: [0.98, 1, 0.99] }}
            transition={{ duration: 3.4 + (i % 4) * 0.6, repeat: Infinity, delay: i * 0.09 }}
          />
        ))}
      </motion.div>
      <div className="absolute bottom-[18%]">
        <HeroCard scale={0.62} glow={0.5} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(224,138,95,0.14),transparent)]" />
    </div>
  )
}

/* 03 — the corridor. Frames scale up and pass the lens; we never cut. */
function TunnelPlate({ p }: { p: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 [perspective:900px]">
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-[22px] border"
            style={{
              width: `${38 - i * 3}%`,
              height: `${62 - i * 5}%`,
              x: '-50%',
              y: '-50%',
              borderColor: `rgba(224,138,95,${0.42 - i * 0.038})`,
              // Scroll pushes the whole corridor; the per-frame delay makes the
              // stack breathe so it reads as depth rather than a zoom.
              transform: undefined,
              zIndex: 10 - i,
              opacity: p,
            }}
            animate={{ z: [0, 260], opacity: [0.9, 0.15] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: i * 0.32,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffd7c0] blur-2xl" />
    </div>
  )
}

/* 04 — the pivot. The corridor's vanishing point blooms into six plates. */
function BloomPlate({ p }: { p: MotionValue<number> }) {
  // The fan opens as the scene plays: scroll drives the spread, not a timer.
  const spread = useTransform(p, [0, 1], [0.62, 1])
  const lift = useTransform(p, [0, 1], [8, -8])

  return (
    <div className="absolute inset-0 grid place-items-center [perspective:1100px]">
      <motion.div className="relative size-64" style={{ scale: spread, y: lift }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-44 w-28 rounded-2xl border border-white/14 bg-[#111116]"
            style={{ x: '-50%', y: '-50%', rotate: (i - 2.5) * 13, zIndex: 6 - i }}
            animate={{ y: ['-50%', `calc(-50% - ${12 + i * 3}px)`], rotate: (i - 2.5) * 13 }}
            transition={{ duration: 2.6, repeat: Infinity, repeatType: 'reverse', delay: i * 0.08, ease: 'easeInOut' }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e08a5f] blur-xl" />
      </motion.div>
    </div>
  )
}

/* 05 — the plates leave the floor and orbit. Scroll turns the ring. */
function OrbitPlate({ p }: { p: MotionValue<number> }) {
  const stills = ['orbit', 'grid', 'wave', 'axiom', 'glyphs', 'resolution'] as const
  return (
    <div className="absolute inset-0 grid place-items-center [perspective:1200px]">
      <motion.div
        className="relative size-[19rem] [transform-style:preserve-3d]"
        style={{ rotate: p }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {stills.map((key, i) => {
          const angle = (360 / stills.length) * i
          return (
            <div
              key={key}
              className="absolute left-1/2 top-1/2 h-28 w-40 overflow-hidden rounded-xl border border-white/16 bg-[#15151b] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]"
              style={{
                transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(9.5rem)`,
              }}
            >
              <Art
                src={`/images/story/still-${key}.svg`}
                alt=""
                fill
                sizes="160px"
                className="object-cover opacity-80"
              />
            </div>
          )
        })}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_60%,rgba(167,139,250,0.16),transparent_70%)]" />
    </div>
  )
}

/* 06 — the ring unwinds into a ribbon. */
function WavePlate({ p }: { p: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden">
      <motion.div className="flex items-center gap-3" style={{ y: p }}>
        {Array.from({ length: 11 }).map((_, i) => {
          const t = i / 10
          return (
            <motion.div
              key={i}
              className="h-24 w-16 shrink-0 rounded-lg border border-white/14 bg-[#141420]"
              animate={{ y: [Math.sin(t * Math.PI) * -46, Math.sin(t * Math.PI) * -30] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatType: 'reverse', delay: t * 0.5, ease: 'easeInOut' }}
              style={{ rotate: `${(t - 0.5) * -16}deg` }}
            />
          )
        })}
      </motion.div>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <path
          d="M-20 70 C 30 30, 60 88, 110 52"
          fill="none"
          stroke="rgba(224,138,95,0.4)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(125,211,252,0.1),transparent_70%)]" />
    </div>
  )
}

/* 07 — contact. The assistant bar, streaming. */
function AxiomPlate({ p }: { p: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
      <motion.div
        className="relative grid place-items-center"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="size-24 rounded-full border border-[#7dd3fc]/45 bg-[#0b1a24]" />
        <div className="absolute size-14 rounded-full bg-[#7dd3fc]/40 blur-xl" />
        <div className="absolute size-6 rounded-full bg-white/90" />
      </motion.div>

      <motion.div style={{ opacity: p, y: 0 }} className="w-[80%] max-w-sm">
        <div className="flex items-center gap-3 rounded-full border border-white/14 bg-[#0e0e12] px-4 py-3">
          <span className="size-6 rounded-full bg-[#7dd3fc]/25" />
          <span className="flex-1">
            <span className="block h-2 w-3/4 rounded-full bg-white/25" />
            <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-white/12" />
          </span>
        </div>
        <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
          streaming · 128 tokens
        </p>
      </motion.div>
    </div>
  )
}

/* 08 — the archive becomes a body: glyph sphere. */
function GlyphPlate({ p }: { p: MotionValue<number> }) {
  const dots = Array.from({ length: 90 })
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        className="relative size-64"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: p }}
      >
        {dots.map((_, i) => {
          const a = i * 2.399963
          const r = 120 * Math.sqrt(i / 90)
          return (
            <span
              key={i}
              className="absolute size-1 rounded-full bg-[#c4b5fd]"
              style={{
                left: `calc(50% + ${r * Math.cos(a)}px)`,
                top: `calc(50% + ${r * Math.sin(a)}px)`,
                opacity: 0.2 + 0.6 * (1 - i / 90),
              }}
            />
          )
        })}
        <span className="absolute inset-8 rounded-full border border-[#a78bfa]/25" />
        <span className="absolute inset-16 rounded-full border border-[#a78bfa]/15" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(167,139,250,0.18),transparent_70%)]" />
    </div>
  )
}

/* 09 — mass. The wireframe bends toward the pointer and ripples on click. */
function GravityPlate({ p }: { p: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 grid place-items-center [perspective:800px]">
      <motion.div
        className="relative size-64"
        style={{ rotateX: 62, opacity: p }}
      >
        {Array.from({ length: 11 }).map((_, i) => {
          const t = i / 10
          return (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 rounded-[50%] border border-[#a78bfa]/40"
              style={{
                width: `${18 + t * 78}%`,
                height: `${18 + t * 78}%`,
                x: '-50%',
                y: '-50%',
              }}
              animate={{ scale: [1, 1 + 0.02 * (1 - t), 1] }}
              transition={{ duration: 5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
            />
          )
        })}
        <span className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e9d5ff] blur-[10px]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_60%,rgba(167,139,250,0.2),transparent_72%)]" />
    </div>
  )
}

/* 10 — end card: back to the object, now with the light field behind it. */
function ResolutionPlate() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        className="absolute size-[26rem] rounded-full opacity-40 blur-3xl"
        style={{
          background: 'conic-gradient(from 0deg, #7dd3fc, #a78bfa, #f472b6, #fbbf24, #7dd3fc)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <HeroCard scale={0.9} glow={0.8} />
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">
          fin · vol. 01
        </span>
      </motion.div>
    </div>
  )
}

