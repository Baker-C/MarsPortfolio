import { createBrowserRouter } from 'react-router'
import { Home } from './pages/Home'

// The whole site is the single scroll home; sections are in-page anchors.
// basename keeps the router working under the GitHub Pages subpath.
export const router = createBrowserRouter([{ path: '/', element: <Home /> }], {
  basename: import.meta.env.BASE_URL,
})
