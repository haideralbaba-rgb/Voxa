'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

export interface Chapter {
  index: string
  title: string
  body: string
  bullets?: string[]
}

/**
 * A sticky editorial chapter list.
 *
 * The title column pins while the chapters scroll past it and the active
 * chapter develops in place — the structural device used on Apple product
 * pages and on the agency sites in 60fps' motion gallery. Progress is derived
 * from scroll, so the reader sets the tempo.
 */
export function ChapterScroller({
  chapters,
  label = 'Process',
  title,
}: {
  chapters: Chapter[]
  label?: string
  title: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 75%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 34, restDelta: 0.001 })

  return (
    <div ref={ref} className="relative mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      {/* Sticky rail */}
      <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
        <p className="eyebrow">{label}</p>
        <h3 className="mt-3 text-display-sm font-semibold leading-[1.15] tracking-[-0.035em]">
          {title}
        </h3>
        <div className="relative mt-6 hidden h-[3px] w-40 overflow-hidden rounded-full bg-[var(--fg)]/[0.08] lg:block">
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-soft"
            style={reduced ? { scaleX: 1 } : { scaleX: progress }}
          />
        </div>
        <ol className="mt-6 hidden flex-col gap-2 lg:flex">
          {chapters.map((chapter, index) => (
            <li key={chapter.index} className="flex items-center gap-2.5">
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-[12.5px] text-muted">{chapter.title}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Chapters */}
      <ol className="flex flex-col gap-4">
        {chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.index}
            chapter={chapter}
            index={index}
            total={chapters.length}
            progress={progress}
          />
        ))}
      </ol>
    </div>
  )
}

function ChapterCard({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: Chapter
  index: number
  total: number
  progress: ReturnType<typeof useSpring>
}) {
  const ref = useRef<HTMLLIElement | null>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 40%'] })
  const local = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  const opacity = useTransform(local, [0, 1], [0.45, 1])
  const y = useTransform(local, [0, 1], [14, 0])
  void progress
  void total

  return (
    <motion.li
      ref={ref}
      style={reduced ? undefined : { opacity, y }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--card)] p-5 md:p-6',
      )}
    >
      <div
        className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent"
        aria-hidden
      />
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] tracking-[0.12em] text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h4 className="text-[15.5px] font-semibold tracking-[-0.02em]">{chapter.title}</h4>
      </div>
      <p className="mt-2.5 text-[13.5px] leading-[1.72] text-muted">{chapter.body}</p>
      {chapter.bullets?.length ? (
        <ul className="mt-3 flex flex-col gap-1.5">
          {chapter.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2 font-mono text-[11.5px] leading-[1.6] text-[var(--fg)]/62"
            >
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </motion.li>
  )
}
