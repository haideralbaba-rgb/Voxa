import type { ExperienceItem, NavItem, Profile, SkillGroup, Testimonial } from '@/lib/types'

/**
 * Single source of truth for personal content.
 * Swap these values (or hydrate from Supabase) without touching a component.
 */
export const profile: Profile = {
  name: 'Haider Albaba',
  shortName: 'Haider',
  pronouns: 'he/him',
  role: 'Product Engineer & Interaction Designer',
  location: 'Karbala, Iraq',
  timezone: 'GMT+3',
  available: true,
  availabilityLabel: 'Available for select projects — Q1 2027',
  email: 'hello@haideralbaba.com',
  phone: '+964 771 000 0000',
  resumeHref: '/resume.pdf',
  headline: 'I design and build digital products people actually',
  headlineAccent: 'remember.',
  lede: 'Interfaces, identities and storefronts for brands who refuse to look like everyone else. Ten years of craft across product engineering, motion and design systems — shipped for teams in MENA and Europe.',
  bio: [
    'I grew up taking things apart to see how they worked, and I never really stopped. Today I split my time between product engineering and interaction design: writing the TypeScript, obsessing over the easing curve, and sitting in the room when the strategy gets decided.',
    'Most of my work lives at the seam between design and engineering — design systems that survive a real roadmap, marketing sites that load in under a second, and motion that explains rather than decorates.',
  ],
  avatar: {
    src: '/images/avatar.svg',
    alt: 'Portrait illustration of Haider Albaba',
    width: 640,
    height: 640,
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/haideralbaba-rgb', handle: '@haideralbaba-rgb' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/haideralbaba', handle: 'in/haideralbaba' },
    { label: 'X', href: 'https://x.com/haideralbaba', handle: '@haideralbaba' },
    { label: 'Dribbble', href: 'https://dribbble.com/haideralbaba', handle: 'haideralbaba' },
  ],
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Storyboard', href: '#story' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
  stats: [
    { value: '10+', label: 'Years shipping', detail: 'Product, brand and commerce work since 2016.' },
    { value: '40+', label: 'Launches', detail: 'Web apps, storefronts and campaign sites.' },
    { value: '2.1s', label: 'Median LCP', detail: 'Across the sites I have shipped in the last two years.' },
    { value: '9', label: 'Design systems', detail: 'Built, documented and handed over to in-house teams.' },
  ],
  clients: ['Aramco', 'Zain', 'Careem', 'Noon', 'Talabat', 'Salla', 'Misk', 'Riyadh Air'],
  principles: [
    {
      title: 'Craft is the strategy',
      body: 'A beautiful product that loads instantly is a business decision, not a decoration. Performance and taste compound.',
    },
    {
      title: 'Motion with intent',
      body: 'Every transition should answer a question the user was already asking. If it does not, it gets cut.',
    },
    {
      title: 'Systems over screens',
      body: 'Ship tokens, primitives and documentation — so the team keeps moving after I hand over the keys.',
    },
  ],
}

export const navItems: NavItem[] = profile.nav

