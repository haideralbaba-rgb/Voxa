/**
 * Sound engine.
 *
 * The site's audio is synthesised, not downloaded: every cue is a handful of
 * oscillators and filtered noise shaped by an envelope. That keeps the payload
 * at zero bytes, makes the palette tunable from code, and avoids the licensing
 * and caching cost of shipping WAVs for a 90 ms click.
 *
 * The palette follows the convention used by the HorizonX sound catalogue —
 * short primary clicks, softer hover blips, two-note confirms, a rising three
 * note success and a falling buzz for errors — because those envelopes are what
 * people already read as "app sound".
 *
 * Rules this engine keeps:
 *  - silent until the visitor opts in (a real gesture, a persisted preference);
 *  - one shared AudioContext, resumed lazily on the first cue;
 *  - nothing runs while the tab is hidden.
 */

export type SoundCue =
  | 'click'
  | 'hover'
  | 'open'
  | 'close'
  | 'toggle-on'
  | 'toggle-off'
  | 'success'
  | 'error'
  | 'copy'
  | 'swipe'

interface CueSpec {
  /** Peak gain, 0–1. Kept low: UI sound should sit under the reading voice. */
  gain: number
  build: (context: AudioContext, output: GainNode, now: number) => void
}

const MASTER_VOLUME = 0.22

/** A tiny oscillator helper with an exponential decay — no clicks, no tail. */
function tone(
  context: AudioContext,
  output: GainNode,
  options: {
    type: OscillatorType
    from: number
    to?: number
    at: number
    duration: number
    gain: number
    attack?: number
  },
) {
  const { type, from, to = from, at, duration, gain, attack = 0.004 } = options
  const oscillator = context.createOscillator()
  const envelope = context.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(from, at)
  if (to !== from) oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, to), at + duration)

  envelope.gain.setValueAtTime(0.0001, at)
  envelope.gain.exponentialRampToValueAtTime(gain, at + attack)
  envelope.gain.exponentialRampToValueAtTime(0.0001, at + duration)

  oscillator.connect(envelope)
  envelope.connect(output)
  oscillator.start(at)
  oscillator.stop(at + duration + 0.02)
}

