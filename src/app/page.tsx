import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Hero } from '@/components/sections/Hero'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'
import { Experience } from '@/components/sections/Experience'
import { Skills, StackStrip } from '@/components/sections/Skills'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'
import { AboutStrip } from '@/components/sections/AboutStrip'

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--fg)] focus:px-4 focus:py-2 focus:text-[13px] focus:font-medium focus:text-[var(--bg)]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProjectShowcase />
        <AboutStrip />
        <Experience />
        <Skills />
        <Testimonials />
        <Contact />
        <StackStrip />
      </main>
      <SiteFooter />
    </>
  )
}
