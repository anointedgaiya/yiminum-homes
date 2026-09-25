import Image from 'next/image'
import { Bath, BedDouble, MapPin, Maximize, ArrowUpRight } from 'lucide-react'
import { formatPrice, type Property } from '@/lib/properties'

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={`${property.title} in ${property.location}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
            {property.status}
          </span>
          {property.tag && (
            <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
              {property.tag}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-semibold tracking-tight">{property.title}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              {property.location}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {property.type}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-border py-4 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <BedDouble className="size-4 text-brand" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Bath className="size-4 text-brand" />
            {property.bathrooms} Baths
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize className="size-4 text-brand" />
            {property.area.toLocaleString()} ft²
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            {formatPrice(property)}
          </span>
          <a
            href="#contact"
            aria-label={`View details for ${property.title}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground"
          >
            <ArrowUpRight className="size-5" />
          </a>
        </div>
      </div>
    </article>
  )
}
