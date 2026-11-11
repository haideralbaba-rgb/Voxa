'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { profile } from '@/lib/data/profile'
import { ButtonLink } from '@/components/ui/Button'
import { Art } from '@/components/ui/Art'
import { Counter } from '@/components/ui/Counter'
import { DURATION, EASE, SPRING } from '@/lib/motion'
import { HeroBackdrop } from './HeroBackdrop'

function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--hairline)] bg-[var(--card)]/70 py-1.5 pl-2 pr-3.5 backdrop-blur-md">
      <span className="relative grid size-4 place-items-center" aria-hidden>
        <span className="absolute size-2 rounded-full bg-emerald-500" />
        <span className="absolute size-2 animate-pulse-ring rounded-full bg-emerald-500/70" />
      </span>
      <span className="text-[12.5px] font-medium tracking-[-0.01em] text-[var(--fg)]/76">
        {profile.availabilityLabel}
      </span>
    </span>
  )
}

/** Headline words rise out of a clipped box, one after another. */
function Headline({ reduced }: { reduced: boolean | null }) {
  const words = profile.headline.split(' ')
  const accentDelay = 0.16 + words.length * 0.05

  return (
    <h1
      id="hero-heading"
      aria-label={`${profile.headline} ${profile.headlineAccent}`}
      className="mt-7 text-display-xl font-semibold leading-[0.92] tracking-[-0.045em] text-[var(--fg)]"
    >
      <span aria-hidden className="contents">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden pb-[0.05em] align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={reduced ? false : { y: '115%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: DURATION.crawl,
                ease: EASE.soft,
                delay: 0.1 + index * 0.05,
              }}
            >
              {word}
              {index < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
        <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="serif-accent inline-block text-accent"
            initial={reduced ? false : { y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ duration: DURATION.crawl, ease: EASE.soft, delay: accentDelay }}
          >
            {profile.headlineAccent}
          </motion.span>
        </span>
      </span>
    </h1>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Three layers moving at three speeds: copy, portrait, ambient glow.
  const smooth = useSpring(scrollYProgress, SPRING.scroll)
  const copyY = useTransform(smooth, [0, 1], ['0%', '-6%'])
  const copyOpacity = useTransform(smooth, [0, 0.9], [1, 0.15])
  const portraitY = useTransform(smooth, [0, 1], ['0%', '16%'])
  const portraitScale = useTransform(smooth, [0, 1], [1, 1.08])
  const portraitRadius = useTransform(smooth, [0, 1], ['2.25rem', '3.5rem'])

  return (
    <section
      ref={containerRef}
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40"
    >
      <HeroBackdrop scrollYProgress={scrollYProgress} />

      <div className="container-page">
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <motion.div style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.05 }}
            >
              <AvailabilityBadge />
            </motion.div>

            <Headline reduced={reduced} />

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.5 }}
              className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-muted md:text-[17px]"
            >
              {profile.lede}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.62 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="#work" size="lg">
                View selected work
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </ButtonLink>
              <ButtonLink href="#contact" size="lg" variant="secondary">
                Start a project
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </ButtonLink>
              <a
                href={profile.resumeHref}
                className="group inline-flex h-13 items-center gap-2 rounded-full px-4 text-[14px] font-medium text-[var(--fg)]/62 transition-colors duration-300 hover:text-[var(--fg)]"
              >
                <Download size={15} aria-hidden />
                Résumé
              </a>
            </motion.div>

            <motion.dl
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.78 }}
              className="mt-14 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-[var(--hairline)] pt-7 sm:grid-cols-4"
            >
              {profile.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-2">
                  <dt className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">
                    {stat.label}
                  </dt>
                  <dd className="text-[26px] font-semibold leading-none tracking-[-0.04em] text-[var(--fg)] md:text-[30px]">
                    <Counter value={stat.value} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Portrait — its own parallax layer, slightly faster than the copy */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, filter: 'blur(14px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: EASE.soft, delay: 0.25 }}
            className="relative mx-auto w-full max-w-[22rem] lg:mx-0 lg:max-w-none"
          >
            <motion.div
              style={reduced ? undefined : { y: portraitY, scale: portraitScale }}
              className="relative"
            >
              <div
                className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-accent/22 via-transparent to-[#4c7d92]/18 blur-2xl"
                aria-hidden
              />
              <motion.div
                style={reduced ? undefined : { borderRadius: portraitRadius }}
                className="relative aspect-square overflow-hidden rounded-[2.25rem] border border-[var(--hairline-strong)] shadow-[var(--shadow-lift)]"
              >
                <Art
                  src={profile.avatar.src}
                  alt={profile.avatar.alt}
                  width={profile.avatar.width}
                  height={profile.avatar.height}
                  priority
                  sizes="(max-width: 1024px) 82vw, 22rem"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/15 bg-black/35 px-3.5 py-2.5 backdrop-blur-md">
                  <div>
                    <p className="text-[13px] font-medium text-white">{profile.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                      {profile.role}
                    </p>
                  </div>
                  <span className="grid size-7 place-items-center rounded-full bg-white/15 text-white">
                    <MapPin size={13} aria-hidden />
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={reduced ? false : { opacity: 0, x: -14, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.9 }}
                className="surface absolute -left-4 top-8 hidden items-center gap-2 rounded-full py-2 pl-2.5 pr-4 md:flex"
              >
                <span className="grid size-6 place-items-center rounded-full bg-[var(--fg)] font-mono text-[10px] font-semibold text-[var(--bg)]">
                  10
                </span>
                <span className="text-[11.5px] font-medium text-[var(--fg)]/75">years of craft</span>
              </motion.div>

              <motion.div
                initial={reduced ? false : { opacity: 0, x: 14, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 1.02 }}
                className="surface absolute -right-3 bottom-24 hidden flex-col gap-1 rounded-2xl px-3.5 py-3 md:flex"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Based in
                </span>
                <span className="text-[12.5px] font-medium text-[var(--fg)]">{profile.location}</span>
                <span className="text-[11px] text-muted">{profile.timezone} · remote friendly</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <ClientsMarquee />
    </section>
  )
}

/**
 * Client strip whose speed and direction follow the scroll: it leans forward
 * as you move down the page and eases to a stop when you settle — the same
 * trick used by the agency sites on 60fps' motion gallery.
 */
function ClientsMarquee() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  // Scroll velocity, smoothed: the strip leans into the direction of travel.
  const [velocity, setVelocity] = useState(0)
  useMotionValueEvent(scrollY, 'change', (value) => {
    setVelocity(Math.max(-1, Math.min(1, (value - scrollY.getPrevious()!) / 2)))
  })
  const skew = useSpring(velocity * 6, { stiffness: 90, damping: 26 })
  const row = [...profile.clients, ...profile.clients]

  return (
    <div className="container-page mt-20 md:mt-28">
      <div className="flex items-center gap-4">
        <span className="eyebrow shrink-0">Trusted by</span>
        <span className="h-px flex-1 bg-[var(--hairline)]" aria-hidden />
      </div>
      <div className="marquee-mask relative mt-6 overflow-hidden">
        <motion.div
          style={reduced ? undefined : { skewX: skew }}
          className="flex w-max items-center gap-12 will-change-transform"
          animate={reduced ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 46, ease: 'linear', repeat: Infinity }}
        >
          {row.map((client, index) => (
            <span
              key={`${client}-${index}`}
              className="whitespace-nowrap text-[17px] font-medium tracking-[-0.02em] text-[var(--fg)]/45 transition-colors duration-500 hover:text-[var(--fg)]/70 md:text-[19px]"
            >
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
