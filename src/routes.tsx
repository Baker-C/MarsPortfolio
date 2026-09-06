import { createBrowserRouter } from 'react-router'
import { Home } from './pages/Home'

// Nature-editorial mock: one spread while the design direction settles.
export const router = createBrowserRouter([{ path: '/', element: <Home /> }])
