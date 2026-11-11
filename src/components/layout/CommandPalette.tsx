'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  BookOpen,
  Command,
  CornerDownLeft,
  Layers,
  Link2,
  Mail,
  Search,
  Sun,
  Volume2,
} from 'lucide-react'
import { profile } from '@/lib/data/profile'
import { localizeProjects } from '@/lib/i18n/content'
import { categoryLabel } from '@/lib/i18n/labels'
import { storyboardScenes } from '@/lib/data/storyboard'
import { useSound } from '@/components/providers/SoundProvider'
import { useLocale } from '@/components/providers/LocaleProvider'
import { useTheme } from '@/components/providers/ThemeProvider'
import { withViewTransition } from '@/lib/view-transition'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  group: string
  label: string
  hint?: string
  icon: React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>
  run: () => void
  keywords?: string
}

/**
 * ⌘K palette.
 *
 * One entry point for everything the page can do: scroll targets, case studies,
 * storyboard scenes, the reference shelf, and the two settings that otherwise
 * hide in the header. It is also the accessible floor for the whole site — every
 * destination is reachable by typing, without a mouse and without scrolling.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const router = useRouter()
  const reduced = useReducedMotion()
  const { play } = useSound()
  const { toggle: toggleTheme } = useTheme()
  const { t, locale } = useLocale()
  const p = t.palette
  const projects = useMemo(() => localizeProjects(locale), [locale])

  const close = useCallback(() => setOpen(false), [])

  const go = useCallback(
    (hash: string) => {
      close()
      if (window.location.pathname !== '/') {
        withViewTransition(() => router.push(`/${hash}`))
        return
      }
      const node = document.querySelector<HTMLElement>(hash)
      node?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [close, router],
  )

  const commands = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = []

    for (const nav of profile.nav) {
      items.push({
        id: `nav-${nav.href}`,
        group: p.groups.jump,
        label: nav.label,
        hint: nav.href,
        icon: ArrowRight,
        run: () => go(nav.href),
      })
    }

    for (const project of projects) {
      items.push({
        id: `work-${project.slug}`,
        group: p.groups.work,
        label: project.title,
        hint: `${categoryLabel(project.category, locale)} · ${project.year}`,
        icon: Layers,
        keywords: project.stack.join(' '),
        run: () => {
          close()
          withViewTransition(() => router.push(`/work/${project.slug}`))
        },
      })
    }

    for (const scene of storyboardScenes) {
      items.push({
        id: `scene-${scene.id}`,
        group: p.groups.storyboard,
        label: `${scene.index} · ${scene.title}`,
        hint: scene.mechanic,
        icon: BookOpen,
        run: () => go('#story'),
      })
    }

    items.push(
      {
        id: 'action-theme',
        group: p.groups.actions,
        label: p.switchTheme,
        hint: p.themeHint,
        icon: Sun,
        run: () => {
          toggleTheme()
          close()
        },
      },
      {
        id: 'action-sound',
        group: p.groups.actions,
        label: p.sound,
        hint: p.soundHint,
        icon: Volume2,
        run: () => {
          close()
          window.dispatchEvent(new CustomEvent('voxa:toggle-sound'))
        },
      },
      {
        id: 'action-email',
        group: p.groups.elsewhere,
        label: profile.email,
        hint: p.emailHint,
        icon: Mail,
        run: () => {
          close()
          window.location.href = `mailto:${profile.email}`
        },
      },
      ...profile.socials.slice(0, 2).map<CommandItem>((social) => ({
        id: `social-${social.label}`,
        group: p.groups.elsewhere,
        label: social.label,
        hint: social.handle,
        icon: Link2,
        run: () => {
          close()
          window.open(social.href, '_blank', 'noopener,noreferrer')
        },
      })),
    )

    return items
  }, [close, go, locale, p, projects, router, toggleTheme])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return commands
    return commands.filter((item) =>
      `${item.label} ${item.hint ?? ''} ${item.keywords ?? ''} ${item.group}`.toLowerCase().includes(needle),
    )
  }, [commands, query])

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>()
    for (const item of results) {
      const bucket = map.get(item.group) ?? []
      bucket.push(item)
      map.set(item.group, bucket)
    }
    return [...map.entries()]
  }, [results])

  // Flat order must match the rendered DOM for keyboard navigation to be sane.
  const flat = useMemo(() => grouped.flatMap(([, items]) => items), [grouped])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
        return
      }
      if (event.key === '/' && !open) {
        const target = event.target as HTMLElement | null
        const typing = target && /^(INPUT|TEXTAREA)$/.test(target.tagName)
        if (!typing) {
          event.preventDefault()
          setOpen(true)
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40)
    play('open')
    return () => {
      document.body.style.overflow = previousOverflow
      window.clearTimeout(timer)
    }
  }, [open, play])

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((current) => (flat.length ? (current + 1) % flat.length : 0))
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((current) => (flat.length ? (current - 1 + flat.length) % flat.length : 0))
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      flat[cursor]?.run()
    }
  }

  // Keep the active option in view without hijacking the page scroll.
  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
    node?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  let index = -1

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group hidden h-9 items-center gap-2 rounded-full border border-[var(--hairline)] px-3 text-[12px] font-medium text-[var(--fg)]/60 transition-colors duration-300 hover:border-[var(--hairline-strong)] hover:text-[var(--fg)] md:inline-flex"
        aria-label={p.open}
      >
        <Search size={13} aria-hidden />
        <span className="hidden lg:inline">{t.search}</span>
        <kbd className="ms-1 inline-flex items-center gap-0.5 rounded border border-[var(--hairline)] bg-[var(--fg)]/[0.04] px-1.5 py-0.5 font-mono text-[9.5px] text-[var(--fg)]/50">
          <Command size={8} aria-hidden />K
        </kbd>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={p.title}
          >
            <button
              type="button"
              aria-label={p.close}
              onClick={close}
              className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-[3px]"
            />

            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--hairline-strong)] bg-[var(--bg)] shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center gap-3 border-b border-[var(--hairline)] px-4 py-3.5">
                <Search size={15} className="text-muted" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value)
                    setCursor(0)
                    play('click')
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder={p.placeholder}
                  aria-label={p.search}
                  aria-controls="palette-results"
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full bg-transparent text-[14px] text-[var(--fg)] outline-none placeholder:text-[var(--fg)]/38"
                />
                <kbd className="hidden shrink-0 rounded border border-[var(--hairline)] px-1.5 py-0.5 font-mono text-[9.5px] text-[var(--fg)]/45 sm:inline">
                  esc
                </kbd>
              </div>

              <ul
                ref={listRef}
                id="palette-results"
                role="listbox"
                aria-label={t.palette.results}
                className="max-h-[52vh] overflow-y-auto overscroll-contain p-2"
              >
                {grouped.length === 0 ? (
                  <li className="px-3 py-8 text-center text-[13px] text-muted">
                    {p.nothing} “{query}”.
                  </li>
                ) : null}

                {grouped.map(([group, items]) => (
                  <li key={group} className="mb-1 block">
                    <p className="px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--fg)]/35">
                      {group}
                    </p>
                    <ul>
                      {items.map((item) => {
                        index += 1
                        const position = index
                        const active = position === cursor
                        const Icon = item.icon
                        return (
                          <li key={item.id} data-index={position}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={active}
                              onPointerEnter={() => setCursor(position)}
                              onClick={() => {
                                play('click')
                                item.run()
                              }}
                              className={cn(
                                'flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors duration-150',
                                active ? 'bg-[var(--fg)]/[0.07]' : 'hover:bg-[var(--fg)]/[0.04]',
                              )}
                            >
                              <Icon size={14} className={active ? 'text-accent' : 'text-muted'} aria-hidden />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[13.5px] font-medium text-[var(--fg)]">
                                  {item.label}
                                </span>
                                {item.hint ? (
                                  <span className="block truncate font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--fg)]/40">
                                    {item.hint}
                                  </span>
                                ) : null}
                              </span>
                              {active ? (
                                <CornerDownLeft size={12} className="shrink-0 text-[var(--fg)]/35" aria-hidden />
                              ) : null}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-[var(--hairline)] px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--fg)]/35">
                <span>{p.navigate}</span>
                <span className="hidden sm:inline">
                  {flat.length} {p.results}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
