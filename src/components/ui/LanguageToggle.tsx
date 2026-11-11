'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useSound } from '@/components/providers/SoundProvider'
import { cn } from '@/lib/utils'

/**
 * Language switch.
 *
 * Two segments, both always readable — the inactive one is the *destination*,
 * not a mystery. The active pill is a shared `layoutId`, so the indicator flies
 * between the segments in the same direction the reader's eye travels when the
 * script flips (right-to-left: AR is the right-hand segment).
 */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()
  const { play } = useSound()
  const reduced = useReducedMotion()

  const options: Array<{ id: 'ar' | 'en'; label: string; long: string }> = [
    { id: 'ar', label: 'ع', long: 'العربية' },
    { id: 'en', label: 'EN', long: 'English' },
  ]

  return (
    <div
      role="group"
      aria-label={t.languageToggle}
      className={cn(
        'relative inline-flex h-9 items-center gap-0.5 rounded-full border border-[var(--hairline)] p-0.5',
        className,
      )}
    >
      {options.map((option) => {
        const active = locale === option.id
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => {
              if (active) return
              play('click')
              setLocale(option.id)
            }}
            aria-pressed={active}
            aria-label={option.long}
            title={option.long}
            lang={option.id}
            data-locale-option={option.id}
            className={cn(
              'relative z-10 inline-flex h-8 min-w-9 cursor-pointer items-center justify-center rounded-full px-2.5 text-[11.5px] font-semibold transition-colors duration-300',
              active ? 'text-[var(--bg)]' : 'text-[var(--fg)]/55 hover:text-[var(--fg)]',
              option.id === 'ar' ? 'font-[var(--font-arabic)]' : '',
            )}
          >
            {active && !reduced ? (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 -z-10 rounded-full bg-[var(--fg)]"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            ) : active ? (
              <span className="absolute inset-0 -z-10 rounded-full bg-[var(--fg)]" />
            ) : null}
            <span className="leading-none">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
