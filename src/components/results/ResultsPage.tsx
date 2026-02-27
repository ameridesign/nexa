import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Play,
  Pause,
  Volume2,
  Pin,
  Download,
  ChevronDown,
  User,
  X,
} from 'lucide-react'
import AudiLogo from '../ui/AudiLogo'

const BASE = import.meta.env.BASE_URL

interface Version {
  id: number
  label: string
  pinned: boolean
  video: string
  thumbnail: string
}

const defaultVersions: Version[] = [
  { id: 1, label: 'Version 1', pinned: false, video: `${BASE}opening-shot-video.mp4`, thumbnail: `${BASE}opening-shot.avif` },
  { id: 2, label: 'Version 2', pinned: true, video: `${BASE}Car_Driving_Away_Video_Generated.mp4`, thumbnail: `${BASE}dynamic-pan.png` },
  { id: 3, label: 'Version 3', pinned: false, video: `${BASE}opening-shot-video.mp4`, thumbnail: `${BASE}close-up.jpg` },
]

type AspectRatio = '9:16' | '16:9' | '1:1'
type Resolution = '4k' | '1080p'
type FrameRate = '24' | '30'

/* ---- Video Card ---- */

function VideoCard({
  version,
  onTogglePin,
}: {
  version: Version
  onTogglePin: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(9)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(!playing)
  }

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60)
    const secs = Math.floor(t % 60)
      .toString()
      .padStart(2, '0')
    return `${mins}:${secs}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex-1 flex flex-col" style={{ gap: 12 }}>
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center"
          style={{
            padding: '2px 8px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 8,
            border: '0.8px solid rgba(255, 255, 255, 0.20)',
          }}
        >
          <span style={{ color: '#FAFAFA', fontSize: 12, fontWeight: 500, lineHeight: '16px' }}>
            {version.label}
          </span>
        </div>
        <button
          onClick={onTogglePin}
          className="flex items-center transition-all hover:brightness-125"
          style={{
            height: 26,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 10,
            background: version.pinned ? 'rgba(10, 130, 223, 0.20)' : 'rgba(255, 255, 255, 0.05)',
            gap: 6,
          }}
        >
          <Pin size={12} color={version.pinned ? '#0A82DF' : '#99A1AF'} fill={version.pinned ? '#0A82DF' : 'none'} />
          <span
            style={{
              color: version.pinned ? '#0A82DF' : '#99A1AF',
              fontSize: 12,
              fontWeight: 600,
              lineHeight: '18px',
            }}
          >
            {version.pinned ? 'Pinned' : 'Pin'}
          </span>
        </button>
      </div>

      {/* Video container */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 14,
          background: 'linear-gradient(180deg, #0A1929 0%, black 100%)',
          boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '0.8px solid rgba(255, 255, 255, 0.10)',
          aspectRatio: '16 / 9',
        }}
      >
        <video
          ref={videoRef}
          src={version.video}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.8 }}
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 9)}
          onEnded={() => setPlaying(false)}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: '50%',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Play button */}
        <button
          onClick={togglePlay}
          className="absolute flex items-center justify-center transition-all hover:scale-105"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 56,
            height: 56,
            borderRadius: 9999,
            background: 'rgba(255, 255, 255, 0.10)',
          }}
        >
          {playing ? (
            <Pause size={24} color="white" fill="white" />
          ) : (
            <Play size={24} color="white" fill="white" />
          )}
        </button>

        {/* Bottom controls */}
        <div className="absolute inset-x-0 bottom-0" style={{ padding: '16px 16px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <span style={{ color: 'white', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button
              className="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.10)',
              }}
            >
              <Volume2 size={16} color="white" />
            </button>
          </div>

          {/* Progress bar */}
          <div
            className="w-full overflow-hidden"
            style={{
              height: 4,
              borderRadius: 9999,
              background: 'rgba(255, 255, 255, 0.20)',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: 4,
                background: '#0A82DF',
                borderRadius: 9999,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Export Settings Panel ---- */

function ExportPanel() {
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
    <div
      className="shrink-0 overflow-hidden flex flex-col"
      style={{
        width: 430,
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        border: '0.8px solid rgba(255, 255, 255, 0.10)',
        height: 'fit-content',
      }}
    >
      {/* Header */}
      <div className="flex items-center" style={{ padding: '24px 24px 0', gap: 8 }}>
        <Download size={20} color="#0A82DF" />
        <span style={{ color: 'white', fontSize: 20, fontWeight: 700, lineHeight: '30px' }}>
          Export Settings
        </span>
      </div>

      <div style={{ padding: '24px' }}>
        <div className="flex flex-col" style={{ gap: 24 }}>
          {/* Aspect Ratio */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>
                ASPECT RATIO
              </span>
            </div>
            <div className="flex" style={{ gap: 8 }}>
              {aspects.map((a) => {
                const active = aspect === a.value
                return (
                  <button
                    key={a.value}
                    onClick={() => setAspect(a.value)}
                    className="flex-1 flex flex-col items-center justify-center transition-all"
                    style={{
                      height: 102,
                      borderRadius: 14,
                      background: active ? 'rgba(10, 130, 223, 0.10)' : 'rgba(255, 255, 255, 0.05)',
                      border: active ? '0.8px solid rgba(10, 130, 223, 0.50)' : '0.8px solid rgba(255, 255, 255, 0.10)',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: a.w,
                        height: a.h,
                        borderRadius: 4,
                        border: active ? '1.6px solid #0A82DF' : '1.6px solid rgba(255, 255, 255, 0.30)',
                      }}
                    />
                    <span style={{ color: 'white', fontSize: 13, fontWeight: 600, lineHeight: '19.5px' }}>
                      {a.label}
                    </span>
                    <span style={{ color: '#6A7282', fontSize: 11, lineHeight: '16.5px' }}>
                      {a.sub}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Resolution */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>
                RESOLUTION
              </span>
            </div>
            <div className="flex flex-col" style={{ gap: 8 }}>
              {([
                { value: '4k' as Resolution, label: '4K (2160p)', sub: 'Best quality' },
                { value: '1080p' as Resolution, label: 'Full HD (1080p)', sub: 'Faster export' },
              ]).map((r) => {
                const active = resolution === r.value
                return (
                  <button
                    key={r.value}
                    onClick={() => setResolution(r.value)}
                    className="w-full flex items-center justify-between transition-all"
                    style={{
                      height: 65,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: 14,
                      background: active ? 'rgba(10, 130, 223, 0.10)' : 'rgba(255, 255, 255, 0.05)',
                      border: active ? '0.8px solid rgba(10, 130, 223, 0.50)' : '0.8px solid rgba(255, 255, 255, 0.10)',
                    }}
                  >
                    <div className="flex flex-col items-start">
                      <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>
                        {r.label}
                      </span>
                      <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px' }}>
                        {r.sub}
                      </span>
                    </div>
                    {/* Radio */}
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 9999,
                        background: 'rgba(38, 38, 38, 0.30)',
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                        border: '0.8px solid #262626',
                      }}
                    >
                      {active && (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 9999,
                            background: '#FAFAFA',
                          }}
                        />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Frame Rate */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 700, letterSpacing: 0.6, lineHeight: '12px' }}>
                FRAME RATE
              </span>
            </div>
            <div className="flex" style={{ gap: 8 }}>
              {(['24', '30'] as FrameRate[]).map((f) => {
                const active = frameRate === f
                return (
                  <button
                    key={f}
                    onClick={() => setFrameRate(f)}
                    className="flex-1 transition-all"
                    style={{
                      height: 50,
                      borderRadius: 14,
                      background: active ? 'rgba(10, 130, 223, 0.10)' : 'rgba(255, 255, 255, 0.05)',
                      border: active ? '0.8px solid rgba(10, 130, 223, 0.50)' : '0.8px solid rgba(255, 255, 255, 0.10)',
                    }}
                  >
                    <span
                      style={{
                        color: active ? '#0A82DF' : 'white',
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '21px',
                      }}
                    >
                      {f} fps
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color Grading */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, letterSpacing: 0.6, lineHeight: '12px' }}>
                COLOR GRADING (LUT)
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => setColorOpen(!colorOpen)}
                className="w-full flex items-center justify-between transition-all hover:brightness-110"
                style={{
                  height: 36,
                  paddingLeft: 12,
                  paddingRight: 12,
                  background: 'rgba(38, 38, 38, 0.30)',
                  borderRadius: 8,
                  border: '0.8px solid rgba(255, 255, 255, 0.10)',
                }}
              >
                <span style={{ color: 'white', fontSize: 14, lineHeight: '20px' }}>{colorGrade}</span>
                <ChevronDown size={16} color="#A1A1A1" style={{ opacity: 0.5 }} />
              </button>
              {colorOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setColorOpen(false)} />
                  <div
                    className="absolute left-0 right-0 z-50"
                    style={{
                      top: 40,
                      background: '#1a1d24',
                      borderRadius: 8,
                      border: '0.8px solid rgba(255, 255, 255, 0.10)',
                      overflow: 'hidden',
                    }}
                  >
                    {['None', 'Cinematic', 'Moody', 'Warm Vintage', 'Cool Teal', 'Desaturated'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setColorGrade(opt); setColorOpen(false) }}
                        className="w-full text-left transition-colors hover:bg-white/5"
                        style={{
                          padding: '8px 12px',
                          color: opt === colorGrade ? 'white' : '#99A1AF',
                          fontSize: 14,
                          background: opt === colorGrade ? 'rgba(255,255,255,0.05)' : 'transparent',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Watermark toggle */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: '0 16px',
              height: 70,
              borderRadius: 14,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '0.8px solid rgba(255, 255, 255, 0.10)',
            }}
          >
            <div className="flex flex-col">
              <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: '14px' }}>
                Watermark
              </span>
              <span style={{ color: '#6A7282', fontSize: 12, lineHeight: '18px', marginTop: 4 }}>
                Add Audi branding
              </span>
            </div>
            <button
              onClick={() => setWatermark(!watermark)}
              className="transition-all"
              style={{
                width: 32,
                height: 18,
                borderRadius: 9999,
                background: watermark ? '#FAFAFA' : '#262626',
                padding: watermark ? '0 0 0 14px' : '0 14px 0 0',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 9999,
                  background: watermark ? '#171717' : '#555',
                  transition: 'all 0.15s ease',
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Export button */}
      <div style={{ padding: '0 24px 24px' }}>
        <button
          className="w-full flex items-center justify-center transition-all hover:brightness-110"
          style={{
            minHeight: 48,
            borderRadius: 999,
            background: '#657081',
            gap: 7,
          }}
        >
          <Download size={16} color="white" />
          <span style={{ color: '#FCFCFD', fontSize: 14, lineHeight: '20px' }}>
            Export Video
          </span>
        </button>
        <p
          className="text-center"
          style={{
            marginTop: 12,
            color: '#6A7282',
            fontSize: 12,
            lineHeight: '18px',
          }}
        >
          Estimated size: ~45 MB &bull; Time: ~2 min
        </p>
      </div>
    </div>
  )
}

/* ---- Main Results Page ---- */

export default function ResultsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const prompt = (location.state as { prompt?: string })?.prompt ?? ''

  const [versions, setVersions] = useState(defaultVersions)
  const [compareIds, setCompareIds] = useState<number[]>([1, 2])

  const togglePin = (id: number) => {
    setVersions(versions.map((v) => (v.id === id ? { ...v, pinned: !v.pinned } : v)))
  }

  const toggleCompare = (id: number) => {
    if (compareIds.includes(id)) {
      if (compareIds.length > 1) {
        setCompareIds(compareIds.filter((c) => c !== id))
      }
    } else {
      if (compareIds.length < 2) {
        setCompareIds([...compareIds, id])
      } else {
        setCompareIds([compareIds[1], id])
      }
    }
  }

  const visibleVersions = versions.filter((v) => compareIds.includes(v.id))
  const totalDuration = 9.0
  const shotCount = 3

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden" style={{ background: '#101319' }}>
      {/* Top Header */}
      <header
        className="flex items-center justify-between shrink-0"
        style={{
          height: 64,
          paddingLeft: 24,
          paddingRight: 24,
          background: 'rgba(2, 2, 3, 0.80)',
          borderBottom: '0.8px solid black',
          zIndex: 50,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center hover:opacity-80 transition-opacity"
          style={{ gap: 12 }}
        >
          <AudiLogo size={69} className="text-white" />
        </button>
        <span style={{ color: '#99A1AF', fontSize: 14, lineHeight: '21px' }}>
          {prompt ? `${prompt.slice(0, 30)}${prompt.length > 30 ? '...' : ''}.avp` : 'A6 e-tron Showcase.avp'}
        </span>
        <div
          className="flex items-center justify-center"
          style={{ width: 36, height: 36, borderRadius: 9999, background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <User size={16} color="#99A1AF" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '32px 40px' }}>
        <div className="flex" style={{ gap: 32 }}>
          {/* Left: Videos + Stats */}
          <div className="flex-1 flex flex-col" style={{ gap: 24, maxWidth: 890 }}>
            {/* Compare bar */}
            <div className="flex items-center" style={{ gap: 12 }}>
              <span style={{ color: '#99A1AF', fontSize: 14, fontWeight: 600, lineHeight: '21px' }}>
                Compare:
              </span>
              {versions.map((v) => {
                const active = compareIds.includes(v.id)
                return (
                  <button
                    key={v.id}
                    onClick={() => toggleCompare(v.id)}
                    className="flex items-center transition-all"
                    style={{
                      height: 35,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: 10,
                      background: active ? 'rgba(10, 130, 223, 0.10)' : 'rgba(255, 255, 255, 0.05)',
                      border: active
                        ? '0.8px solid rgba(10, 130, 223, 0.50)'
                        : '0.8px solid rgba(255, 255, 255, 0.10)',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        color: active ? '#0A82DF' : '#99A1AF',
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '21px',
                      }}
                    >
                      {v.label}
                    </span>
                    {active && compareIds.length > 1 && (
                      <X
                        size={12}
                        color="#0A82DF"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCompare(v.id)
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Video players */}
            <div className="flex" style={{ gap: 24 }}>
              {visibleVersions.map((v) => (
                <VideoCard
                  key={v.id}
                  version={v}
                  onTogglePin={() => togglePin(v.id)}
                />
              ))}
            </div>

            {/* Stats row */}
            <div className="flex" style={{ gap: 16 }}>
              {[
                { label: 'Duration', value: `${totalDuration.toFixed(1)}s`, color: 'white' },
                { label: 'Shots', value: String(shotCount), color: 'white' },
                { label: 'Quality', value: '4K', color: '#0A82DF' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 flex flex-col"
                  style={{
                    padding: '16px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '0.8px solid rgba(255, 255, 255, 0.05)',
                    gap: 4,
                  }}
                >
                  <span style={{ color: '#99A1AF', fontSize: 12, lineHeight: '18px' }}>
                    {stat.label}
                  </span>
                  <span style={{ color: stat.color, fontSize: 20, fontWeight: 600, lineHeight: '30px' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Export Settings */}
          <ExportPanel />
        </div>
      </div>
    </div>
  )
}
