export interface Property {
  id: string
  title: string
  location: string
  price: number
  type: 'House' | 'Apartment' | 'Villa' | 'Townhouse'
  status: 'For Sale' | 'For Rent'
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  featured?: boolean
  tag?: string
}

export const PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Glasshouse Villa',
    location: 'Hillcrest, Los Angeles',
    price: 4850000,
    type: 'Villa',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 6,
    area: 6200,
    image: '/images/property-1.png',
    featured: true,
    tag: 'New',
  },
  {
    id: 'p2',
    title: 'The Aria Residence',
    location: 'Preston Hollow, Dallas',
    price: 2190000,
    type: 'House',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 4,
    area: 3800,
    image: '/images/property-2.png',
    featured: true,
  },
  {
    id: 'p3',
    title: 'Skyline Sky Suites',
    location: 'Downtown, Miami',
    price: 8900,
    type: 'Apartment',
    status: 'For Rent',
    bedrooms: 3,
    bathrooms: 2,
    area: 1950,
    image: '/images/property-3.png',
    featured: true,
    tag: 'Featured',
  },
  {
    id: 'p4',
    title: 'Meadow Family Home',
    location: 'Boulder, Colorado',
    price: 1560000,
    type: 'House',
    status: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: '/images/property-4.png',
  },
  {
    id: 'p5',
    title: 'Oceanline Retreat',
    location: 'Malibu, California',
    price: 12500,
    type: 'Villa',
    status: 'For Rent',
    bedrooms: 4,
    bathrooms: 5,
    area: 4100,
    image: '/images/property-5.png',
    tag: 'Waterfront',
  },
  {
    id: 'p6',
    title: 'The Brownstone',
    location: 'Brooklyn Heights, New York',
    price: 3275000,
    type: 'Townhouse',
    status: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    area: 4400,
    image: '/images/property-6.png',
  },
]

export function formatPrice(property: Pick<Property, 'price' | 'status'>): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price)
  return property.status === 'For Rent' ? `${formatted}/mo` : formatted
}
