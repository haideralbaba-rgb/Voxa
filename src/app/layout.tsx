import type { Metadata, Viewport } from 'next'
import { themeScript } from '@/lib/theme-script'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { SoundProvider } from '@/components/providers/SoundProvider'
import { CanvasBackdrop } from '@/components/visual/CanvasBackdrop'
import { LocaleProvider } from '@/components/providers/LocaleProvider'
import { profile } from '@/lib/data/profile'
import { profileAr } from '@/lib/i18n/content'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://haideralbaba.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Arabic is the primary document language, so the default metadata is
  // Arabic and the English pair is emitted as alternates.
  title: {
    default: `${profile.name} — ${profileAr.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profileAr.availabilityLabel,
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
    title: `${profile.name} — ${profileAr.role}`,
    description: profileAr.availabilityLabel,
    siteName: `${profile.name} Portfolio`,
    locale: 'ar_IQ',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profileAr.role}`,
    description: profileAr.availabilityLabel,
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
  jobTitle: profileAr.role,
  inLanguage: ['ar', 'en'],
  email: `mailto:${profile.email}`,
  url: siteUrl,
  address: { '@type': 'PostalAddress', addressLocality: 'Karbala', addressCountry: 'IQ' },
  sameAs: profile.socials.map((social) => social.href),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Arabic is the primary language; LocaleProvider flips lang/dir on check.
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Locale must be applied before first paint, or Arabic copy would
            flash inside a left-aligned box for a frame. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('voxa:locale')==='en'?'en':'ar';var r=document.documentElement;r.lang=l;r.dir=l==='ar'?'rtl':'ltr';r.dataset.locale=l;}catch(e){}})();`,
          }}
        />
        {/* hreflang: both languages are the same URL, the preference is local. */}
        <link rel="alternate" hrefLang="ar" href={siteUrl + '/'} />
        <link rel="alternate" hrefLang="en" href={siteUrl + '/'} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl + '/'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <CanvasBackdrop />
        <div className="grain-overlay" aria-hidden />
        <ThemeProvider>
          <LocaleProvider>
            <MotionProvider>
              <SoundProvider>{children}</SoundProvider>
            </MotionProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
