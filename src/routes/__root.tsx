import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: 'Vesper.ai — Operational AI Infrastructure' },
      { name: 'description', content: 'Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.' },
      { name: 'theme-color', content: '#000000' },
    ],
    links: [
      { rel: 'icon', href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cg transform='rotate(-30 12 12)'%3E%3Ccircle cx='7.3' cy='3.2' r='1.45'/%3E%3Crect x='5.5' y='4.7' width='3.6' height='14.6' rx='1.8'/%3E%3Crect x='14.9' y='4.7' width='3.6' height='14.6' rx='1.8'/%3E%3Ccircle cx='16.7' cy='20.8' r='1.45'/%3E%3C/g%3E%3C/svg%3E" },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body style={{ background:'#000', color:'#fff' }}>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
