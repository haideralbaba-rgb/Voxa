import { createFileRoute } from '@tanstack/react-router'
import { getPublicPortfolio } from '../server/data'
import { PortfolioPage } from '../components/PortfolioPage'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  loader: () => getPublicPortfolio(),
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()
  if (!data) return <PlatformLanding />
  return <PortfolioPage data={data} />
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g transform="rotate(-30 12 12)">
        <circle cx="7.3" cy="3.2" r="1.45" />
        <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
        <circle cx="16.7" cy="20.8" r="1.45" />
      </g>
    </svg>
  )
}

function Sparkle() {
  return (
    <svg className="badge-star" width="18" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
    </svg>
  )
}

function WorkflowIcon() {
  return (
    <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="pillA" x1="3" y1="2" x2="14" y2="22"><stop offset="0" stopColor="#fff" stopOpacity=".38" /><stop offset="1" stopColor="#3a3a3a" stopOpacity=".62" /></linearGradient>
        <linearGradient id="pillB" x1="14" y1="2" x2="3" y2="22"><stop offset="0" stopColor="#3a3a3a" stopOpacity=".38" /><stop offset="1" stopColor="#fff" stopOpacity=".62" /></linearGradient>
      </defs>
      <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pillA)" />
      <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pillB)" />
      <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#fff" />
      <path d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85" fill="none" stroke="#111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg className="stat-icon stat-icon-wide" viewBox="0 0 40 22" aria-hidden="true">
      <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
      <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
      <path d="M6.3 9.3 4.5 6.9l2.9.9M14.1 9.3l1.8-2.4-2.9.9" fill="#f4f4f4" />
      <circle cx="8.8" cy="11.4" r=".7" fill="#1a1a1a" /><circle cx="11.6" cy="11.4" r=".7" fill="#1a1a1a" />
      <circle cx="20.2" cy="11" r="9.2" fill="#fff" />
      <circle cx="17.4" cy="10.1" r="1.7" fill="#111" /><circle cx="23" cy="10.1" r="1.7" fill="#111" />
      <ellipse cx="20.2" cy="13" rx="1.2" ry=".8" fill="#111" />
      <path d="M17.3 14.2c1.8 1.5 3.8 1.5 5.7 0" fill="none" stroke="#111" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
      <text x="30.2" y="15.1" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12.5" fill="#fff">e</text>
    </svg>
  )
}

function PlatformLanding() {
  useEffect(() => {
    const appear = Array.from(document.querySelectorAll<HTMLElement>('.appear'))
    const heroPhoto = document.querySelector<HTMLElement>('.hero-photo')
    appear.forEach((el) => el.addEventListener('animationend', () => el.classList.add('is-in'), { once: true }))
    heroPhoto?.addEventListener('animationend', () => heroPhoto.classList.add('is-in'), { once: true })

    const raf1 = requestAnimationFrame(() => requestAnimationFrame(() => {
      appear.forEach((el) => {
        const animations = el.getAnimations?.() ?? []
        if (!animations.some((animation) => animation.playState === 'running' || animation.playState === 'finished')) el.classList.add('is-in')
      })
      if (heroPhoto) {
        const animations = heroPhoto.getAnimations?.() ?? []
        if (!animations.some((animation) => animation.playState === 'running' || animation.playState === 'finished')) heroPhoto.classList.add('is-in')
      }
    }))

    const body = document.body
    const button = document.querySelector<HTMLButtonElement>('.menu-toggle')
    const nav = document.querySelector<HTMLElement>('#site-nav')
    const closeMenu = () => {
      body.classList.remove('menu-open')
      button?.setAttribute('aria-expanded', 'false')
      button?.setAttribute('aria-label', 'Open menu')
    }
    const toggleMenu = () => {
      const open = !body.classList.contains('menu-open')
      body.classList.toggle('menu-open', open)
      button?.setAttribute('aria-expanded', String(open))
      button?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    }
    button?.addEventListener('click', toggleMenu)
    nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') closeMenu() }
    const onResize = () => { if (window.matchMedia('(min-width: 901px)').matches) closeMenu() }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf1)
      button?.removeEventListener('click', toggleMenu)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <main className="vesper-page">
      <div className="grain" aria-hidden="true" />
      <video className="hero-photo" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4" type="video/mp4" />
      </video>
      <div className="page">
        <div className="menu-backdrop" aria-hidden="true" />
        <header className="header">
          <a className="logo appear appear--scale" style={{ '--d': '.08s' } as React.CSSProperties} href="#top" aria-label="Vesper.ai"><Mark /><span>Vesper<span className="logo-suffix">.ai</span></span></a>
          <nav id="site-nav" className="site-nav" aria-label="Primary">
            <a className="liquid-pill appear appear--scale" style={{ '--d': '.16s' } as React.CSSProperties} href="#benefits">Benefits</a>
            <a className="liquid-pill appear appear--soft" style={{ '--d': '.28s' } as React.CSSProperties} href="#how-it-works">How It Works</a>
            <a className="liquid-pill appear appear--scale" style={{ '--d': '.40s' } as React.CSSProperties} href="#faqs">FAQs</a>
            <a className="liquid-pill appear appear--soft" style={{ '--d': '.52s' } as React.CSSProperties} href="#pricing">Pricing</a>
          </nav>
          <a className="btn btn-solid header-cta appear appear--scale" style={{ '--d': '.34s' } as React.CSSProperties} href="#start">Start for Free</a>
          <button className="menu-toggle appear appear--scale" style={{ '--d': '.34s' } as React.CSSProperties} type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu"><span /><span /><span /></button>
        </header>

        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="badge appear appear--pop" style={{ '--d': '.22s' } as React.CSSProperties}><Sparkle /><span>Operational AI Infrastructure</span></div>
            <h1>
              <span className="headline-line"><span className="appear appear--mask" style={{ '--d': '.42s' } as React.CSSProperties}>Train <em>AI agents</em> on your</span></span>
              <span className="headline-line"><span className="appear appear--mask" style={{ '--d': '.62s' } as React.CSSProperties}>workflows in minutes.</span></span>
            </h1>
            <p className="lede appear appear--soft" style={{ '--d': '.82s', animationDuration: '1.25s' } as React.CSSProperties}>Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.</p>
            <div className="hero-actions">
              <a className="btn btn-solid hero-btn appear appear--btn" style={{ '--d': '.96s' } as React.CSSProperties} href="#start">Start for Free</a>
              <a className="btn btn-ghost hero-btn appear appear--side" style={{ '--d': '1.10s' } as React.CSSProperties} href="#demo">See it in action</a>
            </div>
          </div>
        </section>

        <footer className="stats">
          <div className="stat appear appear--stat" style={{ '--d': '1.12s' } as React.CSSProperties}><WorkflowIcon /><span>4.2M+ workflows automated</span></div>
          <div className="stat appear appear--stat" style={{ '--d': '1.28s' } as React.CSSProperties}><DownloadIcon /><span>92% reduction in manual operations</span></div>
          <div className="stat appear appear--stat" style={{ '--d': '1.44s' } as React.CSSProperties}><TeamIcon /><span>180+ operational teams onboarded</span></div>
        </footer>
      </div>
    </main>
  )
}
