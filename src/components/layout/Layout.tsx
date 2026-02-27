import type { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <Sidebar />
      <main className="flex-1 min-w-0 h-full overflow-y-auto">{children}</main>
    </div>
  )
}
