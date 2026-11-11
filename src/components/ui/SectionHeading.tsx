import { cn, formatIndex } from '@/lib/utils'
import { Reveal } from './Reveal'
import { LineReveal, ScrubReveal } from './ScrubReveal'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  action?: React.ReactNode
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 border-t border-[var(--hairline)] pt-8 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')} amount={0.4}>
        <div
          className={cn(
            'mb-5 flex items-center gap-3',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="font-mono text-[11px] tracking-[0.16em] text-accent">{index}</span>
          <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="text-display-md font-semibold text-[var(--fg)]">
          <LineReveal>{title}</LineReveal>
        </h2>
        {description ? (
          <ScrubReveal className="mt-4 max-w-xl">
            <p className="text-[15px] leading-7 text-muted md:text-base">{description}</p>
          </ScrubReveal>
        ) : null}
      </Reveal>
      {action ? (
        <Reveal delay={0.1} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}

export function SectionIndex({ value }: { value: number }) {
  return <span className="font-mono text-[11px] tracking-[0.16em] text-accent">{formatIndex(value)}</span>
}
