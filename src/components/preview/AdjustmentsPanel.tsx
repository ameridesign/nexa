import { useState } from 'react'
import {
  Film,
  Camera,
  Sparkles,
  Music,
  ChevronDown,
  RotateCcw,
} from 'lucide-react'

type TabId = 'scene' | 'composition' | 'color' | 'music'

/* ------------------------------------------------------------------ */
/*  Reusable controls                                                  */
/* ------------------------------------------------------------------ */

function SectionLabel({ children, onReset }: { children: string; onReset?: () => void }) {
  return (
    <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
      <div className="flex items-center" style={{ gap: 8 }}>
        <span
          style={{
            color: '#99A1AF',
            fontSize: 12,
            fontWeight: 600,
            lineHeight: '12px',
            letterSpacing: 0.6,
          }}
        >
          {children}
        </span>
      </div>
      {onReset && (
        <button onClick={onReset} className="hover:opacity-80 transition-opacity">
          <RotateCcw size={12} color="#6A7282" />
        </button>
      )}
    </div>
  )
}

function Dropdown({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
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
        <span style={{ color: 'white', fontSize: 14, lineHeight: '20px' }}>{value}</span>
        <ChevronDown size={16} color="#A1A1A1" style={{ opacity: 0.5 }} />
      </button>
      {open && (
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
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className="w-full text-left transition-colors hover:bg-white/5"
              style={{
                padding: '8px 12px',
                color: opt === value ? 'white' : '#99A1AF',
                fontSize: 14,
                background: opt === value ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  labels,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  labels?: string[]
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="relative" style={{ height: 16 }}>
        {/* Track */}
        <div
          className="absolute w-full"
          style={{
            top: 0,
            height: 16,
            background: '#16181D',
            borderRadius: 41,
            border: '1px solid #2D2F33',
          }}
        />
        {/* Fill */}
        <div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            width: `${pct}%`,
            height: 16,
            background: '#FAFAFA',
            borderRadius: 9999,
          }}
        />
        {/* Thumb */}
        <div
          className="absolute"
          style={{
            top: 0,
            left: `${pct}%`,
            transform: 'translateX(-50%)',
            width: 16,
            height: 16,
            background: '#0A0A0A',
            boxShadow: '0px 1px 2px -1px rgba(0,0,0,0.10), 0px 1px 3px rgba(0,0,0,0.10)',
            borderRadius: 9999,
            border: '0.8px solid #FAFAFA',
          }}
        />
        {/* Invisible range input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full opacity-0 cursor-pointer"
          style={{ top: 0, height: 16 }}
        />
      </div>
      {labels && (
        <div className="flex items-start justify-between" style={{ marginTop: 4 }}>
          {labels.map((label) => (
            <span
              key={label}
              style={{ color: '#6A7282', fontSize: 11, lineHeight: '16.5px' }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab Contents                                                       */
/* ------------------------------------------------------------------ */

function SceneTab() {
  const [weather, setWeather] = useState('Cloudy')
  const [timeOfDay, setTimeOfDay] = useState(53)
  const [environment, setEnvironment] = useState('Urban Street')
  const [season, setSeason] = useState('Summer')

  return (
    <div className="flex flex-col" style={{ gap: 24 }}>
      {/* Weather */}
      <div>
        <SectionLabel>WEATHER</SectionLabel>
        <Dropdown
          value={weather}
          options={['Clear', 'Cloudy', 'Overcast', 'Rainy', 'Foggy', 'Snowy']}
          onChange={setWeather}
        />
      </div>

      {/* Time of Day */}
      <div>
        <SectionLabel onReset={() => setTimeOfDay(50)}>TIME OF DAY</SectionLabel>
        <Slider
          value={timeOfDay}
          onChange={setTimeOfDay}
          labels={['Night', 'Day', 'Night']}
        />
      </div>

      {/* Environment */}
      <div>
        <SectionLabel>ENVIRONMENT</SectionLabel>
        <Dropdown
          value={environment}
          options={['Urban Street', 'Highway', 'Mountain Road', 'Coastal', 'Desert', 'Forest', 'Studio', 'Parking Garage']}
          onChange={setEnvironment}
        />
      </div>

      {/* Season */}
      <div>
        <SectionLabel>SEASON</SectionLabel>
        <Dropdown
          value={season}
          options={['Spring', 'Summer', 'Autumn', 'Winter']}
          onChange={setSeason}
        />
      </div>
    </div>
  )
}

function CompositionTab() {
  const [cameraAngle, setCameraAngle] = useState('Front 3/4')
  const [cameraHeight, setCameraHeight] = useState(50)
  const [focalLength, setFocalLength] = useState(65)
  const [depthOfField, setDepthOfField] = useState(70)
  const [cameraMotion, setCameraMotion] = useState('Orbit')

  return (
    <div className="flex flex-col" style={{ gap: 24 }}>
      {/* Camera Angle */}
      <div>
        <SectionLabel>CAMERA ANGLE</SectionLabel>
        <Dropdown
          value={cameraAngle}
          options={['Front', 'Front 3/4', 'Side Profile', 'Rear 3/4', 'Rear', 'Top Down', 'Low Angle', 'Interior']}
          onChange={setCameraAngle}
        />
      </div>

      {/* Camera Height */}
      <div>
        <SectionLabel onReset={() => setCameraHeight(50)}>CAMERA HEIGHT</SectionLabel>
        <Slider
          value={cameraHeight}
          onChange={setCameraHeight}
          labels={['Ground', 'Eye Level', 'Aerial']}
        />
      </div>

      {/* Focal Length */}
      <div>
        <SectionLabel onReset={() => setFocalLength(65)}>FOCAL LENGTH</SectionLabel>
        <Slider
          value={focalLength}
          onChange={setFocalLength}
          labels={['24mm Wide', '50mm', '200mm Tele']}
        />
      </div>

      {/* Depth of Field */}
      <div>
        <SectionLabel onReset={() => setDepthOfField(70)}>DEPTH OF FIELD</SectionLabel>
        <Slider
          value={depthOfField}
          onChange={setDepthOfField}
          labels={['Shallow', 'Medium', 'Deep']}
        />
      </div>

      {/* Camera Motion */}
      <div>
        <SectionLabel>CAMERA MOTION</SectionLabel>
        <Dropdown
          value={cameraMotion}
          options={['Static', 'Orbit', 'Dolly In', 'Dolly Out', 'Tracking', 'Crane Up', 'Crane Down', 'Handheld']}
          onChange={setCameraMotion}
        />
      </div>
    </div>
  )
}

function ColorTab() {
  const [colorGrade, setColorGrade] = useState('Cinematic')
  const [brightness, setBrightness] = useState(50)
  const [contrast, setContrast] = useState(55)
  const [saturation, setSaturation] = useState(60)
  const [temperature, setTemperature] = useState(48)
  const [vignette, setVignette] = useState(25)

  return (
    <div className="flex flex-col" style={{ gap: 24 }}>
      {/* Color Grade Preset */}
      <div>
        <SectionLabel>COLOR GRADE</SectionLabel>
        <Dropdown
          value={colorGrade}
          options={['Natural', 'Cinematic', 'Moody', 'Warm Vintage', 'Cool Teal', 'High Contrast', 'Desaturated', 'Neon Night']}
          onChange={setColorGrade}
        />
      </div>

      {/* Brightness */}
      <div>
        <SectionLabel onReset={() => setBrightness(50)}>BRIGHTNESS</SectionLabel>
        <Slider
          value={brightness}
          onChange={setBrightness}
          labels={['Dark', 'Normal', 'Bright']}
        />
      </div>

      {/* Contrast */}
      <div>
        <SectionLabel onReset={() => setContrast(50)}>CONTRAST</SectionLabel>
        <Slider
          value={contrast}
          onChange={setContrast}
          labels={['Low', 'Normal', 'High']}
        />
      </div>

      {/* Saturation */}
      <div>
        <SectionLabel onReset={() => setSaturation(50)}>SATURATION</SectionLabel>
        <Slider
          value={saturation}
          onChange={setSaturation}
          labels={['Muted', 'Normal', 'Vivid']}
        />
      </div>

      {/* Temperature */}
      <div>
        <SectionLabel onReset={() => setTemperature(50)}>TEMPERATURE</SectionLabel>
        <Slider
          value={temperature}
          onChange={setTemperature}
          labels={['Cool', 'Neutral', 'Warm']}
        />
      </div>

      {/* Vignette */}
      <div>
        <SectionLabel onReset={() => setVignette(0)}>VIGNETTE</SectionLabel>
        <Slider
          value={vignette}
          onChange={setVignette}
          labels={['None', 'Subtle', 'Strong']}
        />
      </div>
    </div>
  )
}

function MusicTab() {
  const [musicTrack, setMusicTrack] = useState('Epic Cinematic')
  const [musicVolume, setMusicVolume] = useState(70)
  const [engineSound, setEngineSound] = useState('Realistic')
  const [engineVolume, setEngineVolume] = useState(50)
  const [ambience, setAmbience] = useState('City')
  const [ambienceVolume, setAmbienceVolume] = useState(30)

  return (
    <div className="flex flex-col" style={{ gap: 24 }}>
      {/* Music Track */}
      <div>
        <SectionLabel>MUSIC TRACK</SectionLabel>
        <Dropdown
          value={musicTrack}
          options={['None', 'Epic Cinematic', 'Electronic Pulse', 'Ambient Minimal', 'Orchestral Drama', 'Lo-fi Chill', 'Rock Energy']}
          onChange={setMusicTrack}
        />
      </div>

      {/* Music Volume */}
      <div>
        <SectionLabel onReset={() => setMusicVolume(70)}>MUSIC VOLUME</SectionLabel>
        <Slider
          value={musicVolume}
          onChange={setMusicVolume}
          labels={['Silent', 'Medium', 'Loud']}
        />
      </div>

      {/* Engine Sound */}
      <div>
        <SectionLabel>ENGINE SOUND</SectionLabel>
        <Dropdown
          value={engineSound}
          options={['None', 'Realistic', 'Enhanced', 'Sport Exhaust', 'Electric Whine']}
          onChange={setEngineSound}
        />
      </div>

      {/* Engine Volume */}
      <div>
        <SectionLabel onReset={() => setEngineVolume(50)}>ENGINE VOLUME</SectionLabel>
        <Slider
          value={engineVolume}
          onChange={setEngineVolume}
          labels={['Silent', 'Medium', 'Loud']}
        />
      </div>

      {/* Ambience */}
      <div>
        <SectionLabel>AMBIENCE</SectionLabel>
        <Dropdown
          value={ambience}
          options={['None', 'City', 'Nature', 'Rain', 'Wind', 'Crowd']}
          onChange={setAmbience}
        />
      </div>

      {/* Ambience Volume */}
      <div>
        <SectionLabel onReset={() => setAmbienceVolume(30)}>AMBIENCE VOLUME</SectionLabel>
        <Slider
          value={ambienceVolume}
          onChange={setAmbienceVolume}
          labels={['Silent', 'Medium', 'Loud']}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

const tabs: { id: TabId; icon: typeof Film; label: string }[] = [
  { id: 'scene', icon: Film, label: 'Scene' },
  { id: 'composition', icon: Camera, label: 'Composition' },
  { id: 'color', icon: Sparkles, label: 'Color' },
  { id: 'music', icon: Music, label: 'Music' },
]

export default function AdjustmentsPanel() {
  const [activeTab, setActiveTab] = useState<TabId>('scene')

  return (
    <div
      className="h-full flex flex-col shrink-0"
      style={{
        width: 320,
        background: 'rgba(16, 19, 25, 0.40)',
        borderLeft: '0.8px solid black',
      }}
    >
      {/* Tab Bar */}
      <div
        className="flex shrink-0"
        style={{
          height: 35,
          borderBottom: '0.8px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center transition-colors"
              style={{
                borderBottom: isActive ? '1.6px solid #262626' : '1.6px solid transparent',
                background: isActive ? 'rgba(38, 38, 38, 0.30)' : 'transparent',
              }}
              title={tab.label}
            >
              <Icon size={16} color={isActive ? '#FAFAFA' : '#A1A1A1'} />
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '24px 24px' }}>
        {activeTab === 'scene' && <SceneTab />}
        {activeTab === 'composition' && <CompositionTab />}
        {activeTab === 'color' && <ColorTab />}
        {activeTab === 'music' && <MusicTab />}
      </div>
    </div>
  )
}
