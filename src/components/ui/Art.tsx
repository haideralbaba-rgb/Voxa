import Image, { type ImageProps } from 'next/image'

/**
 * Artwork wrapper around next/image.
 *
 * The portfolio ships vector scenes (SVG), which the image optimizer refuses by
 * default — and which gain nothing from raster optimisation anyway. Raster
 * sources added later (client photography) still go through the full
 * next/image pipeline: AVIF/WebP, responsive srcset and lazy loading.
 */
export function Art({ src, alt, ...props }: ImageProps) {
  const isVector = typeof src === 'string' && src.endsWith('.svg')
  return <Image src={src} alt={alt} unoptimized={isVector} {...props} />
}
