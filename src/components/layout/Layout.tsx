import type { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
  onNewChat: () => void
  conversations: { id: string; title: string }[]
  activeConversationId?: string
  onSelectConversation: (id: string) => void
}

export default function Layout({
  children,
  onNewChat,
  conversations,
  activeConversationId,
  onSelectConversation,
}: LayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-azure-8">
      <Sidebar
        onNewChat={onNewChat}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={onSelectConversation}
      />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
