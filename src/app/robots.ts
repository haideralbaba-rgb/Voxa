import type { MetadataRoute } from 'next'

/** Keep the pre-launch site out of search engines until the owner is ready. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
  }
}
