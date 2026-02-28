import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Play,
  Pause,
  Volume2,
  Check,
  Download,
  ChevronDown,
  User,
  X,
  CheckCircle,
  Sparkles,
  ArrowLeft,
  Menu,
} from 'lucide-react'
import { useSidebar } from '../layout/SidebarContext'

const BASE = import.meta.env.BASE_URL

interface Version {
  id: number
  label: string
  selected: boolean
  video: string
  thumbnail: string
}

const defaultVersions: Version[] = [
  { id: 1, label: 'Version 1', selected: true, video: `${BASE}opening-shot-video.mp4`, thumbnail: `${BASE}opening-shot.avif` },
  { id: 2, label: 'Version 2', selected: false, video: `${BASE}Car_Driving_Away_Video_Generated.mp4`, thumbnail: `${BASE}dynamic-pan.png` },
  { id: 3, label: 'Version 3', selected: false, video: `${BASE}opening-shot-video.mp4`, thumbnail: `${BASE}close-up.jpg` },
]

type AspectRatio = '9:16' | '16:9' | '1:1'
type Resolution = '4k' | '1080p'
type FrameRate = '24' | '30'

/* ---- Social Icons ---- */

function YouTubeIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/></svg>)
}
function InstagramIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="currentColor"/></svg>)
}
function XIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/></svg>)
}
function LinkedInIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/></svg>)
}

/* ---- Video Card ---- */

