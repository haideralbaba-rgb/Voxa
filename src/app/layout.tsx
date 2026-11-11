import type { Metadata, Viewport } from 'next'
import { themeScript } from '@/lib/theme-script'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { profile } from '@/lib/data/profile'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haideralbaba.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.lede,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    'product engineer',
    'interaction designer',
    'design systems',
    'Next.js developer',
    'portfolio',
    'Karbala',
    'Iraq',
    'MENA',
  ],
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: `${profile.name} — ${profile.role}`,
    description: profile.lede,
    siteName: `${profile.name} Portfolio`,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.role}`,
    description: profile.lede,
    creator: '@haideralbaba',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: '/' },
  category: 'design',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f8' },
    { media: '(prefers-color-scheme: dark)', color: '#08080a' },
  ],
  colorScheme: 'light dark',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  address: { '@type': 'PostalAddress', addressLocality: 'Karbala', addressCountry: 'IQ' },
  sameAs: profile.socials.map((social) => social.href),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
