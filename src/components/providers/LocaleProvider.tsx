'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'
import { COPY, type Copy, type Locale } from '@/lib/i18n/copy'

/**
 * Locale state.
 *
 * Arabic is the default: the document is meant to be read in Arabic first, so
 * the absence of a stored preference means `ar`, not `en`. The preference lives
 * in localStorage and is read through an external store, which keeps the server
 * render deterministic and avoids a read-then-setState effect.
 *
 * Switching locale flips `<html lang>` and `<html dir>` in the same commit as
 * the copy, so no frame is ever rendered with Arabic text inside an LTR box.
 */
interface LocaleContextValue {
  locale: Locale
  dir: 'rtl' | 'ltr'
  t: Copy
  setLocale: (locale: Locale) => void
  toggle: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const STORAGE_KEY = 'voxa:locale'

let listeners: Array<() => void> = []

function subscribe(onChange: () => void) {
  listeners = [...listeners, onChange]
  window.addEventListener('voxa:locale', onChange)
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange)
    window.removeEventListener('voxa:locale', onChange)
  }
}

function readLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ar'
  } catch {
    return 'ar'
  }
}

function writeLocale(next: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
  for (const listener of listeners) listener()
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, () => 'ar' as Locale)
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dir
    // Latin numerals in data columns read better than Arabic-Indic ones in
    // tabular contexts; prose numbers are localised in the copy file itself.
    root.dataset.locale = locale
  }, [locale, dir])

  const setLocale = useCallback((next: Locale) => {
    writeLocale(next)
  }, [])

  const toggle = useCallback(() => {
    writeLocale(readLocale() === 'ar' ? 'en' : 'ar')
  }, [])

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dir, t: COPY[locale], setLocale, toggle }),
    [locale, dir, setLocale, toggle],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside <LocaleProvider>')
  return context
}
