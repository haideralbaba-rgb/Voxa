import type { CapabilitySet, PlanTier } from '../types'

export const CAPABILITIES: Record<PlanTier, CapabilitySet> = {
  free: {
    customDomain: false,
    hideWatermark: false,
    maxProjects: 8,
    maxUploadBytes: 50 * 1024 * 1024,
    videoUploads: true,
    premiumThemes: false,
  },
  pro: {
    customDomain: true,
    hideWatermark: true,
    maxProjects: 500,
    maxUploadBytes: 2 * 1024 * 1024 * 1024,
    videoUploads: true,
    premiumThemes: true,
  },
}

export function getCapabilities(plan: PlanTier): CapabilitySet {
  return CAPABILITIES[plan]
}

export function can<K extends keyof CapabilitySet>(
  plan: PlanTier,
  capability: K,
  value?: CapabilitySet[K],
): boolean {
  const actual = CAPABILITIES[plan][capability]
  if (typeof value === 'number' && typeof actual === 'number') return actual >= value
  return Boolean(actual)
}
