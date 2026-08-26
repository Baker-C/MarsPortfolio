import { createContext, useContext, useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { defaultTheme, getTheme, isThemeId, tokenRoles } from './themes'
import type { ThemeId, ThemeVibe, TokenRole } from './themes'
import {
  defaultFontSet,
  fontRoles,
  fontVar,
  getFontOption,
  getFontSet,
  isFontOptionId,
  isFontSetId,
} from './fonts'
import type { FontOption, FontRole } from './fonts'

/** Per-theme user color overrides: role -> preset hex. */
export type ThemeOverrides = Partial<Record<ThemeId, Partial<Record<TokenRole, string>>>>
/** Per-font-set user font overrides: role -> font option id. */
export type FontOverrides = Record<string, Partial<Record<FontRole, string>>>

type ThemeContextValue = {
  theme: ThemeId
  /** Layout personality of the active theme — designs recompose on this. */
  vibe: ThemeVibe
  setTheme: (theme: ThemeId) => void
  /** Color overrides for the ACTIVE theme only. */
  overrides: Partial<Record<TokenRole, string>>
  /** hex to override with, or null to restore the theme default. */
  setColorOverride: (role: TokenRole, hex: string | null) => void
  resetOverrides: () => void
  /** Effective color of a role in the active theme (override or base). */
  effectiveColor: (role: TokenRole) => string

  fontSet: string
  setFontSet: (id: string) => void
  /** Font overrides for the ACTIVE font set only. */
  fontOverrides: Partial<Record<FontRole, string>>
  /** option id to override with, or null to restore the set default. */
  setFontOverride: (role: FontRole, optionId: string | null) => void
  resetFontOverrides: () => void
  /** Effective font of a role in the active set (override or set default). */
  effectiveFont: (role: FontRole) => FontOption
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function loadOverrides(storageKey: string): ThemeOverrides {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    const clean: ThemeOverrides = {}
    for (const [themeId, roles] of Object.entries(parsed)) {
      if (!isThemeId(themeId) || typeof roles !== 'object' || roles === null) continue
      for (const { role } of tokenRoles) {
        const hex = (roles as Record<string, unknown>)[role]
        if (typeof hex === 'string' && /^#[0-9a-f]{6}$/i.test(hex)) {
          ;(clean[themeId] ??= {})[role] = hex
        }
      }
    }
    return clean
  } catch {
    return {}
  }
}

function loadFontOverrides(storageKey: string): FontOverrides {
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    const clean: FontOverrides = {}
    for (const [setId, roles] of Object.entries(parsed)) {
      if (!isFontSetId(setId) || typeof roles !== 'object' || roles === null) continue
      for (const { role } of fontRoles) {
        const optionId = (roles as Record<string, unknown>)[role]
        if (isFontOptionId(optionId)) {
          ;(clean[setId] ??= {})[role] = optionId
        }
      }
    }
    return clean
  } catch {
    return {}
  }
}

/**
 * Wraps one design in a themable scope: sets data-theme (which activates a
 * palette from src/index.css) and remembers the choice per design. User
 * customizations — color overrides (preset swaps) and typography (font set +
 * per-role font overrides) — are applied as inline CSS variable overlays on
 * the scope: user data, not styling (see CLAUDE.md).
 */
export function ThemeScope({
  designKey,
  initialTheme = defaultTheme,
  children,
}: {
  designKey: string
  initialTheme?: ThemeId
  children: ReactNode
}) {
  const themeKey = `mars-theme:${designKey}`
  const overridesKey = `mars-theme-overrides:${designKey}`
  const fontSetKey = `mars-fontset:${designKey}`
  const fontOverridesKey = `mars-font-overrides:${designKey}`

  const [theme, setTheme] = useState<ThemeId>(() => {
    const stored = localStorage.getItem(themeKey)
    return isThemeId(stored) ? stored : initialTheme
  })
  const [allOverrides, setAllOverrides] = useState<ThemeOverrides>(() =>
    loadOverrides(overridesKey),
  )
  const [fontSet, setFontSet] = useState<string>(() => {
    const stored = localStorage.getItem(fontSetKey)
    return isFontSetId(stored) ? (stored as string) : defaultFontSet
  })
  const [allFontOverrides, setAllFontOverrides] = useState<FontOverrides>(() =>
    loadFontOverrides(fontOverridesKey),
  )

  useEffect(() => {
    localStorage.setItem(themeKey, theme)
  }, [themeKey, theme])

  useEffect(() => {
    localStorage.setItem(overridesKey, JSON.stringify(allOverrides))
  }, [overridesKey, allOverrides])

  useEffect(() => {
    localStorage.setItem(fontSetKey, fontSet)
  }, [fontSetKey, fontSet])

  useEffect(() => {
    localStorage.setItem(fontOverridesKey, JSON.stringify(allFontOverrides))
  }, [fontOverridesKey, allFontOverrides])

  const overrides = allOverrides[theme] ?? {}
  const fontOverrides = allFontOverrides[fontSet] ?? {}

  const setColorOverride = (role: TokenRole, hex: string | null) => {
    setAllOverrides((prev) => {
      const forTheme = { ...(prev[theme] ?? {}) }
      if (hex === null) delete forTheme[role]
      else forTheme[role] = hex
      return { ...prev, [theme]: forTheme }
    })
  }

  const resetOverrides = () => {
    setAllOverrides((prev) => ({ ...prev, [theme]: {} }))
  }

  const effectiveColor = (role: TokenRole) =>
    overrides[role] ?? getTheme(theme).colors[role]

  const setFontOverride = (role: FontRole, optionId: string | null) => {
    setAllFontOverrides((prev) => {
      const forSet = { ...(prev[fontSet] ?? {}) }
      if (optionId === null) delete forSet[role]
      else forSet[role] = optionId
      return { ...prev, [fontSet]: forSet }
    })
  }

  const resetFontOverrides = () => {
    setAllFontOverrides((prev) => ({ ...prev, [fontSet]: {} }))
  }

  const effectiveFont = (role: FontRole) =>
    getFontOption(fontOverrides[role] ?? getFontSet(fontSet).fonts[role])

  // CSS variable overlay. Colors: only overridden roles (the [data-theme]
  // block supplies the rest); edge tracks ink (~18% alpha) the same way each
  // theme block does in index.css. Fonts: all four roles, resolved from the
  // active set + overrides (:root supplies the 'classic' defaults).
  const overlay: Record<string, string> = {}
  for (const [role, hex] of Object.entries(overrides)) {
    overlay[`--${role}`] = hex
  }
  if (overrides.ink) overlay['--edge'] = `${overrides.ink}2e`
  for (const { role } of fontRoles) {
    overlay[fontVar[role]] = effectiveFont(role).stack
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        vibe: getTheme(theme).vibe,
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
      }}
    >
      <div
        data-theme={theme}
        style={overlay as CSSProperties}
        className="min-h-dvh bg-paper font-body text-ink transition-colors duration-300"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside a ThemeScope')
  return ctx
}
