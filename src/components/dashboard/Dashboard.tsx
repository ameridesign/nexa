import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, CheckCircle } from 'lucide-react'

const examplePrompts = [
  'Dramatic sunset reveal with slow camera orbit',
  'Fast-paced urban night drive',
  'Elegant showcase in minimalist studio',
  'Mountain road adventure at golden hour',
]

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()

  const handleGenerate = () => {
    if (!prompt.trim()) return
    navigate('/preview', { state: { prompt: prompt.trim() } })
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="h-full w-full bg-black flex items-center justify-center">
      <div style={{ width: '100%', maxWidth: 804, padding: '0 32px' }}>

        {/* Title */}
        <h1
          className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent"
          style={{
            fontSize: 48,
            fontWeight: 700,
            fontFamily: 'var(--font-family-display)',
            lineHeight: '57.6px',
            textAlign: 'center',
            marginBottom: 48,
          }}
        >
          Create Your Audi Story
        </h1>

        {/* Vehicle Selector */}
        <div
          className="flex items-center"
          style={{
            width: 369,
            height: 57,
            borderRadius: 14,
            border: '1px solid rgba(255, 255, 255, 0.10)',
            background: '#101319',
            marginBottom: 16,
          }}
        >
          <div style={{ paddingLeft: 17, display: 'flex', alignItems: 'center' }}>
            <Search size={16} color="#657081" />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '9px 0', marginLeft: 12 }}>
            <span style={{ color: '#fff', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>
              Audi A6 e-tron
            </span>
            <span style={{ color: '#99A1AF', fontSize: 12, lineHeight: '18px' }}>
              Sportback • WAUZZZ8V5KA123456
            </span>
          </div>
          <div style={{ paddingRight: 17, display: 'flex', alignItems: 'center' }}>
            <ChevronDown size={12} color="#99A1AF" />
          </div>
        </div>

        {/* Prompt Textarea Container */}
        <div
          style={{
            width: '100%',
            borderRadius: 16,
            border: '0.8px solid rgba(255, 255, 255, 0.10)',
            background: '#181D25',
            overflow: 'hidden',
          }}
        >
          {/* Textarea */}
          <div style={{ padding: '20px 24px', background: 'rgba(38, 38, 38, 0.30)' }}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video... e.g., 'Create a cinematic reveal at sunset with dramatic camera movements showcasing the car's sleek design and performance features'"
              style={{
                width: '100%',
                height: 140,
                background: 'transparent',
                color: '#fff',
                fontSize: 16,
                fontFamily: 'var(--font-family-display)',
                lineHeight: '24px',
                border: 'none',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          {/* Bottom bar */}
          <div
            className="flex items-center justify-between"
            style={{
              height: 75,
              padding: '0 24px',
              borderTop: '0.8px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Left info */}
            <div className="flex items-center" style={{ gap: 12, fontSize: 14 }}>
              <span style={{ color: '#6A7282' }}>
                {prompt.length} characters
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.20)' }}>•</span>
              <div className="flex items-center" style={{ gap: 10 }}>
                <span style={{ color: '#657081' }}>VIN attached</span>
                <CheckCircle size={16} color="#657081" />
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className="transition-all hover:brightness-110"
              style={{
                minHeight: 48,
                padding: '14px 24px',
                borderRadius: 999,
                background: prompt.trim() ? '#657081' : '#181D25',
                boxShadow: prompt.trim() ? 'none' : '0px 0px 0px 1px #2C343F inset',
                border: 'none',
                cursor: prompt.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 7,
              }}
            >
              <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>
                Generate
              </span>
            </button>
          </div>
        </div>

        {/* Example Prompts */}
        <div style={{ marginTop: 24 }}>
          <div style={{ color: '#6A7282', fontSize: 14, fontWeight: 500, lineHeight: '21px', marginBottom: 12 }}>
            Try these examples:
          </div>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {examplePrompts.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                className="transition-all hover:brightness-125"
                style={{
                  height: 37,
                  padding: '0 17px',
                  borderRadius: 10,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '0.8px solid rgba(255, 255, 255, 0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{ color: '#99A1AF', fontSize: 13, lineHeight: '19.5px' }}>
                  {example}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
