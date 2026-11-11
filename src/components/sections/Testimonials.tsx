'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data/profile'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/SectionHeading'

const AUTOPLAY_MS = 7200
const EASE = [0.22, 1, 0.36, 1] as const

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)
  const reduced = useReducedMotion()
  const liveRef = useRef<HTMLParagraphElement | null>(null)

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir)
    setIndex((next + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused || reduced) return
    const timer = window.setInterval(() => go(index + 1, 1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [index, paused, reduced, go])

  const active = testimonials[index]!

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
                onClick={() => go(index - 1, -1)}
                aria-label="Previous testimonial"
                className="grid size-10 place-items-center rounded-full border border-[var(--hairline-strong)] text-[var(--fg)]/70 transition-all duration-300 hover:border-[var(--fg)]/40 hover:text-[var(--fg)]"
              >
                <ArrowLeft size={15} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label="Next testimonial"
                className="grid size-10 place-items-center rounded-full border border-[var(--hairline-strong)] text-[var(--fg)]/70 transition-all duration-300 hover:border-[var(--fg)]/40 hover:text-[var(--fg)]"
              >
                <ArrowRight size={15} aria-hidden />
              </button>
            </div>
          }
        />

        <div
          className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Slider */}
          <div
            className="relative min-h-[24rem] sm:min-h-[20rem] lg:min-h-[17rem]"
            role="group"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <Quote
              size={38}
              strokeWidth={1.2}
              className="mb-5 text-accent/45"
              aria-hidden
            />
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.figure
                key={active.id}
                custom={direction}
                initial={reduced ? false : { opacity: 0, x: direction * 28, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -28, filter: 'blur(5px)' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 pt-16 sm:pt-14"
              >
                <blockquote>
                  <p
                    ref={liveRef}
                    aria-live="polite"
                    className="text-[clamp(1.25rem,2.6vw,1.85rem)] font-medium leading-[1.42] tracking-[-0.03em] text-[var(--fg)]"
                  >
                    “{active.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span
                    className="grid size-10 place-items-center rounded-full text-[12px] font-semibold text-white"
                    style={{ backgroundColor: active.accent }}
                    aria-hidden
                  >
                    {active.initials}
                  </span>
                  <span>
                    <span className="block text-[13.5px] font-semibold tracking-[-0.01em]">{active.name}</span>
                    <span className="block text-[12px] text-muted">
                      {active.title} · {active.company}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Selector list — doubles as the progress indicator */}
          <div className="flex flex-col gap-1.5">
            {testimonials.map((item, itemIndex) => {
              const isActive = itemIndex === index
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(itemIndex, itemIndex > index ? 1 : -1)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border px-3.5 py-3 text-left transition-colors duration-300',
                    isActive
                      ? 'border-[var(--hairline-strong)] bg-[var(--card)]'
                      : 'border-transparent hover:bg-[var(--fg)]/[0.035]',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'size-1.5 rounded-full transition-colors duration-300',
                        isActive ? 'bg-accent' : 'bg-[var(--fg)]/20',
                      )}
                      aria-hidden
                    />
                    <span
                      className={cn(
                        'text-[12.5px] font-medium transition-colors duration-300',
                        isActive ? 'text-[var(--fg)]' : 'text-[var(--fg)]/55 group-hover:text-[var(--fg)]/80',
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
                      {String(itemIndex + 1).padStart(2, '0')}
                    </span>
                  </span>
                  {isActive && !reduced && !paused ? (
                    <motion.span
                      key={`bar-${index}`}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent/60"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                      aria-hidden
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
