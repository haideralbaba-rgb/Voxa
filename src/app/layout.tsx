import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { MotionProvider } from '@/components/providers/MotionProvider'
import { SoundProvider } from '@/components/providers/SoundProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'VOXA — الفكرة تصير أثراً',
    template: '%s — VOXA',
  },
  description:
    'فوكسـا فريق إبداعي ناشئ من كربلاء يصنع هويات وتجارب بصرية بأفكار واضحة وعناية بالتفاصيل.',
  applicationName: 'VOXA',
  authors: [{ name: 'VOXA' }],
  creator: 'VOXA',
  keywords: ['فوكسـا', 'VOXA', 'تصميم', 'هوية بصرية', 'تصميم جرافيك', 'استوديو إبداعي', 'كربلاء'],
  openGraph: {
    type: 'website',
    title: 'VOXA — الفكرة تصير أثراً',
    description: 'فريق إبداعي ناشئ للأفكار التي تستحق أن تُرى.',
    siteName: 'VOXA',
    locale: 'ar_IQ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VOXA — الفكرة تصير أثراً',
    description: 'فريق إبداعي ناشئ للأفكار التي تستحق أن تُرى.',
  },
  robots: {
    index: false,
    follow: false,
  },
  category: 'design',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090909',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <MotionProvider>
            <SoundProvider>{children}</SoundProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
