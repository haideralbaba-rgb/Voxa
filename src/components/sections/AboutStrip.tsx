'use client'

import { Art } from '@/components/ui/Art'
import { Counter } from '@/components/ui/Counter'
import { motion, useReducedMotion } from 'motion/react'
import { useLocale } from '@/components/providers/LocaleProvider'

export function AboutStrip() {
  const { t } = useLocale()
  const reduced = useReducedMotion()

  return (
    <section
      aria-labelledby="about-heading"
      className="relative border-t border-[var(--hairline)] py-20 md:py-24"
    >
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--hairline)] sm:aspect-[5/4]">
              <Art
                src="/images/projects/manuscript-02.svg"
                alt="Campaign poster reading Slow Technology, from the Manuscript Quarterly identity"
                fill
                sizes="(max-width: 1024px) 90vw, 34rem"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
              <p className="absolute bottom-3.5 start-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                Studio wall, 2025
              </p>
            </div>
          </motion.div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.16em] text-accent">—</span>
              <span className="eyebrow">{t.about.eyebrow}</span>
            </div>
            <h2
              id="about-heading"
              className="text-display-sm font-semibold leading-[1.15] tracking-[-0.035em] md:text-[clamp(1.75rem,3vw,2.5rem)]"
            >
              {t.about.title}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              {t.about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-2xl text-[14.5px] leading-[1.8] text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--hairline)] pt-6 sm:grid-cols-4">
              {t.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 text-[20px] font-semibold tracking-[-0.03em]">
                    <Counter value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
