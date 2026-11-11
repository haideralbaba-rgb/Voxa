'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data/profile'
import { cn } from '@/lib/utils'
import { EASE, SPRING } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

const AUTOPLAY_MS = 7600
const SWIPE_THRESHOLD = 90

/**
 * A draggable card stack: the top note can be flicked left or right (or
 * advanced with the buttons / keyboard) and the next one rises into place.
 * This is the "card stack" pattern from 60fps' gallery — familiar from native
 * apps, rarely done well on the web because momentum and exit physics are
 * fiddly. Motion's drag + spring handles both.
 */
export function TestimonialStack() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)
  const reduced = useReducedMotion()
  const liveRef = useRef<HTMLParagraphElement | null>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 0, 220], [-9, 0, 9])
  const topOpacity = useTransform(x, [-320, -140, 0, 140, 320], [0, 1, 1, 1, 0])

  const go = useCallback((direction: 1 | -1) => {
    setExiting(direction === 1 ? 'left' : 'right')
    window.setTimeout(() => {
      setIndex((current) => (current + 1) % testimonials.length)
      x.set(0)
      setExiting(null)
    }, 220)
  }, [x])

  useEffect(() => {
    if (paused || reduced) return
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [paused, reduced, go, index])

  const active = testimonials[index]!
  const next = testimonials[(index + 1) % testimonials.length]!
  const third = testimonials[(index + 2) % testimonials.length]!

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="Testimonials"
          title={
            <span id="testimonials-heading">
              What the <span className="serif-accent text-accent">room</span> says.
            </span>
          }
          description="Unedited notes from product leads, founders and creative directors I have shipped beside."
          action={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid size-10 place-items-center rounded-full border border-[var(--hairline-strong)] text-[var(--fg)]/70 transition-all duration-300 hover:border-[var(--fg)]/40 hover:text-[var(--fg)]"
              >
                <ArrowLeft size={15} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid size-10 place-items-center rounded-full border border-[var(--hairline-strong)] text-[var(--fg)]/70 transition-all duration-300 hover:border-[var(--fg)]/40 hover:text-[var(--fg)]"
              >
                <ArrowRight size={15} aria-hidden />
              </button>
            </div>
          }
        />

        <div
          className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Stack */}
          <div
            className="relative h-[23rem] select-none sm:h-[20rem]"
            role="group"
            aria-roledescription="card stack"
            aria-label="Client testimonials — swipe or use the arrow buttons"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                go(1)
              }
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                go(-1)
              }
            }}
          >
            {/* Two background cards give the stack depth */}
            <div
              className="absolute inset-x-6 top-5 h-full rounded-3xl border border-[var(--hairline)] bg-[var(--card)]/50"
              aria-hidden
            />
            <div
              className="absolute inset-x-3 top-2.5 h-full rounded-3xl border border-[var(--hairline)] bg-[var(--card)]/80"
              aria-hidden
            />

            <AnimatePresence initial={false} mode="popLayout">
              <motion.figure
                key={active.id}
                drag={reduced ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                style={reduced ? undefined : { x, rotate, opacity: topOpacity }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -520) go(1)
                  else if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 520) go(-1)
                }}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: exiting === 'left' ? -280 : 280,
                        rotate: exiting === 'left' ? -10 : 10,
                        transition: { duration: 0.24, ease: EASE.snap },
                      }
                }
                transition={SPRING.surface}
                className={cn(
                  'absolute inset-0 flex cursor-grab flex-col justify-between rounded-3xl border border-[var(--hairline-strong)] bg-[var(--card)] p-6 shadow-[var(--shadow-lift)] active:cursor-grabbing md:p-8',
                )}
              >
                <div>
                  <Quote size={30} strokeWidth={1.3} className="text-accent/40" aria-hidden />
                  <blockquote className="mt-4">
                    <p
                      ref={liveRef}
                      aria-live="polite"
                      className="text-[clamp(1.1rem,2.1vw,1.5rem)] font-medium leading-[1.45] tracking-[-0.025em] text-[var(--fg)]"
                    >
                      “{active.quote}”
                    </p>
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span
                      className="grid size-10 place-items-center rounded-full text-[12px] font-semibold text-white"
                      style={{ backgroundColor: active.accent }}
                      aria-hidden
                    >
                      {active.initials}
                    </span>
                    <span>
                      <span className="block text-[13.5px] font-semibold tracking-[-0.01em]">
                        {active.name}
                      </span>
                      <span className="block text-[12px] text-muted">
                        {active.title} · {active.company}
                      </span>
                    </span>
                  </span>
                  <span
                    className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:block"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Queue */}
          <div className="flex flex-col justify-center gap-2">
            <p className="eyebrow mb-1">Up next</p>
            {[next, third].map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-[var(--hairline)] px-3.5 py-3"
              >
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-white"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden
                >
                  {item.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12.5px] font-medium">{item.name}</span>
                  <span className="block truncate text-[11px] text-muted">{item.company}</span>
                </span>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-1.5">
              {testimonials.map((item, itemIndex) => (
                <span
                  key={item.id}
                  className={cn(
                    'h-1 rounded-full transition-all duration-300',
                    itemIndex === index ? 'w-5 bg-accent' : 'w-1 bg-[var(--fg)]/15',
                  )}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
