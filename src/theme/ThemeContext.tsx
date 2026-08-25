import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { defaultTheme, isThemeId } from './themes'
import type { ThemeId } from './themes'

type ThemeContextValue = {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Wraps one design in a themable scope: sets data-theme (which activates a
 * palette from src/index.css) and remembers the choice per design.
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
  const storageKey = `mars-theme:${designKey}`
  const [theme, setTheme] = useState<ThemeId>(() => {
    const stored = localStorage.getItem(storageKey)
    return isThemeId(stored) ? stored : initialTheme
  })

  useEffect(() => {
    localStorage.setItem(storageKey, theme)
  }, [storageKey, theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        data-theme={theme}
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
