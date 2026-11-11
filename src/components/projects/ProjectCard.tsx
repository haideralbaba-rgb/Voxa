'use client'

import { Art } from '@/components/ui/Art'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project) => void
  /** Span size inside the showcase grid. */
  size?: 'feature' | 'standard'
  index: number
}

export function ProjectCard({ project, onOpen, size = 'standard', index }: ProjectCardProps) {
  const reduced = useReducedMotion()
  const isFeature = size === 'feature'

  return (
    <article className="flex flex-1">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.06 }}
        className={cn(
          'group card-sheen relative flex flex-1 flex-col overflow-hidden rounded-[26px] border border-[var(--hairline)] bg-[var(--card)] shadow-[var(--shadow-ambient)]',
          'transition-[box-shadow,border-color,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]',
          'hover:-translate-y-1 hover:border-[var(--hairline-strong)] hover:shadow-[var(--shadow-lift)]',
          isFeature ? 'min-h-[26rem] lg:min-h-[34rem]' : 'min-h-[21rem] lg:min-h-[23rem]',
        )}
      >
        {/* Media */}
        <div className="relative min-h-[12rem] flex-1 overflow-hidden">
          <motion.div
            layoutId={reduced ? undefined : `project-media-${project.id}`}
            className="absolute inset-0"
            transition={{ duration: 0.62, ease: [0.32, 0.72, 0, 1] }}
          >
            <Art
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes={
                isFeature
                  ? '(max-width: 640px) 92vw, (max-width: 1280px) 58vw, 46rem'
                  : '(max-width: 640px) 92vw, (max-width: 1280px) 40vw, 30rem'
              }
              priority={index === 0}
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-black/0" aria-hidden />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: `radial-gradient(120% 90% at 20% 100%, ${project.accent}30 0%, transparent 62%)` }}
              aria-hidden
            />
          </motion.div>

          <div className="pointer-events-none relative z-10 flex items-start justify-between p-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/32 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden />
              {project.category}
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-white/55">{project.year}</span>
          </div>
        </div>

        {/* Copy */}
        <div className="relative z-10 -mt-24 flex flex-col gap-2.5 p-5 pt-0 md:p-6 md:pt-0">
          <motion.h3
            layoutId={reduced ? undefined : `project-title-${project.id}`}
            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
            className={cn(
              'font-semibold tracking-[-0.035em] text-white',
              isFeature ? 'text-[28px] md:text-[36px]' : 'text-[22px] md:text-[24px]',
            )}
          >
            {project.title}
          </motion.h3>
          <p
            className={cn(
              'max-w-[42ch] pr-8 text-white/64',
              isFeature ? 'text-[14px] leading-6 md:text-[15px]' : 'text-[13px] leading-[1.6]',
            )}
          >
            {project.tagline}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {project.stack.slice(0, isFeature ? 4 : 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/14 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/72 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <span
          className="pointer-events-none absolute bottom-5 right-5 z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:bg-white group-hover:text-black"
          aria-hidden
        >
          <ArrowUpRight size={17} />
        </span>

        {/* Full-card hit area — keeps semantics clean while making the whole card clickable */}
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="absolute inset-0 z-20 cursor-pointer rounded-[26px] focus-visible:outline-offset-[-3px]"
          aria-label={`Open case study: ${project.title} — ${project.tagline}`}
        />
      </motion.div>
    </article>
  )
}
