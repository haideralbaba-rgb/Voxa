import { SiteHeader } from '@/components/layout/SiteHeader'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { PageTransition } from '@/components/layout/PageTransition'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Hero } from '@/components/sections/Hero'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'
import { StatementBridge } from '@/components/sections/StatementBridge'
import { Marquee } from '@/components/sections/Marquee'
import { Storyboard } from '@/components/storyboard/Storyboard'
import { Craft } from '@/components/sections/Craft'
import { Experience } from '@/components/sections/Experience'
import { Skills, StackStrip } from '@/components/sections/Skills'
import { TestimonialStack } from '@/components/sections/TestimonialStack'
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
      <ScrollProgress />
      <SiteHeader />
      <PageTransition>
      <main id="main">
        <Hero />
        <ProjectShowcase />
        <StatementBridge />
        <Marquee
          items={['Product engineering', 'Interaction design', 'Design systems', 'Motion', 'Brand']}
          speed={48}
        />
        <Storyboard />
        <Craft />
        <AboutStrip />
        <Experience />
        <Skills />
        <TestimonialStack />
        <Contact />
        <StackStrip />
      </main>
      </PageTransition>
      <SiteFooter />
    </>
  )
}
