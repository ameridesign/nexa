import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Plus, Search, Menu, MessageSquare, X } from 'lucide-react'
import AudiLogo from '../ui/AudiLogo'

const BASE = import.meta.env.BASE_URL

interface ChatHistoryItem {
  id: string
  carName: string
  variant: string
  promptPreview: string
  timeAgo: string
  thumbnail: string
}

const demoChatHistory: ChatHistoryItem[] = [
  {
    id: '1',
    carName: 'Audi e-tron GT',
    variant: 'quattro Performance',
    promptPreview: 'Create a dramatic sunset reveal with dynamic camera movements',
    timeAgo: '2 hours ago',
    thumbnail: `${BASE}etron.png`,
  },
  {
    id: '2',
    carName: 'Audi RS e-tron GT',
    variant: 'Carbon Edition',
    promptPreview: 'Fast-paced urban night drive with',
    timeAgo: 'Yesterday',
    thumbnail: `${BASE}rsetron.png`,
  },
  {
    id: '3',
    carName: 'Audi Q8 e-tron',
    variant: '55 quattro',
    promptPreview: 'Elegant showcase in modern archi',
    timeAgo: '3 days ago',
    thumbnail: `${BASE}q8.png`,
  },
  {
    id: '4',
    carName: 'Audi RS7',
    variant: 'Performance',
    promptPreview: 'Mountain road adventure at gold',
    timeAgo: '1 week ago',
    thumbnail: `${BASE}rs7.png`,
  },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = searchQuery
    ? demoChatHistory.filter(
        (c) =>
          c.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.promptPreview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : demoChatHistory

  const handleChatClick = (chat: ChatHistoryItem) => {
    navigate('/preview', { state: { prompt: chat.promptPreview, carName: chat.carName } })
  }

  const handleNewChat = () => {
    navigate('/')
  }

  if (collapsed) {
    return (
      <aside
        className="h-full flex flex-col shrink-0"
        style={{
          width: 60,
          background: '#1A1F2B',
          borderRight: '0.8px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Expand button */}
        <div
          className="flex items-center justify-center shrink-0"
          style={{ height: 64, borderBottom: '0.8px solid rgba(255, 255, 255, 0.06)' }}
        >
          <button
            onClick={() => setCollapsed(false)}
            className="flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
            style={{ width: 40, height: 40, borderRadius: 10 }}
          >
            <Menu size={20} color="#99A1AF" />
          </button>
        </div>

        {/* Collapsed icon buttons */}
        <div className="flex flex-col items-center" style={{ padding: '16px 0', gap: 4 }}>
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
            style={{ width: 40, height: 40, borderRadius: 10 }}
            title="New Chat"
          >
            <Plus size={20} color="#99A1AF" />
          </button>
          <button
            onClick={() => {
              setCollapsed(false)
              setTimeout(() => {
                const el = document.querySelector<HTMLInputElement>('[data-sidebar-search]')
                el?.focus()
              }, 100)
            }}
            className="flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
            style={{ width: 40, height: 40, borderRadius: 10 }}
            title="Search Chats"
          >
            <Search size={18} color="#99A1AF" />
          </button>
        </div>

        <div className="flex-1" />

        {/* Collapsed footer */}
        <div className="flex items-center justify-center" style={{ paddingBottom: 20 }}>
          <AudiLogo size={32} className="text-white opacity-30" />
        </div>
      </aside>
    )
  }

  return (
    <aside
      className="h-full flex flex-col shrink-0"
      style={{
        width: 280,
        background: '#1A1F2B',
        borderRight: '0.8px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0"
        style={{
          height: 64,
          padding: '0 12px 0 20px',
          borderBottom: '0.8px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <button onClick={() => navigate('/')} className="flex items-center hover:opacity-80 transition-opacity">
          <AudiLogo size={60} className="text-white" />
        </button>
        <button
          onClick={() => setCollapsed(true)}
          className="flex items-center justify-center transition-all hover:bg-white/10 active:scale-95"
          style={{ width: 32, height: 32, borderRadius: 8 }}
        >
          <ChevronLeft size={16} color="#99A1AF" />
        </button>
      </div>

      {/* Actions: New Chat + Search */}
      <div style={{ padding: '16px 14px 0' }}>
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center transition-all hover:brightness-110 active:scale-[0.98]"
          style={{
            height: 40,
            borderRadius: 10,
            background: '#657081',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <Plus size={16} color="white" />
          <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>
            New Chat
          </span>
        </button>

        <div
          className="flex items-center"
          style={{
            height: 36,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '0.8px solid rgba(255, 255, 255, 0.08)',
            gap: 8,
          }}
        >
          <Search size={14} color="#6A7282" />
          <input
            data-sidebar-search
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none placeholder:text-[#4B5563]"
            style={{ color: 'white', fontSize: 13, lineHeight: '20px' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="hover:opacity-80">
              <X size={12} color="#6A7282" />
            </button>
          )}
        </div>
      </div>

      {/* Chat History */}
      <div
        className="flex-1 overflow-y-auto flex flex-col min-h-0"
        style={{ padding: '12px 10px 0' }}
      >
        <div
          className="shrink-0"
          style={{
            color: '#6A7282',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.5,
            lineHeight: '16px',
            marginBottom: 8,
            paddingLeft: 6,
          }}
        >
          RECENT
        </div>

        <div className="flex flex-col" style={{ gap: 2 }}>
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className="w-full flex items-center text-left transition-all hover:bg-white/[0.06] rounded-xl"
              style={{
                padding: '10px 10px',
                gap: 12,
              }}
            >
              {/* Thumbnail */}
              <img
                src={chat.thumbnail}
                alt={chat.carName}
                className="shrink-0 object-cover"
                style={{
                  width: 48,
                  height: 40,
                  borderRadius: 8,
                }}
              />

              {/* Text */}
              <div className="flex-1 flex flex-col overflow-hidden" style={{ gap: 2 }}>
                <span
                  className="truncate"
                  style={{ color: '#FAFAFA', fontSize: 13, fontWeight: 600, lineHeight: '20px' }}
                >
                  {chat.carName}
                </span>
                <span
                  className="truncate"
                  style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}
                >
                  {chat.promptPreview}
                </span>
              </div>
            </button>
          ))}

          {filteredChats.length === 0 && (
            <div className="flex flex-col items-center" style={{ padding: '24px 0', gap: 8 }}>
              <MessageSquare size={20} color="#4B5563" />
              <span style={{ color: '#4B5563', fontSize: 13 }}>No chats found</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="shrink-0"
        style={{ padding: '12px 14px 16px', borderTop: '0.8px solid rgba(255, 255, 255, 0.06)' }}
      >
        <button
          className="w-full flex items-center justify-center transition-all hover:bg-white/[0.06]"
          style={{
            height: 36,
            borderRadius: 10,
          }}
        >
          <span style={{ color: '#6A7282', fontSize: 13, lineHeight: '20px' }}>
            Clear History
          </span>
        </button>
      </div>
    </aside>
  )
}
