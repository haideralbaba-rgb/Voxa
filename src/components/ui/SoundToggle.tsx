'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Volume2, VolumeX } from 'lucide-react'
import { useSound } from '@/components/providers/SoundProvider'
import { useLocale } from '@/components/providers/LocaleProvider'
import { cn } from '@/lib/utils'

/** Three bars that animate only while sound is on — a VU meter, not an icon. */
function Meter({ active }: { active: boolean }) {
  const reduced = useReducedMotion()
  return (
    <span className="flex items-end gap-[2px]" aria-hidden>
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="w-[2px] rounded-full bg-current"
          animate={
            active && !reduced
              ? { height: [4, 10 + index * 2, 5, 9, 4] }
              : { height: 4 }
          }
          transition={
            active && !reduced
              ? { duration: 1.4 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
      ))}
    </span>
  )
}

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound()
  const { t } = useLocale()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? t.soundMute : t.soundEnable}
      title={enabled ? t.soundOn : t.soundOff}
      className={cn(
        'group relative inline-flex h-9 items-center gap-2 rounded-full border border-[var(--hairline)] px-3 text-[11.5px] font-medium text-[var(--fg)]/70 transition-colors duration-300 hover:border-[var(--hairline-strong)] hover:text-[var(--fg)]',
        enabled && 'border-accent/35 text-[var(--fg)]',
        className,
      )}
    >
      {enabled ? <Volume2 size={14} aria-hidden /> : <VolumeX size={14} aria-hidden />}
      <Meter active={enabled} />
      <span className="hidden text-[10.5px] font-mono uppercase tracking-[0.14em] sm:inline">
        {enabled ? t.soundOn : t.soundOff}
      </span>
    </button>
  )
}
