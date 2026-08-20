import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getSupabaseServer } from '../server/supabase'

const getProject = createServerFn({ method: 'GET' })
  .validator((input: { data: { slug: string } }) => input.data)
  .handler(async ({ context, data }) => {
    if (context.tenant.kind === 'platform') return null
    const supabase = getSupabaseServer()
    let portfolioId: string | null = null

    if (context.tenant.kind === 'subdomain' || context.tenant.kind === 'path') {
      const { data: portfolio, error } = await supabase
        .from('portfolios')
        .select('id,profiles!inner(username)')
        .eq('profiles.username', context.tenant.username)
        .eq('publication_state', 'published')
        .maybeSingle()
      if (error) throw error
      portfolioId = portfolio?.id ?? null
    } else {
      const { data: domain, error } = await supabase
        .from('portfolio_domains')
        .select('portfolio_id')
        .eq('hostname', context.tenant.hostname)
        .eq('status', 'verified')
        .maybeSingle()
      if (error) throw error
      portfolioId = domain?.portfolio_id ?? null
    }

    if (!portfolioId) return null

    const { data: project, error } = await supabase
      .from('projects')
      .select('id,title,slug,description,category_id,project_media(*)')
      .eq('portfolio_id', portfolioId)
      .eq('slug', data.slug)
      .eq('publication_state', 'published')
      .maybeSingle()
    if (error) throw error
    return project
  })

export const Route = createFileRoute('/project/$slug')({
  loader: async ({ params }) => {
    const value = await getProject({ data: { slug: params.slug } })
    if (!value) throw notFound()
    return value
  },
  component: ProjectPage,
})

function ProjectPage() {
  const project = Route.useLoaderData()
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-5 py-7 text-white sm:px-10">
      <a href="/" className="text-xs uppercase tracking-[0.25em] text-white/35 hover:text-white">Back</a>
      <header className="mx-auto max-w-5xl pb-12 pt-16">
        <p className="text-[11px] uppercase tracking-[0.25em] text-white/30">Selected work</p>
        <h1 className="mt-4 text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-[-0.05em]">{project.title}</h1>
        {project.description && <p className="mt-6 max-w-2xl text-white/45">{project.description}</p>}
      </header>
      <div className="mx-auto grid max-w-6xl gap-4">
        {project.project_media?.map((media: { id: string; kind: string; public_url?: string; poster_url?: string; mime_type?: string }) => (
          <div key={media.id} className="overflow-hidden bg-white/[0.03]">
            {media.kind === 'video' ? (
              <video controls playsInline poster={media.poster_url} className="block w-full">
                <source src={media.public_url} type={media.mime_type} />
              </video>
            ) : (
              <img src={media.public_url} alt={project.title} className="block w-full" loading="lazy" />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
