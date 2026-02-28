import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import { SidebarProvider } from './SidebarContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-black">
        <Sidebar />
        <main className="flex-1 min-w-0 h-full overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}
