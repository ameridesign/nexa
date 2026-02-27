import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import AudiLogo from '../ui/AudiLogo'

interface ChatHistoryItem {
  id: string
  carName: string
  variant: string
  promptPreview: string
  timeAgo: string
  thumbnailGradient: string
}

const demoChatHistory: ChatHistoryItem[] = [
  {
    id: '1',
    carName: 'Audi e-tron GT',
    variant: 'quattro Performance',
    promptPreview: 'Create a dramatic sunset reveal with dynamic camera movements',
    timeAgo: '2 hours ago',
    thumbnailGradient: 'from-[#0A1929] to-black',
  },
  {
    id: '2',
    carName: 'Audi RS e-tron GT',
    variant: 'Carbon Edition',
    promptPreview: 'Fast-paced urban night drive with',
    timeAgo: 'Yesterday',
    thumbnailGradient: 'from-[#1A0A29] to-black',
  },
  {
    id: '3',
    carName: 'Audi Q8 e-tron',
    variant: '55 quattro',
    promptPreview: 'Elegant showcase in modern archi',
    timeAgo: '3 days ago',
    thumbnailGradient: 'from-[#0A2919] to-black',
  },
  {
    id: '4',
    carName: 'Audi RS7',
    variant: 'Performance',
    promptPreview: 'Mountain road adventure at gold',
    timeAgo: '1 week ago',
    thumbnailGradient: 'from-[#29190A] to-black',
  },
]

interface SidebarProps {
  onNewChat: () => void
  conversations: { id: string; title: string }[]
  activeConversationId?: string
  onSelectConversation: (id: string) => void
}

export default function Sidebar({
  onSelectConversation,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  if (collapsed) {
    return (
      <aside className="h-full w-[68px] bg-[rgba(0,0,0,0.80)] border-r border-black flex flex-col transition-all duration-300">
        <div className="flex items-center justify-center p-4 h-[80px] border-b border-border-subtle">
          <AudiLogo size={36} className="text-white" />
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-center pb-4">
          <button
            onClick={() => setCollapsed(false)}
            className="text-text-tertiary hover:text-white transition-colors"
          >
            <ChevronLeft size={16} className="rotate-180" />
          </button>
        </div>
      </aside>
    )
  }

  return (
    <aside className="h-full w-[319px] bg-[rgba(0,0,0,0.80)] border-r border-black flex flex-col transition-all duration-300">
      {/* Header - Audi Logo + Collapse */}
      <div className="flex items-center justify-between px-6 pt-6 pb-[0.8px] h-[80px] border-b border-border-subtle">
        <AudiLogo size={69} className="text-white" />
        <button
          onClick={() => setCollapsed(true)}
          className="w-8 h-8 rounded-[10px] flex items-center justify-center"
        >
          <div className="px-1.5 flex items-center">
            <ChevronLeft size={16} className="text-text-tertiary" />
          </div>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 pt-4 px-4 overflow-y-auto flex flex-col">
        <div className="text-text-secondary text-base font-normal leading-[25.6px] h-[34px]">
          Chats
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {demoChatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                onSelectConversation(chat.id)
                navigate('/chat')
              }}
              className="w-full p-[13px] bg-surface-card rounded-[14px] border border-border-subtle flex flex-col gap-2 text-left hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              {/* Thumbnail + Info Row */}
              <div className="flex gap-3 h-16">
                {/* Thumbnail */}
                <div
                  className={`w-20 h-16 rounded-[10px] bg-gradient-to-b ${chat.thumbnailGradient} overflow-hidden shrink-0 relative`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-transparent" />
                </div>
                {/* Text Info */}
                <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-white text-sm font-normal font-[family-name:var(--font-family-display)] truncate">
                    {chat.carName}
                  </span>
                  <span className="text-text-muted text-xs font-normal font-[family-name:var(--font-family-display)] truncate">
                    {chat.variant}
                  </span>
                  <span className="text-text-muted text-xs font-normal font-[family-name:var(--font-family-display)] truncate">
                    {chat.promptPreview}
                  </span>
                </div>
              </div>
              {/* Timestamp Row */}
              <div className="flex items-center justify-between">
                <span className="text-text-muted text-[11px] font-normal font-[family-name:var(--font-family-display)]">
                  {chat.timeAgo}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer - Clear History */}
      <div className="px-4 pt-[16.8px] pb-4 border-t border-border-subtle">
        <button className="w-full h-[42.6px] bg-surface-card rounded-[10px] border border-border-default flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-colors">
          <span className="text-text-tertiary text-sm font-medium">
            Clear History
          </span>
        </button>
      </div>
    </aside>
  )
}
