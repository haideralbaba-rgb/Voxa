export type PlanTier = 'free' | 'pro'
export type PublicationState = 'draft' | 'published' | 'unpublished'
export type MediaKind = 'image' | 'video'
export type ProcessingStatus = 'pending' | 'processing' | 'ready' | 'failed'
export type DomainStatus = 'pending' | 'verified' | 'failed' | 'disabled'

export interface CapabilitySet {
  customDomain: boolean
  hideWatermark: boolean
  maxProjects: number
  maxUploadBytes: number
  videoUploads: boolean
  premiumThemes: boolean
}

export interface Profile {
  id: string
  username: string
  displayName: string
  avatarUrl: string | null
  bio: string | null
  profession: string | null
  socialLinks: Record<string, string>
}

export interface Portfolio {
  id: string
  ownerId: string
  title: string
  slug: string
  description: string | null
  accent: string
  typography: string
  seoTitle: string | null
  seoDescription: string | null
  publicationState: PublicationState
  featuredProjectIds: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  sortOrder: number
}

export interface ProjectMedia {
  id: string
  projectId: string
  kind: MediaKind
  storagePath: string
  publicUrl: string | null
  thumbnailPath: string | null
  thumbnailUrl: string | null
  posterPath: string | null
  posterUrl: string | null
  width: number | null
  height: number | null
  aspectRatio: number | null
  duration: number | null
  mimeType: string
  fileSize: number
  processingStatus: ProcessingStatus
  sortOrder: number
}

export interface Project {
  id: string
  portfolioId: string
  ownerId: string
  title: string
  slug: string
  description: string | null
  categoryId: string | null
  categoryName: string | null
  tags: string[]
  featured: boolean
  publicationState: PublicationState
  sortOrder: number
  media: ProjectMedia[]
}

export interface PortfolioViewModel {
  profile: Profile
  portfolio: Portfolio
  categories: Category[]
  projects: Project[]
  plan: PlanTier
  capabilities: CapabilitySet
}