function VideoCard({ version, onToggleSelect }: { version: Version; onToggleSelect: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(9)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) videoRef.current.pause()
    else videoRef.current.play()
    setPlaying(!playing)
  }

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60)
    const secs = Math.floor(t % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex-1 min-w-0 flex flex-col" style={{ gap: 12 }}>
      <div className="flex items-center">
        <div className="flex items-center" style={{ padding: '2px 8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: 8, border: '0.8px solid rgba(255, 255, 255, 0.20)' }}>
          <span style={{ color: '#FAFAFA', fontSize: 12, fontWeight: 500, lineHeight: '16px' }}>{version.label}</span>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ borderRadius: 14, background: 'linear-gradient(180deg, #0A1929 0%, black 100%)', boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)', border: version.selected ? '2px solid #0A82DF' : '0.8px solid rgba(255, 255, 255, 0.10)', aspectRatio: '16 / 9' }}
      >
        <video ref={videoRef} src={version.video} className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.8 }} onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)} onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 9)} onEnded={() => setPlaying(false)} />
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '50%', background: 'linear-gradient(0deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0) 100%)' }} />

        {/* Selection check icon */}
        <button onClick={onToggleSelect} className="absolute flex items-center justify-center transition-all hover:scale-110" style={{ top: 12, right: 12, width: 32, height: 32, borderRadius: 9999, background: version.selected ? '#0A82DF' : 'rgba(0, 0, 0, 0.40)', border: version.selected ? '2px solid #0A82DF' : '2px solid rgba(255, 255, 255, 0.40)', zIndex: 10 }}>
          {version.selected && <Check size={18} color="white" strokeWidth={3} />}
        </button>

        <button onClick={togglePlay} className="absolute flex items-center justify-center transition-all hover:scale-105" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 56, height: 56, borderRadius: 9999, background: 'rgba(255, 255, 255, 0.10)' }}>
          {playing ? <Pause size={24} color="white" fill="white" /> : <Play size={24} color="white" fill="white" />}
        </button>
        <div className="absolute inset-x-0 bottom-0" style={{ padding: '12px 16px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>{formatTime(currentTime)} / {formatTime(duration)}</span>
            <button className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255, 255, 255, 0.10)' }}>
              <Volume2 size={16} color="white" />
            </button>
          </div>
          <div className="w-full overflow-hidden" style={{ height: 4, borderRadius: 9999, background: 'rgba(255, 255, 255, 0.20)' }}>
            <div style={{ width: `${progress}%`, height: 4, background: '#0A82DF', borderRadius: 9999, transition: 'width 0.1s linear' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Export Settings Panel ---- */

function ExportPanel({ onExport, selectedCount }: { onExport: () => void; selectedCount: number }) {
  const [aspect, setAspect] = useState<AspectRatio>('16:9')
  const [resolution, setResolution] = useState<Resolution>('4k')
  const [frameRate, setFrameRate] = useState<FrameRate>('30')
  const [colorGrade, setColorGrade] = useState('Cinematic')
  const [colorOpen, setColorOpen] = useState(false)
  const [watermark, setWatermark] = useState(true)

  const aspects: { value: AspectRatio; label: string; sub: string; w: number; h: number }[] = [
    { value: '9:16', label: '9:16', sub: 'Stories', w: 24, h: 32 },
    { value: '16:9', label: '16:9', sub: 'Landscape', w: 43, h: 32 },
    { value: '1:1', label: '1:1', sub: 'Square', w: 32, h: 32 },
  ]

  return (
    <div className="shrink-0 overflow-hidden flex flex-col w-full md:w-[430px]" style={{ borderRadius: 16, background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '0.8px solid rgba(255, 255, 255, 0.10)', height: 'fit-content' }}>
      <div className="flex items-center" style={{ padding: '24px 24px 0', gap: 8 }}>
        <Download size={20} color="#0A82DF" />
        <span style={{ color: 'white', fontSize: 20, fontWeight: 700, lineHeight: '30px' }}>Export Settings</span>
      </div>

      <div style={{ padding: '24px' }}>
        <div className="flex flex-col" style={{ gap: 24 }}>
          {/* Aspect Ratio */}
          <div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>ASPECT RATIO</span></div>
            <div className="flex" style={{ gap: 8 }}>
              {aspects.map((a) => {
                const active = aspect === a.value
                return (
                  <button key={a.value} onClick={() => setAspect(a.value)} className="flex-1 flex flex-col items-center justify-center transition-all" style={{ height: 102, borderRadius: 14, background: active ? 'rgba(10, 130, 223, 0.10)' : 'rgba(255, 255, 255, 0.05)', border: active ? '0.8px solid rgba(10, 130, 223, 0.50)' : '0.8px solid rgba(255, 255, 255, 0.10)', gap: 8 }}>
                    <div style={{ width: a.w, height: a.h, borderRadius: 4, border: active ? '1.6px solid #0A82DF' : '1.6px solid rgba(255, 255, 255, 0.30)' }} />
                    <span style={{ color: 'white', fontSize: 13, fontWeight: 600, lineHeight: '19.5px' }}>{a.label}</span>
                    <span style={{ color: '#6A7282', fontSize: 11, lineHeight: '16.5px' }}>{a.sub}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Resolution */}
          <div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>RESOLUTION</span></div>
            <div className="flex flex-col" style={{ gap: 8 }}>
              {([{ value: '4k' as Resolution, label: '4K (2160p)', sub: 'Best quality' }, { value: '1080p' as Resolution, label: 'Full HD (1080p)', sub: 'Faster export' }]).map((r) => {
                const active = resolution === r.value
                return (
                  <button key={r.value} onClick={() => setResolution(r.value)} className="w-full flex items-center justify-between transition-all" style={{ height: 65, paddingLeft: 12, paddingRight: 12, borderRadius: 14, background: active ? 'rgba(10, 130, 223, 0.10)' : 'rgba(255, 255, 255, 0.05)', border: active ? '0.8px solid rgba(10, 130, 223, 0.50)' : '0.8px solid rgba(255, 255, 255, 0.10)' }}>
                    <div className="flex flex-col items-start">
                      <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>{r.label}</span>
                      <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>{r.sub}</span>
                    </div>
                    <div className="flex items-center justify-center" style={{ width: 16, height: 16, borderRadius: 9999, background: 'rgba(38, 38, 38, 0.30)', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', border: '0.8px solid #262626' }}>
                      {active && <div style={{ width: 8, height: 8, borderRadius: 9999, background: '#FAFAFA' }} />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Frame Rate */}
          <div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 700, letterSpacing: 0.6, lineHeight: '12px' }}>FRAME RATE</span></div>
            <div className="flex" style={{ gap: 8 }}>
              {(['24', '30'] as FrameRate[]).map((f) => {
                const active = frameRate === f
                return (
                  <button key={f} onClick={() => setFrameRate(f)} className="flex-1 transition-all" style={{ height: 50, borderRadius: 14, background: active ? 'rgba(10, 130, 223, 0.10)' : 'rgba(255, 255, 255, 0.05)', border: active ? '0.8px solid rgba(10, 130, 223, 0.50)' : '0.8px solid rgba(255, 255, 255, 0.10)' }}>
                    <span style={{ color: active ? '#0A82DF' : 'white', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>{f} fps</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color Grading */}
          <div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>COLOR GRADING (LUT)</span></div>
            <div className="relative">
              <button onClick={() => setColorOpen(!colorOpen)} className="w-full flex items-center justify-between transition-all hover:brightness-110" style={{ height: 36, paddingLeft: 12, paddingRight: 12, background: 'rgba(38, 38, 38, 0.30)', borderRadius: 8, border: '0.8px solid rgba(255, 255, 255, 0.10)' }}>
                <span style={{ color: 'white', fontSize: 14, lineHeight: '20px' }}>{colorGrade}</span>
                <ChevronDown size={16} color="#A1A1A1" style={{ opacity: 0.5 }} />
              </button>
              {colorOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setColorOpen(false)} />
                  <div className="absolute left-0 right-0 z-50" style={{ top: 40, background: '#1a1d24', borderRadius: 8, border: '0.8px solid rgba(255, 255, 255, 0.10)', overflow: 'hidden' }}>
                    {['None', 'Cinematic', 'Moody', 'Warm Vintage', 'Cool Teal', 'Desaturated'].map((opt) => (
                      <button key={opt} onClick={() => { setColorGrade(opt); setColorOpen(false) }} className="w-full text-left transition-colors hover:bg-white/5" style={{ padding: '8px 12px', color: opt === colorGrade ? 'white' : '#99A1AF', fontSize: 14, background: opt === colorGrade ? 'rgba(255,255,255,0.05)' : 'transparent' }}>{opt}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Watermark toggle */}
          <div className="flex items-center justify-between" style={{ padding: '0 16px', height: 70, borderRadius: 14, background: 'rgba(255, 255, 255, 0.05)', border: '0.8px solid rgba(255, 255, 255, 0.10)' }}>
            <div className="flex flex-col">
              <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: '14px' }}>Watermark</span>
              <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px', marginTop: 4 }}>Add Audi branding</span>
            </div>
            <button onClick={() => setWatermark(!watermark)} className="transition-all" style={{ width: 32, height: 18, borderRadius: 9999, background: watermark ? '#FAFAFA' : '#262626', padding: watermark ? '0 0 0 14px' : '0 14px 0 0', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 16, height: 16, borderRadius: 9999, background: watermark ? '#171717' : '#555', transition: 'all 0.15s ease' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Export button */}
      <div style={{ padding: '0 24px 24px' }}>
        <button onClick={onExport} className="w-full flex items-center justify-center transition-all hover:brightness-110" style={{ minHeight: 48, borderRadius: 999, background: '#657081', gap: 7 }}>
          <Download size={16} color="white" />
          <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>
            Export{selectedCount > 0 ? ` ${selectedCount} Video${selectedCount > 1 ? 's' : ''}` : ' Video'}
          </span>
        </button>
        <p className="text-center" style={{ marginTop: 12, color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>
          Estimated size: ~{selectedCount > 1 ? selectedCount * 45 : 45} MB &bull; Time: ~{selectedCount > 1 ? selectedCount * 2 : 2} min
        </p>
      </div>
    </div>
  )
}

/* ---- Export Success Modal ---- */

function ExportSuccessModal({ onClose, onGenerateNew }: { onClose: () => void; onGenerateNew: () => void }) {
  const [exportProgress, setExportProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setDone(true); return 100 }
        return prev + 2
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const socials = [
    { name: 'YouTube', icon: YouTubeIcon },
    { name: 'Instagram', icon: InstagramIcon },
    { name: 'X', icon: XIcon },
    { name: 'LinkedIn', icon: LinkedInIcon },
  ]

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 300, background: 'rgba(0, 0, 0, 0.75)' }}>
      <div className="w-full" style={{ maxWidth: 480, background: '#181D25', borderRadius: 20, border: '0.8px solid rgba(255, 255, 255, 0.10)', boxShadow: '0 32px 64px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        <div className="flex items-center justify-between" style={{ padding: '20px 24px', borderBottom: '0.8px solid rgba(255,255,255,0.05)' }}>
          <span style={{ color: 'white', fontSize: 18, fontWeight: 600, lineHeight: '27px' }}>{done ? 'Export Complete' : 'Exporting...'}</span>
          {done && (
            <button onClick={onClose} className="flex items-center justify-center transition-all hover:bg-white/5" style={{ width: 32, height: 32, borderRadius: 8 }}>
              <X size={16} color="#99A1AF" />
            </button>
          )}
        </div>
        <div style={{ padding: 24 }}>
          {!done ? (
            <div className="flex flex-col items-center" style={{ gap: 20, paddingTop: 16, paddingBottom: 8 }}>
              <div style={{ width: 56, height: 56, borderRadius: 9999, border: '3px solid rgba(255,255,255,0.10)', borderTopColor: '#0A82DF', animation: 'spin 0.8s linear infinite' }} />
              <div className="w-full">
                <div className="w-full overflow-hidden" style={{ height: 6, borderRadius: 9999, background: 'rgba(255, 255, 255, 0.10)' }}>
                  <div style={{ width: `${exportProgress}%`, height: 6, borderRadius: 9999, background: '#0A82DF', transition: 'width 0.1s linear' }} />
                </div>
                <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
                  <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>{exportProgress < 40 ? 'Encoding video...' : exportProgress < 80 ? 'Applying color grade...' : 'Writing file...'}</span>
                  <span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>{exportProgress}%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center" style={{ gap: 20 }}>
              <div className="flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: 9999, background: 'rgba(74, 222, 128, 0.10)' }}>
                <CheckCircle size={32} color="#4ade80" />
              </div>
              <div className="flex flex-col items-center" style={{ gap: 4 }}>
                <span style={{ color: 'white', fontSize: 16, fontWeight: 600, lineHeight: '24px' }}>Your video has been exported!</span>
                <span style={{ color: '#6A7282', fontSize: 14, lineHeight: '21px' }}>4K &bull; 30fps &bull; 9.0s &bull; ~45 MB</span>
              </div>
              <div className="w-full">
                <div style={{ marginBottom: 12 }}><span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>SHARE TO</span></div>
                <div className="flex" style={{ gap: 8 }}>
                  {socials.map(({ name, icon: Icon }) => (
                    <button key={name} className="flex-1 flex flex-col items-center justify-center transition-all hover:brightness-125" style={{ height: 72, borderRadius: 12, background: 'rgba(255, 255, 255, 0.05)', border: '0.8px solid rgba(255, 255, 255, 0.10)', gap: 6, color: '#99A1AF' }}>
                      <Icon />
                      <span style={{ fontSize: 11, lineHeight: '16.5px' }}>{name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col" style={{ gap: 10 }}>
                <button className="w-full flex items-center justify-center transition-all hover:brightness-110" style={{ minHeight: 48, borderRadius: 999, background: '#657081', gap: 7 }}>
                  <Download size={16} color="white" />
                  <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>Download File</span>
                </button>
                <button onClick={onGenerateNew} className="w-full flex items-center justify-center transition-all hover:brightness-110" style={{ minHeight: 48, borderRadius: 999, background: '#181D25', boxShadow: '0px 0px 0px 1px #2C343F inset', gap: 8 }}>
                  <Sparkles size={16} color="white" />
                  <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>Generate New</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---- Main Results Page ---- */

export default function ResultsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const prompt = (location.state as { prompt?: string })?.prompt ?? ''
  const { openMobile } = useSidebar()

  const [versions, setVersions] = useState(defaultVersions)
  const [compareIds, setCompareIds] = useState<number[]>([1, 2])
  const [showExportModal, setShowExportModal] = useState(false)

  const toggleSelect = (id: number) => {
    setVersions(versions.map((v) => (v.id === id ? { ...v, selected: !v.selected } : v)))
  }

  const selectedCount = versions.filter((v) => v.selected).length

  const toggleCompare = (id: number) => {
    if (compareIds.includes(id)) {
      if (compareIds.length > 1) setCompareIds(compareIds.filter((c) => c !== id))
    } else {
      if (compareIds.length < 2) setCompareIds([...compareIds, id])
      else setCompareIds([compareIds[1], id])
    }
  }

  const visibleVersions = versions.filter((v) => compareIds.includes(v.id))
  const totalDuration = 9.0
  const shotCount = 3

  return (
    <div className="flex flex-col w-full h-full overflow-hidden" style={{ background: '#101319' }}>
      {/* Top Header */}
      <header className="flex items-center justify-between shrink-0" style={{ height: 56, paddingLeft: 12, paddingRight: 16, background: 'rgba(2, 2, 3, 0.80)', borderBottom: '0.8px solid black', zIndex: 50 }}>
        <div className="flex items-center" style={{ gap: 4 }}>
          <button onClick={openMobile} className="md:hidden flex items-center justify-center transition-all hover:bg-white/10 active:scale-95" style={{ width: 36, height: 36, borderRadius: 8 }}>
            <Menu size={18} color="#99A1AF" />
          </button>
          <button onClick={() => navigate(-1)} className="flex items-center justify-center hover:bg-white/5 transition-all" style={{ width: 36, height: 36, borderRadius: 10 }}>
            <ArrowLeft size={18} color="#99A1AF" />
          </button>
        </div>
        <span className="truncate" style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px', maxWidth: '50%' }}>
          {prompt ? `${prompt.slice(0, 30)}${prompt.length > 30 ? '...' : ''}.avp` : 'A6 e-tron Showcase.avp'}
        </span>
        <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(255, 255, 255, 0.05)' }}>
          <User size={16} color="#99A1AF" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex justify-center" style={{ padding: '24px 16px' }}>
        <div className="flex flex-col md:flex-row w-full" style={{ gap: 24, maxWidth: 1360 }}>
          {/* Left: Videos + Stats */}
          <div className="flex-1 min-w-0 flex flex-col" style={{ gap: 24 }}>
            {/* Compare bar */}
            <div className="flex items-center overflow-x-auto" style={{ gap: 12 }}>
              <span className="shrink-0" style={{ color: '#99A1AF', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>Compare:</span>
              {versions.map((v) => {
                const active = compareIds.includes(v.id)
                return (
                  <button key={v.id} onClick={() => toggleCompare(v.id)} className="flex items-center transition-all shrink-0" style={{ height: 35, paddingLeft: 12, paddingRight: 12, borderRadius: 10, background: active ? 'rgba(10, 130, 223, 0.10)' : 'rgba(255, 255, 255, 0.05)', border: active ? '0.8px solid rgba(10, 130, 223, 0.50)' : '0.8px solid rgba(255, 255, 255, 0.10)', gap: 8 }}>
                    <span style={{ color: active ? '#0A82DF' : '#99A1AF', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>{v.label}</span>
                    {active && compareIds.length > 1 && (
                      <X size={12} color="#0A82DF" onClick={(e) => { e.stopPropagation(); toggleCompare(v.id) }} />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Video players — stack on mobile */}
            <div className="flex flex-col sm:flex-row" style={{ gap: 24 }}>
              {visibleVersions.map((v) => (
                <VideoCard key={v.id} version={v} onToggleSelect={() => toggleSelect(v.id)} />
              ))}
            </div>

            {/* Stats row */}
            <div className="flex" style={{ gap: 16 }}>
              {[
                { label: 'Duration', value: `${totalDuration.toFixed(1)}s`, color: 'white' },
                { label: 'Shots', value: String(shotCount), color: 'white' },
                { label: 'Quality', value: '4K', color: '#0A82DF' },
              ].map((stat) => (
                <div key={stat.label} className="flex-1 flex flex-col" style={{ padding: '12px 16px', borderRadius: 14, background: 'rgba(255, 255, 255, 0.05)', border: '0.8px solid rgba(255, 255, 255, 0.05)', gap: 4 }}>
                  <span style={{ color: '#99A1AF', fontSize: 12, lineHeight: '18px' }}>{stat.label}</span>
                  <span style={{ color: stat.color, fontSize: 18, fontWeight: 600, lineHeight: '28px' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Export Settings */}
          <ExportPanel onExport={() => setShowExportModal(true)} selectedCount={selectedCount} />
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <ExportSuccessModal onClose={() => setShowExportModal(false)} onGenerateNew={() => navigate('/')} />
      )}
    </div>
  )
}
