import { useEffect, useRef, useState } from 'react'
import { themes } from './themes'
import { useTheme } from './ThemeContext'

/**
 * Compact color-theme picker. Each design places this in the top-right of its
 * layout; positioning is the parent's job, appearance is shared.
 */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = themes.find((t) => t.id === theme) ?? themes[0]

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  return (
    <div ref={rootRef} className="relative font-sans text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Color theme: ${active.label}`}
        className="flex items-center gap-2 rounded-full border border-edge bg-surface/80 px-3 py-1.5 text-ink backdrop-blur transition-colors hover:border-muted"
      >
        <SwatchDots swatches={active.swatches} />
        <span className="hidden sm:inline">{active.label}</span>
        <span aria-hidden className="text-muted">
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <ul className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-edge bg-paper shadow-lg">
          {themes.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => {
                  setTheme(t.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors hover:bg-surface ${
                  t.id === theme ? 'bg-surface font-medium' : ''
                }`}
              >
                <SwatchDots swatches={t.swatches} />
                <span>{t.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SwatchDots({ swatches }: { swatches: [string, string, string] }) {
  return (
    <span aria-hidden className="flex items-center -space-x-1">
      {swatches.map((color) => (
        <span
          key={color}
          className="inline-block size-3.5 rounded-full border border-edge"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  )
}
