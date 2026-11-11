'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { Film, MoveDown } from 'lucide-react'
import { localizeStoryboard } from '@/lib/i18n/content'
import type { StoryboardScene } from '@/lib/types'
import type { Copy } from '@/lib/i18n/copy'
import { cn } from '@/lib/utils'
import { ScenePlate } from './ScenePlate'
import { useLocale } from '@/components/providers/LocaleProvider'

/**
 * Storyboard — one continuous film, driven entirely by scroll position.
 *
 * Rather than ten independent "reveal" animations played once, the whole
 * section is a single timeline: the page height *is* the runtime. Scrolling up
 * runs the film backwards; stopping freezes a frame. Each scene crossfades into
 * the next from inside the same viewport, so there is no jump, no cut, and no
 * opportunity for two shots to fight for the same layer.
 */
export function Storyboard() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()
  const { t, locale } = useLocale()
  const storyboardScenes = useMemo(() => localizeStoryboard(locale), [locale])
  const total = storyboardScenes.length

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // A little smoothing so trackpad flicks don't strobe the HUD.
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 38, restDelta: 0.0005 })

  const [active, setActive] = useState(0)
  useMotionValueEvent(progress, 'change', (value) => {
    const next = Math.min(total - 1, Math.max(0, Math.floor(value * total)))
    setActive((current) => (current === next ? current : next))
  })

  const timecode = useTransform(progress, (value) => {
    const runtime = 42
    const seconds = value * runtime
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
    const ss = String(Math.floor(seconds % 60)).padStart(2, '0')
    const ff = String(Math.floor((seconds % 1) * 24)).padStart(2, '0')
    return `${mm}:${ss}:${ff}`
  })

  const jumpTo = useCallback((index: number) => {
    const node = sectionRef.current
    if (!node) return
    const top = node.offsetTop
    const scrollable = node.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + (scrollable * (index + 0.5)) / total, behavior: 'smooth' })
  }, [total])

  if (reduced) return <StoryboardStatic scenes={storyboardScenes} t={t} />

  const scene = storyboardScenes[active] ?? storyboardScenes[0]!

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-labelledby="story-heading"
      className="relative scroll-mt-0 border-t border-[var(--hairline)]"
      style={{ height: `${total * 84}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--bg)]">
        {/* Stage */}
        <div className="absolute inset-0">
          {storyboardScenes.map((item, index) => (
            <SceneLayer
              key={item.id}
              index={index}
              total={total}
              progress={progress}
              scene={item}
              // Only the neighbours are mounted: distant scenes are fully
              // transparent, and unmounting them keeps every loop (grain,
              // particles, rings) from running off-screen.
              mounted={Math.abs(index - active) <= 1}
            />
          ))}
        </div>

        {/* Film frame: hairlines + light leaks */}
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />
          <div className="grain-overlay absolute inset-0 opacity-[0.07]" />
        </div>

        {/* HUD — top bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto flex max-w-[84rem] items-start justify-between gap-6 px-5 pt-24 md:px-8 md:pt-28">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--glass)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/70 backdrop-blur-md">
              <Film size={12} aria-hidden />
              {t.storyboard.hud} · {String(active + 1).padStart(2, '0')} / {total}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/40 sm:inline">
              {t.storyboard.volume}
            </span>
          </div>
          <motion.span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--fg)]/45 tabular-nums">
            {timecode}
          </motion.span>
        </div>

        {/* HUD — copy panel */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 mx-auto max-w-[84rem] px-5 pb-10 md:px-8 md:pb-12">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[11px] tracking-[0.18em]"
                  style={{ color: scene.accent }}
                >
                  {scene.index}
                </span>
                <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden />
                <span className="eyebrow">{scene.kind}</span>
              </div>

              <div className="relative mt-3 min-h-[7.5rem] sm:min-h-[8.5rem]">
                {storyboardScenes.map((item, index) => (
                  <motion.div
                    key={item.id}
                    aria-hidden={index !== active}
                    animate={{ opacity: index === active ? 1 : 0, y: index === active ? 0 : 10 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={cn('absolute inset-x-0 top-0', index === active ? '' : 'pointer-events-none')}
                  >
                    <h2
                      id={index === active ? 'story-heading' : undefined}
                      className="text-[clamp(1.6rem,3.6vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
                    >
                      {item.title}
                    </h2>
                    <p className="mt-3 max-w-md text-[13px] leading-[1.7] text-muted md:text-[13.5px]">
                      {item.note[0]} {item.note[1]}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/40">
                <span>{t.storyboard.mechanic}</span>
                <span style={{ color: scene.accent }}>{scene.mechanic}</span>
                <span aria-hidden>·</span>
                <span>
                  {t.storyboard.via} {scene.credit}
                </span>
              </p>
            </div>

            {/* Scene rail */}
            <div className="pointer-events-auto flex items-end gap-1.5" role="tablist" aria-label={t.storyboard.scenes}>
              {storyboardScenes.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`${t.storyboard.scene} ${item.index}: ${item.title}`}
                  onClick={() => jumpTo(index)}
                  className="group relative flex h-10 w-5 cursor-pointer items-end justify-center sm:w-6"
                >
                  <span
                    className={cn(
                      'block w-[2px] rounded-full transition-all duration-500',
                      index === active
                        ? 'h-8 bg-[var(--fg)]'
                        : index < active
                          ? 'h-4 bg-[var(--fg)]/35 group-hover:bg-[var(--fg)]/60'
                          : 'h-3 bg-[var(--fg)]/15 group-hover:bg-[var(--fg)]/40',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--hairline)] pt-4">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/35">
              <MoveDown size={12} className="animate-bounce" aria-hidden />
              {t.storyboard.scroll}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/30 sm:inline">
              {t.storyboard.meta}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/** One scene inside the sticky stage. Owns its own fade window. */
function SceneLayer({
  scene,
  index,
  total,
  progress,
  mounted,
}: {
  scene: StoryboardScene
  index: number
  total: number
  progress: MotionValue<number>
  mounted: boolean
}) {
  const step = 1 / total
  const start = index * step
  const end = start + step
  // Overlap so two shots are briefly on screen together — a dissolve, not a cut.
  const fade = step * 0.45

  const opacity = useTransform(
    progress,
    [Math.max(0, start - fade), start + fade, end - fade, Math.min(1, end + fade)],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0],
  )

  const scale = useTransform(progress, [start, end], [1.04, 0.97])
  const blur = useTransform(
    progress,
    [Math.max(0, start - fade), start + fade, end - fade, Math.min(1, end + fade)],
    ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(6px)'],
  )
  const local = useTransform(progress, [start, end], [0, 1])

  return (
    <motion.div
      style={{ opacity, scale, filter: blur }}
      className="absolute inset-0"
      aria-hidden={index !== 0}
    >
      {mounted ? <ScenePlate scene={scene} p={local} /> : null}
    </motion.div>
  )
}

/**
 * Reduced-motion presentation: the same ten frames, read as a contact sheet.
 * No scroll hijack, no pinning, everything visible immediately.
 */
function StoryboardStatic({ scenes, t }: { scenes: StoryboardScene[]; t: Copy }) {
  return (
    <section id="story" aria-label={t.storyboard.title} className="relative border-t border-[var(--hairline)] py-20 md:py-28">
      <div className="container-page">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.16em] text-accent">00</span>
          <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden />
          <span className="eyebrow">{t.storyboard.title}</span>
        </div>
        <h2 className="mt-5 max-w-2xl text-display-md font-semibold">{t.storyboard.staticTitle}</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {scenes.map((scene) => (
            <li key={scene.id} className="surface rounded-2xl p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: scene.accent }}>
                {scene.index} · {scene.kind}
              </p>
              <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.02em]">{scene.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-muted">{scene.note[0]}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)]/40">
                {scene.mechanic}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
