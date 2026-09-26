'use client'

import { useState } from 'react'
import type { Property } from '@/lib/properties'
import { PropertyCard } from '@/components/property-card'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

const FILTERS = ['All', 'For Sale', 'For Rent', 'Villa', 'Apartment'] as const
type Filter = (typeof FILTERS)[number]

export function PropertyShowcase({ properties: allProperties }: { properties: Property[] }) {
  const [filter, setFilter] = useState<Filter>('All')

  const properties = allProperties.filter((p) => {
    if (filter === 'All') return true
    if (filter === 'For Sale' || filter === 'For Rent') return p.status === filter
    return p.type === filter
  })

  return (
    <section id="properties" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-[0.28em] text-brand uppercase">
            Featured Listings
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            A curated collection of homes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hand-picked properties from our portfolio, each selected for its design, location and
            lasting value.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-10 flex flex-wrap gap-2" delay={100}>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full border px-5 py-2 text-sm font-medium transition-all',
              filter === f
                ? 'border-brand bg-brand text-brand-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-brand/50 hover:text-foreground',
            )}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, i) => (
          <Reveal key={property.id} delay={(i % 3) * 90}>
            <PropertyCard property={property} />
          </Reveal>
        ))}
      </div>

      {properties.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          No properties match this filter right now.
        </p>
      )}
    </section>
  )
}
