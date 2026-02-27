import { useState } from 'react'
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
    thumbnailGradient: 'linear-gradient(180deg, #0A1929 0%, #000 100%)',
  },
  {
    id: '2',
    carName: 'Audi RS e-tron GT',
    variant: 'Carbon Edition',
    promptPreview: 'Fast-paced urban night drive with',
    timeAgo: 'Yesterday',
    thumbnailGradient: 'linear-gradient(180deg, #1A0A29 0%, #000 100%)',
  },
  {
    id: '3',
    carName: 'Audi Q8 e-tron',
    variant: '55 quattro',
    promptPreview: 'Elegant showcase in modern archi',
    timeAgo: '3 days ago',
    thumbnailGradient: 'linear-gradient(180deg, #0A2919 0%, #000 100%)',
  },
  {
    id: '4',
    carName: 'Audi RS7',
    variant: 'Performance',
    promptPreview: 'Mountain road adventure at gold',
    timeAgo: '1 week ago',
    thumbnailGradient: 'linear-gradient(180deg, #29190A 0%, #000 100%)',
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <aside className="h-full w-[68px] flex flex-col shrink-0 border-r border-black transition-all duration-300" style={{ background: 'rgba(0, 0, 0, 0.80)' }}>
        <div className="flex items-center justify-center h-[81px] border-b border-[rgba(255,255,255,0.05)]">
          <AudiLogo size={36} className="text-white" />
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-center pb-4">
          <button
            onClick={() => setCollapsed(false)}
            className="text-[#99A1AF] hover:text-white transition-colors"
          >
            <ChevronLeft size={16} className="rotate-180" />
          </button>
        </div>
      </aside>
    )
  }

  return (
    <aside className="h-full w-[319px] flex flex-col shrink-0 border-r border-black transition-all duration-300" style={{ background: 'rgba(0, 0, 0, 0.80)' }}>

      {/* Header — Audi Logo + Collapse */}
      <div className="flex items-center justify-between px-6 pt-6 h-[81px] border-b border-[rgba(255,255,255,0.05)]">
        <AudiLogo size={69} className="text-white" />
        <button
          onClick={() => setCollapsed(true)}
          className="w-8 h-8 rounded-[10px] flex items-center justify-center"
        >
          <ChevronLeft size={16} className="text-[#99A1AF]" />
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 pt-4 px-4 overflow-y-auto flex flex-col">
        <div className="text-[#A1A1A1] text-[16px] font-normal leading-[25.6px] mb-3">
          Chats
        </div>
        <div className="flex flex-col gap-3">
          {demoChatHistory.map((chat) => (
            <button
              key={chat.id}
              className="w-full p-[13px] rounded-[14px] border border-[rgba(255,255,255,0.05)] flex flex-col gap-2 text-left hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            >
              {/* Thumbnail + Info */}
              <div className="flex gap-3 h-16">
                {/* Thumbnail */}
                <div
                  className="w-[80px] h-[64px] rounded-[10px] overflow-hidden shrink-0 relative"
                  style={{ background: chat.thumbnailGradient }}
                >
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0) 100%)' }} />
                </div>
                {/* Text Info */}
                <div className="flex-1 flex flex-col gap-[2px] overflow-hidden pt-[2px]">
                  <span className="text-white text-[14px] font-normal font-[family-name:var(--font-family-display)] truncate leading-[21px]">
                    {chat.carName}
                  </span>
                  <span className="text-[#6A7282] text-[12px] font-normal font-[family-name:var(--font-family-display)] truncate">
                    {chat.variant}
                  </span>
                  <span className="text-[#6A7282] text-[12px] font-normal font-[family-name:var(--font-family-display)] truncate">
                    {chat.promptPreview}
                  </span>
                </div>
              </div>
              {/* Timestamp */}
              <div className="flex items-center">
                <span className="text-[#6A7282] text-[11px] font-normal font-[family-name:var(--font-family-display)]">
                  {chat.timeAgo}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer — Clear History */}
      <div className="px-4 pt-[17px] pb-4 border-t border-[rgba(255,255,255,0.05)]">
        <button
          className="w-full h-[43px] rounded-[10px] border border-[rgba(255,255,255,0.10)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] transition-colors"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <span className="text-[#99A1AF] text-[14px] font-medium leading-[21px]">
            Clear History
          </span>
        </button>
      </div>
    </aside>
  )
}
