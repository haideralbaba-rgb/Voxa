'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/components/providers/LocaleProvider'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/data/profile'
import { profileAr } from '@/lib/i18n/content'

function useLocalTime(timeZoneOffsetHours: number) {
  const [time, setTime] = useState<string>('')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const utc = now.getTime() + now.getTimezoneOffset() * 60_000
      const local = new Date(utc + timeZoneOffsetHours * 3_600_000)
      setTime(
        local.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      )
    }
    tick()
    const timer = window.setInterval(tick, 30_000)
    return () => window.clearInterval(timer)
  }, [timeZoneOffsetHours])
  return time
}

export function SiteFooter() {
  const { t, locale } = useLocale()
  const navItems = t.nav
  const time = useLocalTime(3)
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-[var(--hairline)] bg-[var(--bg-elevated)]/40">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/#top" className="inline-flex items-center gap-2.5" aria-label={t.backToTop}>
              <span className="grid size-8 place-items-center rounded-full bg-[var(--fg)] font-mono text-[12px] font-semibold text-[var(--bg)]">
                HA
              </span>
              <span className="text-[15px] font-semibold tracking-[-0.02em]">
                {profile.shortName}
                <span className="text-muted">.studio</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[13px] leading-[1.7] text-muted">
              {locale === 'ar' ? profileAr.role : profile.role} —{' '}
              {locale === 'ar' ? profileAr.location : profile.location}.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
              <span>{t.footer.localTime}</span>
              <span className="text-[var(--fg)]/70">{time || '—:—'}</span>
              <span>{profile.timezone}</span>
            </div>
          </div>

          <nav aria-label={t.footer.sections} className="flex flex-col gap-2.5">
            <h2 className="eyebrow mb-1">{t.footer.sections}</h2>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                className="w-fit text-[13px] text-[var(--fg)]/62 transition-colors hover:text-[var(--fg)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <h2 className="eyebrow mb-1">{t.footer.elsewhere}</h2>
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-1 text-[13px] text-[var(--fg)]/62 transition-colors hover:text-[var(--fg)]"
              >
                {social.label}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                  aria-hidden
                />
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 w-fit text-[13px] font-medium text-accent transition-opacity hover:opacity-80"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-[var(--hairline)] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
            © {year} {profile.name} · {t.footer.builtWith}
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted sm:inline">
              {t.footer.designedBy}
            </span>
            <Link
              href="/#top"
              className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--hairline)] px-3.5 text-[12px] font-medium text-[var(--fg)]/70 transition-colors hover:border-[var(--hairline-strong)] hover:text-[var(--fg)]"
            >
              {t.top}
              <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
