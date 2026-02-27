import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, CheckCircle } from 'lucide-react'

interface DashboardProps {
  onNewChat: () => void
  totalChats: number
}

const examplePrompts = [
  'Dramatic sunset reveal with slow camera orbit',
  'Fast-paced urban night drive',
  'Elegant showcase in minimalist studio',
  'Mountain road adventure at golden hour',
]

export default function Dashboard({ onNewChat }: DashboardProps) {
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')

  const handleGenerate = () => {
    if (!prompt.trim()) return
    onNewChat()
    navigate('/chat')
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center overflow-y-auto">
      <div className="w-full max-w-[804px] px-6 flex flex-col gap-12">
        {/* Title */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-5xl font-bold font-[family-name:var(--font-family-display)] leading-[57.6px] text-center bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent"
          >
            Create Your Audi Story
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-0">
          {/* Vehicle Selector */}
          <div className="mb-4">
            <div className="w-[369px] h-[56.6px] bg-azure-8 rounded-[14px] border border-border-default flex items-center px-4 gap-3">
              {/* Search icon */}
              <Search size={16} className="text-text-dim shrink-0" />
              {/* Vehicle info */}
              <div className="flex-1 flex flex-col">
                <span className="text-white text-sm font-semibold leading-[21px]">
                  Audi A6 e-tron
                </span>
                <span className="text-text-tertiary text-xs font-normal leading-[18px]">
                  Sportback • WAUZZZ8V5KA123456
                </span>
              </div>
              {/* Dropdown chevron */}
              <ChevronDown size={12} className="text-text-tertiary shrink-0" />
            </div>
          </div>

          {/* Prompt Textarea Area */}
          <div className="w-full rounded-2xl border border-border-default bg-surface-input overflow-hidden">
            {/* Textarea */}
            <div className="p-6 bg-[rgba(38,38,38,0.30)] rounded-lg min-h-[180px]">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your video... e.g., 'Create a cinematic reveal at sunset with dramatic camera movements showcasing the car's sleek design and performance features'"
                className="w-full h-[140px] bg-transparent text-white text-base font-normal font-[family-name:var(--font-family-display)] placeholder:text-text-secondary outline-none resize-none"
              />
            </div>
            {/* Bottom bar */}
            <div className="flex items-center justify-between px-6 h-[75px] border-t border-[rgba(255,255,255,0.05)]">
              {/* Left info */}
              <div className="flex items-center gap-3">
                <span className="text-text-muted text-sm font-normal">
                  {prompt.length} characters
                </span>
                <span className="text-[rgba(255,255,255,0.20)] text-sm">•</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-text-dim text-sm font-normal">VIN attached</span>
                  <CheckCircle size={16} className="text-text-dim" />
                </div>
              </div>
              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className={`min-h-[48px] px-6 py-3.5 rounded-full flex items-center justify-center gap-[7px] transition-colors ${
                  prompt.trim()
                    ? 'bg-btn-active hover:bg-[#D4123A] cursor-pointer'
                    : 'bg-btn-disabled cursor-not-allowed'
                }`}
              >
                <span className="text-text-ghost text-sm font-normal leading-5">
                  Generate
                </span>
              </button>
            </div>
          </div>

          {/* Example Prompts */}
          <div className="mt-8 flex flex-col gap-3">
            <span className="text-text-muted text-sm font-medium leading-[21px]">
              Try these examples:
            </span>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example) => (
                <button
                  key={example}
                  onClick={() => handleExampleClick(example)}
                  className="px-4 py-2.5 bg-surface-card rounded-[10px] border border-border-default hover:bg-[rgba(255,255,255,0.08)] transition-colors"
                >
                  <span className="text-text-tertiary text-[13px] font-normal leading-[19.5px]">
                    {example}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
