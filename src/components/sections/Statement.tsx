'use client'

import { motion, useReducedMotion } from 'motion/react'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const PRINCIPLES = [
  {
    code: '01 / RESTRAINT',
    title: 'الاختزال الواعي',
    body: 'نحذف كل ما لا يخدم الفكرة. المساحة الفارغة ليست نقصاً؛ بل هي الإطار الذي يمنح المعنى هيبته.',
  },
  {
    code: '02 / SYSTEMS',
    title: 'نظام لا مجرد شاشات',
    body: 'كل لون وخط وقاعدة شبكية تُبنى لتعمل معاً كمنظومة متكاملة تنمو مع علامتك دون أن تتفكك.',
  },
  {
    code: '03 / ARABIC CRAFT',
    title: 'طباعة عربية أصيلة',
    body: 'لا نعامل العربية كترجمة معكوسة للاتينية؛ بل نصمّم الإيقاع والارتفاع والمسافة لطبيعة الحرف العربي أولاً.',
  },
] as const

export function Statement() {
  const reduced = useReducedMotion()

  return (
    <section id="statement" className="py-24 md:py-36">
      <div className="container-vox">
        <div className="meta-row">
          <span className="text-xs font-medium text-ink">٠١ — الفلسفة</span>
          <span className="label text-muted">01 / MANIFESTO</span>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: EASE_EXPO }}
          className="mt-12 md:mt-16"
        >
          <p className="max-w-5xl font-display text-[clamp(1.75rem,3.95vw,3.45rem)] font-normal leading-[1.45] text-ink">
            لا نؤمن بالتصميم الذي يصرخ ليُلفت الانتباه. نؤمن بالتصميم الذي{' '}
            <span className="marker font-medium">يبقى في الذاكرة</span> — عبر شبكة صارمة، طباعة
            عربية دقيقة، وحرفةٍ تظهر في أصغر التفاصيل حين يتوقف الآخرون.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-10 md:mt-20 md:grid-cols-3 md:gap-0 md:pt-12">
          {PRINCIPLES.map((item, idx) => (
            <motion.div
              key={item.code}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: EASE_EXPO }}
              className={`group space-y-3 ${
                idx > 0 ? 'md:border-s md:border-line md:ps-8 lg:ps-10' : ''
              } ${idx < PRINCIPLES.length - 1 ? 'md:pe-8 lg:pe-10' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="label text-muted transition-colors group-hover:text-blue">
                  {item.code}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-line-strong transition-colors group-hover:bg-blue" />
              </div>
              <h3 className="font-display text-xl font-medium text-ink">{item.title}</h3>
              <p className="text-sm leading-[2] text-muted">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
