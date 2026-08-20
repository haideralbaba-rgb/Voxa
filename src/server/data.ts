import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getSupabaseServer } from './supabase'
import { getCapabilities } from '../lib/capabilities'
import type { Category, Portfolio, PortfolioViewModel, Profile, Project, ProjectMedia } from '../types'
import { signMediaUrls } from './storage'
import type { TenantContext } from '../start'

function requireTenant(context: { tenant: TenantContext }) {
  if (context.tenant.kind === 'platform') throw new Error('Tenant not found')
  return context.tenant
}

async function resolvePortfolio(supabase: ReturnType<typeof getSupabaseServer>, tenant: Exclude<TenantContext, { kind: 'platform' }>) {
  if (tenant.kind === 'subdomain' || tenant.kind === 'path') {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*, profiles!inner(id, username, display_name, avatar_url, bio, profession, social_links)')
      .eq('profiles.username', tenant.username)
      .eq('publication_state', 'published')
      .maybeSingle()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('portfolio_domains')
    .select('portfolio_id, portfolios!inner(*, profiles!inner(id, username, display_name, avatar_url, bio, profession, social_links))')
    .eq('hostname', tenant.hostname)
    .eq('status', 'verified')
    .maybeSingle()
  if (error) throw error
  return data?.portfolios ?? null
}

export const getPublicPortfolio = createServerFn({ method: 'GET' }).handler(async ({ context }) => {
  const tenant = requireTenant(context)
  const supabase = getSupabaseServer()
  const portfolioRow = await resolvePortfolio(supabase, tenant)
  if (!portfolioRow) return null

  const joined = portfolioRow as unknown as Portfolio & { profiles: Profile; public_plan?: 'free' | 'pro'; featured_project_ids?: string[] }
  const profile = joined.profiles
  const portfolio = joined as Portfolio
  const plan = joined.public_plan ?? 'free'

  const { data: categoryRows, error: categoryError } = await supabase
    .from('categories')
    .select('id,name,slug,sort_order')
    .eq('portfolio_id', portfolio.id)
    .order('sort_order', { ascending: true })
  if (categoryError) throw categoryError

  const { data: projectRows, error: projectsError } = await supabase
    .from('projects')
    .select('id,portfolio_id,owner_id,title,slug,description,category_id,tags,featured,publication_state,sort_order,created_at,categories(name),project_media(*)')
    .eq('portfolio_id', portfolio.id)
    .eq('publication_state', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (projectsError) throw projectsError

  const rawProjects = projectRows ?? []
  const mediaPaths = rawProjects.flatMap((row) => (row.project_media ?? []).map((media: ProjectMedia) => media.storagePath))
  const signedUrls = await signMediaUrls(mediaPaths)

  const projects: Project[] = (projectRows ?? []).map((row) => ({
    ...row,
    categoryName: (row.categories as { name: string } | null)?.name ?? null,
    media: ((row.project_media ?? []) as ProjectMedia[]).filter((media) => media.processing_status !== 'failed').map((media) => ({ ...media, publicUrl: signedUrls.get(media.storagePath) ?? null, thumbnailUrl: media.thumbnailPath ? signedUrls.get(media.thumbnailPath) ?? null : null, posterUrl: media.posterPath ? signedUrls.get(media.posterPath) ?? null : null })),
  }))

  const categories: Category[] = (categoryRows ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    sortOrder: c.sort_order,
  }))

  return {
    profile,
    portfolio: {
      ...portfolio,
      featuredProjectIds: joined.featured_project_ids ?? [],
      publicationState: portfolioRow.publication_state,
    },
    categories,
    projects,
    plan,
    capabilities: getCapabilities(plan),
  } satisfies PortfolioViewModel
})

const portfolioInput = z.object({
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  accent: z.string().regex(/^#[0-9a-f]{6}$/i),
  typography: z.string().max(40),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(180).optional(),
  publicationState: z.enum(['draft', 'published', 'unpublished']),
})

export const updatePortfolio = createServerFn({ method: 'POST' })
  .validator(({ data }) => portfolioInput.parse(data))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer()
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) throw new Error('Unauthorized')

    const { data: existing, error: existingError } = await supabase
      .from('portfolios')
      .select('id,owner_id')
      .eq('owner_id', auth.user.id)
      .single()
    if (existingError) throw existingError

    const { error } = await supabase
      .from('portfolios')
      .update({
        title: data.title,
        slug: data.slug,
        description: data.description ?? null,
        accent: data.accent,
        typography: data.typography,
        seo_title: data.seoTitle ?? null,
        seo_description: data.seoDescription ?? null,
        publication_state: data.publicationState,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .eq('owner_id', auth.user.id)

    if (error) throw error
    return { ok: true }
  })
