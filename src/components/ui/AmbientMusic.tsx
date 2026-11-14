'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Music2, VolumeX } from 'lucide-react'

// A small, original ambient sequence synthesized locally. Nothing is loaded or
// played until the visitor asks for it; no third-party audio service is needed.
const chords = [
  [130.81, 164.81, 196.0, 261.63],
  [110.0, 130.81, 164.81, 220.0],
  [87.31, 130.81, 174.61, 220.0],
  [98.0, 146.83, 196.0, 246.94],
]

type Player = { context: AudioContext; timer: ReturnType<typeof setInterval> }

function playChord(context: AudioContext, notes: number[]) {
  const now = context.currentTime
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const start = now + index * 0.23
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(index === 0 ? 0.025 : 0.014, start + 0.8)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 5.6)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(start)
    oscillator.stop(start + 5.7)
  })
}

export function AmbientMusic() {
  const player = useRef<Player | null>(null)
  const starting = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState(false)

  const stop = useCallback(() => {
    starting.current = false
    const current = player.current
    player.current = null
    if (current) {
      clearInterval(current.timer)
      void current.context.close().catch(() => {})
    }
    setPlaying(false)
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) stop()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      starting.current = false
      const current = player.current
      if (current) {
        clearInterval(current.timer)
        void current.context.close().catch(() => {})
        player.current = null
      }
    }
  }, [stop])

  const toggle = async () => {
    if (player.current || starting.current) {
      stop()
      return
    }
    starting.current = true
    setError(false)
    let context: AudioContext | null = null
    try {
      const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) throw new Error('Audio unavailable')
      context = new AudioContextClass()
      await context.resume()
      if (!starting.current || document.hidden) {
        await context.close()
        return
      }
      let chord = 0
      playChord(context, chords[chord]!)
      const activeContext = context
      const timer = setInterval(() => {
        chord = (chord + 1) % chords.length
        playChord(activeContext, chords[chord]!)
      }, 4800)
      player.current = { context, timer }
      starting.current = false
      setPlaying(true)
    } catch {
      if (context && context.state !== 'closed') void context.close().catch(() => {})
      starting.current = false
      setError(true)
    }
  }

  return (
    <div className="voxa-music-wrap">
      <button type="button" className="voxa-music" onClick={toggle} aria-pressed={playing} aria-label={playing ? 'إيقاف الموسيقى الهادئة' : 'تشغيل الموسيقى الهادئة'}>
        <span className="voxa-music-icon">{playing ? <Music2 size={16} /> : <VolumeX size={16} />}</span>
        <span>{playing ? 'إيقاف الموسيقى' : 'موسيقى هادئة'}</span>
        <span className={`voxa-music-bars ${playing ? 'is-playing' : ''}`} aria-hidden="true"><i /><i /><i /></span>
      </button>
      {error && <span className="voxa-music-error" role="status">الموسيقى غير متاحة في هذا المتصفح.</span>}
    </div>
  )
}
