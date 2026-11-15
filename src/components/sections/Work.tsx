'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpLeft } from 'lucide-react'
import { WORK_CATEGORIES, WORK_PROJECTS } from '@/lib/voxa-data'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

export function Work() {
  const reduced = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered =
    activeCategory === 'all'
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((project) => project.categoryId === activeCategory)

  const isEditorialGrid = activeCategory === 'all'

  return (
    <section id="work" className="border-t border-line py-24 md:py-36">
      <div className="container-vox">
        <div className="meta-row">
          <span className="text-xs font-medium text-ink">٠٢ — مختارات الأعمال</span>
          <span className="label text-muted">02 / SELECTED WORK</span>
        </div>

        {/* Section Heading + Filter Chips */}
        <div className="mt-10 flex flex-col justify-between gap-8 lg:mt-14 lg:flex-row lg:items-end">
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline gap-4">
              <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.06] text-ink">
                أعمال مختارة
              </h2>
              <span className="latin font-serif text-[clamp(1.6rem,3vw,2.6rem)] italic text-muted">
                ({String(filtered.length).padStart(2, '0')})
              </span>
            </div>
            <p className="max-w-lg text-sm leading-[2] text-muted md:text-base">
              دراسات اتجاه بصري ونماذج منتقاة تُظهر كيف نجمع بين الصرامة التحريرية والتفاصيل
              الملموسة في الهوية والمطبوعات والويب.
            </p>
          </div>

          <div
            role="group"
            aria-label="تصفية الأعمال حسب التخصص"
            className="flex flex-wrap items-center gap-2"
          >
            {WORK_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className="chip"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Swiss Grid */}
        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:gap-y-24">
          {filtered.map((project, idx) => {
            const layoutClass = isEditorialGrid
              ? idx === 0
                ? 'lg:col-span-7'
                : idx === 1
                  ? 'lg:col-span-5 lg:mt-24'
                  : idx === 2
                    ? 'lg:col-span-5'
                    : 'lg:col-span-7 lg:-mt-16'
              : 'lg:col-span-6'

            const aspectClass =
              project.aspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-[4/3]'

            return (
              <motion.article
                key={project.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.75, delay: (idx % 2) * 0.08, ease: EASE_EXPO }}
                className={layoutClass}
              >
                <Link href={`/work/${project.slug}`} className="group block">
                  {/* Framed Editorial Duotone Plate */}
                  <div
                    data-cursor="استكشف"
                    className={`figure duotone ${aspectClass} w-full`}
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes={
                        isEditorialGrid && (idx === 0 || idx === 3)
                          ? '(max-width: 1024px) 100vw, 56vw'
                          : '(max-width: 1024px) 100vw, 42vw'
                      }
                      className="object-cover group-hover:scale-[1.04]"
                    />

                    {/* Subtle corner metadata pills */}
                    <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between">
                      <span className="label rounded-full bg-paper/90 px-3 py-1 text-[10px] text-ink backdrop-blur-sm">
                        {project.index} / {project.categoryCode}
                      </span>
                      <span className="label rounded-full bg-[#101011]/80 px-3 py-1 text-[10px] text-[#efebe1] backdrop-blur-sm">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Editorial Caption & Details */}
                  <div className="mt-5 space-y-3 border-b border-line pb-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-blue md:text-[1.7rem]">
                          {project.title}
                        </h3>
                        <p className="latin mt-0.5 font-serif text-base italic text-muted">
                          {project.latinTitle}
                        </p>
                      </div>

                      <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-blue group-hover:bg-blue group-hover:text-white">
                        <ArrowUpLeft size={16} />
                      </span>
                    </div>

                    <p className="text-sm leading-[1.95] text-muted">{project.summary}</p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {project.deliverables.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>

        {/* Honest editorial footnote */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            ملاحظة: الأعمال المعروضة دراسات اتجاه بصري ونماذج استوديو توضّح أسلوبنا في التصميم
            والتفكير المعماري للعلامات.
          </p>
          <Link href="/#contact" className="link-swipe font-display text-ink hover:text-blue">
            اطلب مشروعك الخاص ←
          </Link>
        </div>
      </div>
    </section>
  )
}
