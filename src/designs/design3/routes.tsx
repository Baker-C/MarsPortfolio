import { Outlet } from 'react-router'
import type { RouteObject } from 'react-router'
import { ThemeScope, useTheme } from '../../theme/ThemeContext'
import { ThemeSwitcher } from '../../theme/ThemeSwitcher'
import { site } from '../../content/site'
import { Nav } from './components/Nav'
import type { NavEntry } from './components/Nav'
import { Home } from './pages/Home'
import { Writing } from './pages/Writing'
import { Editing } from './pages/Editing'
import { Gallery } from './pages/Gallery'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

const entries: NavEntry[] = site.nav.map((item) => ({
  label: item.label,
  href: item.path ? `/design3/${item.path}` : '/design3',
  end: !item.path,
}))

/** Textured ground behind everything — torn paper arranged per theme vibe. */
function Ground() {
  const { vibe } = useTheme()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {vibe === 'horizon' && (
        <>
          <div className="absolute inset-x-0 top-1/4 h-20 bg-muted/10" />
          <div className="absolute inset-x-0 bottom-1/4 h-28 bg-accent-2/10" />
          <div className="absolute inset-x-8 top-1/2 border-t-2 border-dashed border-edge" />
        </>
      )}
      {vibe === 'grove' && (
        <>
          <div className="absolute inset-y-0 -left-10 w-48 rotate-2 bg-muted/10" />
          <div className="absolute inset-y-0 left-24 w-20 -rotate-1 bg-accent-2/10" />
          <div className="absolute inset-y-0 -right-8 w-40 -rotate-2 border-2 border-dashed border-edge" />
        </>
      )}
      {vibe === 'pond' && (
        <>
          <div className="absolute top-16 left-16 size-56 rounded-full bg-muted/10" />
          <div className="absolute right-24 bottom-10 size-72 rounded-full bg-accent-2/10" />
          <div className="absolute top-1/2 left-1/2 size-24 rounded-full border-2 border-dashed border-muted/40" />
          <div className="absolute bottom-1/3 left-1/4 size-10 rounded-full border border-dashed border-accent/40" />
        </>
      )}
      {vibe === 'bloom' && (
        <>
          <div className="absolute top-24 -left-20 h-72 w-96 rotate-6 bg-muted/10" />
          <div className="absolute -right-16 -bottom-10 h-80 w-96 -rotate-3 bg-accent-2/10" />
          <div className="absolute -bottom-16 left-1/3 h-40 w-64 rotate-2 border-2 border-dashed border-edge" />
          <div className="absolute top-10 right-1/4 h-24 w-24 rotate-12 rounded-full border-2 border-dashed border-muted/40" />
        </>
      )}
      {vibe === 'ridge' && (
        <>
          <div className="absolute inset-y-0 left-1/4 w-24 bg-muted/10" />
          <div className="absolute inset-y-0 left-1/3 w-40 bg-accent-2/10" />
          <div className="absolute -bottom-20 right-10 size-72 rotate-45 border-2 border-dashed border-edge" />
        </>
      )}
      {vibe === 'bouquet' && (
        <>
          <div className="absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2/10" />
          <div className="absolute top-6 left-6 size-24 rounded-full border-2 border-dashed border-muted/40" />
          <div className="absolute right-6 bottom-6 size-24 rounded-full border-2 border-dashed border-accent/30" />
        </>
      )}
    </div>
  )
}

function Layout() {
  return (
    <ThemeScope designKey="design3" initialTheme="meadow">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      <div className="relative flex h-dvh flex-col overflow-hidden">
        <Ground />

        <Nav name={site.name} entries={entries} />

        <main className="relative min-h-0 flex-1">
          <Outlet />
        </main>
      </div>
    </ThemeScope>
  )
}

export const design3Routes: RouteObject = {
  path: '/design3',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'writing', element: <Writing /> },
    { path: 'editing', element: <Editing /> },
    { path: 'gallery', element: <Gallery /> },
    { path: 'about', element: <About /> },
    { path: 'contact', element: <Contact /> },
  ],
}
