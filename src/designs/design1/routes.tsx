import type { RouteObject } from 'react-router'
import { Layout } from './Layout'
import { Home } from './pages/Home'
import { Writing } from './pages/Writing'
import { ReaderPage } from './pages/ReaderPage'
import { Gallery } from './pages/Gallery'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

export const design1Routes: RouteObject = {
  path: '/design1',
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
