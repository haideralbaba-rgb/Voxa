'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'
import { playCue, type SoundCue } from '@/lib/audio'

/**
 * Site-wide sound state.
 *
 * Off by default — a portfolio that makes noise before you ask is a portfolio
 * people close. The preference is persisted, and the very first enabling
 * gesture doubles as the AudioContext unlock required by browsers.
 */
interface SoundContextValue {
  enabled: boolean
  toggle: () => void
  /** Fire a cue; a no-op while sound is off. */
  play: (cue: SoundCue) => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const STORAGE_KEY = 'voxa:sound'

/*
 * The preference lives in localStorage, i.e. outside React. Reading it through
 * an external store (rather than "read in an effect, then setState") avoids a
 * cascading render and keeps the server snapshot deterministic: sound is off
 * until the browser says otherwise.
 */
let listeners: Array<() => void> = []

function subscribe(onChange: () => void) {
  listeners = [...listeners, onChange]
  return () => {
    listeners = listeners.filter((listener) => listener !== onChange)
  }
}

function readPreference(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

function writePreference(next: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
  } catch {
    /* ignore */
  }
  for (const listener of listeners) listener()
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, readPreference, () => false)

  const play = useCallback(
    (cue: SoundCue) => {
      if (!enabled) return
      playCue(cue)
    },
    [enabled],
  )

  const toggle = useCallback(() => {
    const next = !readPreference()
    // Confirmation cue: the toggle auditioning itself is the clearest possible
    // explanation of what it turns on — so the "off" cue plays before the
    // preference flips, bypassing the gate for that one tone.
    if (next) {
      writePreference(true)
      playCue('toggle-on')
    } else {
      playCue('toggle-off')
      writePreference(false)
    }
  }, [])

  // Non-React callers (the ⌘K palette) ask for a toggle by event rather than
  // threading the context through another component.
  useEffect(() => {
    const onToggle = () => toggle()
    window.addEventListener('voxa:toggle-sound', onToggle)
    return () => window.removeEventListener('voxa:toggle-sound', onToggle)
  }, [toggle])

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play])

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound(): SoundContextValue {
  const context = useContext(SoundContext)
  if (!context) throw new Error('useSound must be used inside <SoundProvider>')
  return context
}
