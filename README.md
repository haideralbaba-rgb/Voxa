# VOXA — Personal Portfolio

A production-ready personal portfolio for **Haider Albaba**, Product Engineer & Interaction Designer.
Built with Next.js (App Router), TypeScript (strict), Tailwind CSS v4 and `motion/react`.

The centrepiece is an App Store “Today”-style work showcase: cards expand into full case
studies with a shared-element (`layoutId`) transition, deep-linkable URLs, keyboard
navigation and a focus trap.

---

## Stack

| Layer      | Choice                                                              |
| ---------- | ------------------------------------------------------------------- |
| Framework  | Next.js 16 — App Router, Server Components, route handlers           |
| Language   | TypeScript 5.9, `strict` + `noUncheckedIndexedAccess`                |
| Styling    | Tailwind CSS v4 (`@theme`, `@utility`), CSS custom-property tokens   |
| Motion     | `motion/react` (Framer Motion) — layout, reveal, gesture, presence   |
| Icons      | `lucide-react` (tree-shaken via `optimizePackageImports`)            |
| Content    | Typed local data (`src/lib/data`) — trivially swappable for a CMS    |
| Data (opt) | Supabase — contact enquiries + schema migration included             |
| Fonts      | Self-hosted Inter / Instrument Serif / JetBrains Mono (no CLS, no FOUT) |
| Deploy     | Vercel (zero config)                                                |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npx eslint .       # lint
```

Regenerate the design assets at any time:

```bash
npm run art      # 24 project scenes + avatar → public/images
npm run resume   # public/resume.pdf from scripts/generate-resume.mjs
```

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              # metadata, fonts, theme bootstrap, JSON-LD
│  ├─ page.tsx                # home: composes the section architecture
│  ├─ globals.css             # design tokens, utilities, component layer
│  ├─ not-found.tsx
│  ├─ icon.svg  robots.ts  sitemap.ts
│  ├─ api/contact/route.ts    # validated enquiry endpoint (Zod)
│  └─ work/[slug]/page.tsx    # statically rendered, shareable case-study pages
├─ components/
│  ├─ layout/                 # SiteHeader, SiteFooter, ThemeToggle
│  ├─ sections/               # Hero, AboutStrip, Experience, Skills, Testimonials, Contact
│  ├─ projects/               # ProjectShowcase, ProjectCard, CaseStudyPanel
│  ├─ providers/              # ThemeProvider (useSyncExternalStore)
│  └─ ui/                     # Button, Badge, Reveal, SectionHeading, Art
├─ lib/
│  ├─ types.ts                # all domain interfaces
│  ├─ data/                   # profile.ts, projects.ts — the content layer
│  ├─ supabase/               # optional server/client clients
│  └─ utils.ts
└─ scripts/                   # deterministic art + résumé generators
supabase/migrations/          # contact enquiries schema, RLS
```

## Design system

All colour, type and motion decisions live in `src/app/globals.css`:

- **Tokens** — `--bg`, `--fg`, `--fg-muted`, `--card`, `--hairline`, `--glass`,
  shadows and a four-step display type scale, each defined for light and `.dark`.
- **Accent** — `#a8502c` (light) / `#e08a5f` (dark), both ≥ 4.5:1 on their own
  surface, so accent-coloured 11px labels still pass AA.
- **Utilities** — `container-page`, `surface`, `hairline`, `glass-nav`, `eyebrow`,
  `text-muted`, `no-scrollbar`, plus the `.card-sheen` gradient border.
- **Dark mode** — class-based (`.dark`), resolved before first paint by an inline
  script in `<head>`; the provider mirrors the DOM with `useSyncExternalStore`
  so there is no hydration flicker and no cascading `setState` in effects.

## Interaction notes

- **Card → case study** — `layoutId` pairs (`project-media-*`, `project-title-*`)
  morph the card artwork and title into the overlay. The overlay is a real
  `role="dialog"` with `aria-modal`, Escape-to-close, focus trap, focus restore,
  and scroll lock. Reduced-motion users get a plain crossfade.
- **Deep links** — opening a study pushes `/work/<slug>`. Those URLs are
  statically generated with their own metadata, OpenGraph image and canonical —
  so a shared link previews correctly and works without JavaScript.
- **Navigation** — the header highlights the section in view via
  `IntersectionObserver`; the mobile sheet traps focus and closes on Escape.
- **Timeline** — the rail fills with scroll progress (`useScroll` + `useSpring`),
  and each role expands inline as a disclosure.
- **Testimonials** — auto-advancing carousel that pauses on hover/focus, with
  `aria-live` updates and a manual selector.
- **Contact** — client validation with inline field errors, a `Zod`-validated
  route handler, and honest success/error states.

## Accessibility

- Semantic landmarks, one `h1` per page, ordered headings, skip link.
- All interactive controls are real `<button>`/`<a>` elements with labels;
  filters use `aria-pressed`, carousels use `aria-roledescription`.
- Focus-visible ring is a 2px accent outline with offset, never removed.
- Charts and artwork carry descriptive `alt` text; decorative layers are `aria-hidden`.
- `prefers-reduced-motion` disables scroll reveals, marquees, autoplay and parallax.
- Contrast checked against WCAG 2.2 AA for body and small text in both themes.

## Performance

- Home page is statically prerendered; the only dynamic route is `/api/contact`.
- Fonts are self-hosted woff2 with `font-display: swap` and `preconnect`-free delivery.
- SVGs are served as vectors (`Art` wrapper marks them `unoptimized`); raster
  images added later still go through `next/image` with AVIF/WebP and srcset.
- Above-the-fold artwork uses `priority`; everything else lazy-loads.
- `optimizePackageImports` keeps icon/motion bundles to what is used.

## Environment variables

Copy `.env.example` → `.env.local`. Everything is optional — the site builds and
runs with zero configuration.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com   # canonical + OG URLs
CONTACT_WEBHOOK_URL=                           # forwards enquiries (Slack, Resend, …)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

### Contact pipeline

1. The route handler validates the payload with Zod and returns per-field errors.
2. If Supabase is configured, the enquiry is inserted into `public.portfolio_messages`.
   RLS grants `INSERT` only — the publishable key can never read messages back.
3. If `CONTACT_WEBHOOK_URL` is set, the enquiry is forwarded (Slack, Resend, Make…).
4. If neither is configured, the enquiry is logged server-side and the UI says so
   honestly instead of pretending a delivery happened.
5. If storage is configured but fails, the response asks the visitor to email
   directly rather than claiming success.

Owner reads use the `portfolio_messages_for_owner()` function (SECURITY DEFINER,
gated on the owner email), so the dashboard/service role is the only reader.

The site is deployed on Vercel with the production env vars already set:
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Editing content

Everything a visitor reads comes from two files:

- `src/lib/data/profile.ts` — bio, stats, nav, experience, skills, testimonials.
- `src/lib/data/projects.ts` — the six case studies (cover, gallery, architecture,
  metrics, stack, links).

Types live in `src/lib/types.ts`; adding a field there will surface every place
that needs it.

## Deployment

Push to GitHub and import the repo on Vercel — the framework is auto-detected.
Set `NEXT_PUBLIC_SITE_URL` in the project environment so canonical URLs and the
sitemap point at the production domain.

## Licence

Source is provided for this portfolio. Client names, metrics and testimonials are
representative content and should be replaced with verified details before a
public launch.
