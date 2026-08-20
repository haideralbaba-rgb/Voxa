import { createStart, createMiddleware, createCsrfMiddleware } from '@tanstack/react-start'
import { resolveTenantFromRequest } from './server/tenant'

export type TenantContext = ReturnType<typeof resolveTenantFromRequest>

const tenantMiddleware = createMiddleware().server(async ({ next, request }) => {
  const tenant = resolveTenantFromRequest(request)
  return next({ context: { tenant } })
})

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, tenantMiddleware],
}))
