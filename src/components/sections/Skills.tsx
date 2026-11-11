'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Braces, Boxes, Wrench, PenTool } from 'lucide-react'
import type { SkillGroupId } from '@/lib/types'
import { profile, skillGroups } from '@/lib/data/profile'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const icons: Record<SkillGroupId, typeof Braces> = {
  frontend: Braces,
  backend: Boxes,
  tools: Wrench,
  design: PenTool,
}

export function Skills() {
  const [active, setActive] = useState<SkillGroupId | null>(null)

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative scroll-mt-24 border-t border-[var(--hairline)] py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title={
            <span id="skills-heading">
              The stack, <span className="serif-accent text-accent">honestly</span> rated.
            </span>
          }
          description="No “expert in everything”. Each level reflects work that shipped and survived contact with real users."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, groupIndex) => {
            const Icon = icons[group.id]
            const isActive = active === group.id
            return (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: groupIndex * 0.07 }}
                onMouseEnter={() => setActive(group.id)}
                onMouseLeave={() => setActive(null)}
                onFocusCapture={() => setActive(group.id)}
                onBlurCapture={() => setActive(null)}
                className={cn(
                  'group relative flex flex-col bg-[var(--bg)] p-5 transition-colors duration-500 md:p-6',
                  isActive ? 'bg-[var(--card)]' : 'hover:bg-[var(--card)]/60',
                )}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }}
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-xl border border-[var(--hairline)] bg-[var(--card)] text-[var(--fg)]/70 transition-colors duration-500 group-hover:border-accent/30 group-hover:text-accent">
                    <Icon size={16} strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted">
                    {String(groupIndex + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.02em]">{group.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-[1.6] text-muted">{group.blurb}</p>

                <ul className="mt-5 flex flex-col gap-3.5">
                  {group.skills.map((skill, skillIndex) => (
                    <li key={skill.name}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[12.5px] font-medium text-[var(--fg)]/84">{skill.name}</span>
                        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.1em] text-muted">
                          {skill.level}
                        </span>
                      </div>
                      <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-[var(--fg)]/[0.07]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: isActive
                              ? 'linear-gradient(90deg, var(--color-accent), var(--color-accent-soft))'
                              : 'var(--color-ink-400)',
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min(100, (skill.years / 10) * 100)}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 + skillIndex * 0.05 }}
                        />
                      </div>
                      {skill.note ? (
                        <p className="mt-1 font-mono text-[9.5px] tracking-[0.02em] text-muted/70">{skill.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>

        {/* Principles */}
        <div className="mt-16">
          <Reveal>
            <h3 className="eyebrow">How I work</h3>
          </Reveal>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {profile.principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.08}>
                <div className="border-t border-[var(--hairline)] pt-4">
                  <span className="font-mono text-[10.5px] tracking-[0.12em] text-accent">
                    0{index + 1}
                  </span>
                  <h4 className="mt-2 text-[15px] font-semibold tracking-[-0.02em]">{principle.title}</h4>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Small, reusable stack strip used by the contact section. */
export function StackStrip() {
  const reduced = useReducedMotion()
  const items = [
    'TypeScript',
    'React 19',
    'Next.js App Router',
    'Tailwind v4',
    'motion/react',
    'Supabase',
    'Postgres RLS',
    'Vercel Edge',
    'Playwright',
    'Figma',
  ]
  return (
    <div className="marquee-mask overflow-hidden py-4">
      <div
        className="flex w-max items-center gap-3"
        style={reduced ? undefined : { animation: 'marquee 38s linear infinite reverse' }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap rounded-full border border-[var(--hairline)] px-3 py-1.5 font-mono text-[11px] text-[var(--fg)]/55"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
