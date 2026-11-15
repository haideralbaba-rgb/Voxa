import type { Metadata, Viewport } from "next";
import { ScrollProgress } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voxa.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VOXA — استوديو تصميم وهوية بصرية",
    template: "%s — VOXA",
  },
  description:
    "فوكسـا استوديو تصميم مستقل من كربلاء، يبني الهويات البصرية والمواقع التحريرية والتجارب الرقمية بوضوح وحرفة تدوم.",
  applicationName: "VOXA",
  authors: [{ name: "VOXA" }],
  creator: "VOXA",
  keywords: [
    "VOXA",
    "فوكسـا",
    "استوديو تصميم",
    "هوية بصرية",
    "تصميم مواقع",
    "توجيه فني",
    "كربلاء",
    "العراق",
  ],
  openGraph: {
    type: "website",
    title: "VOXA — استوديو تصميم وهوية بصرية",
    description:
      "فوكسـا استوديو تصميم مستقل من كربلاء، يصوغ الهويات البصرية والمواقع التحريرية والتجارب الرقمية.",
    siteName: "VOXA",
    locale: "ar_IQ",
    images: [
      {
        url: "/images/work/identity.jpg",
        width: 1024,
        height: 1536,
        alt: "VOXA Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VOXA — استوديو تصميم وهوية بصرية",
    description:
      "استوديو تصميم مستقل من كربلاء للهويات البصرية والمطبوعات والتجارب الرقمية.",
    images: ["/images/work/identity.jpg"],
  },
  robots: { index: true, follow: true },
  category: "design",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#181917",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/alexandria-arabic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/plex-arabic-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-dvh antialiased">
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-xs focus:text-paper"
          >
            انتقل إلى المحتوى الرئيسي
          </a>
          <ScrollProgress />
          <Header />
          <main id="main" className="relative">
            {children}
          </main>
          <div className="surface-ink border-t border-line">
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
