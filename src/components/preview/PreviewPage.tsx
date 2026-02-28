import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Play, Sparkles, Save, User, LogOut, Settings, CreditCard, ChevronDown, Menu, ArrowLeft } from 'lucide-react'
import AudiLogo from '../ui/AudiLogo'
import ShotsPanel from './ShotsPanel'
import type { Shot } from './ShotsPanel'
import PreviewCenter from './PreviewCenter'
import AdjustmentsPanel from './AdjustmentsPanel'
import { useSidebar } from '../layout/SidebarContext'

const BASE = import.meta.env.BASE_URL

const defaultShots: Shot[] = [
  { id: '1', name: 'Opening Shot', duration: 3, thumbnail: `${BASE}opening-shot.avif`, video: `${BASE}opening-shot-video.mp4` },
  { id: '2', name: 'Close-up', duration: 2, thumbnail: `${BASE}close-up.jpg` },
  { id: '3', name: 'Dynamic Pan', duration: 4, thumbnail: `${BASE}dynamic-pan.png` },
]

const resolutionOptions = ['4K', '2K', '1080p', '720p']
const fpsOptions = ['60fps', '30fps', '24fps']

let nextShotId = 4

export default function PreviewPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const prompt = (location.state as { prompt?: string })?.prompt ?? ''
  const { openMobile } = useSidebar()

  const [shots, setShots] = useState<Shot[]>(defaultShots)
  const [selectedShotId, setSelectedShotId] = useState('3')
  const [profileOpen, setProfileOpen] = useState(false)
  const [qualityOpen, setQualityOpen] = useState(false)
  const [resolution, setResolution] = useState('4K')
  const [fps, setFps] = useState('60fps')
  const [showSaved, setShowSaved] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [genProgress, setGenProgress] = useState(0)

  const totalDuration = shots.reduce((sum, s) => sum + s.duration, 0)
  const selectedShot = shots.find((s) => s.id === selectedShotId)
  const carImage = selectedShot?.thumbnail || `${BASE}etron.png`

  const handleGenerate = () => {
    setGenerating(true)
    setGenProgress(0)
  }

  useEffect(() => {
    if (!generating) return
    const interval = setInterval(() => {
      setGenProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setGenerating(false)
          navigate('/results', { state: { prompt } })
          return 100
        }
        return prev + 2
      })
    }, 60)
    return () => clearInterval(interval)
  }, [generating, navigate, prompt])

  const handleSave = () => {
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  const handleAddShot = () => {
    const newId = String(nextShotId++)
    setShots([...shots, { id: newId, name: `Shot ${shots.length + 1}`, duration: 3, thumbnail: null }])
    setSelectedShotId(newId)
  }

  const handleDeleteShot = (id: string) => {
    const remaining = shots.filter((s) => s.id !== id)
    if (remaining.length === 0) return
    setShots(remaining)
    if (selectedShotId === id) setSelectedShotId(remaining[0].id)
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden" style={{ background: '#101319' }}>
      {/* ============ Top Header Bar ============ */}
      <header
        className="flex items-center justify-between shrink-0 relative"
        style={{ height: 56, paddingLeft: 12, paddingRight: 12, background: 'rgba(2, 2, 3, 0.80)', borderBottom: '0.8px solid black', zIndex: 50 }}
      >
        <div className="flex items-center" style={{ gap: 4 }}>
          <button onClick={openMobile} className="md:hidden flex items-center justify-center transition-all hover:bg-white/10 active:scale-95" style={{ width: 36, height: 36, borderRadius: 8 }}>
            <Menu size={18} color="#99A1AF" />
          </button>
          <button onClick={() => navigate('/')} className="hidden md:flex items-center hover:opacity-80 transition-opacity" style={{ gap: 12, marginLeft: 12 }}>
            <AudiLogo size={69} className="text-white" />
          </button>
          <button onClick={() => navigate('/')} className="md:hidden flex items-center justify-center hover:bg-white/5 transition-all" style={{ width: 32, height: 32, borderRadius: 8 }}>
            <ArrowLeft size={16} color="#99A1AF" />
          </button>
        </div>

        <span className="truncate" style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px', maxWidth: '40%' }}>
          {prompt ? `${prompt.slice(0, 30)}${prompt.length > 30 ? '...' : ''}.avp` : 'Untitled Project.avp'}
        </span>

        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center justify-center transition-all hover:brightness-125" style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(255, 255, 255, 0.05)' }}>
            <User size={16} color="#99A1AF" />
          </button>
          {profileOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setProfileOpen(false)} />
              <div className="absolute" style={{ top: 44, right: 0, width: 220, background: '#1a1d24', borderRadius: 12, border: '0.8px solid rgba(255, 255, 255, 0.10)', overflow: 'hidden', zIndex: 100, boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
                <div style={{ padding: '14px 16px', borderBottom: '0.8px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>Audi Designer</div>
                  <div style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>designer@audi.com</div>
                </div>
                {[{ icon: Settings, label: 'Settings' }, { icon: CreditCard, label: 'Billing' }].map(({ icon: Icon, label }) => (
                  <button key={label} className="w-full flex items-center transition-colors hover:bg-white/5" style={{ padding: '10px 16px', gap: 10 }} onClick={() => setProfileOpen(false)}>
                    <Icon size={16} color="#99A1AF" />
                    <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>{label}</span>
                  </button>
                ))}
                <div style={{ borderTop: '0.8px solid rgba(255,255,255,0.05)' }}>
                  <button className="w-full flex items-center transition-colors hover:bg-white/5" style={{ padding: '10px 16px', gap: 10 }} onClick={() => setProfileOpen(false)}>
                    <LogOut size={16} color="#99A1AF" />
                    <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>Log Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* ============ Main Content — responsive layout ============ */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
        <div className="order-2 md:order-1 shrink-0 md:w-[280px]" style={{ borderRight: '0.8px solid rgba(255, 255, 255, 0.05)' }}>
          <ShotsPanel shots={shots} selectedShotId={selectedShotId} onSelectShot={setSelectedShotId} onAddShot={handleAddShot} onDeleteShot={handleDeleteShot} />
        </div>
        <div className="order-1 md:order-2 shrink-0 md:shrink md:flex-1 min-w-0 min-h-0">
          <PreviewCenter selectedShot={selectedShot} carImage={carImage} />
        </div>
        <div className="order-3 shrink-0 md:w-[320px]">
          <AdjustmentsPanel />
        </div>
      </div>

      {/* ============ Bottom Action Bar ============ */}
      <footer className="flex items-center justify-between shrink-0 relative" style={{ minHeight: 60, padding: '10px 16px', background: 'rgba(16, 19, 25, 0.80)', borderTop: '0.8px solid black', zIndex: 40 }}>
        <div className="hidden md:flex items-center" style={{ gap: 4, minWidth: 120 }}>
          <span style={{ color: 'white', fontSize: 14, lineHeight: '21px' }}>{totalDuration.toFixed(1)}s</span>
          <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>total duration</span>
        </div>

        <div className="flex items-center flex-1 md:flex-none justify-center" style={{ gap: 8 }}>
          <button className="flex items-center justify-center transition-all hover:brightness-110" style={{ minHeight: 44, padding: '10px 16px', background: '#181D25', boxShadow: '0px 0px 0px 1px #2C343F inset', borderRadius: 999, gap: 6 }}>
            <Play size={14} color="white" />
            <span className="hidden sm:inline" style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>Preview</span>
          </button>
          <button onClick={handleGenerate} className="flex items-center justify-center transition-all hover:brightness-110" style={{ minHeight: 44, padding: '10px 20px', background: '#657081', borderRadius: 999, gap: 6 }}>
            <Sparkles size={14} color="white" />
            <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>Generate</span>
          </button>
          <button onClick={handleSave} className="flex items-center justify-center transition-all hover:brightness-110" style={{ minHeight: 44, padding: '10px 16px', background: '#181D25', boxShadow: '0px 0px 0px 1px #2C343F inset', borderRadius: 999, gap: 6 }}>
            <Save size={14} color="white" />
            <span className="hidden sm:inline" style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>Save</span>
          </button>
        </div>

        <div className="hidden md:block relative">
          <button onClick={() => setQualityOpen(!qualityOpen)} className="flex items-center transition-all hover:brightness-125" style={{ gap: 6, minWidth: 72 }}>
            <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>{resolution} &bull; {fps}</span>
            <ChevronDown size={12} color="#99A1AF" />
          </button>
          {qualityOpen && (
            <>
              <div className="fixed inset-0" onClick={() => setQualityOpen(false)} />
              <div className="absolute" style={{ bottom: 36, right: 0, width: 200, background: '#1a1d24', borderRadius: 12, border: '0.8px solid rgba(255, 255, 255, 0.10)', overflow: 'hidden', zIndex: 100, boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
                <div style={{ padding: '10px 14px 6px', borderBottom: '0.8px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#99A1AF', fontSize: 11, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>RESOLUTION</span>
                  <div className="flex flex-col" style={{ marginTop: 8 }}>
                    {resolutionOptions.map((r) => (
                      <button key={r} onClick={() => setResolution(r)} className="w-full text-left transition-colors hover:bg-white/5" style={{ padding: '6px 8px', borderRadius: 6, color: r === resolution ? 'white' : '#6A7282', fontSize: 13, background: r === resolution ? 'rgba(255,255,255,0.05)' : 'transparent' }}>{r}</button>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '10px 14px' }}>
                  <span style={{ color: '#99A1AF', fontSize: 11, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>FRAME RATE</span>
                  <div className="flex flex-col" style={{ marginTop: 8 }}>
                    {fpsOptions.map((f) => (
                      <button key={f} onClick={() => setFps(f)} className="w-full text-left transition-colors hover:bg-white/5" style={{ padding: '6px 8px', borderRadius: 6, color: f === fps ? 'white' : '#6A7282', fontSize: 13, background: f === fps ? 'rgba(255,255,255,0.05)' : 'transparent' }}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </footer>

      {/* Generating modal */}
      {generating && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 300, background: 'rgba(0, 0, 0, 0.75)' }}>
          <div className="flex flex-col items-center w-full" style={{ maxWidth: 400, padding: '40px 32px', background: '#181D25', borderRadius: 20, border: '0.8px solid rgba(255, 255, 255, 0.10)', boxShadow: '0 32px 64px rgba(0,0,0,0.5)', gap: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: 9999, border: '3px solid rgba(255,255,255,0.10)', borderTopColor: '#0A82DF', animation: 'spin 0.8s linear infinite' }} />
            <div className="flex flex-col items-center" style={{ gap: 8 }}>
              <span style={{ color: 'white', fontSize: 18, fontWeight: 600, lineHeight: '27px' }}>Generating Video</span>
              <span style={{ color: '#6A7282', fontSize: 14, lineHeight: '21px', textAlign: 'center' }}>Creating cinematic shots with AI...</span>
            </div>
            <div className="w-full">
              <div className="w-full overflow-hidden" style={{ height: 6, borderRadius: 9999, background: 'rgba(255, 255, 255, 0.10)' }}>
                <div style={{ width: `${genProgress}%`, height: 6, borderRadius: 9999, background: '#0A82DF', transition: 'width 0.1s linear' }} />
              </div>
              <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
                <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>{genProgress < 30 ? 'Analyzing shots...' : genProgress < 60 ? 'Rendering frames...' : genProgress < 90 ? 'Compositing video...' : 'Finalizing...'}</span>
                <span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>{genProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save toast */}
      {showSaved && (
        <div className="fixed flex items-center" style={{ bottom: 100, left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', background: '#1a1d24', borderRadius: 10, border: '0.8px solid rgba(255, 255, 255, 0.10)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 200, gap: 8, animation: 'fadeInUp 0.2s ease-out' }}>
          <Save size={14} color="#4ade80" />
          <span style={{ color: 'white', fontSize: 14, lineHeight: '21px' }}>Saved!</span>
        </div>
      )}
    </div>
  )
}
