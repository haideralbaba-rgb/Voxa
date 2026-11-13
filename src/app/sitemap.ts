import type { MetadataRoute } from 'next'

/** No public URLs are submitted while VOXA is pre-launch. */
export default function sitemap(): MetadataRoute.Sitemap {
  return []
}
