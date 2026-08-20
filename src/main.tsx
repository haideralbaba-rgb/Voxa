import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './styles.css'

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const root = document.getElementById('app')
if (!root) throw new Error('App root is missing')

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
