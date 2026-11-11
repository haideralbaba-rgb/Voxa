'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium leading-none tracking-[-0.01em] transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--fg)] text-[var(--bg)] shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_10px_24px_-12px_rgba(0,0,0,0.5)] hover:bg-[var(--fg)]/90 hover:shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_16px_36px_-14px_rgba(0,0,0,0.6)]',
  secondary:
    'border border-[var(--hairline-strong)] bg-[var(--card)] text-[var(--fg)] hover:border-[var(--fg)]/35 hover:bg-[var(--card-hover)]',
  ghost: 'text-[var(--fg)]/75 hover:bg-[var(--fg)]/[0.06] hover:text-[var(--fg)]',
  accent:
    'bg-accent text-white shadow-[0_1px_0_rgba(255,255,255,0.24)_inset,0_12px_28px_-12px_rgba(201,102,63,0.7)] hover:brightness-[1.06]',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-13 px-7 text-[15px]',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  external,
  ...props
}: CommonProps & { href: string; external?: boolean } & Omit<ComponentProps<'a'>, 'href'>) {
  const classes = cn(base, variants[variant], sizes[size], className)
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}
