'use client'

import { useReducedMotion } from 'motion/react'
import { Asterisk } from 'lucide-react'

/**
 * The band.
 *
 * One full-bleed strip of oversized type that crosses the page between the
 * manifesto and the film. It is the cheapest possible way to give a long scroll
 * a rhythm — a hard horizontal edge, a colour inversion, and type big enough to
 * read as texture rather than words.
 *
 * In light mode it is ink on paper; in dark it is the accent on ink. Both are
 * built from tokens, so the strip is never a colour pasted on top of the theme.
 */
export function Marquee({
  items,
  speed = 46,
  tone = 'invert',
}: {
  items: string[]
  speed?: number
  tone?: 'invert' | 'accent'
}) {
  const reduced = useReducedMotion()
  const doubled = [...items, ...items]

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y py-5 md:py-7"
      style={
        tone === 'invert'
          ? { backgroundColor: 'var(--fg)', borderColor: 'var(--fg)' }
          : { backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)' }
      }
    >
      <div className="marquee-mask">
        <div className="flex w-max items-center">
          {[0, 1].map((pass) => (
            <div
              key={pass}
              className="flex w-max items-center"
              style={reduced ? undefined : { animation: `marquee ${speed}s linear infinite` }}
            >
              {doubled.map((item, index) => (
                <span key={`${pass}-${item}-${index}`} className="flex items-center">
                  <span
                    className="px-6 text-[clamp(1.5rem,3.6vw,2.75rem)] font-semibold leading-none tracking-[-0.045em]"
                    style={{
                      color:
                        tone === 'invert'
                          ? 'var(--bg)'
                          : '#fff8f2',
                    }}
                  >
                    {item}
                  </span>
                  <Asterisk
                    size={18}
                    strokeWidth={2}
                    style={{
                      color:
                        tone === 'invert'
                          ? 'color-mix(in oklab, var(--bg) 45%, var(--fg))'
                          : 'rgb(255 255 255 / 0.5)',
                    }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
