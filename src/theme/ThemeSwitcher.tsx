import { useEffect, useRef, useState } from 'react'
import { presetColors, themes, tokenRoles } from './themes'
import type { TokenRole } from './themes'
import { useTheme } from './ThemeContext'

/**
 * Compact color-theme picker with a customize panel: besides switching
 * between the six palette themes, each color role can be swapped for any
 * preset swatch gathered from the ColorPalette reference images. Each design
 * places this in the top-right of its layout; positioning is the parent's
 * job, appearance is shared.
 */
export function ThemeSwitcher() {
  const { theme, setTheme, overrides, setColorOverride, resetOverrides, effectiveColor } =
    useTheme()
  const [open, setOpen] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [expandedRole, setExpandedRole] = useState<TokenRole | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = themes.find((t) => t.id === theme) ?? themes[0]
  const hasOverrides = Object.keys(overrides).length > 0

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
        <span className="hidden sm:inline">
          {active.label}
          {hasOverrides && <span aria-hidden title="Custom colors active"> *</span>}
        </span>
        <span aria-hidden className="text-muted">
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-96 w-64 overflow-y-auto rounded-xl border border-edge bg-paper shadow-lg">
          <ul>
            {themes.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTheme(t.id)
                    setExpandedRole(null)
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

          <div className="border-t border-edge">
            <button
              type="button"
              onClick={() => {
                setCustomizing((v) => !v)
                setExpandedRole(null)
              }}
              aria-expanded={customizing}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-xs tracking-widest text-muted uppercase transition-colors hover:bg-surface"
            >
              <span>Customize colors</span>
              <span aria-hidden>{customizing ? '▴' : '▾'}</span>
            </button>

            {customizing && (
              <div className="pb-2">
                {tokenRoles.map(({ role, label }) => (
                  <div key={role}>
                    <button
                      type="button"
                      onClick={() => setExpandedRole(expandedRole === role ? null : role)}
                      aria-expanded={expandedRole === role}
                      className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-surface"
                    >
                      <Dot hex={effectiveColor(role)} />
                      <span className="flex-1">{label}</span>
                      {overrides[role] && (
                        <span className="text-xs text-accent" title="Swapped from theme default">
                          swapped
                        </span>
                      )}
                      <span aria-hidden className="text-muted">
                        {expandedRole === role ? '▴' : '▾'}
                      </span>
                    </button>

                    {expandedRole === role && (
                      <div className="grid grid-cols-8 gap-1.5 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => setColorOverride(role, null)}
                          title="Theme default"
                          aria-label={`${label}: theme default`}
                          className="relative"
                        >
                          <Dot
                            hex={(themes.find((t) => t.id === theme) ?? themes[0]).colors[role]}
                            selected={!overrides[role]}
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 flex items-center justify-center text-xs text-ink/60"
                          >
                            ↺
                          </span>
                        </button>
                        {presetColors.map((p) => (
                          <button
                            key={p.hex + p.name}
                            type="button"
                            onClick={() => setColorOverride(role, p.hex)}
                            title={p.name}
                            aria-label={`${label}: ${p.name}`}
                          >
                            <Dot hex={p.hex} selected={overrides[role] === p.hex} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {hasOverrides && (
                  <button
                    type="button"
                    onClick={() => {
                      resetOverrides()
                      setExpandedRole(null)
                    }}
                    className="mx-3 mt-1 rounded-full border border-edge px-3 py-1 text-xs text-ink transition-colors hover:bg-surface"
                  >
                    Reset to {active.label}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Dot({ hex, selected = false }: { hex: string; selected?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-5 rounded-full border ${
        selected ? 'border-ink ring-1 ring-ink' : 'border-edge'
      }`}
      style={{ backgroundColor: hex }}
    />
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
