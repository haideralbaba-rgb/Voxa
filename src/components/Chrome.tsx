'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'

const LOADER_KEY = 'voxa_intro_seen_v1'

function subscribeFinePointer(onChange: () => void) {
  const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getFinePointerSnapshot() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function getServerFalseSnapshot() {
  return false
}

export function Loader() {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduced) return
    try {
      if (window.sessionStorage.getItem(LOADER_KEY)) return
      window.sessionStorage.setItem(LOADER_KEY, '1')
    } catch {
      return
    }

    const start = performance.now()
    const duration = 680
    let raf = 0
    let hideTimer = 0

    const tick = (now: number) => {
      setVisible(true)
      const elapsed = now - start
      const ratio = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - ratio, 3)
      setProgress(Math.round(eased * 100))

      if (ratio < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        hideTimer = window.setTimeout(() => setVisible(false), 140)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(hideTimer)
    }
  }, [reduced])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-[#101011] px-6 py-8 text-[#efebe1] md:px-12 md:py-10"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between border-b border-[#efebe1]/15 pb-4">
            <span className="label text-[#efebe1]/70">VOXA STUDIO</span>
            <span className="label text-[#efebe1]/70">KARBALA, IRAQ</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <div className="latin flex items-baseline gap-1.5 font-display text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-none tracking-[-0.04em]">
              <span>VOXA</span>
              <span className="inline-block h-3 w-3 rounded-full bg-[#d8ff3f] md:h-4 md:w-4" />
            </div>
            <p className="text-sm text-[#efebe1]/60">استوديو تصميم مستقل</p>
          </div>

          <div className="space-y-3">
            <div className="h-[1px] w-full overflow-hidden bg-[#efebe1]/15">
              <div
                className="h-full bg-[#d8ff3f] transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="label text-[#efebe1]/50">LOADING EDITORIAL SYSTEM</span>
              <span className="label text-[#d8ff3f]">{String(progress).padStart(2, '0')}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Cursor() {
  const reduced = useReducedMotion()
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerFalseSnapshot,
  )
  const enabled = !reduced && finePointer
  const [shown, setShown] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [interactive, setInteractive] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 460, damping: 38, mass: 0.45 })
  const sy = useSpring(y, { stiffness: 460, damping: 38, mass: 0.45 })

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setShown(true)

      const target = event.target instanceof Element ? event.target : null
      const cursorHost = target?.closest('[data-cursor]')
      const cursorText = cursorHost?.getAttribute('data-cursor') || null
      setLabel(cursorText)

      const isInteractive = Boolean(
        !cursorText && target?.closest('a, button, [role="button"], input, textarea, select, label'),
      )
      setInteractive(isInteractive)
    }

    const onLeave = () => {
      setShown(false)
      setLabel(null)
      setInteractive(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, x, y])

  if (!enabled || !shown) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2"
    >
      {label ? (
        <motion.div
          initial={{ scale: 0.72, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.72, opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          className="flex items-center gap-1.5 rounded-full border border-[#101011]/20 bg-[#d8ff3f] px-3.5 py-1.5 font-display text-xs font-medium text-[#101011] shadow-md"
        >
          <span>{label}</span>
        </motion.div>
      ) : (
        <motion.div
          animate={{
            width: interactive ? 34 : 11,
            height: interactive ? 34 : 11,
            opacity: interactive ? 0.9 : 0.75,
          }}
          transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
          className="rounded-full border border-[#efebe1] bg-[#efebe1] mix-blend-difference"
          style={{
            backgroundColor: interactive ? 'transparent' : '#efebe1',
          }}
        />
      )}
    </motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 36, restDelta: 0.001 })

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-right bg-blue"
      />
    </div>
  )
}
