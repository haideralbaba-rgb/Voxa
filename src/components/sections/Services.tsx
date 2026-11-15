'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpLeft, Plus } from 'lucide-react'
import { SERVICES } from '@/lib/voxa-data'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

export function Services() {
  const reduced = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<string>('01')

  return (
    <section id="services" className="border-t border-line py-24 md:py-36">
      <div className="container-vox">
        <div className="meta-row">
          <span className="text-xs font-medium text-ink">٠٣ — ماذا نصنع</span>
          <span className="label text-muted">03 / CAPABILITIES</span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.3rem,5.6vw,4.7rem)] font-semibold leading-[1.08] text-ink">
              قدرات مركّزة
              <br />
              لبناء علامات <span className="outline-text">تُميَّز.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end lg:text-end">
            <p className="max-w-md text-sm leading-[2] text-muted md:text-base">
              نفضّل إتقان أربعة مجالات مترابطة بدل تشتيت الجهد. كل خدمة تُسلَّم كنظام متكامل قابل
              للتطبيق الفوري.
            </p>
            <Link href="/#contact" className="link-swipe font-display text-sm text-ink hover:text-blue">
              ناقش نطاق مشروعك معنا ←
            </Link>
          </div>
        </div>

        {/* Hairline-divided Interactive Accordion */}
        <div className="mt-14 border-t border-line lg:mt-20">
          {SERVICES.map((service) => {
            const isOpen = openIndex === service.index
            const panelId = `service-panel-${service.index}`

            return (
              <div key={service.index} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? '' : service.index)}
                  className="group grid w-full cursor-pointer grid-cols-12 items-center gap-4 py-7 text-start transition-colors md:py-9"
                >
                  <div className="col-span-3 flex items-center gap-3 sm:col-span-2">
                    <span
                      className={`label transition-colors ${
                        isOpen ? 'text-blue' : 'text-muted group-hover:text-blue'
                      }`}
                    >
                      {service.index}
                    </span>
                    <span className="label hidden text-[10px] text-muted/75 xl:inline">
                      {service.code}
                    </span>
                  </div>

                  <div className="col-span-7 sm:col-span-8 lg:col-span-6">
                    <h3 className="font-display text-xl font-medium text-ink transition-transform duration-300 group-hover:-translate-x-1 md:text-2xl lg:text-[1.85rem]">
                      {service.title}
                    </h3>
                  </div>

                  <div className="hidden lg:col-span-3 lg:block">
                    <p className="line-clamp-2 text-xs leading-[1.8] text-muted">
                      {service.summary}
                    </p>
                  </div>

                  <div className="col-span-2 flex justify-end sm:col-span-2 lg:col-span-1">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'rotate-45 border-ink bg-ink text-paper'
                          : 'border-line text-ink group-hover:border-ink'
                      }`}
                    >
                      <Plus size={16} />
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_EXPO }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-8 pb-9 pt-1 lg:grid-cols-12 lg:pb-11">
                        <div className="hidden lg:col-span-2 lg:block">
                          <span className="label text-[10px] text-blue">{service.code}</span>
                        </div>

                        <div className="space-y-6 lg:col-span-6">
                          <p className="max-w-xl text-sm leading-[2.05] text-muted md:text-base">
                            {service.details}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.deliverables.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-line bg-paper-2/70 px-3.5 py-1 text-xs text-ink"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col justify-between gap-5 border-t border-line pt-5 lg:col-span-4 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0">
                          <div>
                            <span className="label text-[10px] text-muted">ESTIMATED TIMELINE</span>
                            <p className="mt-1 font-display text-lg font-medium text-ink">
                              {service.timeline}
                            </p>
                          </div>
                          <div>
                            <Link
                              href="/#contact"
                              className="btn btn-line !px-5 !py-2.5 !text-xs"
                            >
                              <span>اطلب هذه الخدمة</span>
                              <ArrowUpLeft size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
