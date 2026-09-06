import { createBrowserRouter } from 'react-router'
import { Chooser } from './pages/Chooser'
import { VariantA } from './pages/VariantA'
import { VariantB } from './pages/VariantB'
import { SectionWorks } from './pages/SectionWorks'

// Nature-editorial scroll mocks: /a one continuous scroll, /b chapter cards.
export const router = createBrowserRouter([
  { path: '/', element: <Chooser /> },
  { path: '/a', element: <VariantA /> },
  { path: '/b', element: <VariantB /> },
  { path: '/b/:sectionSlug', element: <SectionWorks /> },
])
