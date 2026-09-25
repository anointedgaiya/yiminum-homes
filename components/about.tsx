import Image from 'next/image'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const STATS = [
  { value: '1,200+', label: 'Homes sold' },
  { value: '$3.4B', label: 'In property value' },
  { value: '15 yrs', label: 'Of experience' },
  { value: '98%', label: 'Client satisfaction' },
]

const POINTS = [
  'Dedicated advisor for every client',
  'Cinematic, professional listing photography',
  'Transparent pricing with no hidden fees',
  'Access to off-market luxury properties',
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-black/10">
            <Image
              src="/images/interior.png"
              alt="A bright, spacious modern living room with floor-to-ceiling windows"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-border bg-card p-6 shadow-xl sm:block">
            <p className="font-serif text-3xl font-semibold text-brand">15+</p>
            <p className="text-sm text-muted-foreground">years of trusted service</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.28em] text-brand uppercase">
              Why Yiminum Homes
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Real estate, reimagined around you
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              We combine deep local expertise with modern technology to make finding, buying and
              selling homes feel effortless. Every client works with a dedicated advisor committed
              to their goals — not the quickest sale.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm text-foreground/90">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
