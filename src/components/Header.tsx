'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpLeft, Menu, Moon, Sun, X } from 'lucide-react'
import { NAV_LINKS, STUDIO } from '@/lib/voxa-data'

function formatKarbalaTime() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: STUDIO.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
  } catch {
    return ''
  }
}

function subscribeClock(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000)
  return () => window.clearInterval(id)
}

function getServerEmptyString() {
  return ''
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains('dark')
}

function getServerFalse() {
  return false
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [scrollActiveId, setScrollActiveId] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)

  const karbalaTime = useSyncExternalStore(
    subscribeClock,
    formatKarbalaTime,
    getServerEmptyString,
  )
  const isDark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerFalse)

  const activeId =
    pathname !== '/' ? (pathname.startsWith('/work') ? 'work' : '') : scrollActiveId

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') return

    const sectionIds = NAV_LINKS.map((item) => item.id)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setScrollActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.1, 0.3, 0.6] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const toggleTheme = () => {
    const nextDark = !isDark
    document.documentElement.classList.toggle('dark', nextDark)
    try {
      window.localStorage.setItem('voxa-theme', nextDark ? 'dark' : 'light')
    } catch {
      // Ignore storage restrictions
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-line bg-paper/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-vox flex h-[4.5rem] items-center justify-between gap-4">
          {/* Right (start in RTL): Wordmark + Karbala live clock */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="latin group inline-flex items-baseline gap-1 font-display text-xl font-semibold tracking-[-0.05em] text-ink"
              aria-label="VOXA — الصفحة الرئيسية"
            >
              <span>VOXA</span>
              <span className="inline-block h-2 w-2 rounded-full bg-lime ring-1 ring-ink/25 transition-transform duration-300 group-hover:scale-125" />
            </Link>

            <span className="hidden h-4 w-px bg-line md:inline-block" aria-hidden="true" />

            <div className="hidden items-center gap-2 text-muted md:flex">
              <span className="live-dot" aria-hidden="true" />
              <span className="label text-[10px]">
                KBL {karbalaTime ? `· ${karbalaTime}` : '· GMT+3'}
              </span>
            </div>
          </div>

          {/* Center: Navigation */}
          <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((item) => {
              const isCurrent = activeId === item.id
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`link-swipe inline-flex items-baseline gap-1.5 text-sm transition-colors ${
                    isCurrent ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  <span className="label text-[9px] text-muted/80">{item.code}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Left (end in RTL): Theme toggle + CTA + Mobile Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'التبديل إلى نمط الورق الفاتح' : 'التبديل إلى نمط الحبر الداكن'}
              title={isDark ? 'نمط الورق' : 'نمط الحبر'}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-paper-2"
            >
              {isDark ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
            </button>

            <Link
              href="/#contact"
              className="btn btn-solid hidden !px-4 !py-2.5 !text-xs sm:inline-flex"
            >
              <span>ابدأ مشروعاً</span>
              <ArrowUpLeft size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="voxa-mobile-nav"
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen editorial drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="voxa-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-paper px-6 pb-8 pt-6 text-ink lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-line pb-5">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="latin inline-flex items-baseline gap-1 font-display text-xl font-semibold tracking-[-0.05em]"
              >
                <span>VOXA</span>
                <span className="inline-block h-2 w-2 rounded-full bg-lime ring-1 ring-ink/25" />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="إغلاق القائمة"
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="my-auto flex flex-col divide-y divide-line">
              {NAV_LINKS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-3xl font-medium text-ink transition-colors hover:text-blue"
                  >
                    <span>{item.label}</span>
                    <span className="label text-muted">{item.code}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-4 border-t border-line pt-6">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{STUDIO.city}</span>
                <a
                  href={`mailto:${STUDIO.email}`}
                  className="latin text-ink underline-offset-4 hover:underline"
                >
                  {STUDIO.email}
                </a>
              </div>
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="btn btn-solid w-full justify-between"
              >
                <span>ابدأ مشروعك الآن</span>
                <ArrowUpLeft size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
