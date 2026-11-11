'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, LayoutGrid } from 'lucide-react'
import type { Project, ProjectCategory } from '@/lib/types'
import { localizeProjects } from '@/lib/i18n/content'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from './ProjectCard'
import { CaseStudyPanel } from './CaseStudyPanel'
import { ProjectRail } from './ProjectRail'
import { useLocale } from '@/components/providers/LocaleProvider'

type Filter = 'All' | ProjectCategory

const filters: Filter[] = ['All', 'Brand', 'Product', 'Commerce', 'Editorial', 'Motion']

export function ProjectShowcase({ initialSlug }: { initialSlug?: string }) {
  const { t, locale } = useLocale()
  const [filter, setFilter] = useState<Filter>('All')
  const [openSlug, setOpenSlug] = useState<string | null>(() => initialSlug ?? null)
  const reduced = useReducedMotion()

  const projects = useMemo(() => localizeProjects(locale), [locale])

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  )

  const openProject = useMemo<Project | null>(
    () => projects.find((project) => project.slug === openSlug) ?? null,
    [openSlug, projects],
  )

  const neighbours = useMemo(() => {
    if (!openProject) return { previous: undefined, next: undefined }
    const index = projects.findIndex((project) => project.slug === openProject.slug)
    return {
      previous: projects[(index - 1 + projects.length) % projects.length],
      next: projects[(index + 1) % projects.length],
    }
  }, [openProject, projects])

  const open = useCallback((project: Project) => {
    setOpenSlug(project.slug)
    // Keep the URL shareable without triggering a scroll jump.
    window.history.pushState({ caseStudy: project.slug }, '', `/work/${project.slug}`)
  }, [])

  const close = useCallback(() => {
    setOpenSlug(null)
    window.history.pushState({ caseStudy: null }, '', '/#work')
  }, [])

  // Browser back/forward should close or swap the study.
  useEffect(() => {
    if (!openSlug) return
    const onPopState = () => {
      const match = window.location.pathname.match(/^\/work\/(.+)$/)
      setOpenSlug(match?.[1] && projects.some((project) => project.slug === match[1]) ? match[1] : null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [openSlug, projects])

  return (
    <section id="work" aria-labelledby="work-heading" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          index={t.work.index}
          eyebrow={t.work.eyebrow}
          title={
            <span id="work-heading">
              {t.work.titleA}{' '}
              <span className="serif-accent text-accent">{t.work.titleB}</span>
            </span>
          }
          description={t.work.description}
          action={
            <ButtonLink href="#contact" variant="secondary" size="md">
              {t.work.haveSimilar}
              <ArrowUpRight size={15} aria-hidden />
            </ButtonLink>
          }
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label={t.work.filter}>
          <span className="me-1 hidden items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted sm:flex">
            <LayoutGrid size={13} aria-hidden />
            {t.work.filter}
          </span>
          {filters.map((item) => {
            const active = filter === item
            const count =
              item === 'All' ? projects.length : projects.filter((project) => project.category === item).length
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item)}
                className={cn(
                  'relative inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-medium transition-colors duration-300',
                  active ? 'text-[var(--bg)]' : 'text-[var(--fg)]/60 hover:text-[var(--fg)]',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-[var(--fg)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full border border-[var(--hairline)]" aria-hidden />
                )}
                <span className="relative">{t.work.filters[item] ?? item}</span>
                <span className={cn('relative font-mono text-[10px]', active ? 'text-[var(--bg)]/55' : 'text-muted')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Touch: a draggable, snapping rail. Pointer: the bento grid. */}
        <div className="mt-8">
          <ProjectRail projects={visible} onOpen={open} />
        </div>

        {/* Desktop bento: one hero card spanning two tracks, then a flowing 3-up */}
        <motion.div
          layout={!reduced}
          className="mt-5 hidden auto-rows-auto gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => {
              const isFeature = filter === 'All' && index === 0
              return (
                <motion.div
                  key={project.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={cn('flex', isFeature ? 'sm:col-span-2 sm:row-span-2' : undefined)}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    size={isFeature ? 'feature' : 'standard'}
                    onOpen={open}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 ? (
          <p className="mt-16 text-center text-[14px] text-muted">
            No projects in this category yet — try another filter.
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--hairline)] pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {String(visible.length).padStart(2, '0')} shown · case studies open in place
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--fg)]/70 transition-colors hover:text-[var(--fg)]"
          >
            Request the full archive
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>

      <CaseStudyPanel
        project={openProject}
        onClose={close}
        onNavigate={(slug) => {
          const project = projects.find((item) => item.slug === slug)
          if (project) open(project)
        }}
        previous={neighbours.previous}
        next={neighbours.next}
      />
    </section>
  )
}
