'use client'

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { withViewTransition } from '@/lib/view-transition'

interface ViewLinkProps {
  href: string
  className?: string
  children: ReactNode
  /** Optional shared-element name so covers morph between routes. */
  label?: string
}

/**
 * An anchor that behaves like a link (middle-click, ⌘-click, right-click all
 * work) but routes through a View Transition on plain left clicks.
 */
export function ViewLink({ href, className, children, label }: ViewLinkProps) {
  const router = useRouter()

  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      onClick={(event) => {
        if (event.defaultPrevented) return
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        if (event.button !== 0) return
        event.preventDefault()
        withViewTransition(() => router.push(href))
      }}
    >
      {children}
    </a>
  )
}
