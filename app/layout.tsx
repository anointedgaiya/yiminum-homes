import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { DEFAULT_THEME } from '@/lib/themes'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yiminum Homes — Find a place that feels like home',
  description:
    'Discover exceptional homes, apartments and properties designed around the way you want to live. Premium real estate from Yiminum Homes.',
  keywords: ['real estate', 'luxury homes', 'property', 'apartments', 'homes for sale', 'homes for rent'],
  openGraph: {
    title: 'Yiminum Homes — Find a place that feels like home',
    description:
      'Discover exceptional homes, apartments and properties designed around the way you want to live.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#fdfdfb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
