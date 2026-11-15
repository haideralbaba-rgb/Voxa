'use client'

import Link from 'next/link'
import { ArrowUp, ArrowUpLeft } from 'lucide-react'
import { NAV_LINKS, STUDIO } from '@/lib/voxa-data'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="container-vox pt-16 pb-10 md:pt-24 md:pb-12">
      {/* Top 12-column editorial grid */}
      <div className="grid grid-cols-1 gap-12 border-b border-line pb-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5">
            <span className="live-dot" aria-hidden="true" />
            <span className="text-xs text-ink">{STUDIO.availability}</span>
          </div>
          <p className="max-w-md text-base leading-[2] text-muted">
            {STUDIO.arabicName} — استوديو تصميم مستقل من كربلاء. نعمل مع المؤسسين والعلامات التي
            تؤمن بأن الوضوح والانضباط البصري هما أقصر طريق إلى الذاكرة.
          </p>
          <p className="label mt-6 text-[10px] text-muted">{STUDIO.coordinates}</p>
        </div>

        <div className="md:col-span-3">
          <p className="label mb-5 text-muted">INDEX</p>
          <ul className="space-y-3">
            {NAV_LINKS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="link-swipe inline-flex items-baseline gap-2.5 text-sm text-ink/85 transition-colors hover:text-lime"
                >
                  <span className="label text-[9px] text-muted">{item.code}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 flex flex-col justify-between gap-8">
          <div>
            <p className="label mb-5 text-muted">DIRECT &amp; SOCIAL</p>
            <a
              href={`mailto:${STUDIO.email}`}
              className="latin link-swipe font-display text-lg text-ink hover:text-lime"
            >
              {STUDIO.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5">
              {STUDIO.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="latin inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-ink"
                >
                  <span>{social.label}</span>
                  <ArrowUpLeft size={12} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line pt-5">
            <div>
              <p className="text-xs text-ink">{STUDIO.city}</p>
              <p className="label mt-0.5 text-[10px] text-muted">{STUDIO.cityLatin} · {STUDIO.timezoneLabel}</p>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="العودة إلى أعلى الصفحة"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-lime hover:bg-lime hover:text-[#101011]"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Monumental display wordmark */}
      <div className="relative overflow-hidden border-b border-line py-8 md:py-10">
        <div
          aria-hidden="true"
          className="latin flex select-none items-baseline justify-between font-display text-[clamp(4.4rem,18vw,15.5rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-ink"
        >
          <span>VOXA</span>
          <span className="text-lime">.</span>
        </div>
      </div>

      {/* Bottom colophon */}
      <div className="mt-6 flex flex-col items-start justify-between gap-3 text-muted sm:flex-row sm:items-center">
        <p className="text-xs">© ٢٠٢٦ {STUDIO.arabicName} — جميع الحقوق محفوظة.</p>
        <p className="label text-[10px]">VOXA — EDITORIAL PAPER SYSTEM · KARBALA, IRAQ</p>
      </div>
    </footer>
  )
}
