'use client'

import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { cn } from '@/lib/utils'
import { useLocale } from '@/components/providers/LocaleProvider'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolved, toggle } = useTheme()
  const { t } = useLocale()
  const reduced = useReducedMotion()
  const isDark = resolved === 'dark'

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        // Wipe outward from the button itself, not the page centre.
        toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }}
      aria-label={isDark ? t.themeToLight : t.themeToDark}
      aria-pressed={isDark}
      title={isDark ? t.themeToLight : t.themeToDark}
      className={cn(
        'relative grid size-9 place-items-center rounded-full border border-[var(--hairline)] text-[var(--fg)]/70 transition-colors duration-300 hover:border-[var(--hairline-strong)] hover:text-[var(--fg)]',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={reduced ? false : { opacity: 0, rotate: -35, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 35, scale: 0.7 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute grid place-items-center"
        >
          {isDark ? <Moon size={15} strokeWidth={1.75} /> : <Sun size={15} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
