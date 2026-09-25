'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEMES, type ThemeId } from '@/lib/themes'

const AUTO_SWITCH_INTERVAL = 5000

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  autoSwitch: boolean
  setAutoSwitch: (value: boolean) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function applyTheme(next: ThemeId) {
  document.documentElement.setAttribute('data-theme', next)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME)
  const [autoSwitch, setAutoSwitch] = useState(true)
  const themeRef = useRef<ThemeId>(DEFAULT_THEME)

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
    if (stored) {
      themeRef.current = stored
      setThemeState(stored)
      applyTheme(stored)
    }
  }, [])

  // Auto-cycle through the themes every 5 seconds until the user manually picks one.
  useEffect(() => {
    if (!autoSwitch) return
    const interval = window.setInterval(() => {
      const currentIndex = THEMES.findIndex((t) => t.id === themeRef.current)
      const next = THEMES[(currentIndex + 1) % THEMES.length].id
      themeRef.current = next
      setThemeState(next)
      applyTheme(next)
    }, AUTO_SWITCH_INTERVAL)
    return () => window.clearInterval(interval)
  }, [autoSwitch])

  const setTheme = useCallback((next: ThemeId) => {
    themeRef.current = next
    setThemeState(next)
    applyTheme(next)
    setAutoSwitch(false)
    window.localStorage.setItem(THEME_STORAGE_KEY, next)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, autoSwitch, setAutoSwitch }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
