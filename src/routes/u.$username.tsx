import { createFileRoute } from '@tanstack/react-router'
import { getPublicPortfolio } from '../server/data'
import { PortfolioPage } from '../components/PortfolioPage'

export const Route = createFileRoute('/u/$username')({
  loader: () => getPublicPortfolio(),
  component: TenantRoute,
})

function TenantRoute() {
  const data = Route.useLoaderData()
  if (!data) return <div className="min-h-screen bg-[#0a0a0a] p-10 text-white">Portfolio not found.</div>
  return <PortfolioPage data={data} />
}
