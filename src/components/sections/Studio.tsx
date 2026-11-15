'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { STUDIO } from '@/lib/voxa-data'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const STUDIO_FACTS = [
  { code: 'BASE', label: 'المقر', value: 'كربلاء، العراق' },
  { code: 'REACH', label: 'نطاق العمل', value: 'العراق، الخليج، وعن بُعد' },
  { code: 'FOCUS', label: 'سعة العمل', value: 'مشاريع محدودة لتركيز كامل' },
  { code: 'SCRIPTS', label: 'اللغات والطباعة', value: 'عربي أصيل + إنجليزي' },
] as const

export function Studio() {
  const reduced = useReducedMotion()

  return (
    <section id="studio" className="py-24 md:py-36">
      <div className="container-vox">
        <div className="meta-row">
          <span className="text-xs font-medium text-ink">٠٥ — عن الاستوديو</span>
          <span className="label text-muted">05 / THE STUDIO</span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* Right (start in RTL): Narrative & Facts */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: EASE_EXPO }}
            className="flex flex-col justify-between gap-12 lg:col-span-6"
          >
            <div className="space-y-6">
              <h2 className="font-display text-[clamp(2.3rem,5.2vw,4.35rem)] font-semibold leading-[1.12] text-ink">
                استوديو مستقل
                <br />
                من <span className="marker">كربلاء</span> إلى العالم.
              </h2>

              <p className="text-base leading-[2.05] text-muted">
                ولدت <strong className="font-medium text-ink">فوكسـا</strong> من قناعة بسيطة:
                التصميم العربي يستحق مستوى الحرفة والانضباط البصري نفسه الذي نراه في أفضل
                الاستوديوهات العالمية — دون استعراض أجوف أو ادّعاء أرقام وهمية.
              </p>

              <p className="text-sm leading-[2.05] text-muted md:text-base">
                نعمل كفريق صغير ومركّز؛ نختار عدداً محدوداً من المشاريع في كل موسم كي نمنح كل
                علامة وقتها الحقيقي في البحث، صياغة الهوية، وهندسة التفاصيل الرقمية والمطبوعة.
              </p>
            </div>

            {/* 2x2 Architectural Facts */}
            <div className="grid grid-cols-2 border-t border-line">
              {STUDIO_FACTS.map((fact, idx) => (
                <div
                  key={fact.code}
                  className={`py-5 ${idx % 2 === 1 ? 'border-s border-line ps-5 sm:ps-6' : 'pe-5 sm:pe-6'} ${
                    idx >= 2 ? 'border-t border-line' : ''
                  }`}
                >
                  <span className="label text-[10px] text-lime">{fact.code}</span>
                  <p className="mt-1.5 text-xs text-muted">{fact.label}</p>
                  <p className="mt-1 font-display text-sm font-medium text-ink md:text-base">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Left (end in RTL): Studio atmospheric photography */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
            className="flex flex-col justify-between gap-4 lg:col-span-6"
          >
            <div className="figure duotone group relative aspect-[4/3] w-full lg:aspect-[5/4]">
              <Image
                src="/images/work/studio.jpg"
                alt="طاولة عمل استوديو فوكسـا مع نماذج الورق والمسطرة المعدنية والمخططات الشبكية"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.035]"
              />
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between">
                <span className="label rounded-full bg-[#101011]/85 px-3 py-1 text-[10px] text-[#efebe1] backdrop-blur-sm">
                  STUDIO DESK / KARBALA
                </span>
                <span className="label rounded-full bg-lime px-3 py-1 text-[10px] text-[#101011]">
                  {STUDIO.timezoneLabel}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3 text-xs text-muted">
              <span>أرشيف الورق والشبكات — كواليس العمل في فوكسـا</span>
              <span className="label text-[10px]">{STUDIO.coordinates}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
