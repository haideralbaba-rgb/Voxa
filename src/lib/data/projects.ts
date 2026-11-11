import type { Project } from '@/lib/types'

/**
 * Selected work. Each entry is a complete case study: cover, gallery,
 * architecture notes, measurable outcomes and links.
 *
 * Aperture, Atlas and Halo are shipped client engagements.
 * Orbit, Saffron and Manuscript are concept briefs, labelled as such.
 */
export const projects: Project[] = [
  {
    id: 'aperture',
    slug: 'aperture-studio',
    title: 'Aperture Studio',
    tagline: 'A photography house rebuilt around one idea: the patient gaze.',
    summary:
      'Aperture had a world-class archive and a website that looked like every other portfolio. We rebuilt the identity, the gallery engine and the booking flow around a single editorial grid — one that treats a 1994 darkroom print with the same respect as a 2026 campaign.',
    year: 2026,
    client: 'Aperture Studio',
    role: 'Design lead · Front-end',
    category: 'Brand',
    featured: true,
    accent: '#c9663f',
    accentForeground: '#fdf1ea',
    cover: {
      id: 'aperture-cover',
      src: '/images/projects/aperture-cover.svg',
      alt: 'Cover artwork for Aperture Studio: warm sienna rings around a glowing aperture mark',
      caption: 'Identity system — mark, palette and type in situ',
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        id: 'aperture-01',
        src: '/images/projects/aperture-01.svg',
        alt: 'Editorial type specimen spread in cream and sienna',
        caption: 'Type specimen — Instrument Serif paired with Inter Tight',
        width: 1200,
        height: 1500,
        frame: 'none',
      },
      {
        id: 'aperture-02',
        src: '/images/projects/aperture-02.svg',
        alt: 'Gallery index screen with a responsive card grid',
        caption: 'Archive index — 1,400 prints, one grid that never breaks',
        width: 1600,
        height: 1000,
        frame: 'browser',
      },
      {
        id: 'aperture-03',
        src: '/images/projects/aperture-03.svg',
        alt: 'Mobile booking flow screen on a dark phone frame',
        caption: 'Private viewing booking — three taps from Instagram ad to deposit',
        width: 900,
        height: 1400,
        frame: 'phone',
      },
    ],
    architecture: [
      {
        title: 'The problem',
        body: '4.2MB of uncompressed JPEGs, a Squarespace theme fighting the photography, and a booking flow that lived in a WhatsApp group. The work looked expensive; the experience felt cheap.',
      },
      {
        title: 'The approach',
        body: 'A typography-first identity with a single accent, then a gallery engine built on next/image with a fixed art-directed ratio per collection. Images stream in with a blur placeholder and never shift layout.',
        bullets: [
          'Edge-cached image transformation pipeline',
          'Art-directed crops per breakpoint',
          'Keyboard-first lightbox with focus trapping',
        ],
      },
      {
        title: 'The result',
        body: 'The site now loads its largest contentful paint in 1.1s on a 4G connection in Karbala. Booking enquiries went from roughly six a month to twenty-two, and the studio stopped paying a retainer for a theme it could not edit.',
      },
    ],
    metrics: [
      { value: '1.1s', label: 'LCP', detail: 'Down from 5.8s on a mid-tier Android device.' },
      { value: '+266%', label: 'Booking enquiries', detail: 'Six to twenty-two per month, same ad spend.' },
      { value: '98', label: 'Lighthouse', detail: 'Performance, accessibility, best practices and SEO.' },
      { value: '4.2MB', label: 'Payload saved', detail: 'Per first view on mobile.' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'motion/react', 'Sanity', 'Vercel'],
    links: [
      { kind: 'live', label: 'Live site', href: 'https://example.com/aperture' },
      { kind: 'case-study', label: 'Read the process', href: '/#contact' },
    ],
    awards: ['CSS Design Awards — Site of the Day (nominee)'],
  },
  {
    id: 'orbit',
    slug: 'orbit-analytics',
    title: 'Orbit Analytics',
    tagline: 'A real-time product analytics surface that survives 40k data points.',
    summary:
      'Orbit asked for “a dashboard our customers would screenshot”. The hard part was not the charts — it was keeping 60fps while streaming 40,000 live events a minute into a React tree that never unmounts.',
    year: 2026,
    client: 'Concept brief',
    role: 'Product design · Front-end',
    category: 'Product',
    featured: true,
    accent: '#4c7d92',
    accentForeground: '#eef7fa',
    cover: {
      id: 'orbit-cover',
      src: '/images/projects/orbit-cover.svg',
      alt: 'Orbit Analytics dashboard with KPI cards, a session chart and retention matrix',
      caption: 'Overview — the screen customers screenshot',
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        id: 'orbit-01',
        src: '/images/projects/orbit-01.svg',
        alt: 'Orbit marketing hero with concentric signal rings',
        caption: 'Launch site — a single idea, held still',
        width: 1600,
        height: 1000,
        frame: 'browser',
      },
      {
        id: 'orbit-02',
        src: '/images/projects/orbit-02.svg',
        alt: 'Composable module library shown as a card grid',
        caption: 'Module library — 64 blocks composed from 9 primitives',
        width: 1600,
        height: 1000,
        frame: 'none',
      },
      {
        id: 'orbit-03',
        src: '/images/projects/orbit-03.svg',
        alt: 'Retention cohort matrix in a light dashboard theme',
        caption: 'Cohort retention — canvas rendering under a React shell',
        width: 1600,
        height: 1000,
        frame: 'browser',
      },
    ],
    architecture: [
      {
        title: 'Rendering strategy',
        body: 'Charts render to an OffscreenCanvas and hand a bitmap to the compositor, so React only reconciles the controls. Live deltas are batched into a single animation frame — no state update per event.',
        bullets: [
          'WebSocket → typed ring buffer → rAF flush',
          'Server components for the shell, client islands for the tiles',
          'Virtualised tables with sticky column groups',
        ],
      },
      {
        title: 'Design system',
        body: 'Nine primitives (Surface, Stack, Metric, Legend, Axis, Sparkline, Matrix, Toolbar, Sheet) compose every view. Tokens drive light and dark from one source, and each module ships with its own loading skeleton.',
      },
      {
        title: 'Accessibility',
        body: 'Every chart exposes a visually hidden data table and an aria-live summary. Colour is never the only channel: series carry stroke patterns and direct labels.',
      },
    ],
    metrics: [
      { value: '60fps', label: 'Sustained', detail: 'While streaming 40k events per minute.' },
      { value: '−71%', label: 'Bundle size', detail: 'Replacing three chart libraries with one canvas layer.' },
      { value: 'AA', label: 'WCAG 2.2', detail: 'All eight core views audited, zero criticals.' },
      { value: '9', label: 'Primitives', detail: 'Composing 64 modules and 8 screens.' },
    ],
    stack: ['Next.js', 'TypeScript', 'Canvas API', 'motion/react', 'Postgres', 'Supabase Realtime'],
    links: [
      { kind: 'live', label: 'Prototype', href: 'https://example.com/orbit' },
      { kind: 'github', label: 'Source', href: 'https://github.com/haideralbaba-rgb' },
    ],
  },
  {
    id: 'saffron',
    slug: 'saffron-commerce',
    title: 'Saffron & Co',
    tagline: 'A headless spice house where checkout takes eleven seconds.',
    summary:
      'A family spice importer moving a forty-year-old wholesale business to direct-to-consumer. Arabic-first, RTL-native, and fast enough to sell on a 3G connection in a Baghdad taxi.',
    year: 2025,
    client: 'Concept brief',
    role: 'Commerce design · Front-end',
    category: 'Commerce',
    featured: true,
    accent: '#c48a2c',
    accentForeground: '#fdf6e6',
    cover: {
      id: 'saffron-cover',
      src: '/images/projects/saffron-cover.svg',
      alt: 'Saffron and Co storefront hero in amber and deep brown',
      caption: 'Storefront — bilingual from the first line of code',
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        id: 'saffron-01',
        src: '/images/projects/saffron-01.svg',
        alt: 'Product listing grid with six product cards',
        caption: 'Collection grid — filters that persist in the URL',
        width: 1600,
        height: 1000,
        frame: 'browser',
      },
      {
        id: 'saffron-02',
        src: '/images/projects/saffron-02.svg',
        alt: 'Merchant operations dashboard in a light theme',
        caption: 'Merchant ops — one screen for stock, orders and margin',
        width: 1600,
        height: 1000,
        frame: 'browser',
      },
      {
        id: 'saffron-03',
        src: '/images/projects/saffron-03.svg',
        alt: 'Mobile checkout screen with payment methods',
        caption: 'Checkout — three steps, Apple Pay first',
        width: 900,
        height: 1400,
        frame: 'phone',
      },
    ],
    architecture: [
      {
        title: 'Bilingual, not translated',
        body: 'Every layout is written with logical properties from day one, and the type scale is tuned per script — Arabic needs looser leading and a wider measure, so it gets its own token set rather than a mirrored clone.',
        bullets: [
          'CSS logical properties throughout',
          'Per-locale type scale and measure',
          'Locale-aware number and currency formatting',
        ],
      },
      {
        title: 'Checkout',
        body: 'A three-step flow with optimistic cart writes and a server-side price authority. Guest checkout is the default; account creation is offered after purchase, where conversion is highest.',
      },
      {
        title: 'Merchant tooling',
        body: 'A single operations screen replaced four spreadsheets: stock levels, margin per SKU, and order status with webhook-driven updates.',
      },
    ],
    metrics: [
      { value: '11s', label: 'Time to checkout', detail: 'Median, from product page to payment sheet.' },
      { value: '+23%', label: 'Conversion', detail: 'Against the previous Shopify theme.' },
      { value: '3G', label: 'Field budget', detail: 'Full purchase flow under 180KB of JS.' },
      { value: '100%', label: 'RTL parity', detail: 'Every screen verified in Arabic and English.' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Postgres', 'Vercel Edge'],
    links: [
      { kind: 'live', label: 'Storefront', href: 'https://example.com/saffron' },
      { kind: 'github', label: 'Source', href: 'https://github.com/haideralbaba-rgb' },
    ],
  },
  {
    id: 'atlas',
    slug: 'atlas-design-system',
    title: 'Atlas Design System',
    tagline: '240 screens, one language, zero design debt left behind.',
    summary:
      'A 60-person product org had four front-end styles and no shared vocabulary. Atlas is the system that replaced them: tokens, primitives, documentation and the migration path that made adoption stick.',
    year: 2024,
    client: 'Northwind Labs',
    role: 'Design systems lead',
    category: 'Product',
    featured: true,
    accent: '#6f8f5e',
    accentForeground: '#f0f7ea',
    cover: {
      id: 'atlas-cover',
      src: '/images/projects/atlas-cover.svg',
      alt: 'Atlas design system components arranged in a dark grid',
      caption: 'Atlas — 64 components, 9 primitives, one source of truth',
      width: 1600,
      height: 1000,
    },
    gallery: [
      {
        id: 'atlas-01',
        src: '/images/projects/atlas-01.svg',
        alt: 'Documentation portal dashboard with adoption metrics',
        caption: 'Docs — token reference generated from source',
        width: 1600,
        height: 1000,
        frame: 'browser',
      },
      {
        id: 'atlas-02',
        src: '/images/projects/atlas-02.svg',
        alt: 'Printed foundations specimen in cream and moss green',
        caption: 'Foundations — twelve rules the team can recite',
        width: 1200,
        height: 1500,
        frame: 'none',
      },
      {
        id: 'atlas-03',
        src: '/images/projects/atlas-03.svg',
        alt: 'Token pipeline hero artwork with concentric rings',
        caption: 'Token pipeline — Figma variables to CSS custom properties',
        width: 1600,
        height: 1000,
        frame: 'none',
      },
    ],
    architecture: [
      {
        title: 'Tokens first',
        body: 'Figma variables are the single source. A build step exports them to CSS custom properties and Tailwind theme values, so a colour change is one commit — not a design review, a ticket and a hotfix.',
        bullets: [
          'Figma Variables → JSON → CSS + Tailwind + TS types',
          'Semantic layers: primitive, alias, component',
          'Dark mode derived, never hand-maintained',
        ],
      },
      {
        title: 'Primitives over pages',
        body: 'Nine primitives compose 64 components which compose every screen. Teams assemble rather than invent, and the diff review is about intent, not spacing.',
      },
      {
        title: 'Making it stick',
        body: 'Documentation was treated as a product: searchable, versioned, with copy-paste snippets and a changelog. Adoption went from 12% in month one to 94% in month seven, with 38% fewer UI defects along the way.',
      },
    ],
    metrics: [
      { value: '94%', label: 'Adoption', detail: 'Across 60 engineers in seven months.' },
      { value: '−38%', label: 'UI defects', detail: 'Measured against the previous quarter baseline.' },
      { value: '64', label: 'Components', detail: 'From 9 primitives, all WCAG AA verified.' },
      { value: '1 commit', label: 'To rebrand', detail: 'Token change propagated across every surface.' },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook', 'Figma Variables', 'Playwright'],
    links: [
      { kind: 'case-study', label: 'System overview', href: '/#contact' },
      { kind: 'github', label: 'Source', href: 'https://github.com/haideralbaba-rgb' },
    ],
    awards: ['Internal engineering award — Impact (2024)'],
  },
  {
    id: 'manuscript',
    slug: 'manuscript-quarterly',
    title: 'Manuscript Quarterly',
    tagline: 'A slow-tech journal that reads beautifully at 2am and on 2G.',
    summary:
      'An editorial platform for longform writing about technology and attention. Offline-first reading, zero layout shift, and a reading mode that adjusts measure and contrast to the reader — not the designer.',
    year: 2025,
    client: 'Manuscript',
    role: 'Design · Front-end',
    category: 'Editorial',
    featured: false,
    accent: '#8c6fa8',
    accentForeground: '#f5f0fa',
    cover: {
      id: 'manuscript-cover',
      src: '/images/projects/manuscript-cover.svg',
      alt: 'Manuscript Quarterly issue cover with serif typography on cream',
      caption: 'Issue 04 — cover system that scales to twelve issues a year',
      width: 1200,
      height: 1500,
    },
    gallery: [
      {
        id: 'manuscript-01',
        src: '/images/projects/manuscript-01.svg',
        alt: 'Manuscript cover story hero in violet and plum',
        caption: 'Cover story — full-bleed art, quiet typography',
        width: 1600,
        height: 1000,
        frame: 'none',
      },
      {
        id: 'manuscript-02',
        src: '/images/projects/manuscript-02.svg',
        alt: 'Campaign poster reading Slow Technology in italic serif',
        caption: 'Campaign — out-of-home poster series',
        width: 1400,
        height: 1000,
        frame: 'none',
      },
      {
        id: 'manuscript-03',
        src: '/images/projects/manuscript-03.svg',
        alt: 'Mobile reading app screen with progress and typography controls',
        caption: 'Reader — offline-first PWA with typography controls',
        width: 900,
        height: 1400,
        frame: 'phone',
      },
    ],
    architecture: [
      {
        title: 'Reading is the product',
        body: 'Measure tops out at 68 characters, leading scales with viewport, and the type scale is fluid rather than stepped. Every article ships pre-rendered with its own critical CSS — there is no theme flash and no reflow.',
      },
      {
        title: 'Offline first',
        body: 'A service worker caches the last twenty articles and their images on read. The reader app works in a lift, on a train, in a basement — which is exactly when people read longform.',
        bullets: ['Workbox precache with stale-while-revalidate', 'Typed offline queue for bookmarks', 'Installable PWA, no store review'],
      },
      {
        title: 'Accessibility',
        body: 'Full keyboard support, prefers-reduced-motion respected everywhere, and a contrast toggle that survives a page reload. Audited with real screen readers, not just automated checks.',
      },
    ],
    metrics: [
      { value: '7m 12s', label: 'Avg. read time', detail: 'Nearly double the editorial benchmark.' },
      { value: '100', label: 'a11y score', detail: 'Lighthouse, plus a manual VoiceOver pass.' },
      { value: '0', label: 'CLS', detail: 'Across every article template.' },
      { value: '20', label: 'Offline articles', detail: 'Cached per reader, images included.' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'Workbox', 'Vercel'],
    links: [{ kind: 'live', label: 'Read issue 04', href: 'https://example.com/manuscript' }],
  },
  {
    id: 'halo',
    slug: 'halo-festival',
    title: 'Halo Film Festival',
    tagline: 'A motion identity for nine nights of light.',
    summary:
      'Halo needed a brand that could live inside a 6-second pre-roll, a 3-metre poster and a ticketing site without losing anything in translation. The answer was a single aperture that opens on scroll, on stage and on paper.',
    year: 2025,
    client: 'Halo Festival',
    role: 'Art direction · Motion',
    category: 'Motion',
    featured: true,
    accent: '#b0453f',
    accentForeground: '#fbeceb',
    cover: {
      id: 'halo-cover',
      src: '/images/projects/halo-cover.svg',
      alt: 'Halo festival poster artwork with concentric light rings in deep red',
      caption: 'Key art — one aperture, nine expressions',
      width: 1400,
      height: 1000,
    },
    gallery: [
      {
        id: 'halo-01',
        src: '/images/projects/halo-01.svg',
        alt: 'Halo festival website hero with warm halo rings',
        caption: 'Festival site — ticket flow in three clicks',
        width: 1600,
        height: 1000,
        frame: 'browser',
      },
      {
        id: 'halo-02',
        src: '/images/projects/halo-02.svg',
        alt: 'Printed programme spread in warm cream tones',
        caption: 'Programme book — eighty pages, printed and digital',
        width: 1200,
        height: 1500,
        frame: 'none',
      },
      {
        id: 'halo-03',
        src: '/images/projects/halo-03.svg',
        alt: 'Schedule interface cards in deep red',
        caption: 'Schedule UI — filter by venue, night or language',
        width: 1600,
        height: 1000,
        frame: 'browser',
      },
    ],
    architecture: [
      {
        title: 'One mark, many speeds',
        body: 'The aperture is drawn once as an SVG and driven by a single easing token. At 6 seconds it breathes slowly; at 300ms in the UI it snaps. Same geometry, different clock.',
        bullets: ['Shared SVG geometry across print and web', 'Motion tokens mapped to brand tempo', 'Reduced-motion fallbacks at every step'],
      },
      {
        title: 'Ticketing',
        body: 'A seat-map-free flow: pick a night, pick a price tier, pay. Queue positions are server-rendered so a sold-out screening never shows a dead button.',
      },
      {
        title: 'Print and screen parity',
        body: 'Ink limits were decided alongside hex values. The red that reads as ember on a poster is the same red that clears 4.5:1 on the web — verified, not eyeballed.',
      },
    ],
    metrics: [
      { value: '41', label: 'Films programmed', detail: 'Across nine nights and three venues.' },
      { value: '94%', label: 'Tickets sold', detail: 'Online, up from 61% the previous year.' },
      { value: '2.4x', label: 'Pre-roll recall', detail: 'In post-festival audience survey.' },
      { value: '6s', label: 'Identity in motion', detail: 'One aperture, nine festival cuts.' },
    ],
    stack: ['Next.js', 'TypeScript', 'motion/react', 'GSAP', 'Tailwind CSS', 'Figma'],
    links: [
      { kind: 'live', label: 'Festival site', href: 'https://example.com/halo' },
      { kind: 'video', label: 'Motion reel', href: 'https://example.com/halo/reel' },
    ],
    awards: ['MENA Design Awards — Motion Identity (shortlist)'],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAdjacentProjects(slug: string): { previous: Project; next: Project } {
  const index = projects.findIndex((project) => project.slug === slug)
  const previous = projects[(index - 1 + projects.length) % projects.length]!
  const next = projects[(index + 1) % projects.length]!
  return { previous, next }
}
