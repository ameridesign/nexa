import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Play, Sparkles, Save, User } from 'lucide-react'
import AudiLogo from '../ui/AudiLogo'
import ShotsPanel from './ShotsPanel'
import type { Shot } from './ShotsPanel'
import PreviewCenter from './PreviewCenter'
import AdjustmentsPanel from './AdjustmentsPanel'

const BASE = import.meta.env.BASE_URL

const defaultShots: Shot[] = [
  { id: '1', name: 'Opening Shot', duration: 3, thumbnail: `${BASE}etron.png` },
  { id: '2', name: 'Close-up', duration: 2, thumbnail: `${BASE}rsetron.png` },
  { id: '3', name: 'Dynamic Pan', duration: 4, thumbnail: `${BASE}q8.png` },
]

let nextShotId = 4

export default function PreviewPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const prompt = (location.state as { prompt?: string })?.prompt ?? ''

  const [shots, setShots] = useState<Shot[]>(defaultShots)
  const [selectedShotId, setSelectedShotId] = useState('3')

  const totalDuration = shots.reduce((sum, s) => sum + s.duration, 0)
  const selectedShot = shots.find((s) => s.id === selectedShotId)

  // Pick car image based on selected shot, fallback to etron
  const carImage = selectedShot?.thumbnail || `${BASE}etron.png`

  const handleAddShot = () => {
    const newId = String(nextShotId++)
    setShots([
      ...shots,
      {
        id: newId,
        name: `Shot ${shots.length + 1}`,
        duration: 3,
        thumbnail: null,
      },
    ])
    setSelectedShotId(newId)
  }

  return (
    <div
      className="flex flex-col w-screen h-screen overflow-hidden"
      style={{ background: '#101319' }}
    >
      {/* ============ Top Header Bar ============ */}
      <header
        className="flex items-center justify-between shrink-0"
        style={{
          height: 64,
          paddingLeft: 24,
          paddingRight: 24,
          background: 'rgba(2, 2, 3, 0.80)',
          borderBottom: '0.8px solid black',
        }}
      >
        {/* Left: Logo + back */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center hover:opacity-80 transition-opacity"
          style={{ gap: 12 }}
        >
          <AudiLogo size={69} className="text-white" />
        </button>

        {/* Center: Project name */}
        <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>
          {prompt ? `${prompt.slice(0, 30)}${prompt.length > 30 ? '...' : ''}.avp` : 'Untitled Project.avp'}
        </span>

        {/* Right: User avatar */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 9999,
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <User size={16} color="#99A1AF" />
        </div>
      </header>

      {/* ============ Main 3-Panel Layout ============ */}
      <div className="flex flex-1 min-h-0">
        {/* Left: Shots Panel */}
        <ShotsPanel
          shots={shots}
          selectedShotId={selectedShotId}
          onSelectShot={setSelectedShotId}
          onAddShot={handleAddShot}
        />

        {/* Center: Preview Viewport */}
        <PreviewCenter selectedShot={selectedShot} carImage={carImage} />

        {/* Right: Adjustments */}
        <AdjustmentsPanel />
      </div>

      {/* ============ Bottom Action Bar ============ */}
      <footer
        className="flex items-center justify-between shrink-0"
        style={{
          height: 80,
          paddingLeft: 24,
          paddingRight: 24,
          background: 'rgba(16, 19, 25, 0.80)',
          borderTop: '0.8px solid black',
        }}
      >
        {/* Left: Duration */}
        <div className="flex items-center" style={{ gap: 4, minWidth: 120 }}>
          <span style={{ color: 'white', fontSize: 14, lineHeight: '21px' }}>
            {totalDuration.toFixed(1)}s
          </span>
          <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>
            total duration
          </span>
        </div>

        {/* Center: Action Buttons */}
        <div className="flex items-center" style={{ gap: 12, maxWidth: 482 }}>
          {/* Preview */}
          <button
            className="flex-1 flex items-center justify-center transition-all hover:brightness-110"
            style={{
              minHeight: 48,
              padding: '14px 24px',
              background: '#181D25',
              boxShadow: '0px 0px 0px 1px #2C343F inset',
              borderRadius: 999,
              gap: 8,
            }}
          >
            <Play size={16} color="white" />
            <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>
              Preview
            </span>
          </button>

          {/* Generate */}
          <button
            className="flex-1 flex items-center justify-center transition-all hover:brightness-110"
            style={{
              minHeight: 48,
              padding: '14px 24px',
              background: '#657081',
              borderRadius: 999,
              gap: 7,
            }}
          >
            <Sparkles size={16} color="white" />
            <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>
              Generate
            </span>
          </button>

          {/* Save */}
          <button
            className="flex-1 flex items-center justify-center transition-all hover:brightness-110"
            style={{
              minHeight: 48,
              padding: '14px 24px',
              background: '#181D25',
              boxShadow: '0px 0px 0px 1px #2C343F inset',
              borderRadius: 999,
              gap: 8,
            }}
          >
            <Save size={16} color="white" />
            <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>
              Save
            </span>
          </button>
        </div>

        {/* Right: Quality */}
        <div style={{ minWidth: 72 }}>
          <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>
            4K &bull; 60fps
          </span>
        </div>
      </footer>
    </div>
  )
}
