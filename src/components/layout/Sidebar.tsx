import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  History,
  Sparkles,
  User,
} from 'lucide-react'
import AudiLogo from '../ui/AudiLogo'

interface SidebarProps {
  onNewChat: () => void
  conversations: { id: string; title: string }[]
  activeConversationId?: string
  onSelectConversation: (id: string) => void
}

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({
  onNewChat,
  conversations,
  activeConversationId,
  onSelectConversation,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside
      className={`h-full bg-audi-sidebar border-r border-audi-border flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-[280px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-audi-border">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
          <AudiLogo size={collapsed ? 36 : 80} className="text-white shrink-0" />
          {!collapsed && (
            <div>
              <h1 className="text-sm font-semibold text-white tracking-wide">Audi AI</h1>
              <p className="text-[10px] text-audi-gray-500 tracking-wider uppercase">Platform</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-audi-gray-500 hover:text-white transition-colors ${
            collapsed ? 'hidden' : ''
          }`}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={() => {
            onNewChat()
            navigate('/chat')
          }}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-audi-red hover:bg-audi-red-light text-white text-sm font-medium transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <Plus size={16} />
          {!collapsed && <span>New Chat</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-audi-card text-white'
                  : 'text-audi-gray-400 hover:text-white hover:bg-audi-card/50'
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Chat History */}
      {!collapsed && conversations.length > 0 && (
        <div className="flex-1 overflow-y-auto px-3 mt-4">
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-audi-gray-500 uppercase tracking-wider">
            <History size={12} />
            <span>Recent Chats</span>
          </div>
          <div className="space-y-0.5">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  onSelectConversation(conv.id)
                  navigate('/chat')
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                  activeConversationId === conv.id
                    ? 'bg-audi-card text-white'
                    : 'text-audi-gray-400 hover:text-white hover:bg-audi-card/50'
                }`}
              >
                {conv.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expand button when collapsed */}
      {collapsed && (
        <div className="flex-1 flex items-end justify-center pb-4">
          <button
            onClick={() => setCollapsed(false)}
            className="text-audi-gray-500 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-audi-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-audi-card flex items-center justify-center">
              <User size={14} className="text-audi-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">Audi Engineer</p>
              <div className="flex items-center gap-1">
                <Sparkles size={10} className="text-audi-red" />
                <p className="text-[10px] text-audi-gray-500">Pro Access</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
