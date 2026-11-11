'use client'

import { Art } from '@/components/ui/Art'
import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Play, X } from 'lucide-react'
import type { GalleryItem, Project, ProjectLinkKind } from '@/lib/types'
import { cn } from '@/lib/utils'
import { TechPill } from '@/components/ui/Badge'
import { ScrubReveal } from '@/components/ui/ScrubReveal'
import { ChapterScroller } from '@/components/ui/ChapterScroller'

const EASE = [0.32, 0.72, 0, 1] as const

const linkIcon: Record<ProjectLinkKind, typeof ArrowUpRight> = {
  live: ArrowUpRight,
  github: Code2,
  video: Play,
  'case-study': ArrowUpRight,
}

function GalleryFrame({ item, project }: { item: GalleryItem; project: Project }) {
  const image = (
    <Art
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      sizes="(max-width: 768px) 92vw, (max-width: 1280px) 70vw, 54rem"
      className="h-full w-full object-cover"
    />
  )

  return (
    <figure className="group relative">
      <div
        className={cn(
          'relative overflow-hidden border border-[var(--hairline)] bg-[var(--card)] shadow-[var(--shadow-ambient)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:shadow-[var(--shadow-lift)]',
          item.frame === 'phone'
            ? 'mx-auto w-[16rem] rounded-[2.25rem] p-2 sm:w-[18rem]'
            : 'rounded-2xl',
        )}
      >
        {item.frame === 'browser' ? (
          <div className="flex items-center gap-1.5 border-b border-[var(--hairline)] px-3 py-2.5" aria-hidden>
            <span className="size-2 rounded-full bg-[var(--fg)]/15" />
            <span className="size-2 rounded-full bg-[var(--fg)]/15" />
            <span className="size-2 rounded-full bg-[var(--fg)]/15" />
            <span className="ml-2 h-4 flex-1 rounded-full bg-[var(--fg)]/[0.05]" />
          </div>
        ) : null}
        <ScrubReveal
          className={cn('relative overflow-hidden', item.frame === 'phone' ? 'rounded-[1.75rem]' : null)}
          offset={['start 92%', 'start 55%']}
        >
          {image}
        </ScrubReveal>
      </div>
      <figcaption className="mt-3 flex items-start gap-2.5 text-[12.5px] leading-5 text-muted">
        <span
          className="mt-1.5 size-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: project.accent }}
          aria-hidden
        />
        {item.caption}
      </figcaption>
    </figure>
  )
}

interface CaseStudyPanelProps {
  project: Project | null
  onClose: () => void
  onNavigate: (slug: string) => void
  previous?: Project
  next?: Project
}

