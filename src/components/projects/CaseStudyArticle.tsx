'use client'

import { useMemo } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { getProjectBySlug } from '@/lib/data/projects'
import { localizeProject } from '@/lib/i18n/content'
import { useLocale } from '@/components/providers/LocaleProvider'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ButtonLink } from '@/components/ui/Button'
import { TechPill } from '@/components/ui/Badge'
import { Art } from '@/components/ui/Art'
import { ShaderBackdrop } from '@/components/visual/ShaderBackdrop'
import { categoryLabel } from '@/lib/i18n/labels'

const EASE = 'transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'

/**
 * The reading version of a case study.
 *
 * Server-rendered page + client body: the slug arrives fully resolved so the
 * static HTML carries the whole story for crawlers, while the article itself
 * reads its prose and chrome from the active locale.
 */
export function CaseStudyArticle({ slug }: { slug: string }) {
  const { t, locale } = useLocale()
  const project = useMemo(() => {
    const base = getProjectBySlug(slug)
    return base ? localizeProject(base, locale) : undefined
  }, [locale, slug])

  if (!project) notFound()

  return (
    <>
      <SiteHeader />
      <main id="main" className="relative overflow-hidden pt-28 md:pt-32">
        <ShaderBackdrop
          variant="topographic"
          intensity={0.5}
          className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] -z-10"
        />
        <article className="container-page">
          <ButtonLink href="/#work" variant="ghost" size="sm" className="-ms-2 mb-6">
            <ArrowLeft size={14} aria-hidden className="flip-rtl" />
            {t.caseStudy.allWork}
          </ButtonLink>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden />
              {categoryLabel(project.category, locale)}
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted">
              <span className="ltr-data">{project.year}</span> · {project.client} · {project.role}
            </span>
          </div>

          <h1 className="mt-4 max-w-4xl text-display-lg font-semibold leading-[0.96] tracking-[-0.045em]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-muted">{project.summary}</p>

          <div
            className="relative mt-9 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--hairline)]"
            style={{ viewTransitionName: 'project-cover' }}
          >
            <Art
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(max-width: 1280px) 92vw, 80rem"
              priority
              className="object-cover"
            />
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-[var(--hairline)] py-7 md:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dd
                  className="text-[28px] font-semibold leading-none tracking-[-0.04em]"
                  style={{ color: project.accent }}
                >
                  <span className="ltr-data">{metric.value}</span>
                </dd>
                <dt className="mt-2 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--fg)]/70">
                  {metric.label}
                </dt>
                {metric.detail ? (
                  <p className="mt-1.5 text-[11.5px] leading-5 text-muted">{metric.detail}</p>
                ) : null}
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {project.architecture.map((block, index) => (
              <section key={block.title}>
                <p className="font-mono text-[11px] tracking-[0.12em] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 text-[16px] font-semibold tracking-[-0.02em]">{block.title}</h2>
                <p className="mt-2 text-[13.5px] leading-[1.85] text-muted">{block.body}</p>
                {block.bullets ? (
                  <ul className="mt-3 flex flex-col gap-2">
                    {block.bullets.map((bullet) => (
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
              </section>
            ))}
          </div>

          <h2 className="eyebrow mt-14">{t.caseStudy.screens}</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {project.gallery.map((item, index) => (
              <figure key={item.id} className={index === 0 ? 'sm:col-span-2' : undefined}>
                <div className="relative overflow-hidden rounded-xl border border-[var(--hairline)]">
                  <Art
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 768px) 92vw, 40rem"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 text-[12.5px] text-muted">{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-[var(--hairline)] pt-8">
            {project.stack.map((tech) => (
              <TechPill key={tech}>{tech}</TechPill>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {project.links.map((link) => (
              <a
                key={`${link.kind}-${link.href}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 items-center gap-2 rounded-full border border-[var(--hairline-strong)] px-4 text-[13px] font-medium transition-colors hover:border-accent/50"
              >
                {link.label}
                <ArrowUpRight size={14} className={EASE} aria-hidden />
              </a>
            ))}
          </div>

          {project.awards?.length ? (
            <div className="mt-8">
              <h2 className="eyebrow">{t.caseStudy.recognition}</h2>
              <ul className="mt-3 space-y-1.5">
                {project.awards.map((award) => (
                  <li key={award} className="text-[13px] leading-6 text-muted">
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-14 mb-20 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--card)] p-5 md:p-6">
            <div>
              <p className="text-[15px] font-semibold tracking-[-0.02em]">{t.caseStudy.startProject}</p>
              <p className="mt-1 text-[13px] text-muted">{t.caseStudy.startProjectBody}</p>
            </div>
            <ButtonLink href="/#contact">
              {t.ctaPrimary}
              <ArrowUpRight size={15} aria-hidden className="flip-rtl" />
            </ButtonLink>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
