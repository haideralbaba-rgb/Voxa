'use client'

import { useLocale } from '@/components/providers/LocaleProvider'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { localizeExperience } from '@/lib/i18n/content'
import type { ExperienceItem } from '@/lib/types'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** "3 yrs 9 mos" from ISO-ish months — the kind of number a recruiter checks. */
function tenure(start: string, end: string | null): string {
  const toIndex = (value: string) => {
    const [year, month] = value.split('-').map(Number)
    return (year ?? 0) * 12 + ((month ?? 1) - 1)
  }
  const now = new Date()
  const endIndex = end ? toIndex(end) : now.getFullYear() * 12 + now.getMonth()
  const months = Math.max(1, endIndex - toIndex(start))
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts: string[] = []
  if (years) parts.push(`${years} yr${years === 1 ? '' : 's'}`)
  if (rest) parts.push(`${rest} mo${rest === 1 ? '' : 's'}`)
  return parts.join(' ') || '1 mo'
}

export function Experience() {
  const { t, locale } = useLocale()
  const experience = useMemo(() => localizeExperience(locale), [locale])
  const listRef = useRef<HTMLOListElement | null>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 72%', 'end 60%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const scaleY = useTransform(progress, [0, 1], [0.02, 1])

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeading
          index={t.experience.index}
          eyebrow={t.experience.eyebrow}
          title={
            <span id="experience-heading">
              A decade of <span className="serif-accent text-accent">finishing</span> things.
            </span>
          }
          description={t.experience.description}
        />

        <div className="relative mt-14">
          {/* The rail */}
          <div
            className="absolute start-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--hairline)] md:start-[7.5rem] md:block"
            aria-hidden
          />
          <motion.div
            style={reduced ? undefined : { scaleY, transformOrigin: 'top' }}
            className="absolute start-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent via-accent/70 to-accent/10 md:start-[7.5rem] md:block"
            aria-hidden
          />

          <ol ref={listRef} className="flex flex-col">
            {experience.map((item, index) => (
              <TimelineRow
                key={item.id}
                item={item}
                index={index}
                defaultOpen={index === 0}
                labels={{
                  showDetails: t.experience.showDetails,
                  showLess: t.experience.showLess,
                  current: t.experience.current,
                }}
              />
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--hairline)] pt-6">
          <p className="text-[13px] text-muted">
            Open to senior product-engineering and design-engineering roles.
          </p>
          <a
            href="/resume.pdf"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--fg)]"
          >
            Download full résumé
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  )
}

function TimelineRow({
  item,
  index,
  defaultOpen,
  labels,
}: {
  labels: { showDetails: string; showLess: string; current: string }
  item: ExperienceItem
  index: number
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [visible, setVisible] = useState(false)
  const rowRef = useRef<HTMLLIElement | null>(null)
  const reduced = useReducedMotion()

  // Highlight the dot as it enters the viewport — cheap, local, and cancel-safe.
  useEffect(() => {
    const node = rowRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setVisible(true)
      },
      { rootMargin: '-35% 0px -45% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const isCurrent = item.end === null

  return (
    <motion.li
      ref={rowRef}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="group relative grid gap-3 pb-10 last:pb-0 md:grid-cols-[7.5rem_1fr] md:gap-10"
    >
      {/* Period */}
      <div className="hidden pt-1 md:block">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{item.period}</p>
        <p className="mt-1.5 text-[11px] text-muted">{item.employment}</p>
        <p className="mt-0.5 font-mono text-[10px] tracking-[0.06em] text-muted/90">
          {tenure(item.start, item.end)}
        </p>
      </div>

      {/* Dot */}
      <span
        className="absolute start-0 top-2.5 grid size-[30px] place-items-center rounded-full border border-[var(--hairline)] bg-[var(--bg)] md:start-[7.5rem] ltr:md:-translate-x-1/2 rtl:md:translate-x-1/2"
        aria-hidden
      >
        <motion.span
          className={cn('size-2 rounded-full', visible ? 'bg-accent' : 'bg-[var(--fg)]/25')}
          animate={visible && !reduced ? { scale: [1, 1.35, 1] } : undefined}
          transition={{ duration: 0.5 }}
        />
        {isCurrent ? (
          <span className="absolute size-2 animate-pulse-ring rounded-full bg-accent/60" aria-hidden />
        ) : null}
      </span>

      <div className="ps-11 md:ps-0">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full cursor-pointer flex-col gap-1 text-start"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-[var(--fg)] md:text-[22px]">
              {item.role}
            </h3>
            <span className="text-[14px] font-medium text-accent">{item.company}</span>
            {isCurrent ? (
              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400">
                {labels.current}
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-muted">
            <span className="font-mono uppercase tracking-[0.1em] md:hidden">{item.period}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={11} aria-hidden />
              {item.location}
            </span>
          </p>
          <p className="mt-2.5 max-w-2xl text-[13.5px] leading-[1.7] text-muted">{item.summary}</p>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
          aria-hidden={!open}
        >
          <ul className="mt-4 flex flex-col gap-2.5 border-s border-[var(--hairline)] ps-4">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 text-[13px] leading-[1.65] text-[var(--fg)]/72">
                <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-1.5 ps-4">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-[var(--fg)]/[0.045] px-2 py-1 font-mono text-[10.5px] text-[var(--fg)]/58"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-muted transition-colors hover:text-[var(--fg)]"
          aria-hidden="true"
          tabIndex={-1}
        >
          {open ? labels.showLess : labels.showDetails}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} aria-hidden>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </button>
      </div>
    </motion.li>
  )
}