/** Filtered noise — the body of whooshes, sweeps and drops. */
function noise(
  context: AudioContext,
  output: GainNode,
  options: {
    at: number
    duration: number
    gain: number
    from: number
    to: number
    q?: number
    type?: BiquadFilterType
  },
) {
  const { at, duration, gain, from, to, q = 1.2, type = 'bandpass' } = options
  const frames = Math.max(1, Math.floor(context.sampleRate * duration))
  const buffer = context.createBuffer(1, frames, context.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1

  const source = context.createBufferSource()
  source.buffer = buffer

  const filter = context.createBiquadFilter()
  filter.type = type
  filter.Q.value = q
  filter.frequency.setValueAtTime(from, at)
  filter.frequency.exponentialRampToValueAtTime(Math.max(20, to), at + duration)

  const envelope = context.createGain()
  envelope.gain.setValueAtTime(0.0001, at)
  envelope.gain.exponentialRampToValueAtTime(gain, at + duration * 0.25)
  envelope.gain.exponentialRampToValueAtTime(0.0001, at + duration)

  source.connect(filter)
  filter.connect(envelope)
  envelope.connect(output)
  source.start(at)
  source.stop(at + duration + 0.02)
}

const CUES: Record<SoundCue, CueSpec> = {
  // 20ms of dry click — the "soft click" of the catalogue, minus the file.
  click: {
    gain: 0.5,
    build: (context, output, now) => {
      tone(context, output, { type: 'triangle', from: 1180, to: 520, at: now, duration: 0.05, gain: 0.5 })
      noise(context, output, { at: now, duration: 0.03, gain: 0.18, from: 4200, to: 2400, q: 6 })
    },
  },
  hover: {
    gain: 0.3,
    build: (context, output, now) => {
      tone(context, output, { type: 'sine', from: 1860, to: 2100, at: now, duration: 0.05, gain: 0.3 })
    },
  },
  open: {
    gain: 0.45,
    build: (context, output, now) => {
      noise(context, output, { at: now, duration: 0.26, gain: 0.16, from: 520, to: 2600, q: 0.9 })
      tone(context, output, { type: 'sine', from: 260, to: 520, at: now, duration: 0.24, gain: 0.22 })
    },
  },
  close: {
    gain: 0.4,
    build: (context, output, now) => {
      noise(context, output, { at: now, duration: 0.2, gain: 0.12, from: 2400, to: 600, q: 0.9 })
      tone(context, output, { type: 'sine', from: 480, to: 240, at: now, duration: 0.18, gain: 0.2 })
    },
  },
  // The mode change gets the "switch sweep": a short filtered glide.
  'toggle-on': {
    gain: 0.42,
    build: (context, output, now) => {
      tone(context, output, { type: 'triangle', from: 620, to: 1180, at: now, duration: 0.11, gain: 0.32 })
      noise(context, output, { at: now, duration: 0.24, gain: 0.1, from: 900, to: 5200, q: 1.4 })
    },
  },
  'toggle-off': {
    gain: 0.42,
    build: (context, output, now) => {
      tone(context, output, { type: 'triangle', from: 1180, to: 620, at: now, duration: 0.11, gain: 0.32 })
      noise(context, output, { at: now, duration: 0.2, gain: 0.08, from: 4200, to: 800, q: 1.4 })
    },
  },
  // A rising major triad: the "task done" shape.
  success: {
    gain: 0.5,
    build: (context, output, now) => {
      const notes = [523.25, 659.25, 783.99, 1046.5]
      notes.forEach((frequency, index) => {
        tone(context, output, {
          type: 'sine',
          from: frequency,
          at: now + index * 0.075,
          duration: 0.42,
          gain: 0.24,
        })
      })
    },
  },
  // Falling, slightly detuned: reads as "no" without being harsh.
  error: {
    gain: 0.42,
    build: (context, output, now) => {
      tone(context, output, { type: 'sawtooth', from: 190, to: 120, at: now, duration: 0.22, gain: 0.14 })
      tone(context, output, { type: 'sawtooth', from: 196, to: 126, at: now, duration: 0.22, gain: 0.14 })
      tone(context, output, { type: 'sine', from: 440, to: 300, at: now + 0.1, duration: 0.24, gain: 0.16 })
    },
  },
  copy: {
    gain: 0.4,
    build: (context, output, now) => {
      tone(context, output, { type: 'sine', from: 880, at: now, duration: 0.08, gain: 0.28 })
      tone(context, output, { type: 'sine', from: 1320, at: now + 0.07, duration: 0.14, gain: 0.22 })
    },
  },
  swipe: {
    gain: 0.32,
    build: (context, output, now) => {
      noise(context, output, { at: now, duration: 0.3, gain: 0.14, from: 380, to: 2800, q: 1.1 })
    },
  },
}

let context: AudioContext | null = null
let master: GainNode | null = null

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (context) return context
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  context = new Ctor()
  master = context.createGain()
  master.gain.value = MASTER_VOLUME
  master.connect(context.destination)
  return context
}

/** Plays one cue. Cheap enough to call on hover, safe enough to call anywhere. */
export function playCue(cue: SoundCue): void {
  const audio = ensureContext()
  if (!audio || !master) return
  if (audio.state === 'suspended') void audio.resume()
  if (document.visibilityState === 'hidden') return

  const spec = CUES[cue]
  const now = audio.currentTime + 0.001
  spec.build(audio, master, now)
}

export function setMasterVolume(value: number): void {
  if (master) master.gain.value = Math.max(0, Math.min(1, value))
}

export const SOUND_CUES = Object.keys(CUES) as SoundCue[]