export function CaseStudyPanel({ project, onClose, onNavigate, previous, next }: CaseStudyPanelProps) {
  const reduced = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'Tab') {
        const nodes = scrollRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!nodes || nodes.length === 0) return
        const first = nodes[0]!
        const last = nodes[nodes.length - 1]!
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      restoreFocusRef.current?.focus?.({ preventScroll: true })
    }
  }, [project, onClose])

  // Reset scroll when swapping between projects.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [project?.slug])

  const gallery = useMemo(() => project?.gallery ?? [], [project])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="case-study"
          className="fixed inset-0 z-[70]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--bg)]/72 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="absolute inset-0 flex items-stretch justify-center p-0 sm:p-4 md:p-6">
            <motion.div
              ref={scrollRef}
              layout={!reduced}
              className="no-scrollbar relative h-full w-full max-w-6xl overflow-y-auto overscroll-contain rounded-none border-[var(--hairline)] bg-[var(--bg)] shadow-[var(--shadow-lift)] sm:rounded-[28px] sm:border"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.46, ease: EASE }}
            >
              {/* Sticky toolbar */}
              <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[var(--hairline)] bg-[var(--bg)]/82 px-4 py-3 backdrop-blur-xl md:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent }}
                    aria-hidden
                  />
                  <p className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {project.client} · {project.year}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="group inline-flex h-9 items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--card)] px-3.5 text-[12.5px] font-medium text-[var(--fg)]/78 transition-colors duration-300 hover:border-[var(--hairline-strong)] hover:text-[var(--fg)]"
                >
                  <span className="hidden sm:inline">Close</span>
                  <X size={15} className="transition-transform duration-300 group-hover:rotate-90" aria-hidden />
                </button>
              </div>

              {/* Hero */}
              <div className="relative">
                <motion.div
                  layoutId={reduced ? undefined : `project-media-${project.id}`}
                  className="relative h-[16rem] w-full overflow-hidden sm:h-[22rem] md:h-[26rem]"
                  transition={{ duration: 0.62, ease: EASE }}
                >
                  <Art
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 72rem"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/16 to-transparent" aria-hidden />
                </motion.div>

                <div className="relative -mt-24 px-5 pb-8 md:-mt-32 md:px-10">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)]/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg)]/72 backdrop-blur-md">
                    <span style={{ backgroundColor: project.accent }} className="size-1.5 rounded-full" aria-hidden />
                    {project.category} · {project.role}
                  </span>
                  <motion.h2
                    id="case-study-title"
                    layoutId={reduced ? undefined : `project-title-${project.id}`}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="mt-4 text-display-lg font-semibold leading-[0.95] tracking-[-0.045em] text-[var(--fg)]"
                  >
                    {project.title}
                  </motion.h2>
                  <p className="mt-4 max-w-2xl text-[15.5px] leading-[1.72] text-muted md:text-[17px]">
                    {project.summary}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-2.5">
                    {project.links.map((link) => {
                      const Icon = linkIcon[link.kind]
                      const isPrimary = link.kind === 'live'
                      return (
                        <a
                          key={`${link.kind}-${link.href}`}
                          href={link.href}
                          target={link.kind === 'case-study' ? undefined : '_blank'}
                          rel={link.kind === 'case-study' ? undefined : 'noopener noreferrer'}
                          className={cn(
                            'group inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-all duration-300',
                            isPrimary
                              ? 'bg-[var(--fg)] text-[var(--bg)] hover:opacity-90'
                              : 'border border-[var(--hairline-strong)] text-[var(--fg)]/80 hover:border-[var(--fg)]/40 hover:text-[var(--fg)]',
                          )}
                        >
                          <Icon size={14} aria-hidden />
                          {link.label}
                          <ArrowUpRight
                            size={13}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="border-y border-[var(--hairline)] bg-[var(--card)]/50">
                <dl className="grid grid-cols-2 divide-x divide-y divide-[var(--hairline)] md:grid-cols-4 md:divide-y-0">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="p-5 md:p-6">
                      <dd
                        className="text-[27px] font-semibold leading-none tracking-[-0.04em] md:text-[32px]"
                        style={{ color: project.accent }}
                      >
                        {metric.value}
                      </dd>
                      <dt className="mt-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--fg)]/70">
                        {metric.label}
                      </dt>
                      {metric.detail ? (
                        <p className="mt-2 text-[11.5px] leading-[1.55] text-muted">{metric.detail}</p>
                      ) : null}
                    </div>
                  ))}
                </dl>
              </div>

              <div className="px-5 py-10 md:px-10 md:py-12">
                {/* Architecture — sticky chapters, scroll-driven */}
                <ChapterScroller
                  label="How it was built"
                  title="The brief, the decisions, the outcome."
                  chapters={project.architecture.map((block, i) => ({
                    index: String(i + 1),
                    title: block.title,
                    body: block.body,
                    bullets: block.bullets,
                  }))}
                />

                {/* Gallery */}
                <h3 className="eyebrow mt-14">Selected screens</h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {gallery.map((item, index) => (
                    <div
                      key={item.id}
                      className={cn(
                        item.frame === 'phone' ? 'sm:col-span-2' : undefined,
                        index === 0 && item.frame !== 'phone' ? 'sm:col-span-2' : undefined,
                      )}
                    >
                      <GalleryFrame item={item} project={project} />
                    </div>
                  ))}
                </div>

                {/* Stack + awards */}
                <div className="mt-14 grid gap-8 border-t border-[var(--hairline)] pt-8 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <h3 className="eyebrow">Stack</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <TechPill key={tech}>{tech}</TechPill>
                      ))}
                    </div>
                  </div>
                  {project.awards?.length ? (
                    <div className="md:max-w-xs md:text-right">
                      <h3 className="eyebrow">Recognition</h3>
                      <ul className="mt-4 space-y-1.5">
                        {project.awards.map((award) => (
                          <li key={award} className="text-[13px] leading-6 text-muted">
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Prev / next */}
              {previous && next ? (
                <div className="grid border-t border-[var(--hairline)] sm:grid-cols-2 sm:divide-x sm:divide-[var(--hairline)]">
                  <button
                    type="button"
                    onClick={() => onNavigate(previous.slug)}
                    className="group flex items-center gap-4 px-5 py-7 text-left transition-colors duration-300 hover:bg-[var(--card)] md:px-10"
                  >
                    <ArrowLeft
                      size={17}
                      className="text-muted transition-transform duration-300 group-hover:-translate-x-1"
                      aria-hidden
                    />
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Previous
                      </span>
                      <span className="mt-1 block text-[15px] font-medium tracking-[-0.02em] text-[var(--fg)]">
                        {previous.title}
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(next.slug)}
                    className="group flex items-center justify-end gap-4 px-5 py-7 text-right transition-colors duration-300 hover:bg-[var(--card)] md:px-10"
                  >
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        Next
                      </span>
                      <span className="mt-1 block text-[15px] font-medium tracking-[-0.02em] text-[var(--fg)]">
                        {next.title}
                      </span>
                    </span>
                    <ArrowRight
                      size={17}
                      className="text-muted transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </button>
                </div>
              ) : null}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
