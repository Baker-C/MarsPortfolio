import { createBrowserRouter } from 'react-router'
import { Home } from './pages/Home'

// The whole site is the single scroll home; sections are in-page anchors.
export const router = createBrowserRouter([{ path: '/', element: <Home /> }])
