/**
 * Domain types for the portfolio.
 *
 * Everything the UI renders is modelled here so that the static mock data and a
 * future CMS/Supabase source are interchangeable and fully type-checked.
 */

export type ThemeMode = 'light' | 'dark' | 'system'

export type ProjectCategory = 'Brand' | 'Editorial' | 'Product' | 'Motion' | 'Commerce'

export type ProjectLinkKind = 'live' | 'github' | 'video' | 'case-study'

export interface ProjectLink {
  kind: ProjectLinkKind
  label: string
  href: string
}

export interface Metric {
  /** Short display value, e.g. "+312%" or "1.4s". */
  value: string
  /** What the number measures. */
  label: string
  /** Optional supporting sentence shown in the case study. */
  detail?: string
}

export interface GalleryItem {
  id: string
  /** Path under /public. */
  src: string
  alt: string
  caption: string
  width: number
  height: number
  /** Rendered inside a phone/browser frame when true. */
  frame?: 'browser' | 'phone' | 'none'
}

export interface ArchitectureBlock {
  title: string
  body: string
  /** Optional mono list, e.g. routes, layers, services. */
  bullets?: string[]
}

export interface Project {
  id: string
  slug: string
  title: string
  /** One-line pitch used on the card. */
  tagline: string
  /** 2–3 sentence summary used in the case study hero. */
  summary: string
  year: number
  client: string
  role: string
  category: ProjectCategory
  featured: boolean
  /** Hex accent used for glows, tags and the overlay wash. */
  accent: string
  accentForeground: string
  cover: GalleryItem
  gallery: GalleryItem[]
  /** Case-study body: the "how" and the "why". */
  architecture: ArchitectureBlock[]
  metrics: Metric[]
  stack: string[]
  links: ProjectLink[]
  awards?: string[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  companyUrl?: string
  /** Human readable range, e.g. "2022 — Present". */
  period: string
  start: string
  end: string | null
  location: string
  employment: 'Full-time' | 'Contract' | 'Founder' | 'Freelance'
  summary: string
  highlights: string[]
  stack: string[]
}

export type SkillGroupId = 'frontend' | 'backend' | 'tools' | 'design'

export interface Skill {
  name: string
  level: 'Expert' | 'Advanced' | 'Proficient'
  /** 0–100, drives the meter width. */
  years: number
  note?: string
}

export interface SkillGroup {
  id: SkillGroupId
  title: string
  blurb: string
  skills: Skill[]
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  title: string
  company: string
  initials: string
  /** Decorative accent for the avatar chip. */
  accent: string
}

export interface SocialLink {
  label: string
  href: string
  handle: string
}

export interface NavItem {
  label: string
  href: string
}

export interface Profile {
  name: string
  shortName: string
  pronouns: string
  role: string
  location: string
  timezone: string
  available: boolean
  availabilityLabel: string
  email: string
  phone: string
  resumeHref: string
  headline: string
  headlineAccent: string
  lede: string
  bio: string[]
  avatar: { src: string; alt: string; width: number; height: number }
  socials: SocialLink[]
  nav: NavItem[]
  stats: Metric[]
  clients: string[]
  principles: { title: string; body: string }[]
}

export interface ContactPayload {
  name: string
  email: string
  company?: string
  budget?: string
  message: string
}

export interface ContactResult {
  ok: boolean
  message: string
  fieldErrors?: Partial<Record<keyof ContactPayload, string>>
}

/* ------------------------------------------------------------------
   Storyboard
   ------------------------------------------------------------------ */
export type SceneKey =
  | 'title'
  | 'grid'
  | 'tunnel'
  | 'bloom'
  | 'orbit'
  | 'wave'
  | 'axiom'
  | 'glyphs'
  | 'gravity'
  | 'resolution'

export type SceneBackdrop = 'ink' | 'gradient' | 'light'

export interface StoryboardScene {
  id: SceneKey
  /** Chapter number printed in the HUD, e.g. "01". */
  index: string
  kind: string
  title: string
  /** Two lines of director's note — why the shot exists, not what it looks like. */
  note: [string, string]
  /** The catalogue mechanic this shot is built on, and where it came from. */
  mechanic: string
  credit: string
  /** Spec chips shown in the HUD. */
  spec: string[]
  duration: number
  backdrop: SceneBackdrop
  accent: string
}
