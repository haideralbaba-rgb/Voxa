import { cn } from '@/lib/utils'

export function Badge({
  children,
  className,
  tone = 'neutral',
}: {
  children: React.ReactNode
  className?: string
  tone?: 'neutral' | 'accent' | 'outline'
}) {
  const tones = {
    neutral: 'bg-[var(--fg)]/[0.055] text-[var(--fg)]/70 border-transparent',
    accent: 'bg-accent/12 text-accent border-accent/20',
    outline: 'border-[var(--hairline-strong)] text-[var(--fg)]/70',
  } as const
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TechPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--hairline)] bg-[var(--card)] px-3 py-1.5 text-[12.5px] font-medium text-[var(--fg)]/72 transition-colors duration-300 hover:border-accent/40 hover:text-[var(--fg)]">
      {children}
    </span>
  )
}
