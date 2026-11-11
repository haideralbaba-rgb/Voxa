'use client'

/**
 * ShaderBackdrop — the site's ambient light rig.
 *
 * These are the HorizonX *shader* families (Halo Drift, Iridescent Flow, Silk
 * Current, Topographic Flow) rebuilt as pure CSS: layered radial/conic gradients
 * on oversized blurred elements that drift on long, incommensurable periods.
 *
 * Why not WebGL: a full fragment shader for what amounts to three soft lights is
 * 400kb of runtime and a battery hit on phones. CSS gradients are composited on
 * the GPU, cost nothing to parse, and the slow drift is indistinguishable at
 * this blur radius. `prefers-reduced-motion` freezes them entirely.
 */

export type ShaderVariant = 'halo' | 'iridescent' | 'silk' | 'topographic'

interface ShaderBackdropProps {
  variant?: ShaderVariant
  /** 0–1. Ambient light should whisper; the hero can afford 0.5. */
  intensity?: number
  className?: string
}

const PALETTES: Record<ShaderVariant, { a: string; b: string; c: string; duration: string }> = {
  // Warm halo with a blue passage — the film's opening light.
  halo: {
    a: 'rgba(224,138,95,0.55)',
    b: 'rgba(125,211,252,0.32)',
    c: 'rgba(167,139,250,0.22)',
    duration: '26s',
  },
  // Silver-liquid folds with peach and blue refractions.
  iridescent: {
    a: 'rgba(240,183,155,0.5)',
    b: 'rgba(125,211,252,0.34)',
    c: 'rgba(244,114,182,0.26)',
    duration: '32s',
  },
  // Copper filaments on dark silk.
  silk: {
    a: 'rgba(168,80,44,0.55)',
    b: 'rgba(125,211,252,0.22)',
    c: 'rgba(240,183,155,0.28)',
    duration: '38s',
  },
  // Fine contour lines — the topographic field, done with repeating gradients.
  topographic: {
    a: 'rgba(154,154,164,0.16)',
    b: 'rgba(224,138,95,0.14)',
    c: 'rgba(154,154,164,0.1)',
    duration: '44s',
  },
}

export function ShaderBackdrop({ variant = 'halo', intensity = 0.5, className }: ShaderBackdropProps) {
  const palette = PALETTES[variant]
  const topographic = variant === 'topographic'

  return (
    <div
      className={className}
      aria-hidden
      style={{
        opacity: intensity,
        maskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, #000 30%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, #000 30%, transparent 78%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Field A — the main volume of light */}
        <div
          className="shader-drift absolute left-[6%] top-[-18%] h-[58%] w-[62%] rounded-full blur-[90px]"
          style={{ background: `radial-gradient(circle at 35% 35%, ${palette.a}, transparent 68%)` }}
        />
        {/* Field B — the counter-drifting passage */}
        <div
          className="shader-drift absolute right-[-6%] top-[6%] h-[52%] w-[54%] rounded-full blur-[110px]"
          style={{
            background: `radial-gradient(circle at 60% 50%, ${palette.b}, transparent 66%)`,
            animationDirection: 'reverse',
            animationDuration: `calc(${palette.duration} * 1.28)`,
          }}
        />
        {/* Field C — the low glow that grounds the composition */}
        <div
          className="shader-drift absolute bottom-[-24%] left-[24%] h-[54%] w-[46%] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${palette.c}, transparent 70%)`,
            animationDuration: `calc(${palette.duration} * 0.82)`,
          }}
        />

        {topographic ? (
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'repeating-radial-gradient(circle at 30% 120%, transparent 0 22px, rgba(154,154,164,0.16) 22px 23px)',
              maskImage: 'linear-gradient(to top, #000, transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to top, #000, transparent 85%)',
            }}
          />
        ) : (
          // Fine iridescent contours: a hairline grid bent by the blur above it.
          <div
            className="absolute inset-0 opacity-[0.18] mix-blend-soft-light"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 7px)',
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 10%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 10%, transparent 75%)',
            }}
          />
        )}
      </div>
    </div>
  )
}
