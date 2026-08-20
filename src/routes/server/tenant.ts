const RESERVED = new Set([
  'www', 'app', 'api', 'admin', 'auth', 'dashboard', 'login', 'signup', 'docs', 'static', 'assets', 'mail', 'status', 'support',
])

function normalizeHost(host: string): string {
  return host.trim().toLowerCase().replace(/\.$/, '').split(':')[0]
}

function validUsername(value: string): boolean {
  return /^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])?$/.test(value) && !RESERVED.has(value)
}

export type TenantResolution =
  | { kind: 'subdomain'; username: string; hostname: string }
  | { kind: 'custom-domain'; hostname: string }
  | { kind: 'path'; username: string }
  | { kind: 'platform' }

export function resolveTenantFromRequest(request: Request): TenantResolution {
  const hostHeader = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? ''
  const hostname = normalizeHost(hostHeader)
  const platform = normalizeHost(process.env.PLATFORM_HOST ?? 'platform.local')

  if (!hostname || hostname === platform || hostname === `www.${platform}` || hostname.endsWith('.lovable.app') || hostname.endsWith('.lovableproject.com')) {
    const pathname = new URL(request.url).pathname
    const match = pathname.match(/^\/u\/([a-z0-9-]{1,32})/i)
    if (match && validUsername(match[1].toLowerCase())) return { kind: 'path', username: match[1].toLowerCase() }
    return { kind: 'platform' }
  }

  if (hostname.endsWith(`.${platform}`)) {
    const sub = hostname.slice(0, -(platform.length + 1))
    if (sub && !sub.includes('.') && validUsername(sub)) return { kind: 'subdomain', username: sub, hostname }
  }

  if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(hostname)) return { kind: 'custom-domain', hostname }
  return { kind: 'platform' }
}
