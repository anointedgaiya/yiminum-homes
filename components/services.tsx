import { Home, Key, LineChart, ShieldCheck, Building2, Handshake } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const SERVICES = [
  {
    icon: Home,
    title: 'Buying a home',
    body: 'From first tour to final signature, we guide you to a property that fits your life and budget.',
  },
  {
    icon: Key,
    title: 'Renting made simple',
    body: 'Verified listings, transparent terms and a seamless application process — no surprises.',
  },
  {
    icon: LineChart,
    title: 'Selling with confidence',
    body: 'Data-driven pricing and cinematic marketing that puts your property in front of serious buyers.',
  },
  {
    icon: Building2,
    title: 'Property management',
    body: 'Full-service management that protects your investment and keeps tenants happy.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted advisory',
    body: 'Independent advice on financing, legal and long-term value from a dedicated advisor.',
  },
  {
    icon: Handshake,
    title: 'Concierge onboarding',
    body: 'White-glove move-in support so your new home feels like home from day one.',
  },
]

export function Services() {
  return (
    <section id="services" className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.28em] text-brand uppercase">
            What we do
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            A complete real estate experience
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to buy, rent, sell and manage property — under one trusted roof.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 90}>
              <div className="group h-full rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand/12 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <service.icon className="size-6" />
                </span>
                <h3 className="mt-6 font-serif text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
