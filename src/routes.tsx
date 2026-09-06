import { createBrowserRouter } from 'react-router'
import { Base } from './pages/Base'

// Clean slate: a single base route while the next design direction is decided.
export const router = createBrowserRouter([{ path: '/', element: <Base /> }])
