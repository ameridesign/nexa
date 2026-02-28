import { useState } from 'react'
import { Grid3x3 } from 'lucide-react'
import type { Shot } from './ShotsPanel'

interface PreviewCenterProps {
  selectedShot: Shot | undefined
  carImage: string
}

export default function PreviewCenter({ selectedShot, carImage }: PreviewCenterProps) {
  const [showGrid, setShowGrid] = useState(false)

  const hasVideo = selectedShot?.video

  return (
    <div
      className="flex flex-col overflow-hidden shrink-0 md:shrink md:flex-1"
      style={{ background: '#101319', minWidth: 0, minHeight: 0 }}
    >
      {/* Header */}
      <div
        className="hidden md:flex items-center justify-between shrink-0"
        style={{ padding: '24px 24px 0 24px', height: 54 }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '21px',
            letterSpacing: 0.28,
          }}
        >
          PREVIEW
        </span>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className="flex items-center transition-all hover:brightness-125"
          style={{
            height: 30,
            paddingLeft: 12,
            paddingRight: 12,
            background: showGrid ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: 10,
            gap: 8,
          }}
        >
          <Grid3x3 size={16} color="#99A1AF" />
          <span style={{ color: '#99A1AF', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>
            Grid
          </span>
        </button>
      </div>

      {/* Preview Viewport */}
      <div
        className="flex items-center justify-center overflow-hidden md:flex-1"
        style={{ padding: '12px 16px 16px', minHeight: 0 }}
      >
        <div
          className="relative overflow-hidden w-full"
          style={{
            maxHeight: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 16,
            background: 'linear-gradient(180deg, #0A1929 0%, black 50%, black 100%)',
            boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '0.8px solid rgba(255, 255, 255, 0.10)',
          }}
        >
          {/* Video or Image */}
          {hasVideo ? (
            <video
              key={selectedShot.video}
              src={selectedShot.video!}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={carImage}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: 0.7,
                animation: 'slowZoom 8s ease-in-out infinite alternate',
              }}
            />
          )}

          {/* Grid overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute" style={{ left: '33.33%', top: 0, bottom: 0, width: 1, background: 'rgba(10, 130, 223, 0.25)' }} />
              <div className="absolute" style={{ left: '66.66%', top: 0, bottom: 0, width: 1, background: 'rgba(10, 130, 223, 0.25)' }} />
              <div className="absolute" style={{ top: '33.33%', left: 0, right: 0, height: 1, background: 'rgba(10, 130, 223, 0.25)' }} />
              <div className="absolute" style={{ top: '66.66%', left: 0, right: 0, height: 1, background: 'rgba(10, 130, 223, 0.25)' }} />
            </div>
          )}

          {/* Center crosshair */}
          <div
            className="absolute pointer-events-none hidden md:block"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 32, height: 32 }}
          >
            <div className="absolute" style={{ left: 16, top: 0, width: 1, height: 32, background: 'rgba(10, 130, 223, 0.40)' }} />
            <div className="absolute" style={{ top: 16, left: 0, width: 32, height: 1, background: 'rgba(10, 130, 223, 0.40)' }} />
          </div>

          {/* Shot label overlay */}
          {selectedShot && (
            <div
              className="absolute"
              style={{
                left: 12,
                bottom: 12,
                padding: '6px 10px',
                background: 'rgba(0, 0, 0, 0.60)',
                borderRadius: 10,
                border: '0.8px solid rgba(255, 255, 255, 0.10)',
              }}
            >
              <span style={{ color: 'white', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>
                {selectedShot.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
