export type ThemeId =
  | 'luxury-white'
  | 'modern-minimal'
  | 'premium-dark'
  | 'natural-homes'
  | 'modern-blue'

export interface ThemeDefinition {
  id: ThemeId
  name: string
  description: string
  /** Small swatch colors for the theme selector preview */
  swatch: {
    background: string
    foreground: string
    brand: string
  }
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'luxury-white',
    name: 'Luxury White',
    description: 'Elegant editorial white with warm gold accents',
    swatch: { background: '#fdfdfb', foreground: '#20201d', brand: '#b8985a' },
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean monochrome with strong typography',
    swatch: { background: '#ffffff', foreground: '#2b2b2b', brand: '#1a1a1a' },
  },
  {
    id: 'premium-dark',
    name: 'Premium Dark',
    description: 'Charcoal evening atmosphere with bronze accents',
    swatch: { background: '#22211e', foreground: '#f3f1ec', brand: '#d4af6a' },
  },
  {
    id: 'natural-homes',
    name: 'Natural Homes',
    description: 'Warm beige tones with calm earthy greens',
    swatch: { background: '#f6f3ec', foreground: '#3d382f', brand: '#6b8e5a' },
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Corporate white with deep trustworthy navy',
    swatch: { background: '#ffffff', foreground: '#1e2a4a', brand: '#2f5bd4' },
  },
]

export const DEFAULT_THEME: ThemeId = 'luxury-white'
export const THEME_STORAGE_KEY = 'yiminum-theme'
