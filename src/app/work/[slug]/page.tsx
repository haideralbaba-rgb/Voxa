import type { Metadata } from 'next'
import { CaseStudyArticle } from '@/components/projects/CaseStudyArticle'
import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '@/lib/data/projects'
import { profile } from '@/lib/data/profile'
import { localizeProject } from '@/lib/i18n/content'
import { COPY } from '@/lib/i18n/copy'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const base = getProjectBySlug(slug)
  if (!base) return { title: COPY.ar.caseStudy.notFound }
  // Arabic is the primary document, so metadata is written in Arabic and the
  // English translation is exposed as an alternate description for crawlers.
  const project = localizeProject(base, 'ar')
  const english = localizeProject(base, 'en')

  return {
    title: `${project.title} — ${COPY.ar.caseStudy.metadataSuffix}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.tagline,
      alternateLocale: ['en'],
      type: 'article',
      publishedTime: `${project.year}-01-01`,
      images: [{ url: project.cover.src, width: project.cover.width, height: project.cover.height }],
    },
    other: { 'og:description:en': english.tagline },
  }
}

/**
 * Shareable, server-rendered case-study URL.
 *
 * Crawlers and link previews get the full story as static HTML; visitors get a
 * deep link straight into the interactive overlay, with the page underneath
 * acting as the canonical, accessible document.
 */
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return <CaseStudyArticle slug={project.slug} />
}
