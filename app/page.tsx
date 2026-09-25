import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { PropertyShowcase } from '@/components/property-showcase'
import { Services } from '@/components/services'
import { About } from '@/components/about'
import { Testimonials } from '@/components/testimonials'
import { ContactCta } from '@/components/contact-cta'
import { SiteFooter } from '@/components/site-footer'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PropertyShowcase />
        <Services />
        <About />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
