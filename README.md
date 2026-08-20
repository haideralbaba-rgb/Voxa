# VOXA Portfolio Platform

A cinematic multi-tenant portfolio platform built for digital creators with TanStack Start + Lovable Cloud (Postgres/RLS/Auth/Storage).

## Architecture

- `src/start.ts` — global request middleware, CSRF, tenant context
- `src/server/tenant.ts` — hostname → tenant resolver
- `src/server/data.ts` — typed server functions and public portfolio reads
- `src/server/supabase.ts` — server-side Supabase/Lovable Cloud client with cookie session support
- `src/components/SmartGrid.tsx` — media-first masonry grid
- `src/routes/*` — TanStack file-based routes
- `supabase/migrations/0001_voxa.sql` — schema + RLS + storage bucket

## Environment

Set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `PLATFORM_HOST`

The Lovable Cloud project should expose the same Supabase-compatible URL/key pair. The database schema is intentionally Postgres/RLS-first because Lovable Cloud uses Postgres and Supabase-specific services underneath. See Lovable security guidance and TanStack Start server-function/middleware docs.

## Tenant resolution

- Production subdomain: `username.<PLATFORM_HOST>`
- Custom domain: verified record in `portfolio_domains`
- Local/preview fallback: `/u/:username`

Real wildcard DNS and custom domains still require the hosting/DNS layer. Lovable documents native custom domain support, while the application-side resolver remains data-driven.
