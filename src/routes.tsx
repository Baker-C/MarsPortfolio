import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router'
import { Home } from './pages/Home'
import { SectionWorks } from './pages/SectionWorks'

// Root layout mounts scroll restoration once so navigation lands at the top.
function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

// The chapter-scroll direction: / is the scroll home; each chapter has its
// own page of full-bleed spreads.
export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/:sectionSlug', element: <SectionWorks /> },
    ],
  },
])