export const experience: ExperienceItem[] = [
  {
    id: 'exp-voxa',
    role: 'Founder & Principal Engineer',
    company: 'VOXA Studio',
    companyUrl: 'https://voxa.studio',
    period: '2023 — Present',
    start: '2023-02',
    end: null,
    location: 'Karbala, IQ · Remote',
    employment: 'Founder',
    summary:
      'A two-person studio building brand and product surfaces for MENA scale-ups. I own strategy through deployment: positioning, design system, front end.',
    highlights: [
      'Shipped 17 client launches with a median Lighthouse performance score of 97.',
      'Built a shared Next.js + Tailwind starter that cut project kickoff from two weeks to three days.',
      'Grew retained revenue to a stable three-client retainer book, 60% of it inbound.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'motion/react', 'Supabase'],
  },
  {
    id: 'exp-northwind',
    role: 'Senior Product Engineer',
    company: 'Northwind Labs',
    companyUrl: 'https://example.com',
    period: '2021 — 2023',
    start: '2021-04',
    end: '2023-01',
    location: 'Dubai, AE · Hybrid',
    employment: 'Full-time',
    summary:
      'Led the design-systems guild for a 60-person product org serving 2M monthly users across four surfaces.',
    highlights: [
      'Migrated 240 screens from bespoke CSS to a token-driven system, cutting UI defects by 38%.',
      'Reduced the marketing site TTI from 4.8s to 1.2s and lifted trial signups by 22%.',
      'Mentored five engineers; introduced an accessibility budget enforced in CI.',
    ],
    stack: ['React', 'TypeScript', 'Storybook', 'Playwright', 'Figma Tokens'],
  },
  {
    id: 'exp-meridian',
    role: 'Frontend Engineer',
    company: 'Meridian Commerce',
    companyUrl: 'https://example.com',
    period: '2019 — 2021',
    start: '2019-03',
    end: '2021-03',
    location: 'Amman, JO · On-site',
    employment: 'Full-time',
    summary:
      'Owned the storefront experience for a headless commerce platform processing $14M GMV a year.',
    highlights: [
      'Rebuilt checkout as a set of composable steps; cart abandonment dropped 19%.',
      'Introduced visual regression testing across 120 components with zero-downtime rollout.',
    ],
    stack: ['Shopify Hydrogen', 'React', 'Node.js', 'GraphQL', 'Jest'],
  },
  {
    id: 'exp-independent',
    role: 'Freelance Designer & Developer',
    company: 'Independent',
    period: '2016 — 2019',
    start: '2016-01',
    end: '2019-02',
    location: 'Karbala, IQ',
    employment: 'Freelance',
    summary:
      'Brand identities, campaign microsites and editorials for regional agencies — the years I learned to finish things.',
    highlights: [
      'Delivered 30+ brand and web projects solo, from naming workshop to DNS.',
      'Built a repeatable art-direction process still used in the studio today.',
    ],
    stack: ['Figma', 'Adobe CC', 'Webflow', 'JavaScript', 'SCSS'],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces that feel instant and behave predictably.',
    skills: [
      { name: 'TypeScript', level: 'Expert', years: 8, note: 'Strict mode by default' },
      { name: 'React / Next.js', level: 'Expert', years: 7, note: 'App Router, RSC, streaming' },
      { name: 'Tailwind CSS', level: 'Expert', years: 6, note: 'Token-driven design systems' },
      { name: 'motion/react', level: 'Advanced', years: 4, note: 'Layout & gesture choreography' },
      { name: 'Accessibility', level: 'Advanced', years: 6, note: 'WCAG 2.2 AA audits' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'The unglamorous plumbing that keeps the pretty parts alive.',
    skills: [
      { name: 'Node.js', level: 'Advanced', years: 7, note: 'Route handlers, edge runtimes' },
      { name: 'PostgreSQL', level: 'Advanced', years: 5, note: 'Schema design, RLS policies' },
      { name: 'Supabase', level: 'Advanced', years: 4, note: 'Auth, storage, row-level security' },
      { name: 'tRPC / GraphQL', level: 'Proficient', years: 4, note: 'End-to-end type safety' },
      { name: 'Prisma / Drizzle', level: 'Proficient', years: 3 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platform',
    blurb: 'Shipping, measuring, and keeping it stable at 3am.',
    skills: [
      { name: 'Git & CI/CD', level: 'Expert', years: 9, note: 'GitHub Actions, trunk-based' },
      { name: 'Vercel / Edge', level: 'Advanced', years: 5 },
      { name: 'Playwright / Vitest', level: 'Advanced', years: 4 },
      { name: 'Core Web Vitals', level: 'Advanced', years: 5, note: 'Field-data driven' },
      { name: 'Supabase CLI / pgTAP', level: 'Proficient', years: 2 },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    blurb: 'Where the taste gets decided before a line of code.',
    skills: [
      { name: 'Figma', level: 'Expert', years: 9, note: 'Variables, auto-layout, libraries' },
      { name: 'Design Systems', level: 'Expert', years: 6 },
      { name: 'Typography', level: 'Advanced', years: 8, note: 'Editorial + UI scales' },
      { name: 'Art Direction', level: 'Advanced', years: 7 },
      { name: 'Prototyping', level: 'Advanced', years: 6, note: 'Native-feeling interaction specs' },
    ],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Haider is the rare engineer who will argue about a 12px kerning problem and then ship the whole design system in the same week. Our rebrand landed six weeks early.',
    name: 'Layla Haddad',
    title: 'VP Product',
    company: 'Northwind Labs',
    initials: 'LH',
    accent: '#c9663f',
  },
  {
    id: 't2',
    quote:
      'He rebuilt our storefront in eight weeks and the conversion rate went up 23%. The handover documentation was better than most teams’ internal wikis.',
    name: 'Omar Al-Sayegh',
    title: 'Head of Growth',
    company: 'Meridian Commerce',
    initials: 'OS',
    accent: '#4c7d92',
  },
  {
    id: 't3',
    quote:
      'We hired a studio and got a partner. Haider asked the uncomfortable strategy questions nobody on our side had the bandwidth to ask, then solved them.',
    name: 'Noor Kamal',
    title: 'Founder',
    company: 'Aperture Studio',
    initials: 'NK',
    accent: '#8c6fa8',
  },
  {
    id: 't4',
    quote:
      'Punctual, opinionated in the best way, and genuinely funny in a review call at 11pm. The motion work is still the thing clients mention first.',
    name: 'Daniel Reyes',
    title: 'Creative Director',
    company: 'Kenning & Co',
    initials: 'DR',
    accent: '#6f8f5e',
  },
]

export const budgets = ['< $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Retainer'] as const
