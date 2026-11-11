'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'
import type { ThemeMode } from '@/lib/types'

const STORAGE_KEY = 'voxa-theme'

interface ThemeContextValue {
  /** The mode the user picked (may be "system"). */
  mode: ThemeMode
  /** The colour scheme currently applied. */
  resolved: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
  /** Flip to the opposite scheme, preferring a circular wipe from `origin`. */
  toggle: (origin?: { x: number; y: number }) => void
  /** True while a wipe transition is running (used to fade interactive chrome). */
  transitioning: boolean
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

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

/**
 * Cross-fades the whole document through a circular reveal anchored at the
 * pointer, the way the theme toggle behaves on modern Apple product pages.
 * Falls back to an instant swap when the API or motion preference says no.
 */
function withThemeWipe(
  origin: { x: number; y: number } | undefined,
  update: () => void,
  onStart: () => void,
  onEnd: () => void,
) {
  const doc = document as ViewTransitionDocument
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (typeof doc.startViewTransition !== 'function' || reduced || !origin) {
    update()
    onEnd()
    return
  }

  const { x, y } = origin
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  onStart()
  const transition = doc.startViewTransition(() => update())
  transition.finished.finally(onEnd)

  document.documentElement.animate(
    {
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
    },
    {
      duration: 620,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [mode, resolved] = snapshot.split('|') as [ThemeMode, 'light' | 'dark']
  const [transitioning, setTransitioning] = useState(false)

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

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next = resolved === 'dark' ? 'light' : 'dark'
      withThemeWipe(
        origin,
        () => {
          try {
            localStorage.setItem(STORAGE_KEY, next)
          } catch {
            /* ignore */
          }
          apply(next)
          emit()
        },
        () => setTransitioning(true),
        () => setTransitioning(false),
      )
    },
    [resolved],
  )

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolved, setMode, toggle, transitioning }),
    [mode, resolved, setMode, toggle, transitioning],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>')
  return context
}
