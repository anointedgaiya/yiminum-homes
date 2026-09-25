'use client'

import { useState } from 'react'
import { MapPin, Home, Tag, Search, BedDouble } from 'lucide-react'

const FIELD_BASE =
  'w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20'

function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {icon}
        {label}
      </span>
      {children}
    </label>
  )
}

export function SearchPanel() {
  const [status, setStatus] = useState<'buy' | 'rent'>('buy')

  return (
    <div className="rounded-3xl border border-border bg-card/95 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
      <div className="mb-5 inline-flex rounded-full bg-muted p-1">
        {(['buy', 'rent'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setStatus(option)}
            className={
              'rounded-full px-6 py-2 text-sm font-semibold capitalize transition-all ' +
              (status === option
                ? 'bg-brand text-brand-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground')
            }
          >
            {option}
          </button>
        ))}
      </div>

      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field label="Location" icon={<MapPin className="size-3.5" />}>
          <input className={FIELD_BASE} placeholder="City, area or ZIP" type="text" />
        </Field>

        <Field label="Property type" icon={<Home className="size-3.5" />}>
          <select className={FIELD_BASE} defaultValue="">
            <option value="">Any type</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Townhouse</option>
          </select>
        </Field>

        <Field label="Bedrooms" icon={<BedDouble className="size-3.5" />}>
          <select className={FIELD_BASE} defaultValue="">
            <option value="">Any</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
            <option>5+</option>
          </select>
        </Field>

        <Field label="Min price" icon={<Tag className="size-3.5" />}>
          <select className={FIELD_BASE} defaultValue="">
            <option value="">No min</option>
            <option>$250k</option>
            <option>$500k</option>
            <option>$1M</option>
            <option>$2M</option>
          </select>
        </Field>

        <Field label="Max price" icon={<Tag className="size-3.5" />}>
          <select className={FIELD_BASE} defaultValue="">
            <option value="">No max</option>
            <option>$1M</option>
            <option>$2M</option>
            <option>$5M</option>
            <option>$10M+</option>
          </select>
        </Field>

        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <Search className="size-4" />
            Search homes
          </button>
        </div>
      </form>
    </div>
  )
}
