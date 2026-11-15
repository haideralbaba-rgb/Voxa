import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { Statement } from '@/components/sections/Statement'
import { Studio } from '@/components/sections/Studio'
import { Ticker } from '@/components/sections/Ticker'
import { Work } from '@/components/sections/Work'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Statement />
      <Work />
      <Services />
      <Process />
      <div className="surface-ink">
        <Studio />
        <Contact />
      </div>
    </>
  )
}
