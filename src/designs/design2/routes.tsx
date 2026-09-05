import { Outlet } from 'react-router'
import type { RouteObject } from 'react-router'
import { ThemeScope } from '../../theme/ThemeContext'
import { ThemeSwitcher } from '../../theme/ThemeSwitcher'
import { site } from '../../content/site'
import { PosterNav } from './components/PosterNav'
import { MarqueeStrip } from './components/MarqueeStrip'
import { Home } from './pages/Home'
import { Writing } from './pages/Writing'
import { Editing } from './pages/Editing'
import { Gallery } from './pages/Gallery'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

function Layout() {
  const navItems = site.nav.map((item) => ({
    label: item.label,
    href: `/design2/${item.path}`,
    end: item.path === '',
  }))

  return (
    <ThemeScope designKey="design2" initialTheme="sunset">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>
      <div className="flex h-dvh flex-col overflow-hidden">
        <PosterNav items={navItems} />
        <main className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
        <MarqueeStrip text={`${site.name} — stories · poems · essays · advocacy`} />
      </div>
    </ThemeScope>
  )
}

export const design2Routes: RouteObject = {
  path: '/design2',
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
