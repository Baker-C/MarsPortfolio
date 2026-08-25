import { createBrowserRouter } from 'react-router'
import { DesignIndex } from './pages/DesignIndex'
import { design1Routes } from './designs/design1/routes'
import { design2Routes } from './designs/design2/routes'
import { design3Routes } from './designs/design3/routes'

// Single route table. Each design owns its subtree under /designN and lives
// entirely inside src/designs/designN/.
export const router = createBrowserRouter([
  { path: '/', element: <DesignIndex /> },
  design1Routes,
  design2Routes,
  design3Routes,
])
