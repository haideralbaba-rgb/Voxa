'use client'

import { motion, useReducedMotion } from 'motion/react'
import { PROCESS_STEPS } from '@/lib/voxa-data'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const GUARANTEES = [
  { label: '01', title: 'ملكية كاملة للملفات', note: 'تستلم كافة المصادر والأدلة جاهزة للاستخدام والتطوير.' },
  { label: '02', title: 'تواصل مباشر بلا وسطاء', note: 'تعمل مباشرة مع المصمم والمهندس المسؤول عن مشروعك.' },
  { label: '03', title: 'إيقاع واضح والتزام بالمواعيد', note: 'مراحل مراجعة مجدولة وشفافة من اليوم الأول حتى الإطلاق.' },
] as const

export function Process() {
  const reduced = useReducedMotion()

  return (
    <section id="process" className="border-t border-line py-24 md:py-36">
      <div className="container-vox">
        <div className="meta-row">
          <span className="text-xs font-medium text-ink">٠٤ — كيف نعمل</span>
          <span className="label text-muted">04 / METHODOLOGY</span>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-6 lg:mt-14 lg:flex-row lg:items-end">
          <h2 className="font-display text-[clamp(2.25rem,5.4vw,4.5rem)] font-semibold leading-[1.1] text-ink">
            من الفكرة الأولى
            <br />
            حتى لحظة <span className="marker">الإطلاق.</span>
          </h2>
          <p className="max-w-md text-sm leading-[2] text-muted md:text-base">
            الإبداع الجيد لا يعتمد على الصدفة؛ بل على خطوات واضحة تحمي الوقت وتجعل كل قرار بصري
            مبنياً على سبب حقيقي.
          </p>
        </div>

        {/* 4-column architectural process grid */}
        <div className="mt-14 grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.index}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: idx * 0.08, ease: EASE_EXPO }}
              className={`group flex flex-col justify-between gap-8 py-8 sm:px-6 lg:py-10 ${
                idx > 0 ? 'border-t border-line sm:border-t-0' : ''
              } ${idx % 2 === 1 ? 'sm:border-s sm:border-line' : ''} ${
                idx >= 2 ? 'sm:border-t sm:border-line lg:border-t-0' : ''
              } ${idx > 0 ? 'lg:border-s lg:border-line' : 'lg:ps-0'} ${
                idx === PROCESS_STEPS.length - 1 ? 'lg:pe-0' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="latin font-display text-5xl font-semibold leading-none outline-text transition-colors duration-300 group-hover:text-ink">
                    {step.index}
                  </span>
                  <span className="label text-[10px] text-muted group-hover:text-blue">
                    {step.code}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-xl font-medium text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-[2] text-muted">{step.body}</p>
              </div>

              <div className="border-t border-line pt-4">
                <span className="label block text-[9px] text-muted">DELIVERABLE</span>
                <span className="mt-1 block text-xs font-medium text-ink">{step.artifact}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial commitment bar */}
        <div className="mt-10 grid grid-cols-1 gap-6 border border-line bg-paper-2/75 p-6 md:grid-cols-3 md:gap-8 md:p-8">
          {GUARANTEES.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <span className="label mt-1 shrink-0 text-blue">{item.label}</span>
              <div>
                <p className="font-display text-sm font-medium text-ink">{item.title}</p>
                <p className="mt-1 text-xs leading-[1.9] text-muted">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
