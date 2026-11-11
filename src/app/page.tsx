import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
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
      <SkipLink />
      <ScrollProgress />
      <SiteHeader />
      <PageTransition>
      <main id="main">
        <Hero />
        <ProjectShowcase />
        <StatementBridge />
        <Marquee />
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
