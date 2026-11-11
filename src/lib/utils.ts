export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function formatIndex(index: number, pad = 2): string {
  return String(index + 1).padStart(pad, '0')
}

/** Deterministic pseudo-random helper so SSR and client markup agree. */
export function seeded(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href)
}
