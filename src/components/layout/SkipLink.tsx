'use client'

import { useLocale } from '@/components/providers/LocaleProvider'

/** First tab stop on every page — reads in the active language. */
export function SkipLink() {
  const { t } = useLocale()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--fg)] focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-[var(--bg)]"
    >
      {t.skipToContent}
    </a>
  )
}
