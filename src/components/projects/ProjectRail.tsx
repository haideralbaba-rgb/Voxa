'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/types'
import { Art } from '@/components/ui/Art'
import { cn } from '@/lib/utils'

/**
 * Horizontal, draggable project rail for touch and narrow screens.
 *
 * Native horizontal scrolling with CSS snap keeps it accessible (keyboard and
 * trackpad work for free); Motion only adds the polish — a progress bar bound
 * to scroll, subtle scale on the cards nearest the centre, and momentum-aware
 * drag constraints.
 */
export function ProjectRail({
  projects,
  onOpen,
}: {
  projects: Project[]
  onOpen: (project: Project) => void
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const { scrollXProgress } = useScroll({ container: scrollerRef })
  const progress = useSpring(scrollXProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0])

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 md:hidden"
        role="list"
        aria-label="Selected projects"
      >
        {projects.map((project, index) => (
          <article
            key={project.id}
            role="listitem"
            className="w-[80vw] max-w-[22rem] shrink-0 snap-center first:pl-0"
          >
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="group relative block h-[24rem] w-full overflow-hidden rounded-[24px] border border-[var(--hairline)] text-left shadow-[var(--shadow-ambient)]"
              aria-label={`Open case study: ${project.title}`}
            >
              <Art
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="80vw"
                priority={index === 0}
                className="object-cover transition-transform duration-700 group-active:scale-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" aria-hidden />
              <div className="absolute inset-x-4 bottom-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                  {project.category} · {project.year}
                </span>
                <h3 className="mt-1.5 text-[21px] font-semibold tracking-[-0.03em] text-white">
                  {project.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-5 text-white/62">
                  {project.tagline}
                </p>
              </div>
              <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md">
                <ArrowUpRight size={15} aria-hidden />
              </span>
            </button>
          </article>
        ))}
      </div>

      {/* Sync indicator + swipe hint */}
      <div className="mt-3 flex items-center gap-3 md:hidden">
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--fg)]/[0.08]">
          <motion.div
            className="h-full origin-left rounded-full bg-accent"
            style={reduced ? { scaleX: 0.2 } : { scaleX: progress }}
          />
        </div>
        <motion.span
          className={cn('font-mono text-[10px] uppercase tracking-[0.14em] text-muted')}
          style={reduced ? undefined : { opacity: hintOpacity }}
        >
          Swipe
        </motion.span>
      </div>
    </div>
  )
}
