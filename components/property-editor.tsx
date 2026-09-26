'use client'

import { useState, type FormEvent } from 'react'
import { Check, LockKeyhole, Plus, Save } from 'lucide-react'
import type { Property } from '@/lib/properties'

const ACCESS_CODE = '1970,abc.'
const inputClassName = 'mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/15'
const labelClassName = 'block text-xs font-medium text-muted-foreground'

export function PropertyEditor({
  properties,
  onChange,
}: {
  properties: Property[]
  onChange: (properties: Property[]) => void
}) {
  const [accessCode, setAccessCode] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [draft, setDraft] = useState({
    title: '',
    location: '',
    price: 0,
    type: 'House' as Property['type'],
    status: 'For Sale' as Property['status'],
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    image: '/images/property-1.png',
    featured: false,
    tag: '',
  })

  function unlockEditor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const isValid = accessCode === ACCESS_CODE
    setUnlocked(isValid)
    setHasError(!isValid)
    if (!isValid) setAccessCode('')
  }

  function updateProperty(id: string, updates: Partial<Property>) {
    onChange(properties.map((property) => property.id === id ? { ...property, ...updates } : property))
  }

  function addProperty(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft.title.trim() || !draft.location.trim() || !draft.image.trim()) return

    onChange([
      ...properties,
      {
        ...draft,
        id: `home-${Date.now()}`,
        title: draft.title.trim(),
        location: draft.location.trim(),
        image: draft.image.trim(),
        tag: draft.tag.trim() || undefined,
      },
    ])
    setDraft({ ...draft, title: '', location: '', price: 0, bedrooms: 0, bathrooms: 0, area: 0, tag: '' })
  }

  return (
    <section id="add" className="scroll-mt-24 border-y border-border bg-muted/35">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-8 max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            <Plus className="size-4" />
            Listing access
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Add or update a home</h2>
          <p className="mt-3 text-sm text-muted-foreground">Changes are saved in this browser.</p>
        </div>

        {!unlocked ? (
          <form onSubmit={unlockEditor} className="max-w-md rounded-2xl border border-border bg-card p-5 shadow-sm">
            <label htmlFor="listing-access-code" className={labelClassName}>Password</label>
            <div className="mt-1.5 flex gap-2">
              <input
                id="listing-access-code"
                type="password"
                autoComplete="current-password"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                required
              />
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground">
                <LockKeyhole className="size-4" />
                Unlock
              </button>
            </div>
            {hasError && <p role="alert" className="mt-2 text-sm text-rose-600">That password is incorrect.</p>}
          </form>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
              <Check className="size-4" />
              Editing enabled
            </div>

            <div className="space-y-4">
              {properties.map((property) => (
                <article key={property.id} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="mb-4 font-semibold">{property.title || 'Untitled home'}</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <label className={labelClassName}>Name
                      <input className={inputClassName} value={property.title} onChange={(event) => updateProperty(property.id, { title: event.target.value })} />
                    </label>
                    <label className={labelClassName}>Location
                      <input className={inputClassName} value={property.location} onChange={(event) => updateProperty(property.id, { location: event.target.value })} />
                    </label>
                    <label className={labelClassName}>Price
                      <input className={inputClassName} type="number" min="0" value={property.price} onChange={(event) => updateProperty(property.id, { price: Number(event.target.value) })} />
                    </label>
                    <label className={labelClassName}>Property type
                      <select className={inputClassName} value={property.type} onChange={(event) => updateProperty(property.id, { type: event.target.value as Property['type'] })}>
                        <option>House</option><option>Apartment</option><option>Villa</option><option>Townhouse</option>
                      </select>
                    </label>
                    <label className={labelClassName}>Listing status
                      <select className={inputClassName} value={property.status} onChange={(event) => updateProperty(property.id, { status: event.target.value as Property['status'] })}>
                        <option>For Sale</option><option>For Rent</option>
                      </select>
                    </label>
                    <label className={labelClassName}>Bedrooms
                      <input className={inputClassName} type="number" min="0" value={property.bedrooms} onChange={(event) => updateProperty(property.id, { bedrooms: Number(event.target.value) })} />
                    </label>
                    <label className={labelClassName}>Bathrooms
                      <input className={inputClassName} type="number" min="0" value={property.bathrooms} onChange={(event) => updateProperty(property.id, { bathrooms: Number(event.target.value) })} />
                    </label>
                    <label className={labelClassName}>Area (ft²)
                      <input className={inputClassName} type="number" min="0" value={property.area} onChange={(event) => updateProperty(property.id, { area: Number(event.target.value) })} />
                    </label>
                    <label className={labelClassName}>Image path
                      <input className={inputClassName} value={property.image} onChange={(event) => updateProperty(property.id, { image: event.target.value })} />
                    </label>
                    <label className={labelClassName}>Badge
                      <input className={inputClassName} value={property.tag ?? ''} onChange={(event) => updateProperty(property.id, { tag: event.target.value || undefined })} />
                    </label>
                    <label className="flex items-center gap-2 self-end pb-2 text-sm text-foreground">
                      <input type="checkbox" checked={Boolean(property.featured)} onChange={(event) => updateProperty(property.id, { featured: event.target.checked })} />
                      Featured listing
                    </label>
                  </div>
                </article>
              ))}
            </div>

            <form onSubmit={addProperty} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-4 font-semibold">New home</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <label className={labelClassName}>Name
                  <input className={inputClassName} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required />
                </label>
                <label className={labelClassName}>Location
                  <input className={inputClassName} value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} required />
                </label>
                <label className={labelClassName}>Price
                  <input className={inputClassName} type="number" min="0" value={draft.price} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })} />
                </label>
                <label className={labelClassName}>Property type
                  <select className={inputClassName} value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as Property['type'] })}>
                    <option>House</option><option>Apartment</option><option>Villa</option><option>Townhouse</option>
                  </select>
                </label>
                <label className={labelClassName}>Listing status
                  <select className={inputClassName} value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as Property['status'] })}>
                    <option>For Sale</option><option>For Rent</option>
                  </select>
                </label>
                <label className={labelClassName}>Bedrooms
                  <input className={inputClassName} type="number" min="0" value={draft.bedrooms} onChange={(event) => setDraft({ ...draft, bedrooms: Number(event.target.value) })} />
                </label>
                <label className={labelClassName}>Bathrooms
                  <input className={inputClassName} type="number" min="0" value={draft.bathrooms} onChange={(event) => setDraft({ ...draft, bathrooms: Number(event.target.value) })} />
                </label>
                <label className={labelClassName}>Area (ft²)
                  <input className={inputClassName} type="number" min="0" value={draft.area} onChange={(event) => setDraft({ ...draft, area: Number(event.target.value) })} />
                </label>
                <label className={labelClassName}>Image path
                  <input className={inputClassName} value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} required />
                </label>
                <label className={labelClassName}>Badge
                  <input className={inputClassName} value={draft.tag} onChange={(event) => setDraft({ ...draft, tag: event.target.value })} />
                </label>
                <label className="flex items-center gap-2 self-end pb-2 text-sm text-foreground">
                  <input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} />
                  Featured listing
                </label>
              </div>
              <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground">
                <Save className="size-4" />
                Add home
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}