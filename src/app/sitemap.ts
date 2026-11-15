import type { MetadataRoute } from 'next'
import { WORK_PROJECTS } from '@/lib/voxa-data'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voxa.studio'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...WORK_PROJECTS.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
