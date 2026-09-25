'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Palette } from 'lucide-react'
import { THEMES } from '@/lib/themes'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, autoSwitch, setAutoSwitch } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0]

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change site theme"
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3.5 py-2 text-sm font-medium backdrop-blur hover:border-brand/60 hover:text-foreground"
      >
        <Palette className="size-4 text-brand" />
        <span className="hidden sm:inline">{active.name}</span>
        <span className="flex items-center gap-1 sm:hidden">
          <span
            className="size-3.5 rounded-full ring-1 ring-black/10"
            style={{ background: active.swatch.brand }}
          />
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-72 origin-top-right overflow-hidden rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl shadow-black/10"
          style={{ animation: 'float-up 0.2s ease-out both' }}
        >
          <p className="px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Choose a theme
          </p>
          <button
            type="button"
            role="switch"
            aria-checked={autoSwitch}
            onClick={() => setAutoSwitch(!autoSwitch)}
            className="mb-1 flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-muted"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">Auto-switch themes</span>
              <span className="block truncate text-xs text-muted-foreground">
                Cycle every 5 seconds
              </span>
            </span>
            <span
              className={cn(
                'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors',
                autoSwitch ? 'bg-brand' : 'bg-muted-foreground/30',
              )}
            >
              <span
                className={cn(
                  'inline-block size-4 rounded-full bg-background shadow transition-transform',
                  autoSwitch ? 'translate-x-4' : 'translate-x-0.5',
                )}
              />
            </span>
          </button>
          <div className="mx-3 mb-1 border-t border-border/60" />
          {THEMES.map((t) => {
            const selected = t.id === theme
            return (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  setTheme(t.id)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-muted',
                  selected && 'bg-muted',
                )}
              >
                <span className="flex shrink-0 items-center -space-x-1.5">
                  <span
                    className="size-5 rounded-full ring-2 ring-background"
                    style={{ background: t.swatch.background }}
                  />
                  <span
                    className="size-5 rounded-full ring-2 ring-background"
                    style={{ background: t.swatch.foreground }}
                  />
                  <span
                    className="size-5 rounded-full ring-2 ring-background"
                    style={{ background: t.swatch.brand }}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {t.description}
                  </span>
                </span>
                {selected && <Check className="size-4 shrink-0 text-brand" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
