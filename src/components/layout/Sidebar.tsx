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
      <aside
        className="h-full flex flex-col shrink-0 border-r border-black"
        style={{ width: 68, background: 'rgba(0, 0, 0, 0.80)' }}
      >
        <div className="flex items-center justify-center border-b border-[rgba(255,255,255,0.05)]" style={{ height: 80 }}>
          <AudiLogo size={36} className="text-white" />
        </div>
        <div className="flex-1" />
        <div className="flex items-center justify-center" style={{ paddingBottom: 16 }}>
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
    <aside
      className="h-full flex flex-col shrink-0 border-r border-black"
      style={{ width: 319, background: 'rgba(0, 0, 0, 0.80)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between shrink-0 border-b border-[rgba(255,255,255,0.05)]"
        style={{ height: 80, padding: '24px 24px 0 24px' }}
      >
        <AudiLogo size={69} className="text-white" />
        <button
          onClick={() => setCollapsed(true)}
          className="flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ width: 32, height: 32, borderRadius: 10 }}
        >
          <ChevronLeft size={16} className="text-[#99A1AF]" />
        </button>
      </div>

      {/* Chat History */}
      <div
        className="flex-1 overflow-y-auto flex flex-col min-h-0"
        style={{ padding: '16px 16px 0 16px' }}
      >
        <div
          className="shrink-0"
          style={{ color: '#A1A1A1', fontSize: 16, lineHeight: '25.6px', marginBottom: 12 }}
        >
          Chats
        </div>

        <div className="flex flex-col" style={{ gap: 12 }}>
          {demoChatHistory.map((chat) => (
            <button
              key={chat.id}
              className="w-full flex flex-col text-left hover:brightness-125 transition-all"
              style={{
                padding: 13,
                borderRadius: 14,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '0.8px solid rgba(255, 255, 255, 0.05)',
                gap: 8,
              }}
            >
              {/* Thumbnail + Info */}
              <div className="flex" style={{ gap: 12, height: 64 }}>
                {/* Thumbnail */}
                <div
                  className="shrink-0 relative overflow-hidden"
                  style={{
                    width: 80,
                    height: 64,
                    borderRadius: 10,
                    background: chat.thumbnailGradient,
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
                  />
                </div>

                {/* Text Info */}
                <div className="flex-1 flex flex-col overflow-hidden" style={{ gap: 2, paddingTop: 2 }}>
                  <span
                    className="truncate"
                    style={{ color: '#fff', fontSize: 14, fontFamily: 'var(--font-family-display)', lineHeight: '21px' }}
                  >
                    {chat.carName}
                  </span>
                  <span
                    className="truncate"
                    style={{ color: '#6A7282', fontSize: 12, fontFamily: 'var(--font-family-display)' }}
                  >
                    {chat.variant}
                  </span>
                  <span
                    className="truncate"
                    style={{ color: '#6A7282', fontSize: 12, fontFamily: 'var(--font-family-display)' }}
                  >
                    {chat.promptPreview}
                  </span>
                </div>
              </div>

              {/* Timestamp */}
              <span style={{ color: '#6A7282', fontSize: 11, fontFamily: 'var(--font-family-display)' }}>
                {chat.timeAgo}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="shrink-0 border-t border-[rgba(255,255,255,0.05)]"
        style={{ padding: '17px 16px 16px 16px' }}
      >
        <button
          className="w-full flex items-center justify-center hover:brightness-125 transition-all"
          style={{
            height: 43,
            borderRadius: 10,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '0.8px solid rgba(255, 255, 255, 0.10)',
          }}
        >
          <span style={{ color: '#99A1AF', fontSize: 14, fontWeight: 500, lineHeight: '21px' }}>
            Clear History
          </span>
        </button>
      </div>
    </aside>
  )
}
