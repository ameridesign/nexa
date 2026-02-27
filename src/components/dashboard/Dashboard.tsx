import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, CheckCircle, X, Plus } from 'lucide-react'

const examplePrompts = [
  'Dramatic sunset reveal with slow camera orbit',
  'Fast-paced urban night drive',
  'Elegant showcase in minimalist studio',
  'Mountain road adventure at golden hour',
]

interface VehicleInfo {
  name: string
  variant: string
  vin: string
}

export default function Dashboard() {
  const [prompt, setPrompt] = useState('')
  const [vehicle, setVehicle] = useState<VehicleInfo | null>({
    name: 'Audi A6 e-tron',
    variant: 'Sportback',
    vin: 'WAUZZZ8V5KA123456',
  })
  const [vinModalOpen, setVinModalOpen] = useState(false)
  const [vinInput, setVinInput] = useState('')
  const navigate = useNavigate()

  const handleGenerate = () => {
    if (!prompt.trim()) return
    navigate('/preview', { state: { prompt: prompt.trim() } })
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  const handleVinSubmit = () => {
    if (!vinInput.trim()) return
    setVehicle({
      name: 'Audi Vehicle',
      variant: 'Custom',
      vin: vinInput.trim().toUpperCase(),
    })
    setVinInput('')
    setVinModalOpen(false)
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

        {/* Vehicle Selector / Add VIN */}
        {vehicle ? (
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
                {vehicle.name}
              </span>
              <span style={{ color: '#99A1AF', fontSize: 12, lineHeight: '18px' }}>
                {vehicle.variant} &bull; {vehicle.vin}
              </span>
            </div>
            <button
              onClick={() => setVehicle(null)}
              className="flex items-center justify-center transition-all hover:bg-white/5"
              style={{ width: 32, height: 32, borderRadius: 8, marginRight: 12 }}
            >
              <X size={14} color="#99A1AF" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setVinModalOpen(true)}
            className="flex items-center transition-all hover:brightness-125"
            style={{
              height: 57,
              paddingLeft: 17,
              paddingRight: 17,
              borderRadius: 14,
              border: '1px dashed rgba(255, 255, 255, 0.20)',
              background: 'rgba(255, 255, 255, 0.03)',
              marginBottom: 16,
              gap: 10,
            }}
          >
            <Plus size={16} color="#657081" />
            <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>
              Add VIN to use your car
            </span>
          </button>
        )}

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
            <div className="flex items-center" style={{ gap: 12, fontSize: 14 }}>
              <span style={{ color: '#6A7282' }}>
                {prompt.length} characters
              </span>
              {vehicle && (
                <>
                  <span style={{ color: 'rgba(255, 255, 255, 0.20)' }}>&bull;</span>
                  <div className="flex items-center" style={{ gap: 10 }}>
                    <span style={{ color: '#657081' }}>VIN attached</span>
                    <CheckCircle size={16} color="#657081" />
                  </div>
                </>
              )}
            </div>

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

      {/* ============ VIN Modal ============ */}
      {vinModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 200, background: 'rgba(0, 0, 0, 0.70)' }}
          onClick={() => setVinModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 480,
              background: '#181D25',
              borderRadius: 20,
              border: '0.8px solid rgba(255, 255, 255, 0.10)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '20px 24px',
                borderBottom: '0.8px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <span style={{ color: 'white', fontSize: 18, fontWeight: 600, lineHeight: '27px' }}>
                Add Your Vehicle
              </span>
              <button
                onClick={() => setVinModalOpen(false)}
                className="flex items-center justify-center transition-all hover:bg-white/5"
                style={{ width: 32, height: 32, borderRadius: 8 }}
              >
                <X size={16} color="#99A1AF" />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '24px' }}>
              <p style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px', marginBottom: 20 }}>
                Enter your Vehicle Identification Number (VIN) to load your specific Audi model, color, and configuration.
              </p>

              {/* VIN Input */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px', display: 'block', marginBottom: 8 }}>
                  VIN NUMBER
                </label>
                <input
                  type="text"
                  value={vinInput}
                  onChange={(e) => setVinInput(e.target.value.toUpperCase())}
                  placeholder="e.g. WAUZZZ8V5KA123456"
                  maxLength={17}
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '0 16px',
                    background: 'rgba(38, 38, 38, 0.30)',
                    border: '0.8px solid rgba(255, 255, 255, 0.10)',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'monospace',
                    letterSpacing: 1.5,
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.25)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.10)')}
                />
                <div className="flex items-center justify-between" style={{ marginTop: 6 }}>
                  <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>
                    17 characters required
                  </span>
                  <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>
                    {vinInput.length}/17
                  </span>
                </div>
              </div>

              {/* Where to find VIN */}
              <div
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 10,
                  border: '0.8px solid rgba(255, 255, 255, 0.05)',
                  marginBottom: 24,
                }}
              >
                <span style={{ color: '#6A7282', fontSize: 13, lineHeight: '19.5px' }}>
                  Find your VIN on the driver's side dashboard, driver's door jamb, or in your vehicle registration documents.
                </span>
              </div>

              {/* Actions */}
              <div className="flex" style={{ gap: 12 }}>
                <button
                  onClick={() => setVinModalOpen(false)}
                  className="flex-1 flex items-center justify-center transition-all hover:brightness-110"
                  style={{
                    height: 48,
                    borderRadius: 999,
                    background: '#181D25',
                    boxShadow: '0px 0px 0px 1px #2C343F inset',
                  }}
                >
                  <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>Cancel</span>
                </button>
                <button
                  onClick={handleVinSubmit}
                  disabled={vinInput.length !== 17}
                  className="flex-1 flex items-center justify-center transition-all hover:brightness-110"
                  style={{
                    height: 48,
                    borderRadius: 999,
                    background: vinInput.length === 17 ? '#657081' : '#181D25',
                    boxShadow: vinInput.length === 17 ? 'none' : '0px 0px 0px 1px #2C343F inset',
                    cursor: vinInput.length === 17 ? 'pointer' : 'not-allowed',
                  }}
                >
                  <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>Add Vehicle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
