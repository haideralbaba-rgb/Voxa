'use client'

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react'
import type { ThemeMode } from '@/lib/types'

const STORAGE_KEY = 'voxa-theme'

interface ThemeContextValue {
  /** The mode the user picked (may be "system"). */
  mode: ThemeMode
  /** The colour scheme currently applied. */
  resolved: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/* -------------------------------------------------------------------------
 * External store: the DOM class, storage and the media query are the source
 * of truth. React only mirrors them, which keeps hydration flash-free (an
 * inline script has already set the class before first paint).
 * ---------------------------------------------------------------------- */

const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const mediaListener = () => {
    // Any change to the system preference matters while mode === 'system'.
    const mode = readMode()
    if (mode === 'system') apply(query.matches ? 'dark' : 'light')
    emit()
  }
  const storageListener = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    const mode = readMode()
    apply(mode === 'dark' || (mode === 'system' && query.matches) ? 'dark' : 'light')
    emit()
  }
  query.addEventListener('change', mediaListener)
  window.addEventListener('storage', storageListener)
  return () => {
    listeners.delete(listener)
    query.removeEventListener('change', mediaListener)
    window.removeEventListener('storage', storageListener)
  }
}

function readMode(): ThemeMode {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'light' || value === 'dark' || value === 'system') return value
  } catch {
    /* storage can be blocked — fall through to system */
  }
  return 'system'
}

function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** Snapshot is a string so React can compare it by value. */
function getSnapshot(): string {
  const mode = readMode()
  const resolved = mode === 'system' ? (prefersDark() ? 'dark' : 'light') : mode
  return `${mode}|${resolved}`
}

function getServerSnapshot(): string {
  return 'system|light'
}

function apply(theme: 'light' | 'dark') {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [mode, resolved] = snapshot.split('|') as [ThemeMode, 'light' | 'dark']

  const setMode = useCallback((next: ThemeMode) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    const applied = next === 'system' ? (prefersDark() ? 'dark' : 'light') : next
    apply(applied)
    emit()
  }, [])

  const toggle = useCallback(() => {
    setMode(resolved === 'dark' ? 'light' : 'dark')
  }, [resolved, setMode])

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolved, setMode, toggle }),
    [mode, resolved, setMode, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>')
  return context
}
