import { useEffect, useRef, useState } from 'react'
import { presetColors, themes, tokenRoles } from './themes'
import type { TokenRole } from './themes'
import { fontOptions, fontRoles, fontSets } from './fonts'
import type { FontRole } from './fonts'
import { useTheme } from './ThemeContext'

type Section = 'colors' | 'fontsets' | 'fonts'

/**
 * Compact theme picker with customize panels: switch between the six palette
 * themes, swap any color role for a preset from the ColorPalette pool, pick a
 * font set (a title font from the reference list plus matched supporting
 * fonts), or swap any font role individually. Each design places this in the
 * top-right of its layout; positioning is the parent's job, appearance is
 * shared. Inline styles here are data previews (swatch hexes, font faces),
 * a sanctioned exception to the tokens-only rule.
 */
export function ThemeSwitcher() {
  const {
    theme,
    setTheme,
    overrides,
    setColorOverride,
    resetOverrides,
    effectiveColor,
    fontSet,
    setFontSet,
    fontOverrides,
    setFontOverride,
    resetFontOverrides,
    effectiveFont,
  } = useTheme()
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState<Section | null>(null)
  const [expandedRole, setExpandedRole] = useState<TokenRole | null>(null)
  const [expandedFontRole, setExpandedFontRole] = useState<FontRole | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = themes.find((t) => t.id === theme) ?? themes[0]
  const activeFontSet = fontSets.find((s) => s.id === fontSet) ?? fontSets[0]
  const hasColorOverrides = Object.keys(overrides).length > 0
  const hasFontOverrides = Object.keys(fontOverrides).length > 0
  const customized = hasColorOverrides || hasFontOverrides

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const toggleSection = (s: Section) => {
    setSection((cur) => (cur === s ? null : s))
    setExpandedRole(null)
    setExpandedFontRole(null)
  }

  return (
    <div ref={rootRef} className="relative font-ui text-sm">
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
          {customized && <span aria-hidden title="Customizations active"> *</span>}
        </span>
        <span aria-hidden className="text-muted">
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-edge bg-paper shadow-lg">
          <div className="flex shrink-0 items-center justify-between border-b border-edge px-3 py-2.5">
            <span className="text-xs tracking-widest text-muted uppercase">Appearance</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close appearance panel"
              className="rounded-full px-2 py-0.5 text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              ✕
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
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

          {/* ---- Colors ---- */}
          <div className="border-t border-edge">
            <SectionHeader
              label="Customize colors"
              open={section === 'colors'}
              onClick={() => toggleSection('colors')}
            />
            {section === 'colors' && (
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
                          <Dot hex={active.colors[role]} selected={!overrides[role]} />
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

                {hasColorOverrides && (
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

          {/* ---- Font sets ---- */}
          <div className="border-t border-edge">
            <SectionHeader
              label={`Font set · ${activeFontSet.label}`}
              open={section === 'fontsets'}
              onClick={() => toggleSection('fontsets')}
            />
            {section === 'fontsets' && (
              <ul className="pb-2">
                {fontSets.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setFontSet(s.id)}
                      className={`flex w-full items-baseline gap-2 px-3 py-1.5 text-left transition-colors hover:bg-surface ${
                        s.id === fontSet ? 'bg-surface font-medium' : ''
                      }`}
                    >
                      <span
                        className="flex-1 text-base"
                        style={{ fontFamily: fontById(s.fonts.display) }}
                      >
                        {s.label}
                      </span>
                      <span className="text-xs text-muted">{s.note}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ---- Individual fonts ---- */}
          <div className="border-t border-edge">
            <SectionHeader
              label="Customize fonts"
              open={section === 'fonts'}
              onClick={() => toggleSection('fonts')}
            />
            {section === 'fonts' && (
              <div className="pb-2">
                {fontRoles.map(({ role, label }) => {
                  const current = effectiveFont(role)
                  return (
                    <div key={role}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedFontRole(expandedFontRole === role ? null : role)
                        }
                        aria-expanded={expandedFontRole === role}
                        className="flex w-full items-baseline gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-surface"
                      >
                        <span className="w-24 shrink-0 text-xs tracking-wider text-muted uppercase">
                          {label}
                        </span>
                        <span
                          className="flex-1 truncate text-base"
                          style={{ fontFamily: current.stack }}
                        >
                          {current.label}
                        </span>
                        {fontOverrides[role] && (
                          <span className="text-xs text-accent" title="Swapped from set default">
                            swapped
                          </span>
                        )}
                        <span aria-hidden className="text-muted">
                          {expandedFontRole === role ? '▴' : '▾'}
                        </span>
                      </button>

                      {expandedFontRole === role && (
                        <ul className="border-y border-edge">
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                setFontOverride(role, null)
                                setExpandedFontRole(null)
                              }}
                              className={`flex w-full items-baseline gap-2 px-3 py-1 text-left transition-colors hover:bg-surface ${
                                !fontOverrides[role] ? 'bg-surface font-medium' : ''
                              }`}
                            >
                              <span aria-hidden>↺</span>
                              <span
                                className="text-base"
                                style={{ fontFamily: fontById(activeFontSet.fonts[role]) }}
                              >
                                Set default
                              </span>
                            </button>
                          </li>
                          {fontOptions.map((o) => (
                            <li key={o.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setFontOverride(role, o.id)
                                  setExpandedFontRole(null)
                                }}
                                className={`flex w-full items-baseline justify-between gap-2 px-3 py-1 text-left transition-colors hover:bg-surface ${
                                  fontOverrides[role] === o.id ? 'bg-surface font-medium' : ''
                                }`}
                              >
                                <span className="text-base" style={{ fontFamily: o.stack }}>
                                  {o.label}
                                </span>
                                {o.source === '1001fonts' && (
                                  <span className="text-xs text-muted">1001</span>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}

                {hasFontOverrides && (
                  <button
                    type="button"
                    onClick={() => {
                      resetFontOverrides()
                      setExpandedFontRole(null)
                    }}
                    className="mx-3 mt-1 rounded-full border border-edge px-3 py-1 text-xs text-ink transition-colors hover:bg-surface"
                  >
                    Reset to {activeFontSet.label}
                  </button>
                )}
              </div>
            )}
          </div>
          </div>
        </div>
      )}
    </div>
  )
}

function fontById(id: string): string {
  return fontOptions.find((o) => o.id === id)?.stack ?? ''
}

function SectionHeader({
  label,
  open,
  onClick,
}: {
  label: string
  open: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className="flex w-full items-center justify-between px-3 py-2 text-left text-xs tracking-widest text-muted uppercase transition-colors hover:bg-surface"
    >
      <span>{label}</span>
      <span aria-hidden>{open ? '▴' : '▾'}</span>
    </button>
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
