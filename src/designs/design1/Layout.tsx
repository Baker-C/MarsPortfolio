import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { ThemeScope, useTheme } from '../../theme/ThemeContext'
import { ThemeSwitcher } from '../../theme/ThemeSwitcher'
import { site } from '../../content/site'
import { vibeOrnament } from './components/vibe'

/** Folio ornament that follows the active vibe (rendered inside ThemeScope). */
function FolioOrnament() {
  const { vibe } = useTheme()
  return (
    <span aria-hidden className="hidden text-accent sm:block">
      {vibeOrnament[vibe]}
    </span>
  )
}

function folio(rel: string): { no: string; label: string } {
  if (rel === '') return { no: '01', label: 'Frontispiece' }
  if (rel === 'writing') return { no: '02', label: 'Contents' }
  if (rel === 'editing') return { no: '03', label: 'The Desk' }
  if (rel === 'gallery') return { no: '04', label: 'The Plates' }
  if (rel === 'about') return { no: '05', label: 'The Author' }
  if (rel === 'contact') return { no: '06', label: 'Correspondence' }
  return { no: '—', label: 'Field Journal' }
}

export function Layout() {
  const { pathname } = useLocation()
  const rel = pathname.replace(/^\/design1\/?/, '')
  const { no, label } = folio(rel)

  return (
    <ThemeScope designKey="design1" initialTheme="yosemite">
      <div className="fixed top-3 right-3 z-50">
        <ThemeSwitcher />
      </div>

      <div className="h-dvh overflow-hidden bg-surface p-3 sm:p-5 md:p-6">
        <div className="flex h-full flex-col overflow-hidden border border-edge bg-paper shadow-lg">
          <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-edge px-4 py-3 pr-20 sm:px-8 sm:pr-44">
            <div className="flex min-w-0 items-center gap-3 font-sans text-xs tracking-widest uppercase">
              <Link
                to="/"
                title="Back to the design shelf"
                className="whitespace-nowrap text-muted transition-colors hover:text-accent"
              >
                ← Shelf
              </Link>
              <span aria-hidden className="hidden h-3 border-l border-edge sm:block" />
              <Link
                to="/design1"
                className="hidden truncate text-ink transition-colors hover:text-accent sm:block"
              >
                {site.name} — Field Journal
              </Link>
            </div>

            <nav
              aria-label="Sections"
              className="flex items-center gap-3 font-sans text-xs tracking-widest uppercase sm:gap-5"
            >
              {site.nav.map(({ label: navLabel, path }) => (
                <NavLink
                  key={path}
                  to={path === '' ? '/design1' : `/design1/${path}`}
                  end={path === ''}
                  className={({ isActive }) =>
                    `border-b pb-0.5 transition-colors ${
                      isActive
                        ? 'border-accent text-accent'
                        : 'border-transparent text-muted hover:text-ink'
                    }`
                  }
                >
                  {navLabel}
                </NavLink>
              ))}
            </nav>
          </header>

          <main className="min-h-0 flex-1 overflow-hidden">
            <Outlet />
          </main>

          <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-edge px-4 py-2 font-sans text-xs tracking-widest uppercase text-muted sm:px-8">
            <span className="truncate">{site.title}</span>
            <FolioOrnament />
            <span className="whitespace-nowrap">
              {label} · Pg. No. {no}
            </span>
          </footer>
        </div>
      </div>
    </ThemeScope>
  )
}
