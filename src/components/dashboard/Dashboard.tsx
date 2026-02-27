import { useState } from 'react'
import { Search, ChevronDown, CheckCircle } from 'lucide-react'

const examplePrompts = [
  'Dramatic sunset reveal with slow camera orbit',
  'Fast-paced urban night drive',
  'Elegant showcase in minimalist studio',
  'Mountain road adventure at golden hour',
]

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')

  const handleGenerate = () => {
    if (!prompt.trim()) return
    // TODO: trigger video generation
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="h-full w-full bg-black flex items-center justify-center overflow-y-auto">
      <div className="w-full max-w-[804px] px-6 flex flex-col gap-12">

        {/* Title */}
        <h1 className="text-[48px] font-bold font-[family-name:var(--font-family-display)] leading-[1.2] text-center bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
          Create Your Audi Story
        </h1>

        {/* Main Content */}
        <div className="flex flex-col">

          {/* Vehicle Selector */}
          <div
            className="w-[369px] h-[57px] rounded-[14px] border border-[rgba(255,255,255,0.10)] flex items-center gap-3 mb-4"
            style={{ background: '#101319' }}
          >
            {/* Search icon */}
            <div className="pl-[17px] flex items-center">
              <Search size={16} className="text-[#657081]" />
            </div>
            {/* Vehicle info */}
            <div className="flex-1 flex flex-col py-[9px]">
              <span className="text-white text-[14px] font-semibold leading-[21px]">
                Audi A6 e-tron
              </span>
              <span className="text-[#99A1AF] text-[12px] font-normal leading-[18px]">
                Sportback • WAUZZZ8V5KA123456
              </span>
            </div>
            {/* Chevron */}
            <div className="pr-[17px] flex items-center">
              <ChevronDown size={12} className="text-[#99A1AF]" />
            </div>
          </div>

          {/* Prompt Textarea Area */}
          <div
            className="w-full rounded-[16px] border border-[rgba(255,255,255,0.10)] overflow-hidden"
            style={{ background: '#181D25' }}
          >
            {/* Textarea */}
            <div className="px-6 pt-5 pb-5" style={{ background: 'rgba(38, 38, 38, 0.30)' }}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your video... e.g., 'Create a cinematic reveal at sunset with dramatic camera movements showcasing the car's sleek design and performance features'"
                className="w-full h-[140px] bg-transparent text-white text-[16px] font-normal font-[family-name:var(--font-family-display)] placeholder:text-[#A1A1A1] outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between px-6 h-[75px] border-t border-[rgba(255,255,255,0.05)]">
              {/* Left info */}
              <div className="flex items-center gap-3 text-[14px]">
                <span className="text-[#6A7282] font-normal">
                  {prompt.length} characters
                </span>
                <span className="text-[rgba(255,255,255,0.20)]">•</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#657081] font-normal">VIN attached</span>
                  <CheckCircle size={16} className="text-[#657081]" />
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="min-h-[48px] px-6 py-[14px] rounded-[999px] flex items-center justify-center transition-colors"
                style={{
                  background: prompt.trim() ? '#BB0A30' : '#657081',
                }}
              >
                <span className="text-[#FCFCFD] text-[14px] font-normal leading-[20px]">
                  Generate
                </span>
              </button>
            </div>
          </div>

          {/* Example Prompts */}
          <div className="mt-6 flex flex-col gap-3">
            <span className="text-[#6A7282] text-[14px] font-medium leading-[21px]">
              Try these examples:
            </span>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example) => (
                <button
                  key={example}
                  onClick={() => handleExampleClick(example)}
                  className="h-[37px] px-[17px] rounded-[10px] border border-[rgba(255,255,255,0.10)] flex items-center transition-colors hover:bg-[rgba(255,255,255,0.08)]"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <span className="text-[#99A1AF] text-[13px] font-normal leading-[19.5px]">
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
