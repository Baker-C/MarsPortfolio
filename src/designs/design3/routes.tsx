import { Outlet } from 'react-router'
import type { RouteObject } from 'react-router'
import { ThemeScope } from '../../theme/ThemeContext'
import { ThemeSwitcher } from '../../theme/ThemeSwitcher'
import { site } from '../../content/site'
import { Nav } from './components/Nav'
import type { NavEntry } from './components/Nav'
import { Home } from './pages/Home'
import { Writing } from './pages/Writing'
import { ReaderPage } from './pages/ReaderPage'
import { Gallery } from './pages/Gallery'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

const entries: NavEntry[] = site.nav.map((item) => ({
  label: item.label,
  href: item.path ? `/design3/${item.path}` : '/design3',
  end: !item.path,
}))

function Layout() {
  return (
    <ThemeScope designKey="design3" initialTheme="meadow">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      <div className="relative flex h-dvh flex-col overflow-hidden">
        {/* textured ground: torn paper blocks and dashed frames behind everything */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-24 -left-20 h-72 w-96 rotate-6 bg-muted/10" />
          <div className="absolute -right-16 -bottom-10 h-80 w-96 -rotate-3 bg-accent-2/10" />
          <div className="absolute -bottom-16 left-1/3 h-40 w-64 rotate-2 border-2 border-dashed border-edge" />
          <div className="absolute top-10 right-1/4 h-24 w-24 rotate-12 rounded-full border-2 border-dashed border-muted/40" />
        </div>

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
    { path: 'writing/:slug', element: <ReaderPage /> },
    { path: 'gallery', element: <Gallery /> },
    { path: 'about', element: <About /> },
    { path: 'contact', element: <Contact /> },
  ],
}
