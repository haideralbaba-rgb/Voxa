'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpLeft } from 'lucide-react'
import { STUDIO } from '@/lib/voxa-data'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section ref={heroRef} id="top" className="relative overflow-x-clip pt-24 pb-16 md:pt-28 md:pb-24">
      {/* Subtle 12-column architectural grid guides */}
      <div className="pointer-events-none absolute inset-0">
        <div className="container-vox h-full">
          <div className="grid-guides h-full w-full border-x border-line" />
        </div>
      </div>

      <div className="container-vox relative z-10">
        {/* Top editorial meta-row */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="meta-row flex-wrap"
        >
          <div className="inline-flex items-center gap-2.5">
            <span className="live-dot" aria-hidden="true" />
            <span className="text-xs text-ink">{STUDIO.availability}</span>
          </div>

          <span className="label hidden text-muted md:inline">INDEPENDENT DESIGN STUDIO</span>

          <div className="flex items-center gap-3">
            <span className="label text-blue">ISSUE 01</span>
            <span className="label text-muted">/ 2026</span>
          </div>
        </motion.div>

        {/* Monumental editorial headline */}
        <div className="py-10 md:py-16 lg:py-20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-display text-[clamp(3rem,8.4vw,7.4rem)] font-semibold leading-[1.08] text-ink">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.85, ease: EASE_EXPO }}
                >
                  نصوغ <span className="marker">الأفكار</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden pt-1">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.85, delay: 0.1, ease: EASE_EXPO }}
                >
                  بوضوحٍ <span className="outline-text">لا يُنسى.</span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_EXPO }}
              className="latin flex flex-col items-start gap-1 pb-2 lg:items-end"
            >
              <span className="font-serif text-[clamp(1.65rem,2.9vw,2.65rem)] italic leading-none text-ink/90">
                Editorial Craft &amp; Identity
              </span>
              <span className="label text-muted">{STUDIO.cityLatin} — EST. VOXA</span>
            </motion.div>
          </div>
        </div>

        {/* Lower 12-column editorial stage */}
        <div className="grid grid-cols-1 gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-12">
          {/* Right (start in RTL): narrative + CTAs + mini discipline index */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE_EXPO }}
            className="flex flex-col justify-between gap-10 lg:col-span-7"
          >
            <div className="space-y-8">
              <p className="max-w-xl text-base leading-[2.05] text-muted md:text-lg">
                <strong className="font-medium text-ink">فوكسـا</strong> استوديو تصميم مستقل من
                كربلاء، يبني الهويات البصرية والمواقع التحريرية والتجارب الرقمية بشبكة صارمة،
                طباعة عربية متقنة، وتفاصيل تُصنع لتدوم لا لتُستهلَك.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link href="/#contact" className="btn btn-solid">
                  <span>ابدأ مشروعك</span>
                  <ArrowUpLeft size={16} />
                </Link>
                <Link href="/#work" className="btn btn-line">
                  <span>استعرض المختارات</span>
                  <ArrowDown size={15} />
                </Link>
              </div>
            </div>

            {/* Quiet 3-column index strip */}
            <div className="grid grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-3">
              <div className="space-y-1">
                <span className="label text-blue">01 / BRAND</span>
                <p className="font-display text-sm font-medium text-ink">هويات وأنظمة علامات</p>
                <p className="text-xs leading-[1.85] text-muted">صوت بصري واضح ومطبوعات ملموسة.</p>
              </div>
              <div className="space-y-1 sm:border-s sm:border-line sm:ps-5">
                <span className="label text-blue">02 / DIGITAL</span>
                <p className="font-display text-sm font-medium text-ink">مواقع وتجارب ويب</p>
                <p className="text-xs leading-[1.85] text-muted">أداء فائق وتجربة عربية أصيلة.</p>
              </div>
              <div className="space-y-1 sm:border-s sm:border-line sm:ps-5">
                <span className="label text-blue">03 / PRINT</span>
                <p className="font-display text-sm font-medium text-ink">تحرير وتوجيه فني</p>
                <p className="text-xs leading-[1.85] text-muted">إصدارات وتغليف بعناية معمارية.</p>
              </div>
            </div>
          </motion.div>

          {/* Left (end in RTL): Featured editorial figure plate + rotating studio stamp */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: EASE_EXPO }}
            className="relative lg:col-span-5"
          >
            {/* Rotating Swiss circular stamp */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-8 -left-4 z-20 hidden h-24 w-24 items-center justify-center rounded-full border border-line-strong bg-paper/95 shadow-sm backdrop-blur-sm sm:flex"
            >
              <svg viewBox="0 0 100 100" className="h-[88px] w-[88px] animate-spin-slow">
                <defs>
                  <path
                    id="voxa-stamp-circle"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-ink"
                >
                  <textPath href="#voxa-stamp-circle">
                    VOXA STUDIO • KARBALA • DESIGN &amp; CRAFT •
                  </textPath>
                </text>
              </svg>
              <span className="absolute h-2.5 w-2.5 rounded-full bg-lime ring-1 ring-ink/30" />
            </div>

            <Link
              href="/work/sadeem-identity"
              data-cursor="استكشف"
              className="group block"
            >
              <div className="figure duotone aspect-[4/5] w-full">
                <motion.div
                  style={reduced ? undefined : { y: imageY }}
                  className="relative h-[110%] w-full -top-[5%]"
                >
                  <Image
                    src="/images/work/identity.jpg"
                    alt="عمل مختار من فوكسـا — هوية سديم للمعمار ومطبوعات الورق القطني"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover group-hover:scale-[1.04]"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between">
                  <span className="label rounded-full bg-paper/90 px-3 py-1 text-[10px] text-ink backdrop-blur-sm">
                    FEATURED / 01
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#101011] text-[#efebe1] transition-colors duration-300 group-hover:bg-lime group-hover:text-[#101011]">
                    <ArrowUpLeft size={15} />
                  </span>
                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-between gap-4 border-b border-line pb-3">
                <span className="font-display text-sm font-medium text-ink transition-colors group-hover:text-blue">
                  سَديم للمعمار — هوية ومطبوعات
                </span>
                <span className="label text-[10px] text-muted">FIG. 01 · 2026</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
