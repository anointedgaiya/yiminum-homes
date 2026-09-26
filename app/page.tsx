'use client'

import { useEffect, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { PropertyShowcase } from '@/components/property-showcase'
import { PropertyEditor } from '@/components/property-editor'
import { Services } from '@/components/services'
import { About } from '@/components/about'
import { Testimonials } from '@/components/testimonials'
import { ContactCta } from '@/components/contact-cta'
import { SiteFooter } from '@/components/site-footer'
import { PROPERTIES, type Property } from '@/lib/properties'

const PROPERTY_STORAGE_KEY = 'yiminum-home-properties'

function isPropertyList(value: unknown): value is Property[] {
  return Array.isArray(value) && value.every((item) => {
    if (typeof item !== 'object' || item === null) return false
    const property = item as Record<string, unknown>
    return (
      typeof property.id === 'string' &&
      typeof property.title === 'string' &&
      typeof property.location === 'string' &&
      typeof property.price === 'number' &&
      ['House', 'Apartment', 'Villa', 'Townhouse'].includes(String(property.type)) &&
      ['For Sale', 'For Rent'].includes(String(property.status)) &&
      typeof property.bedrooms === 'number' &&
      typeof property.bathrooms === 'number' &&
      typeof property.area === 'number' &&
      typeof property.image === 'string'
    )
  })
}

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES)
  const [storageReady, setStorageReady] = useState(false)

  useEffect(() => {
    try {
      const storedProperties = localStorage.getItem(PROPERTY_STORAGE_KEY)
      if (storedProperties) {
        const parsedProperties: unknown = JSON.parse(storedProperties)
        if (isPropertyList(parsedProperties)) setProperties(parsedProperties)
      }
    } catch {
      localStorage.removeItem(PROPERTY_STORAGE_KEY)
    } finally {
      setStorageReady(true)
    }
  }, [])

  useEffect(() => {
    if (storageReady) {
      localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(properties))
    }
  }, [properties, storageReady])

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PropertyShowcase properties={properties} />
        <PropertyEditor properties={properties} onChange={setProperties} />
        <Services />
        <About />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
