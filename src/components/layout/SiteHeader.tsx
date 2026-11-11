'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import Link from 'next/link'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navItems, profile } from '@/lib/data/profile'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const { scrollY } = useScroll()
  const reduced = useReducedMotion()
  const panelRef = useRef<HTMLDivElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)

  // Hide on the way down, reveal instantly on the way up — the pattern that
  // keeps a fixed header out of the reading path without ever stranding the
  // visitor.
  useMotionValueEvent(scrollY, 'change', (value) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(value > 24)
    if (value < 120) setHidden(false)
    else if (value - previous > 3) setHidden(true)
    else if (previous - value > 3) setHidden(false)
  })

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((element): element is HTMLElement => Boolean(element))
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll and trap focus while the mobile sheet is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    focusables?.[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !focusables || focusables.length === 0) return
      const first = focusables[0]!
      const last = focusables[focusables.length - 1]!
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -28, opacity: 0 }}
        animate={{ y: hidden && !open ? '-115%' : 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: hidden ? 0 : 0.15 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            'container-page transition-[padding] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]',
            scrolled ? 'py-2.5' : 'py-4',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between gap-4 rounded-full px-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] md:px-4',
              scrolled
                ? 'glass-nav h-14 border border-[var(--hairline)] shadow-[0_8px_30px_-18px_rgba(0,0,0,0.5)]'
                : 'h-14 border border-transparent',
            )}
          >
            <Link
              href="#top"
              className="group flex items-center gap-2.5 rounded-full pl-1 text-[15px] font-semibold tracking-[-0.02em]"
              aria-label={`${profile.name} — back to top`}
            >
              <span className="relative grid size-8 place-items-center rounded-full bg-[var(--fg)] text-[var(--bg)]">
                <span className="font-mono text-[12px] font-semibold tracking-tight">HA</span>
                <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" aria-hidden />
              </span>
              <span className="hidden sm:inline">
                {profile.shortName}
                <span className="text-muted">.studio</span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = active === item.href
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300',
                      isActive ? 'text-[var(--fg)]' : 'text-[var(--fg)]/62 hover:text-[var(--fg)]',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-[var(--fg)]/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <a
                href="#contact"
                className="hidden h-9 items-center gap-1.5 rounded-full bg-[var(--fg)] px-4 text-[13px] font-medium text-[var(--bg)] transition-opacity duration-300 hover:opacity-88 sm:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
              </a>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid size-9 place-items-center rounded-full border border-[var(--hairline)] text-[var(--fg)]/80 transition-colors hover:text-[var(--fg)] lg:hidden"
              >
                {open ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-[var(--bg)]/70 backdrop-blur-xl"
              onClick={close}
              aria-hidden
            />
            <motion.div
              id="mobile-nav"
              ref={panelRef}
              initial={reduced ? false : { opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="container-page absolute inset-x-0 top-0 pt-24"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <nav className="surface overflow-hidden rounded-3xl p-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.045, duration: 0.4 }}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 text-[19px] font-medium tracking-[-0.02em] transition-colors hover:bg-[var(--fg)]/[0.05]"
                  >
                    {item.label}
                    <ArrowUpRight size={17} className="text-muted" aria-hidden />
                  </motion.a>
                ))}
                <div className="mt-2 border-t border-[var(--hairline)] p-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center justify-between rounded-xl bg-[var(--fg)] px-4 py-3.5 text-[14px] font-medium text-[var(--bg)]"
                  >
                    {profile.email}
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
