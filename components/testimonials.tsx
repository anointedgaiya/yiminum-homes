import { Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const TESTIMONIALS = [
  {
    quote:
      'Yiminum found us a home we did not think existed in our budget. The whole process felt calm, considered and genuinely personal.',
    name: 'Amara & David Okoye',
    role: 'Bought in Los Angeles',
  },
  {
    quote:
      'They sold our property above asking in under two weeks. The marketing photography alone made the listing stand out completely.',
    name: 'Priya Ramesh',
    role: 'Sold in Dallas',
  },
  {
    quote:
      'From the first viewing to the keys in my hand, everything was seamless. It truly felt like a premium concierge service.',
    name: 'Marcus Bennett',
    role: 'Rented in Miami',
  },
]

export function Testimonials() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.28em] text-brand uppercase">
            Client stories
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Trusted by families and investors
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 100}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-sm">
                <div className="flex gap-0.5 text-brand">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-foreground/90">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
